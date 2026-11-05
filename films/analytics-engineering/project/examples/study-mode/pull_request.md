# Add study mode to the census-day students

*The planning agent's pull request, its first: `planning-agent[bot]`, from `agent/planning/study-mode`, opened on
Wednesday 4 November 2026. As it was opened; the review and the second push are in
[`governance_review.md`](governance_review.md).*

## What changed

- `mart_planning__census_day_students`: one new column, `study_mode`, `on campus` or `online`. No row added or
  removed, and no other column changed ([`diff.txt`](diff.txt)).
- `study_mode`'s description, copied from the glossary's *Study mode*, with its source.
- Two new tests, written before the column. No test that was there changed.

| File | What changed in it |
|---|---|
| `models/marts/planning/mart_planning__census_day_students.sql` | The column |
| `models/marts/planning/_planning__models.yml` | Its description, and the first test |
| `models/marts/planning/_planning__conceptual.yml` | *Study mode*, copied from the glossary, with its source |
| `models/marts/planning/_planning__definitions.md` | [generated] its doc block |
| `tests/rules/study_modes_add_up_to_census_day.sql` | The second test |
| `tests/rules/_rules__tests.yml` | The second test's owner and dimension |

## Why

Clara Jensen, in Planning, asked for it on Tuesday 3 November 2026: "Add study mode to the census-day count". The
library had asked how many students study online and can't come in for a book. With the column, that answer comes
from Planning's count, the one the board and the government's report read, and not from a line in anyone's memory.
Mei Tanaka wrote what study mode means into the glossary the same day, before any code.

## How I worked

On my own branch, and in my own development schema (`planning_agent_marts`, in the development catalog). I read
production, and write only to my branch and my schema. For Planning's tickets I'm at stage 4: I propose, and people
review. I don't approve or merge, and I don't change a test once a person has approved it (`AGENTS.md`).

1. Read *Study mode*, *Student* and *Census day* in the glossary, and the census-day count's model and tests.
2. Wrote the two tests below, before the column: until it was there, they couldn't pass.
3. Added the column: each student's units on census day, one row per student, joined on `learner_key`.
4. Built the count and what depends on it, in my schema, and ran every test on them: all pass.
5. Compared the table with main's, student by student ([`diff.txt`](diff.txt)), and opened this pull request.

## The two tests, written first

The first: every student has one study mode. With the mart's key (one row per student), each row has a mode, and
it's one of the two.

```yaml
      - name: study_mode
        description: >
          How the student studies on the census date: on campus or online.
          {{ doc("study_mode") }}
        data_type: string
        config:
          meta: {glossary_term: study_mode}
        data_tests:
          - not_null
          - accepted_values:
              arguments:
                values: ["on campus", "online"]
```

The second: the two study modes add up to 18,412, the students on census day. A join that doubled a student, or
left one without a mode, makes it fail. A student dropped altogether is for the census report's reconciliation to
catch, and for the diff.

```sql
-- The two study modes add up to the census-day count, 18,412 students: as many rows with a study mode
-- as there are students. A row back means they differ. Written by the planning agent before the column;
-- once approved, only a person changes it.
with by_mode as (
    select count(*) as students
    from {{ ref('mart_planning__census_day_students') }}
    where study_mode in ('on campus', 'online')
),

census_day as (
    select count(distinct learner_key) as students
    from {{ ref('mart_planning__census_day_students') }}
)

select
    by_mode.students as by_mode,
    census_day.students as census_day
from by_mode
cross join census_day
where by_mode.students is distinct from census_day.students
```

```yaml
  - name: study_modes_add_up_to_census_day
    description: The two study modes add up to the students on census day.
    config:
      meta: {owner: "Clara Jensen, Planning", dimension: consistency}
```

## The words, with their source

```yaml
  - name: study_mode
    label: study mode
    definition: >
      How a student studies on census day: on campus, if at least one of their units that day is taught
      on campus; online, if all of them are taught online.
    owner: Mei Tanaka, registrar's office
    source:
      glossary: the university's Unity Catalog Glossary, on Databricks
      term: Study mode
      named_by: data governance
      synced_on: 2026-11-04
```

## The column

```sql
-- Study mode, as the glossary has it: on campus if at least one of a student's units on census day is
-- taught on campus; online if all of them are taught online. One row per student, so the join below
-- can't double anyone.
study_modes as (
    select
        learner_key,
        case when count_if(taught = 'on campus') > 0 then 'on campus' else 'online' end as study_mode
    from census_day_units
    group by learner_key
)
```

and, in the final select, `left join study_modes using (learner_key)`.

## Evidence

Counts only: no names, no IDs.

1. The two modes add up to 18,412.
   `dbt show --inline "select study_mode, count(*) as students from {{ ref('mart_planning__census_day_students') }} group by study_mode"` →
   `on campus | 18,026` · `online | 386`: 18,412 in all.
2. Both tests pass, and every test after them: [`checks.txt`](checks.txt).
3. No student is only in this branch or only in main, no value changed, and one column is new: [`diff.txt`](diff.txt).

## For the reviewers

- **Jun Park**, the code: `CODEOWNERS` names you for the model, its tests and the doc block.
- **Mei Tanaka**, the meaning: *Study mode* in `_planning__conceptual.yml`. The rules on `main` ask the registrar's
  office to approve a change to it.
- **Clara Jensen**: you asked for it, and you own the count.
- **Noor Rahman** approves the release to production, after the merge.
- Any agent's review is for reference only. I approve nothing.
