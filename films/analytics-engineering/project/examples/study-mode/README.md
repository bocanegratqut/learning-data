# A worked example: the planning agent's first pull request

Clara Jensen, in Planning, asks for each student's study mode, on campus or online, on Planning's census-day count:
the library wants to know who can't come in for a book. Mei Tanaka writes what study mode means into the glossary
first. The planning agent, Planning's contributor under its own name, writes two tests before the column, builds it
on its own branch and in its own development schema, and opens its first pull request with its evidence. The checks
build what changed and what depends on it; a diff compares the table with main's, student by student. The governance
review agent reviews it, for reference; Clara decides what it flagged; Jun Park approves the code and Mei the
meaning. Jun merges it, and the release waits until Noor Rahman, who didn't start it, approves it for production.
*Every change through review*, film 6 of 7 of *From helper to colleague*, follows it.

| File | What it is |
|---|---|
| `pull_request.md` | The agent's pull request: what changed and why, its two tests, the words it copied from the glossary, and its evidence |
| `checks.txt` | What CI ran on it: the build of what changed and what depends on it, every test, and the impact report |
| `diff.txt` | The table from the agent's branch and from main, compared by its key |
| `governance_review.md` | The governance review agent's review, a comment for reference, with Clara's decision and the second push under it |
| `release.md` | Who approved what, the merge, and the release to production, as GitHub and Databricks record them |

The model it changes, `mart_planning__census_day_students` (the 18,412 students on census day, 31 March 2026), is
the film's, at the university's scale, as in `../census-by-level/`. It's only in these examples, not in the project:
its sample holds a few dozen learners. So these files are the job's documents, not code that runs here.

The rules it goes through are in `../../review-and-release/`: the ruleset on `main`, the environment the release
waits at, the release itself, and the bundle it deploys (`../../databricks.yml`).

What the change leaves for the next one: *Study mode* in the glossary and in the model, with its source; two tests
that only a person changes from now on; and a count by study mode that answers the library from Planning's count,
never from a line in someone's memory.
