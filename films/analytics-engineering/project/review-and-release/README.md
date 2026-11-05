# Review and release

Every change to the project reaches production the same way, whoever makes it, a person or an agent: a pull
request, checks on what changed, the owners' approval, a merge into `main`, and a release that a second person
approves. Agents propose: they open pull requests from their own branches, and they review them for reference.
Only people approve, and only a person's yes releases.

The rules live here as files, so a change to them is reviewed like any other. GitHub runs none of them from here:
this project sits inside a bigger repository, as `CODEOWNERS` does. In the project's own repository, each goes where
*Setting it up* says.

| File | What it is |
|---|---|
| `rulesets/main.json` | The ruleset on `main`, as GitHub exports one |
| `production.json` | The environment `production`, as the body of GitHub's REST call that sets it |
| `release.yml` | The release: it waits at `production`, signs in to Databricks with no secret, deploys the bundle (`../databricks.yml`) and runs the build |

`../examples/study-mode/` follows one change through all of it: the planning agent's first pull request.

## What each rule stops

| Rule | What it stops | Where it's set |
|---|---|---|
| Every change comes as a pull request: nobody pushes to `main`, deletes it or rewrites its history | A change nobody read | The ruleset (`pull_request`, `deletion`, `non_fast_forward`) |
| Nobody may bypass the rules, not even an administrator | A rule skipped in a hurry | The ruleset: its bypass list is empty |
| One approval, and a code owner's for each file the change touches | A change only its author read | The ruleset (`require_code_owner_review`), with `../CODEOWNERS` |
| The most recent push is approved by someone who didn't push it | A change slipped in after the approval, or approved by whoever pushed it | The ruleset (`require_last_push_approval`) |
| A new push dismisses the approvals before it | An approval of code that has since changed | The ruleset (`dismiss_stale_reviews_on_push`) |
| Every conversation is resolved | A question left unanswered | The ruleset (`required_review_thread_resolution`) |
| The registrar's office approves a change to what a student, a course or a person means, and to Planning's meanings | A word's meaning changed without the office that owns it | The ruleset's required reviewer rule, on the four conceptual models |
| The platform team and data governance both approve a change to these rules, the release, the bundle, `CODEOWNERS`, `AGENTS.md`, `agents/` or the owners | A rule loosened in the same change that relies on it | The ruleset's required reviewer rule, on those files |
| CI's two checks pass, on a branch that's up to date with `main` | A change that breaks the build, or only worked on an older `main` | The ruleset (`required_status_checks`, strict), from GitHub Actions only |
| Merging doesn't release: the release waits for a release approver | A change in production that no second person saw | The environment (`production.json`, `reviewers`) |
| Whoever started the release can't approve it, even a release approver | One person releasing their own change | The environment (`prevent_self_review`) |
| Only `main` deploys to production | A branch released before its review | The environment's one deployment branch, `main` |
| The release signs in to Databricks with no secret, and only from that approved job | A secret that leaks, or another job writing to production | The federation policy on the release's service principal: this repository's jobs in `production`, nothing else |
| Production is deployed from `main` only, and its job runs as the release | A deploy from a branch, or a build under someone else's rights | `../databricks.yml` (`mode: production`, `git.branch: main`, `run_as`) |
| The release builds production; the agents only read it | An agent changing production | Grants on Databricks: the release builds in the production catalog, and the agents' groups only read it (`../AGENTS.md`, *Your access*) |

## Who approves what

People only. An owner is a person or a team of people: `CODEOWNERS` names users and teams, and the required reviewer
rule and the environment name teams. An agent can't be either, so no approval these rules ask for can come from an
agent. An agent that reviews, like the governance review agent (`../skills/review-for-governance/`), posts its review
as a comment, for reference: it neither approves nor blocks.

| A change to | Approved by |
|---|---|
| Any file | One of its code owners (`../CODEOWNERS`, written from the owners in the project's metadata): Jun Park for the code |
| What a student, a course or a person means (`_student__conceptual.yml`, `_course__conceptual.yml`, `_person__conceptual.yml`), and Planning's meanings (`_planning__conceptual.yml`) | The registrar's office, too |
| These rules, the release, the bundle, `CODEOWNERS`, `AGENTS.md`, `agents/`, the owners register and the script that writes `CODEOWNERS` | The platform team and data governance, too |
| What runs in production | A release approver who didn't start the release: Noor Rahman, today |

When Jun opens a pull request, the same rules ask someone else to approve it.

## The teams

The ruleset and the environment name GitHub's teams by id, as GitHub exports them. The ids are this example's; in
your organisation, put your teams' (`gh api orgs/<org>/teams/<team> --jq .id`). A team's approval counts only if the
team has write access to the repository.

| Team | Who | Id in the files |
|---|---|---|
| `registrar` | Mei Tanaka's office | 7300101 |
| `data-governance` | Yusuf Demir, data governance lead | 7300102 |
| `platform` | Sam Okafor's platform team | 7300103 |
| `release-approvers` | Noor Rahman, the only member today | 7300104 |

## Merging isn't releasing

An agent doesn't merge: its rules say so (`../AGENTS.md`). GitHub's rules stop anyone pushing to `main`, and make
sure every approval they ask for comes from a person; but no rule GitHub documents takes the merge alone away from an
App that may push to its own branches. So the line that holds comes next: a merge into `main` only starts the
release, and the release waits at `production` until a release approver who didn't start it says yes. Until then the
job doesn't run, and without it nothing can sign in to Databricks as the release.

## Setting it up in the project's own repository

1. **The ruleset.** In the repository's settings, under *Rules* and *Rulesets*, import `rulesets/main.json`. Or:
   `gh api -X POST repos/<owner>/<repo>/rulesets --input rulesets/main.json`.
2. **The environment.** `gh api -X PUT repos/<owner>/<repo>/environments/production --input production.json`, then
   its one deployment branch:
   `gh api -X POST repos/<owner>/<repo>/environments/production/deployment-branch-policies -f name=main -f type=branch`.
3. **The release.** Copy `release.yml` to `.github/workflows/release.yml`, and set four repository variables, none
   of them secret: `DATABRICKS_HOST`, `RELEASE_CLIENT_ID` (the application ID of the release's service principal),
   `PRODUCTION_CATALOG` and `PRODUCTION_WAREHOUSE_ID`.
4. **On Databricks**, an admin makes a service principal, "release", with a federation policy for GitHub Actions:
   issuer `https://token.actions.githubusercontent.com`, audience the Databricks account's ID, subject
   `repo:<owner>/<repo>:environment:production`. It gets what the build needs in the production catalog
   (`USE CATALOG` and `CREATE SCHEMA`, so it owns the schemas the build makes there), and it joins
   `personal_data_readers`, since the identity that runs dbt must be in it (DEC-PRJ-13). No agent's group gets
   anything but reading.
5. **`CODEOWNERS`** goes in `.github/`, as its header says.

## What it needs

- An organisation on GitHub: teams, and the required reviewer rule, need one.
- An environment's required reviewers: on every plan for a public repository; for a private one, GitHub Enterprise.
- The Databricks CLI, 0.218.0 or above, for bundles.

## Sources, checked on 5 November 2026

- GitHub Docs: *Available rules for rulesets*; *About rulesets*; REST *Repository rules*; *About code owners*;
  *Approving a pull request with required reviews*; *Managing environments for deployment*; REST *Deployment
  environments*; the *OpenID Connect* reference.
- Databricks documentation: *Declarative Automation Bundles*; *Deployment modes*; *Specify a run identity*;
  *Substitutions and variables*; *dbt task for jobs*; *Enable workload identity federation for GitHub Actions*.
