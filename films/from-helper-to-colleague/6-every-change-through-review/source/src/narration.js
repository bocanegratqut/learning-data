// Every change through review, the sixth film of From helper to colleague, the third series on AI agents in data work. One line per id; the film re-times itself to the voice.
// "gap": the beat after each line. "say": how the voice reads a line, when it differs from the caption (numbers in words). The few longer stops are in breath.js.
const NARR={
"first":{"name":"The agent's first pull request","lead":1.6,"tail":1.0,"vo":[
 {"id":"place","gap":0.8,"text":"Today, at the university. On Wednesday, Planning's agent opened its first pull request."},
 {"id":"what","gap":0.8,"text":"A pull request is a change put forward for people to read, and to accept or not."},
 {"id":"column","gap":0.8,"text":"This one adds each student's study mode, on campus or online, to Planning's census-day count."},
 {"id":"library","gap":0.8,"text":"It answers the library's question: the 386 who study online can't come in for a book.","say":"It answers the library's question: the three hundred and eighty-six who study online can't come in for a book."},
 {"id":"everyone","gap":0.8,"text":"But that count is the one everyone reads: 18,412 students, for the board and for the government's report.","say":"But that count is the one everyone reads: eighteen thousand, four hundred and twelve students, for the board and for the government's report."},
 {"id":"wrong","gap":0.8,"text":"A change that dropped or doubled students would move that number, and everyone would plan with a wrong one."},
 {"id":"own","gap":0.8,"text":"And an agent that could approve its own change could put it there before anyone had looked."},
 {"id":"change","gap":0.8,"text":"That had to change before the agent started."},
 {"id":"review","gap":0.8,"text":"Now every change, an agent's or a person's, goes through review, and the rules are set in the tools."},
 {"id":"path","gap":0.8,"text":"The agent hands in its evidence. Checks build what changed, and a diff shows the data before and after."},
 {"id":"release","gap":0.8,"text":"Another agent reviews it, for reference. The owners approve it, and a second person releases it to production, where everyone reads it."},
 {"id":"saw","gap":0.8,"text":"So Jun, Mei and Noor saw exactly what would change: one new column, and no count moved."},
 {"id":"answer","gap":0.8,"text":"The board's number stays 18,412, and the library has its answer: 386 online, 18,026 on campus.","say":"The board's number stays eighteen thousand, four hundred and twelve, and the library has its answer: three hundred and eighty-six online, eighteen thousand and twenty-six on campus."},
 {"id":"data","gap":0.8,"text":"And for data: an agent proposes, a person releases, and nothing reaches production that a person hasn't seen."}]},
"hands":{"name":"What the agent hands in","lead":1.0,"tail":1.0,"vo":[
 {"id":"ticket","gap":0.8,"text":"On Tuesday, Clara asked for the column, and Mei wrote what study mode means into the glossary, before any code."},
 {"id":"branch","gap":0.8,"text":"The agent worked on its own branch, in its own development schema. Production, it can only read."},
 {"id":"stage","gap":0.8,"text":"For this kind of task, it's at stage four: a contributor that proposes."},
 {"id":"tests","gap":0.8,"text":"Before the column, it wrote two tests: every student has one study mode, and the two add up to 18,412.","say":"Before the column, it wrote two tests: every student has one study mode, and the two add up to eighteen thousand, four hundred and twelve."},
 {"id":"says","gap":0.8,"text":"Its pull request says what changed and why, copies Mei's words with where they come from, and shows its evidence: counts, never names."}]},
"checks":{"name":"What changed, and what it touches","lead":1.0,"tail":1.0,"vo":[
 {"id":"only","gap":0.8,"text":"The checks don't rebuild the whole project. They build what changed, and everything that depends on it."},
 {"id":"here","gap":0.8,"text":"Here, that's the census-day count, and after it the count by level for the government's report. Every test passes."},
 {"id":"impact","gap":0.8,"text":"The impact report: the change only adds a column, so nothing that reads the table breaks."},
 {"id":"diff","gap":0.8,"text":"Then the diff: the same table, from the agent's branch and from main, which production is built from, compared student by student."},
 {"id":"none","gap":0.8,"text":"No student is in only one of them. No value has changed. One column is new."},
 {"id":"sees","gap":0.8,"text":"So a reviewer sees what the change does to the data, not only to the code."}]},
"review":{"name":"An agent's review, for reference","lead":1.0,"tail":1.0,"vo":[
 {"id":"second","gap":0.8,"text":"Next, a second agent reads the pull request: the governance review agent, Yusuf's, with a name of its own."},
 {"id":"rules","gap":0.8,"text":"It checks governance's rules: an owner, words from the glossary with their source, a class on every column."},
 {"id":"missing","gap":0.8,"text":"One thing is missing: the new column doesn't say whether it can identify a person."},
 {"id":"suggests","gap":0.8,"text":"It suggests none, with its evidence: two values in 18,412 rows, and no email, ID or name.","say":"It suggests none, with its evidence: two values in eighteen thousand, four hundred and twelve rows, and no email, I D or name."},
 {"id":"comment","gap":0.8,"text":"It posts its review as a comment. It can't approve, and it can't block: its review is only for reference."},
 {"id":"clara","gap":0.8,"text":"Clara, who owns the count, decides: none. The planning agent adds it, in a second push."},
 {"id":"together","gap":0.8,"text":"Two agents worked together only through the pull request, and a person decided between them."}]},
"rules":{"name":"Rules that hold for everyone","lead":1.0,"tail":1.0,"vo":[
 {"id":"earlier","gap":0.8,"text":"In Plan, define the check, do, check, Jun reviewed an agent's work and Noor approved it. These rules make that hold."},
 {"id":"main","gap":0.8,"text":"They're set on main, and nobody can skip them, not even an administrator."},
 {"id":"pr","gap":0.8,"text":"Nobody changes main directly: every change comes as a pull request."},
 {"id":"owners","gap":0.8,"text":"Every file has owners, written from the project's metadata: Jun for the code, Mei's office for what a student word means."},
 {"id":"person","gap":0.8,"text":"An owner is a person, or a team of people. An agent can't be one, so its approval never counts."},
 {"id":"own","gap":0.8,"text":"Nobody can approve their own pull request, and the latest push must be approved by someone who didn't push it."},
 {"id":"again","gap":0.8,"text":"So after the agent's second push, Jun approves the code, and Mei the meaning."},
 {"id":"jun","gap":0.8,"text":"When Jun opens a pull request, the same rules ask someone else to approve it."}]},
"release":{"name":"A person releases","lead":1.0,"tail":1.0,"vo":[
 {"id":"merge","gap":0.8,"text":"Approved, the change can go into main. Jun merges it; the agents don't merge. And merging isn't the release."},
 {"id":"waits","gap":0.8,"text":"The release waits at an environment called production, until a release approver says yes."},
 {"id":"noor","gap":0.8,"text":"Noor approves. Whoever starts a release can't approve it, even an approver."},
 {"id":"signs","gap":0.8,"text":"Only then can the release sign in to Databricks, as its own service principal, with no secret to steal."},
 {"id":"bundle","gap":0.8,"text":"It deploys the project as a bundle, and runs the build in production."},
 {"id":"reads","gap":0.8,"text":"The planning agent's own identity only reads production. Writing there is the release's job, after a person's yes."}]},
"close":{"name":"An agent proposes, a person releases","lead":1.0,"tail":1.0,"vo":[
 {"id":"thursday","gap":0.8,"text":"On Thursday morning, the board's number is 18,412, and the library sees 386 students online.","say":"On Thursday morning, the board's number is eighteen thousand, four hundred and twelve, and the library sees three hundred and eighty-six students online."},
 {"id":"path","gap":0.8,"text":"Every change takes the same path: evidence, checks, a diff, a review for reference, the owners' approval, a second person's release."},
 {"id":"both","gap":0.8,"text":"For agents, as for people."},
 {"id":"lesson","gap":0.8,"text":"An agent proposes. A person releases."}]}
};
