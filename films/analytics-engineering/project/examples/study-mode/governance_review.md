## Governance review

*`governance-review-agent[bot]`, Yusuf Demir's, reviewed the pull request on its first push, Wednesday
4 November 2026, and submitted its review as a comment.*

The agent's review of this pull request against data governance's rules, following
`skills/review-for-governance/`. It's a comment, not an approval, and it blocks nothing: each finding says who
decides.

**What I read**: the pull request, its files, and CI's results on it (`checks.txt`: the build of what changed and
what depends on it, every test, `scripts/check/governance.py`, `scripts/generate/codeowners.py --check` and the
impact report), with `skills/review-for-governance/draft_classes.py`'s counts from the pull request's build. I
can't push, and I have no access to Databricks: the evidence below is counts, never values.

### Passed

- **An owner.** The census-day count has one: Clara Jensen, Planning. The new column is hers, as the count is.
- **The words, from the glossary.** `study_mode`'s description is the glossary's *Study mode*, word for word, with
  its source: named by data governance, defined by Mei Tanaka, registrar's office, synced on 4 November 2026.
- **The impact, named.** One column added: the contract's change is additive, and nothing that reads the table
  breaks. Downstream, the count by level and its test still pass; the census dashboard reads it.
- **A test for each stated rule.** "Every student has one study mode" and "the two add up to the census-day count"
  are tested, each with an owner and a dimension.

### 1. The new column doesn't say whether it can identify a person

`models/marts/planning/_planning__models.yml`: `study_mode` has no `meta.personal_data` (`governance.py`, one
problem). Until it has one, nothing says whether to mask it.

| Column | Suggested class | Evidence |
|---|---|---|
| `study_mode` | none | 18,412 rows, 2 distinct; nothing looks like an email, a student or staff ID or a hash, and its name doesn't say it holds a name |

- **The rule:** every column of a model other teams read says whether it identifies a person, with `direct`,
  `pseudonymous` or `none` (rule 3).
- **Suggested:** `personal_data: none`, beside its `glossary_term`.
- **Who decides:** Clara Jensen, as the count's owner.

---

*Clara Jensen, Planning, replied:* It's how a student studies, two values for everyone: `none`.

*The planning agent:* Added, as Clara decided: `meta: {glossary_term: study_mode, personal_data: none}`. Pushed
to `agent/planning/study-mode`: the second push. Every check passes again (`checks.txt`), and the diff is the same
(`diff.txt`).

*Approved, on the second push:* Jun Park, for the code. Mei Tanaka, registrar's office, for the meaning.
