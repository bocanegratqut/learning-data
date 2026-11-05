/* ===== An agent with its own badge: the scenes, chapter by chapter =====
   Each chapter is a run of shots (ag_shots): the lab, painted once, a slow camera, and what's drawn live. Times come from the cues
   (c.<line>, when each line starts) and from the words of the lines (wAt), so the pictures stay with the voice. Every shot is in the
   lab, one room: from shot to shot and chapter to chapter the camera glides on from where it is, what stays stays put, and only what
   changes fades. A later moment, with other people, another agent or another page of cards, is marked later:true, so what was there
   leaves before what comes later comes in, through the bare room; that way Jun's helper and the planning agent, which look alike,
   are never seen in one place at once. */

/* ---------------------------------------------------------------- pieces the scenes share */
// where the agent stands when it has the room to itself (the chapters on signing in, its place and its logs): the left, where a
// person stands in the room's usual shot
const OB_AL={x:330,y:430,R:130,r:68};
// two agents side by side, on the day of the switch: the planning agent, and the census agent working on
const OB_PA={x:1010,y:430,R:130,r:68},OB_CA={x:1560,y:430,R:130,r:68};
// a card of rows, each with a tick once it's checked (the policy on the agent's service principal, the token service)
function ob_checks(ctx,x,y,w,kick,rows,o){o=o||{};const a=o.a==null?1:o.a,h=28+38+(o.title?46:4)+rows.length*52+18;if(a<=0)return{x,y,w,h};ctx.save();ctx.globalAlpha*=a;
  if(o.k!=null)ag_about(ctx,x+w/2,y+h/2,lerp(0.6,1,o.k));ag_box(ctx,x,y,w,h,22,{edge:o.edge||AG.blue,edgeA:0.6});
  ag_T(ctx,kick.toUpperCase(),x+28,y+50,{w:700,size:28,ls:4,col:AG.blue});if(o.title)ag_T(ctx,o.title,x+28,y+96,{w:700,size:30});
  rows.forEach((r,i)=>{const ry=y+(o.title?150:108)+i*52,ra=r[1]==null?1:r[1];if(ra<=0)return;withA(ctx,ra,()=>{
    const tk=r[2]||0;if(tk>0)withA(ctx,tk,()=>ag_tick(ctx,x+44,ry-10,24,rgba(AG.green,1),4));ag_T(ctx,r[0],x+76,ry,{w:600,size:28});});});
  ctx.restore();return{x,y,w,h};}
// a pill whose left edge is at x (pills are drawn about their middle)
function ob_pillL(ctx,x,y,text,t,t0,t1,o){o=o||{};const w=ag_tw(ctx,text,{w:700,size:28})+(o.icon?96:56);return ob_pillAt(ctx,x+w/2,y,text,t,t0,t1,o);}
// the changes of these days, as a log shows them: the planning agent's first pull request, the census agent's, and one of Jun's own
const OB_PR="Add study mode to the census-day students";
const OB_ROWS=[{text:OB_PR,who:"planning-agent[bot]",col:AG.violet},{text:"Check the census-day count",who:"census-agent[bot]",col:AG.violet},
  {text:"Tidy the faculty names",who:"Jun Park",col:AG.ink}];
// the planning agent's application ID, as Databricks' tables name its service principal (shortened, as the films show an ID)
const OB_ID="4f1c9a2e-…";

// Jun, his helper on his sign-in, and the switch that would stop it: Jun's own sign-in (off: o.off 0 to 1, and its words)
function ob_onJun(x,tt,o){o=o||{};const off=o.off||0;
  ob_asOne(x,o.agentA==null?1:o.agentA,bx=>ob_agentWith(bx,tt,{think:0.3*(1-off),badge:"Jun Park",grey:off,off:"stopped",tag:"Jun's helper",tk:o.tk,bk:o.bk}));
  ob_person(x,"jun",tt,{});ag_roomLight(x,1);ob_personCard(x,"jun",o.card==null?1:o.card);
  ob_switch(x,1296,200,570,"Jun Park's sign-in","and his helper's",1-off,{a:o.swA==null?1:o.swA,k:o.swK});}
// the day of the switch: the planning agent stopped (off 0 to 1), the census agent working on (its pill from t0)
function ob_twoAgents(x,tt,off,t0){
  ob_agentWith(x,tt,Object.assign({},OB_PA,{badge:"planning agent",grey:off,off:"stopped"}));
  ob_agentWith(x,tt,Object.assign({},OB_CA,{badge:"census agent",think:0.8}));
  ob_pillAt(x,OB_CA.x,760,"census agent · at work",tt,t0,null,{col:AG.green,icon:"tick"});}

/* ---------------------------------------------------------------- 1 · Whose change was that? */
scene("whose",(ctx,S,t,sc)=>{const c=sc.cues,P=ob_once(sc,"P",()=>({col:wAt(sc,"place","a new column"),fil:wAt(sc,"place","a filter"),
    helper:wAt(sc,"helper","Jun Park's helper"),editor:wAt(sc,"helper","in his editor"),sign:wAt(sc,"helper","his own sign-in"),hname:wAt(sc,"helper","his name"),rights:wAt(sc,"helper","his rights"),
    agent:wAt(sc,"monday","a new agent"),pa:wAt(sc,"monday","the planning agent"),owned:wAt(sc,"monday","owned by Clara"),answers:wAt(sc,"monday","answers for"),
    trusted:wAt(sc,"auditors","can be trusted"),n214:wAt(sc,"which","two hundred"),q:wAt(sc,"which","which had an agent"),
    said:wAt(sc,"jun","said Jun Park"),hist:wAt(sc,"jun","the code's history"),qlog:wAt(sc,"jun","log of queries"),
    days:wAt(sc,"days","two days"),nine:wAt(sc,"days","for nine"),fully:wAt(sc,"wrong","couldn't fully answer"),wrong:wAt(sc,"wrong","was wrong"),
    ask:wAt(sc,"wrong","who to ask"),check:wAt(sc,"wrong","what else to check"),sj:wAt(sc,"stop","stop Jun"),noacc:wAt(sc,"stop","no access of its own"),
    own:wAt(sc,"badge","a badge of its own"),every:wAt(sc,"badge","in every tool"),
    dbx:wAt(sc,"three","Databricks"),gh:wAt(sc,"three","GitHub"),dbt:wAt(sc,"three","dbt"),role:wAt(sc,"three","its rights from its role"),secret:wAt(sc,"three","no secret"),
    bot:wAt(sc,"since","says planning agent bot"),query:wAt(sc,"since","every query"),
    ten:wAt(sc,"tried","for ten minutes"),stopped:wAt(sc,"tried","the planning agent stopped"),jun2:wAt(sc,"tried","and Jun"),lucia:wAt(sc,"tried","Lucía"),census:wAt(sc,"tried","the census agent"),
    one:wAt(sc,"ask","one search"),nottwo:wAt(sc,"ask","not two days"),who:wAt(sc,"data","who made it"),checked:wAt(sc,"data","can be checked"),stoppd:wAt(sc,"data","stopped")}));
  // the year's 214 changes, on the wall's right: every one says Jun, then Jun goes through them from memory, and nine stay amber;
  // drawn the same in every shot that shows them, so they stay put as the cards round them change
  const TX=1260,TY=250;
  const tiles=(x,tt)=>{ag_label(x,TX,TY-30,"This year · 214 changes",{col:AG.kick});
    ob_tiles(x,TX,TY,{t:tt,who:ag_in(tt,P.said,0.8),sort:clamp((tt-P.days-0.2)/(P.nine-P.days+0.6),0,1),pulse:ag_in(tt,P.nine,0.5)});
    ob_pillL(x,TX,TY+376,"his helper's",tt,P.nine-0.4,null,{col:AG.violet});ob_pillL(x,TX+262,TY+376,"his own",tt,P.nine-0.2,null,{col:AG.ink});
    ob_pillL(x,TX,TY+456,"9 · not sure",tt,P.nine+0.1,null,{col:AG.amber,icon:"warn"});};
  ag_shots(ctx,S,t,sc.dur,[
    // today, at the university: Lucía, in Planning, and Planning's tickets, a new column and a filter
    {at:0,place:"obLab",keys:[[0,960,540,1.04],[P.col-0.4,960,540,1]],push:0.015,draw:(x,tt)=>{
      ob_person(x,"lucia",tt,{});ag_roomLight(x,1);ob_corner(x,"Today · the university",ag_in(tt,0.4,0.6));ob_personCard(x,"lucia",ag_in(tt,0.9,0.6));
      ob_ticket(x,1180,190,620,{kick:"Planning · ticket",title:"Add study mode",lines:["a new column"],a:ag_in(tt,P.col,0.4),k:ag_spr(tt,P.col)});
      ob_ticket(x,1180,420,620,{kick:"Planning · ticket",title:"Leave out test records",lines:["a filter"],a:ag_in(tt,P.fil,0.4),k:ag_spr(tt,P.fil)});}},
    // all year they went to Jun's helper, a coding agent in his editor, on his sign-in: it wears his badge (later:true: Lucía and the
    // tickets leave, then Jun and his helper come in)
    {later:true,at:c.helper,place:"obLab",keys:[[c.helper,960,540,1]],push:0.02,draw:(x,tt)=>{
      ob_onJun(x,tt,{agentA:ag_in(tt,P.helper-0.3,0.5),card:ag_in(tt,c.helper+0.3,0.5),tk:(tt-P.helper)/0.8,bk:(tt-P.sign)/0.9,swA:0});
      ob_card(x,1296,200,540,{kick:"Where it works",title:"in Jun's editor"},{a:ag_in(tt,P.editor,0.5),k:ag_spr(tt,P.editor)});
      ob_pillL(x,1296,520,"name · Jun Park",tt,P.hname,null,{col:AG.ink});ob_pillL(x,1296,600,"rights · all of Jun's",tt,P.rights,null,{col:AG.ink});}},
    // since Monday they go to the planning agent, owned by Clara, who answers for it; its name on a paper tag for now (later:true: Jun
    // and his helper leave, then Clara and the planning agent come in)
    {later:true,at:c.monday,place:"obLab",keys:[[c.monday,960,540,1]],push:0.02,draw:(x,tt)=>{
      ob_asOne(x,ag_in(tt,P.agent,0.5),bx=>ob_agentWith(bx,tt,{think:0.3,name:"planning agent",nameA:ag_in(tt,P.pa,0.4),tag:"owner · Clara Jensen",tk:(tt-P.owned)/0.8,dx:-260}));
      ob_person(x,"clara",tt,{});ag_roomLight(x,1);ob_personCard(x,"clara",ag_in(tt,c.monday+0.3,0.5));ob_corner(x,"Since Monday",ag_in(tt,c.monday+0.2,0.5));
      ob_pillL(x,1296,300,"answers for what it does",tt,P.answers,null,{col:AG.blue});}},
    // October: the auditors, and their question about the year's 214 changes (later:true: Clara and the agent leave, then Jun comes in)
    {later:true,at:c.auditors,place:"obLab",keys:[[c.auditors,960,540,1]],push:0.02,draw:(x,tt)=>{
      ob_person(x,"jun",tt,{});ag_roomLight(x,1);ob_personCard(x,"jun",ag_in(tt,c.auditors+0.3,0.5));ob_corner(x,"October",ag_in(tt,c.auditors+0.2,0.5));
      ob_card(x,476,250,660,{kick:"The university's auditors",title:"Can its records be trusted?"},{a:ag_in(tt,P.trusted-0.8,0.5),k:ag_spr(tt,P.trusted-0.8)});
      ob_card(x,476,430,660,{kick:"Their question",title:"Which of the 214 changes had an agent drafted?"},{a:ag_in(tt,P.q,0.5),k:ag_spr(tt,P.q),edge:AG.violet});
      withA(x,ag_in(tt,P.n214,0.6),()=>tiles(x,tt));}},
    // every one said Jun Park: in the code's history and in the platform's log of queries (Jun, the corner and the tiles stay)
    {at:c.jun,place:"obLab",keys:[[c.jun,960,540,1]],push:0.02,draw:(x,tt)=>{
      ob_person(x,"jun",tt,{});ag_roomLight(x,1);ob_personCard(x,"jun",1);ob_corner(x,"October",1);tiles(x,tt);
      ob_log(x,476,240,700,"The code's history",null,[{when:"12 Mar",who:"Jun Park"},{when:"3 Jun",who:"Jun Park"},{when:"21 Sep",who:"Jun Park"}],{a:ag_in(tt,P.hist,0.5),k:ag_spr(tt,P.hist)});
      ob_log(x,476,520,700,"The platform's query log",null,[{when:"12 Mar",who:"jun.park@uni.example"},{when:"3 Jun",who:"jun.park@uni.example"},{when:"21 Sep",who:"jun.park@uni.example"}],
        {a:ag_in(tt,P.qlog,0.5),k:ag_spr(tt,P.qlog)});}},
    // two days, from memory: he sorts them, his helper's and his own, and nine he can't place
    {at:c.days,place:"obLab",keys:[[c.days,960,540,1]],push:0.02,draw:(x,tt)=>{
      ob_person(x,"jun",tt,{});ag_roomLight(x,1);ob_personCard(x,"jun",1);ob_corner(x,"October",1);tiles(x,tt);
      ob_card(x,476,250,520,{kick:"Jun, from memory",title:"two days"},{a:ag_in(tt,P.days,0.5),k:ag_spr(tt,P.days)});}},
    // so the university couldn't fully answer; and if one of the nine was wrong: who to ask, what else to check?
    {at:c.wrong,place:"obLab",keys:[[c.wrong,960,540,1]],push:0.02,draw:(x,tt)=>{
      ob_person(x,"jun",tt,{});ag_roomLight(x,1);ob_personCard(x,"jun",1);ob_corner(x,"October",1);tiles(x,tt);
      ob_card(x,476,250,520,{kick:"The university's answer",title:"not complete"},{a:ag_in(tt,P.fully,0.5),k:ag_spr(tt,P.fully),edge:AG.amber});
      ob_pillL(x,476,470,"who to ask?",tt,P.ask,null,{col:AG.amber});ob_pillL(x,476,550,"what else to check?",tt,P.check,null,{col:AG.amber});}},
    // and to stop the helper, they'd have had to stop Jun: his sign-in is its only one; then a veil (Jun stays; the tiles go, his
    // helper and the switch come in)
    {at:c.stop,place:"obLab",keys:[[c.stop,960,540,1]],push:0.02,draw:(x,tt)=>{const off=ag_in(tt,P.sj,0.6);
      ob_onJun(x,tt,{off,agentA:ag_in(tt,c.stop+0.3,0.5),swA:ag_in(tt,c.stop+0.5,0.5),swK:ag_spr(tt,c.stop+0.5)});
      ob_pillL(x,1296,520,"Jun stops too",tt,P.sj+0.3,null,{col:AG.amber,icon:"warn"});
      ob_pillL(x,1296,600,"its own access · none",tt,P.noacc,null,{col:AG.amber});
      ag_veil(x,S,0.55*ag_in(tt,c.change+0.1,0.8));}},
    // so Sam gives the planning agent a badge of its own: the paper tag goes, the badge drops in its place (later:true: Jun, his helper
    // and the veil leave, then Sam and the planning agent come in)
    {later:true,at:c.badge,place:"obLab",keys:[[c.badge,960,540,1]],push:0.02,draw:(x,tt)=>{
      ob_agentWith(x,tt,{think:0.2,name:"planning agent",nameA:1-ag_in(tt,P.own,0.4),badge:"planning agent",bk:(tt-P.own-0.2)/0.9,tag:"owner · Clara Jensen",dx:-260});
      ob_person(x,"sam",tt,{});ag_roomLight(x,1);ob_personCard(x,"sam",ag_in(tt,c.badge+0.3,0.5));
      ob_pillL(x,1296,300,"in every tool",tt,P.every,c.three,{col:AG.blue});}},
    // its own name in Databricks, GitHub and dbt; its rights from its role; no secret it can see or leak (Sam and the agent stay; the
    // badge's card comes in on the right)
    {at:c.three,place:"obLab",keys:[[c.three,960,540,1]],push:0.02,draw:(x,tt)=>{
      ob_agentWith(x,tt,{think:0.2,badge:"planning agent",tag:"owner · Clara Jensen",dx:-260});
      ob_person(x,"sam",tt,{});ag_roomLight(x,1);ob_personCard(x,"sam",1);
      ob_idCard(x,1296,170,570,[["Databricks","service principal",ag_in(tt,P.dbx,0.4)],["GitHub","planning-agent[bot]",ag_in(tt,P.gh,0.4),0,true],
        ["dbt","signs in as it",ag_in(tt,P.dbt,0.4)]],{name:"planning agent",owner:"Clara Jensen",a:ag_in(tt,c.three+0.2,0.5),k:ag_spr(tt,c.three+0.2)});
      ob_pillL(x,1296,640,"rights from its role",tt,P.role,null,{col:AG.blue});
      ob_pillL(x,1296,720,"no secret it can see or leak",tt,P.secret,null,{col:AG.blue,icon:"lock"});}},
    // since Monday, every change it makes says planning-agent[bot], every query names it (the card goes, two logs come in)
    {at:c.since,place:"obLab",keys:[[c.since,960,540,1]],push:0.02,draw:(x,tt)=>{
      ob_agentWith(x,tt,{think:0.2,badge:"planning agent",tag:"owner · Clara Jensen",dx:-260});
      ob_person(x,"sam",tt,{});ag_roomLight(x,1);ob_personCard(x,"sam",1);ob_corner(x,"Since Monday",ag_in(tt,c.since+0.2,0.5));
      ob_log(x,1296,170,570,"GitHub · commits",null,[{text:"Add study mode",who:"planning-agent[bot]",col:AG.violet,hl:ag_in(tt,P.bot,0.5)}],{a:ag_in(tt,P.bot-0.6,0.5),k:ag_spr(tt,P.bot-0.6)});
      ob_log(x,1296,400,570,"Query history",null,[{who:OB_ID,tag:"planning agent",col:AG.violet,hl:ag_in(tt,P.query+0.6,0.5)}],{a:ag_in(tt,P.query,0.5),k:ag_spr(tt,P.query)});}},
    // Wednesday: Sam tries the switch; for ten minutes the planning agent stops, and Jun, Lucía and the census agent work on
    // (later:true: Sam's moment with one agent leaves, then the two agents come in)
    {later:true,at:c.tried,place:"obLab",keys:[[c.tried,960,540,1]],push:0.02,draw:(x,tt)=>{const off=ag_in(tt,P.stopped-0.2,0.6);
      ob_twoAgents(x,tt,off,P.census);
      ob_person(x,"sam",tt,{});ag_roomLight(x,1);ob_personCard(x,"sam",ag_in(tt,c.tried+0.3,0.5));ob_corner(x,"Wednesday",ag_in(tt,c.tried+0.2,0.5));
      ob_switch(x,476,330,380,"planning agent","in every tool",1-off,{a:ag_in(tt,c.tried+0.5,0.5),k:ag_spr(tt,c.tried+0.5)});
      ob_pillL(x,476,540,"10 minutes",tt,P.ten,null,{col:AG.blue,icon:"loop"});
      ob_pillL(x,476,700,"Jun Park · at work",tt,P.jun2,null,{col:AG.green,icon:"tick"});
      ob_pillL(x,476,780,"Lucía Ortega · at work",tt,P.lucia,null,{col:AG.green,icon:"tick"});}},
    // if the auditors ask again: one search, not two days (later:true: the switch's moment leaves, then the search comes in)
    {later:true,at:c.ask,place:"obLab",keys:[[c.ask,960,540,1]],push:0.02,draw:(x,tt)=>{ag_roomLight(x,1);
      ag_label(x,360,262,"If the auditors ask again",{col:AG.kick,a:ag_in(tt,c.ask+0.1,0.5)});
      ob_search(x,360,300,1200,"is:pr author:app/planning-agent",{a:ag_in(tt,c.ask+0.2,0.5),p:(tt-c.ask-0.5)/1.4});
      ob_pillL(x,360,470,"one search",tt,P.one,null,{col:AG.green,icon:"tick"});ob_pillL(x,640,470,"not two days",tt,P.nottwo,null,{col:AG.mut});}},
    // and for data: every change says who made it, person or agent, so it can be checked and stopped (later:true: the search leaves,
    // then the log comes in; it all goes as the title comes)
    {later:true,at:c.data,place:"obLab",keys:[[c.data,960,540,1]],push:0.02,draw:(x,tt)=>withA(x,1-ag_in(tt,c.breath,0.8),()=>{ag_roomLight(x,1);
      ob_log(x,360,190,1200,"Every change · who made it",null,OB_ROWS.map((r,i)=>Object.assign({},r,{tag:i===2?"person":"agent",a:ag_in(tt,P.who+i*0.3,0.4)})),
        {a:ag_in(tt,c.data+0.2,0.5),k:ag_spr(tt,c.data+0.2)});
      ob_pillL(x,360,640,"can be checked",tt,P.checked,null,{col:AG.green,icon:"tick"});ob_pillL(x,680,640,"can be stopped",tt,P.stoppd,null,{col:AG.blue});})}
  ],0.6);
  ag_title(ctx,S,t,c.breath,"An agent with its own badge","one identity per agent","FILM 5 OF 7 · FROM HELPER TO COLLEAGUE");});

/* ---------------------------------------------------------------- 2 · One name in every tool */
scene("name",(ctx,S,t,sc)=>{const c=sc.cues,P=ob_once(sc,"P",()=>({every:wAt(sc,"one","one name in every tool"),
    sp:wAt(sc,"dbx","a service principal"),soft:wAt(sc,"dbx","made for software"),census:wAt(sc,"dbx","census agent"),
    app:wAt(sc,"gh","an App"),bot:wAt(sc,"gh","reads planning agent bot"),same:wAt(sc,"dbt","that same service principal"),
    one:wAt(sc,"group","one by one"),grp:wAt(sc,"group","a group for its role"),
    only:wAt(sc,"member","only member"),read:wAt(sc,"member","read production"),build:wAt(sc,"member","build in development"),model:wAt(sc,"member","call its model"),
    second:wAt(sc,"second","a second agent"),same2:wAt(sc,"second","the same rights"),
    reg:wAt(sc,"direct","registrar agent"),job:wAt(sc,"direct","one agent with one job"),role:wAt(sc,"direct","A role others may fill"),
    nothing:wAt(sc,"nothing","nothing is granted"),change:wAt(sc,"nothing","change the role"),with:wAt(sc,"nothing","change with it")}));
  // the agent's badge card, its rows as each tool is named (drawn the same in every shot that shows it)
  const card=(x,tt,a)=>ob_idCard(x,1296,170,570,[["Databricks","service principal",ag_in(tt,P.sp,0.4),ag_io(tt,P.sp,c.gh,0.4)],
    ["GitHub","planning-agent[bot]",ag_in(tt,P.bot,0.4),ag_io(tt,P.bot,c.dbt,0.4),true],["dbt","the same service principal",ag_in(tt,P.same,0.4),ag_io(tt,P.same,c.group,0.4)]],
    {name:"planning agent",owner:"Clara Jensen",a});
  // the group and its grants, on the right: a slot for a second member from the start, as a role others may fill has
  const group=(x,tt,a)=>{const m2=ag_in(tt,P.second,0.5);
    ob_group(x,1296,150,570,"planning_contributors",[["planning agent",true],["a second agent",true,true,m2]],{n:2,a,k:ag_spr(tt,P.grp)});
    const hl=ag_io(tt,P.change,P.change+2.2,0.5);
    ob_grants(x,1296,430,570,"planning_contributors",[{text:"read production · names masked",lock:1,a:ag_in(tt,P.read,0.4),hl},{text:"build in development",a:ag_in(tt,P.build,0.4),hl},
      {text:"call its model",a:ag_in(tt,P.model,0.4),hl}],{a:a*ag_in(tt,P.read-0.3,0.5)});};
  ag_shots(ctx,S,t,sc.dur,[
    // a person has one name in every tool: Lucía's, in Databricks, GitHub and dbt (later:true: the title leaves first)
    {later:true,at:0,place:"obLab",keys:[[0,960,540,1]],push:0.02,draw:(x,tt)=>{
      ob_person(x,"lucia",tt,{});ag_roomLight(x,1);ob_personCard(x,"lucia",ag_in(tt,0.3,0.5));
      ob_idCard(x,476,200,740,[["Databricks","lucia.ortega@uni.example",ag_in(tt,P.every+0.2,0.4),0,true],["GitHub","lucia-ortega",ag_in(tt,P.every+0.5,0.4),0,true],
        ["dbt","her Databricks sign-in",ag_in(tt,P.every+0.8,0.4)]],{name:"Lucía Ortega",owner:"Planning",a:ag_in(tt,P.every-0.4,0.5),k:ag_spr(tt,P.every-0.4)});}},
    // now the planning agent does too: Sam, who set it up, and the agent's own card (later:true: Lucía leaves, then Sam comes in)
    {later:true,at:c.too,place:"obLab",keys:[[c.too,960,540,1]],push:0.02,draw:(x,tt)=>{
      ob_agentWith(x,tt,{think:0.2,badge:"planning agent",tag:"owner · Clara Jensen",dx:-260});
      ob_person(x,"sam",tt,{});ag_roomLight(x,1);ob_personCard(x,"sam",ag_in(tt,c.too+0.2,0.5));
      card(x,tt,ag_in(tt,c.too+0.4,0.5));
      ob_pillL(x,1296,650,"an identity for software",tt,P.soft,null,{col:AG.blue});
      ob_pillL(x,1296,730,"as the census agent has",tt,P.census,null,{col:AG.violet});}},
    // its rights don't come to it one by one: they come from its role's group, of which it's the only member (Sam and the agent stay;
    // the card goes; the group and its grants come in)
    {at:c.group,place:"obLab",keys:[[c.group,960,540,1]],push:0.02,draw:(x,tt)=>{
      ob_agentWith(x,tt,{think:0.2,badge:"planning agent",tag:"owner · Clara Jensen",dx:-260});
      ob_person(x,"sam",tt,{});ag_roomLight(x,1);ob_personCard(x,"sam",1);
      ob_grants(x,476,280,420,"planning agent",[{text:"one by one",no:true}],{a:ag_io(tt,P.one,c.direct-0.4,0.5)});
      group(x,tt,ag_in(tt,P.grp,0.5));
      ob_pillL(x,1296,800,"same rights, no more",tt,P.same2,c.direct-0.4,{col:AG.violet});
      // Mei's registrar agent: granted directly, one agent with one job; a role others may fill gets a group
      ob_card(x,476,280,420,{kick:"Registrar agent",title:"granted directly",sub:"one agent, one job"},{a:ag_io(tt,P.reg,c.nothing-0.4,0.5),k:ag_spr(tt,P.reg)});
      ob_pillL(x,1296,800,"a role others may fill",tt,P.role,c.nothing-0.4,{col:AG.blue});
      // nothing is granted to the agent itself: change the role, and its rights change with it
      ob_grants(x,476,280,420,"planning agent",[{text:"nothing",a:1}],{a:ag_in(tt,P.nothing,0.5)});
      ob_pillL(x,1296,800,"its rights follow the role",tt,P.with,null,{col:AG.blue});}}
  ],0.6);
  ob_kick(ctx,S,ag_in(t,0.6,0.6));});   // once the title has gone

/* ---------------------------------------------------------------- 3 · No secret to see or leak */
scene("secret",(ctx,S,t,sc)=>{const c=sc.cues,P=ob_once(sc,"P",()=>({secret:wAt(sc,"keys","a secret"),pw:wAt(sc,"keys","a password"),
    read:wAt(sc,"leak","can read"),log:wAt(sc,"leak","a log"),prompt:wAt(sc,"leak","a prompt"),anyone:wAt(sc,"leak","for anyone to use"),
    job:wAt(sc,"runs","a job in GitHub Actions"),pass:wAt(sc,"pass","a short-lived pass"),repo:wAt(sc,"pass","this repository"),env:wAt(sc,"pass","the environment"),
    main:wAt(sc,"main","the workflow on main"),branch:wAt(sc,"main","a change on a branch"),policy:wAt(sc,"check","a policy"),token:wAt(sc,"check","its own token"),
    key:wAt(sc,"ghkey","a private key"),vault:wAt(sc,"ghkey","in a vault"),signs:wAt(sc,"ghkey","signs with it"),
    svc:wAt(sc,"service","A small service"),jpass:wAt(sc,"service","the job's pass"),vsign:wAt(sc,"service","the vault sign"),
    one:wAt(sc,"token","one repository"),two:wAt(sc,"token","two permissions"),hour:wAt(sc,"token","for an hour"),never:wAt(sc,"token","never leaves"),
    holds:wAt(sc,"so","holds only passes"),end:wAt(sc,"so","end on their own"),none:wAt(sc,"so","no secret")}));
  const agent=(x,tt,o)=>{o=o||{};ob_agentWith(x,tt,Object.assign({},OB_AL,{think:o.think||0.2,badge:"planning agent",a:o.a}));};
  const arrow=(x,x0,y0,x1,y1,t0,tt)=>ob_line(x,x0,y0,x1,y1,clamp((tt-t0)/0.6,0,1),{col:AG.blue,lw:3});
  ag_shots(ctx,S,t,sc.dur,[
    // to sign in, software needs a secret; one an agent can read, it can leak, into a log or a prompt (later:true: Sam, the agent and
    // the group leave; then the agent comes in on the left, with the room to itself)
    {later:true,at:0,place:"obLab",keys:[[0,960,540,1]],push:0.02,draw:(x,tt)=>{agent(x,tt,{think:0.3});ag_roomLight(x,1);
      const sc_=ob_card(x,560,230,460,{kick:"To sign in",title:"a secret",sub:"a password or a key"},{a:ag_in(tt,P.secret,0.5),k:ag_spr(tt,P.secret),edge:AG.amber});
      ob_key(x,960,290,0.9,{a:ag_in(tt,P.pw+0.3,0.4)});
      [[P.log,1240,200,"a log","secret: ••••••••"],[P.prompt,1240,420,"a prompt","…and the key is ••••••••"]].forEach(([t0,cx,cy,k,s])=>{
        ob_line(x,1024,320,cx-8,cy+70,clamp((tt-t0+0.3)/0.6,0,1),{col:AG.amber,dash:[10,8],lw:3});
        const a=ag_in(tt,t0,0.4);if(a<=0)return;x.save();x.globalAlpha*=a;ag_about(x,cx+280,cy+65,lerp(0.6,1,ag_spr(tt,t0)));
        ag_box(x,cx,cy,560,130,22,{edge:AG.amber,edgeA:0.75});ag_T(x,k.toUpperCase(),cx+28,cy+50,{w:700,size:28,ls:4,col:AG.amber});
        ag_T(x,s,cx+28,cy+100,{w:500,size:28,f:"mono",col:AG.amber});x.restore();});
      ob_pillL(x,1240,700,"anyone can use it",tt,P.anyone,null,{col:AG.amber,icon:"warn"});}},
    // its runs: a job in GitHub Actions asks GitHub for a pass that says where it comes from; only the workflow on main may use the
    // environment; Databricks checks the pass against the policy on its service principal and hands back its own token
    // (the agent stays; the secret and its leaks go)
    {at:c.runs,place:"obLab",keys:[[c.runs,960,540,1]],push:0.02,draw:(x,tt)=>{agent(x,tt,{});ag_roomLight(x,1);
      ob_job(x,560,170,560,{a:ag_in(tt,P.job,0.5),k:ag_spr(tt,P.job),lock:ag_in(tt,P.main,0.5)});
      arrow(x,1124,286,1234,286,P.pass-0.3,tt);
      ob_pass(x,1240,170,600,{rows:[["from","this repository",ag_in(tt,P.repo,0.4),ag_io(tt,P.repo,P.repo+1.6,0.4)],["environment","planning-agent",ag_in(tt,P.env,0.4),ag_io(tt,P.env,P.env+1.6,0.4),true],
        ["lasts","minutes",ag_in(tt,P.env+0.9,0.4)]],run:clamp((tt-P.pass)/40,0,0.8),a:ag_in(tt,P.pass,0.5),k:ag_spr(tt,P.pass)});
      ob_pillL(x,560,470,"a branch can't borrow it",tt,P.branch,c.check-0.3,{col:AG.amber,icon:"warn"});
      arrow(x,1540,450,1540,494,P.policy-0.4,tt);
      ob_checks(x,1240,500,600,"Databricks · policy",[["the repository matches",1,ag_in(tt,P.policy+0.4,0.3)],["the environment matches",1,ag_in(tt,P.policy+0.8,0.3)]],
        {title:"on its service principal",a:ag_in(tt,P.policy-0.2,0.5),k:ag_spr(tt,P.policy-0.2)});
      arrow(x,1234,617,1126,617,P.token-0.3,tt);
      ob_pass(x,560,500,560,{kick:"Databricks token",rows:[["for","the planning agent"],["lasts","as long as the pass"]],run:clamp((tt-P.token)/40,0,0.8),
        a:ag_in(tt,P.token,0.5),k:ag_spr(tt,P.token)});
      arrow(x,556,560,470,516,P.token+0.8,tt);
      ob_pillL(x,560,800,"Databricks secrets · none",tt,c.nodbx+0.3,null,{col:AG.green,icon:"tick"});}},
    // on GitHub, the App's private key stays in a vault that signs with it and never shows it; the platform team's small service
    // checks the job's pass and has the vault sign; back comes a token for one repository, two permissions, an hour (later:true:
    // the Databricks side leaves, then GitHub's comes in)
    {later:true,at:c.ghkey,place:"obLab",keys:[[c.ghkey,960,540,1]],push:0.02,draw:(x,tt)=>{agent(x,tt,{});ag_roomLight(x,1);
      ob_vault(x,1340,480,440,{a:ag_in(tt,P.key,0.5),k:ag_spr(tt,P.key),glow:ag_io(tt,P.signs,P.signs+1.4,0.3)+ag_io(tt,P.vsign+0.3,P.vsign+1.8,0.3)});
      ob_pillAt(x,1560,800,"its App's private key",tt,P.key+0.3,c.service-0.2,{col:AG.blue});
      ob_checks(x,1240,170,600,"Token service",[["checks the job's pass",1,ag_in(tt,P.jpass+0.5,0.3)],["has the vault sign",1,ag_in(tt,P.vsign+0.6,0.3)]],
        {title:"run by the platform team",a:ag_in(tt,P.svc,0.5),k:ag_spr(tt,P.svc)});
      ob_pass(x,560,170,560,{kick:"The job's pass",rows:[["from","this repository"],["environment","planning-agent",1,0,true]],a:ag_in(tt,P.jpass-0.3,0.5),k:ag_spr(tt,P.jpass-0.3)});
      arrow(x,1124,283,1234,283,P.jpass+0.1,tt);arrow(x,1560,410,1560,474,P.vsign,tt);
      arrow(x,1236,400,1126,486,c.token-0.2,tt);
      ob_pass(x,560,490,560,{kick:"GitHub token",rows:[["repository","one",ag_in(tt,P.one,0.4)],["permissions","two",ag_in(tt,P.two,0.4)],["lasts","an hour",ag_in(tt,P.hour,0.4)]],
        run:clamp((tt-P.hour)/30,0,0.6),a:ag_in(tt,c.token,0.5),k:ag_spr(tt,c.token)});
      arrow(x,556,560,470,516,P.hour+0.6,tt);
      ob_pillAt(x,1560,800,"the key never leaves",tt,P.never,null,{col:AG.blue,icon:"lock"});}},
    // so the agent holds only passes that end on their own: no secret it can see or leak (later:true: the token's way leaves; then
    // its two passes, running out)
    {later:true,at:c.so,place:"obLab",keys:[[c.so,960,540,1]],push:0.02,draw:(x,tt)=>{agent(x,tt,{});ag_roomLight(x,1);
      [["Databricks token",230,0],["GitHub token",500,0.4]].forEach(([k,y,d])=>{const run=clamp((tt-P.end-d)/1.8,0,1),a=ag_in(tt,P.holds+d,0.5)*(1-ag_in(tt,P.end+d+1.8,0.5));
        ob_pass(x,560,y,520,{kick:k,rows:[["lasts",run<1?"till it ends":"ended"]],run:0.55+0.45*run,a,k:ag_spr(tt,P.holds+d)});});
      ob_pillL(x,1200,470,"no secret it can see or leak",tt,P.none,null,{col:AG.blue,icon:"lock"});}}
  ],0.6);
  ob_kick(ctx,S,1);});

/* ---------------------------------------------------------------- 4 · A place of its own */
scene("own",(ctx,S,t,sc)=>{const c=sc.cues,P=ob_once(sc,"P",()=>({where:wAt(sc,"where","where it may work"),place:wAt(sc,"where","a place of its own"),
    touch:wAt(sc,"where","can't touch"),br:wAt(sc,"branches","writes only to branches"),pr:wAt(sc,"branches","opens a pull request"),push:wAt(sc,"branches","can't push to main"),
    merge:wAt(sc,"merge","doesn't merge"),appr:wAt(sc,"merge","its approval never counts"),next:wAt(sc,"merge","The next film"),
    reads:wAt(sc,"dbx","reads production"),none:wAt(sc,"dbx","writes none of it"),mk:wAt(sc,"schemas","make schemas of its own"),layer:wAt(sc,"schemas","one for each layer"),
    marts:wAt(sc,"schemas","planning agent marts"),owns:wAt(sc,"owns","owns what it makes"),over:wAt(sc,"owns","written over"),passes:wAt(sc,"owns","no draft of its passes")}));
  const agent=(x,tt)=>ob_agentWith(x,tt,Object.assign({},OB_AL,{think:0.2,badge:"planning agent"}));
  ag_shots(ctx,S,t,sc.dur,[
    // its badge also says where it may work: a place of its own, where its drafts touch no one else's (the agent stays where the last
    // chapter left it; its passes go)
    {at:0,place:"obLab",keys:[[0,960,540,1]],push:0.02,draw:(x,tt)=>{agent(x,tt);ag_roomLight(x,1);
      ag_label(x,560,200,"Where it may work",{col:AG.kick,a:ag_in(tt,P.where,0.5)});
      const ia=ag_in(tt,P.place,0.5);const inner=ag_sandbox(x,1180,700,980,{depth:220,a:ia,label:"its own place · drafts only"});
      if(inner)[0,1].forEach(i=>ob_pillAt(x,inner.x+170+i*330,inner.y+110,"draft",tt,P.place+0.5+i*0.3,null,{col:AG.violet,icon:"draft"}));
      ob_pillL(x,560,300,"Jun's work · untouched",tt,P.touch,null,{col:AG.ink,icon:"lock"});ob_pillL(x,1040,300,"Lucía's work · untouched",tt,P.touch+0.3,null,{col:AG.ink,icon:"lock"});}},
    // in GitHub, its tool writes only to branches named agent/planning and opens a pull request; it can't push to main; it doesn't
    // merge, and its approval never counts where the rules ask for a person (later:true: the place leaves, then GitHub's branches)
    {later:true,at:c.branches,place:"obLab",keys:[[c.branches,960,540,1]],push:0.02,draw:(x,tt)=>{agent(x,tt);ag_roomLight(x,1);
      ag_label(x,560,200,"GitHub",{col:AG.kick,a:ag_in(tt,c.branches+0.2,0.5)});
      ob_branches(x,560,320,1260,{a:ag_in(tt,c.branches+0.3,0.5),br:(tt-P.br)/1.2,pr:(tt-P.pr)/1.0,push:(tt-P.push)/1.0});
      ob_pillL(x,560,650,"doesn't merge",tt,P.merge,null,{col:AG.ink});
      ob_pillL(x,560,730,"its approval never counts for a person",tt,P.appr,null,{col:AG.ink});
      ob_card(x,1340,610,500,{kick:"The next film",title:"Every change through review"},{a:ag_in(tt,P.next,0.5),k:ag_spr(tt,P.next)});}},
    // in Databricks its group reads production, behind glass, and writes none of it; in development it makes schemas of its own, one
    // for each layer, and owns them; nobody else's are touched (later:true: GitHub leaves, then Databricks comes in)
    {later:true,at:c.dbx,place:"obLab",keys:[[c.dbx,960,540,1]],push:0.02,draw:(x,tt)=>{agent(x,tt);ag_roomLight(x,1);
      ag_label(x,560,190,"Databricks · production",{col:AG.kick,a:ag_in(tt,c.dbx+0.2,0.5)});
      const pa=ag_in(tt,P.reads,0.5);ob_schema(x,620,262,"prod_core",{a:pa});ob_schema(x,860,262,"prod_marts",{a:pa});
      ag_glass(x,580,236,900,116,{a:pa});
      ob_pillL(x,1520,294,"writes · none",tt,P.none,null,{col:AG.blue});
      ag_label(x,560,450,"Development",{col:AG.kick,a:ag_in(tt,P.mk-0.4,0.5)});
      const da=ag_in(tt,P.mk,0.5),inner=ag_sandbox(x,1000,800,880,{depth:260,a:da,label:null});
      if(inner){const S_=[["planning_agent_staging",P.layer],["planning_agent_core",P.layer+0.3],["planning_agent_marts",P.marts]];
        S_.forEach(([n,t0],i)=>ob_schema(x,inner.x+24,inner.y+12+i*76,n,{a:ag_in(tt,t0,0.4)*da,k:ag_spr(tt,t0),edge:i===2?AG.violet:null,col:i===2?AG.violet:null}));}
      [["jun_park_marts",600],["lucia_ortega_marts",690]].forEach(([n,y])=>ob_schema(x,1480,y,n,{grey:true,lock:true,a:ag_in(tt,P.mk+0.6,0.5)}));
      ob_pillL(x,820,450,"owner · planning agent",tt,P.owns,null,{col:AG.violet});
      ob_pillL(x,1440,520,"others' work untouched",tt,P.over,null,{col:AG.green,icon:"tick"});}}
  ],0.6);
  ob_kick(ctx,S,1);});

/* ---------------------------------------------------------------- 5 · Under its own name */
scene("logs",(ctx,S,t,sc)=>{const c=sc.cues,P=ob_once(sc,"P",()=>({every:wAt(sc,"now","every log"),pa:wAt(sc,"gh","read planning agent bot"),ca:wAt(sc,"gh","census agent bot"),
    type:wAt(sc,"verified","type that name"),app:wAt(sc,"verified","through its App"),ver:wAt(sc,"verified","marks them verified"),
    qh:wAt(sc,"qh","the query history"),sp:wAt(sc,"qh","its service principal"),table:wAt(sc,"audit","each table it reads"),schema:wAt(sc,"audit","each schema it makes"),
    one:wAt(sc,"search","one search"),every2:wAt(sc,"search","every pull request"),changed:wAt(sc,"search","what each one changed"),only:wAt(sc,"jun","only on what Jun did")}));
  const agent=(x,tt)=>ob_agentWith(x,tt,Object.assign({},OB_AL,{think:0.2,badge:"planning agent"}));
  ag_shots(ctx,S,t,sc.dur,[
    // every log says whose work it is; in GitHub its pull requests read planning-agent[bot], the census agent's census-agent[bot];
    // anyone could type that name, but its own are made through its App, so GitHub marks them verified (later:true: Databricks'
    // schemas leave, then GitHub's log comes in)
    {later:true,at:0,place:"obLab",keys:[[0,960,540,1]],push:0.02,draw:(x,tt)=>{agent(x,tt);ag_roomLight(x,1);
      const fake=ag_in(tt,P.type,0.5),ok=ag_in(tt,P.ver,0.4);
      ob_log(x,560,170,1280,"GitHub · pull requests",null,[Object.assign({},OB_ROWS[0],{hl:ag_io(tt,P.pa,P.pa+2.2,0.4),ok,a:ag_in(tt,P.every+0.4,0.4)}),
        Object.assign({},OB_ROWS[1],{hl:ag_io(tt,P.ca,P.ca+2.2,0.4),ok,a:ag_in(tt,P.every+0.7,0.4)}),Object.assign({},OB_ROWS[2],{a:ag_in(tt,P.every+1.0,0.4)}),
        {text:"Change a mart",who:"planning-agent[bot]",col:AG.amber,tag:"typed by anyone",warn:fake,a:fake}],{a:ag_in(tt,P.every,0.5),k:ag_spr(tt,P.every)});
      ob_pillL(x,560,700,"made through its App",tt,P.app,null,{col:AG.violet});}},
    // in Databricks every query it runs is in the query history, under its service principal, and the audit log's table lists what
    // else it does (later:true: GitHub's log leaves, then Databricks' two come in)
    {later:true,at:c.qh,place:"obLab",keys:[[c.qh,960,540,1]],push:0.02,draw:(x,tt)=>{agent(x,tt);ag_roomLight(x,1);
      ob_log(x,560,170,1280,"Query history","system.query.history",[{when:"Wed 10:02",who:OB_ID,tag:"planning agent",hl:ag_io(tt,P.sp,P.sp+2,0.4)},
        {when:"Wed 10:04",who:OB_ID,tag:"planning agent",hl:ag_io(tt,P.sp+0.2,P.sp+2.2,0.4)},{when:"Wed 10:05",who:"jun.park@uni.example"}],{a:ag_in(tt,P.qh-0.3,0.5),k:ag_spr(tt,P.qh-0.3)});
      ob_log(x,560,490,1280,"Audit log","system.access.audit",[{text:"getTable · prod_core.core_learner",who:OB_ID,tag:"planning agent",a:ag_in(tt,P.table,0.4)},
        {text:"createSchema · planning_agent_marts",who:OB_ID,tag:"planning agent",a:ag_in(tt,P.schema,0.4)}],{a:ag_in(tt,c.audit,0.5),k:ag_spr(tt,c.audit)});}},
    // so the auditors' question is one search: every pull request by planning-agent[bot], and what each one changed (later:true:
    // Databricks' logs leave, then the search comes in)
    {later:true,at:c.search,place:"obLab",keys:[[c.search,960,540,1]],push:0.02,draw:(x,tt)=>{agent(x,tt);ag_roomLight(x,1);
      ob_search(x,560,180,1280,"is:pr author:app/planning-agent",{a:ag_in(tt,c.search+0.1,0.5),p:(tt-c.search-0.3)/1.3});
      ob_log(x,560,300,1280,"1 pull request",null,[Object.assign({},OB_ROWS[0],{ok:1,hl:ag_io(tt,P.every2,P.every2+2,0.4)})],{a:ag_in(tt,P.every2-0.2,0.5),k:ag_spr(tt,P.every2-0.2)});
      const ca=ag_in(tt,P.changed,0.5);if(ca>0){ag_box(x,560,520,640,150,20,{a:ca,edge:AG.green});
        ag_T(x,"WHAT IT CHANGED",588,570,{w:700,size:28,ls:4,col:AG.kick,a:ca});ag_T(x,"+ study_mode",588,628,{w:500,size:30,f:"mono",col:AG.green,a:ca});}
      ob_pillL(x,1260,594,"one search",tt,P.one,null,{col:AG.green,icon:"tick"});}},
    // and Jun's name is only on what Jun did (later:true: the agent and the search leave, then Jun comes in, with his own)
    {later:true,at:c.jun,place:"obLab",keys:[[c.jun,960,540,1]],push:0.02,draw:(x,tt)=>{
      ob_person(x,"jun",tt,{});ag_roomLight(x,1);ob_personCard(x,"jun",ag_in(tt,c.jun+0.2,0.5));
      ob_log(x,476,300,900,"By Jun Park",null,[Object.assign({},OB_ROWS[2],{hl:ag_in(tt,P.only,0.5)})],{a:ag_in(tt,c.jun+0.3,0.5),k:ag_spr(tt,c.jun+0.3)});
      ob_pillL(x,476,520,"only what Jun did",tt,P.only,null,{col:AG.green,icon:"tick"});}}
  ],0.6);
  ob_kick(ctx,S,1);});

/* ---------------------------------------------------------------- 6 · Stopped, and only it */
scene("stop",(ctx,S,t,sc)=>{const c=sc.cues,P=ob_once(sc,"P",()=>({sj:wAt(sc,"before","stopping Jun"),own:wAt(sc,"each","on its own"),noone:wAt(sc,"each","no one stops"),
    deact:wAt(sc,"dbx","deactivates"),cant:wAt(sc,"dbx","can't sign in"),keeps:wAt(sc,"dbx","keeps its rights"),
    susp:wAt(sc,"gh","suspends"),reach:wAt(sc,"gh","can no longer reach"),both:wAt(sc,"wed","tried both"),ten:wAt(sc,"wed","for ten minutes"),fail:wAt(sc,"wed","next call failed"),
    jun:wAt(sc,"on","Jun"),lucia:wAt(sc,"on","Lucía"),census:wAt(sc,"on","the census agent"),back:wAt(sc,"on","Turned back on"),every:wAt(sc,"on","every right"),
    owns:wAt(sc,"never","Clara owns it"),answers:wAt(sc,"never","answers for its work"),approves:wAt(sc,"never","never approves"),grants:wAt(sc,"never","grants itself a right"),
    whose:wAt(sc,"back","Whose change"),says:wAt(sc,"back","every log says"),one:wAt(sc,"back","one search")}));
  ag_shots(ctx,S,t,sc.dur,[
    // last, the switch: a helper on Jun's sign-in could only be stopped by stopping Jun (later:true: the last chapter's search and
    // Jun's own log leave, then Jun and his helper come in)
    {later:true,at:0,place:"obLab",keys:[[0,960,540,1]],push:0.02,draw:(x,tt)=>{const off=ag_in(tt,P.sj,0.6);
      ob_onJun(x,tt,{off});ob_pillL(x,1296,520,"Jun stops too",tt,P.sj+0.3,null,{col:AG.amber,icon:"warn"});}},
    // the planning agent can be stopped in each tool on its own: Sam deactivates its service principal (it can't sign in, it keeps
    // its rights) and suspends its App's installation (it reaches no repository) (later:true: Jun and his helper leave, then Sam and
    // the planning agent come in)
    {later:true,at:c.each,place:"obLab",keys:[[c.each,960,540,1]],push:0.02,draw:(x,tt)=>{const d=ag_in(tt,P.deact,0.6),g=ag_in(tt,P.susp,0.6);
      ob_agentWith(x,tt,{think:0.2,badge:"planning agent",grey:Math.min(d,g),off:"stopped",tag:"owner · Clara Jensen",dx:-260});
      ob_person(x,"sam",tt,{});ag_roomLight(x,1);ob_personCard(x,"sam",ag_in(tt,c.each+0.3,0.5));
      ob_switch(x,1296,140,570,"Databricks","its service principal",1-d,{states:["Active","Deactivated"],a:ag_in(tt,P.own,0.5),k:ag_spr(tt,P.own)});
      ob_pillL(x,1296,350,"can't sign in",tt,P.cant,null,{col:AG.ink});ob_pillL(x,1296,420,"keeps its rights",tt,P.keeps,null,{col:AG.blue,icon:"lock"});
      ob_switch(x,1296,480,570,"GitHub","its App's installation",1-g,{states:["Active","Suspended"],a:ag_in(tt,P.own+0.3,0.5),k:ag_spr(tt,P.own+0.3)});
      ob_pillL(x,1296,690,"reaches no repository",tt,P.reach,null,{col:AG.ink});
      ob_pillL(x,1296,770,"no one stops with it",tt,P.noone,null,{col:AG.green,icon:"tick"});}},
    // Wednesday, ten minutes: its next call fails; Jun, Lucía and the census agent work on; turned back on, it has every right it
    // had (later:true: Sam's switches leave, then the two agents come in)
    {later:true,at:c.wed,place:"obLab",keys:[[c.wed,960,540,1]],push:0.02,draw:(x,tt)=>{const off=1-ag_in(tt,P.back,0.6);
      ob_twoAgents(x,tt,off,P.census);ag_roomLight(x,1);ob_corner(x,"Wednesday · ten minutes",ag_io(tt,c.wed+0.2,c.never-0.6,0.5));
      const ca=ag_io(tt,P.fail,P.back,0.4);if(ca>0){const u=ag_sine((tt-P.fail)/0.7)*(1-ag_sine((tt-P.fail-1.6)/0.6));
        ob_line(x,OB_PA.x+80,OB_PA.y-60,1290,240,u,{col:AG.amber,dash:[10,8],head:false});ob_pillAt(x,1290,240,"its next call · refused",tt,P.fail+0.4,P.back,{col:AG.amber,icon:"warn"});}
      ob_pillL(x,250,700,"Jun Park · at work",tt,P.jun,null,{col:AG.green,icon:"tick"});ob_pillL(x,250,780,"Lucía Ortega · at work",tt,P.lucia,null,{col:AG.green,icon:"tick"});
      ob_pillAt(x,OB_PA.x,800,"every right, as before",tt,P.every,null,{col:AG.blue,icon:"lock"});}},
    // what never changes: Clara owns it and answers for it; it never approves a change, or grants itself a right (later:true: the two
    // agents leave, then Clara and the planning agent come in)
    {later:true,at:c.never,place:"obLab",keys:[[c.never,960,540,1]],push:0.02,draw:(x,tt)=>{
      ob_agentWith(x,tt,{think:0.2,badge:"planning agent",tag:"owner · Clara Jensen",tk:(tt-P.owns)/0.8,dx:-260});
      ob_person(x,"clara",tt,{});ag_roomLight(x,1);ob_personCard(x,"clara",ag_in(tt,c.never+0.3,0.5));
      ob_pillL(x,1296,240,"answers for its work",tt,P.answers,null,{col:AG.blue});
      ob_pillL(x,1296,320,"never approves a change",tt,P.approves,null,{col:AG.ink});
      ob_pillL(x,1296,400,"never grants itself a right",tt,P.grants,null,{col:AG.ink});}},
    // whose change was that? Now every log says, and the auditors' question takes one search (later:true: Clara and the agent leave,
    // then the log comes in)
    {later:true,at:c.back,place:"obLab",keys:[[c.back,960,540,1]],push:0.02,draw:(x,tt)=>{ag_roomLight(x,1);
      ag_T(x,"Whose change was that?",360,250,{w:700,size:48,a:ag_in(tt,P.whose,0.5)});
      ob_log(x,360,300,1200,"Every log",null,OB_ROWS.map((r,i)=>Object.assign({},r,{a:ag_in(tt,P.says+i*0.25,0.4)})),{a:ag_in(tt,P.says-0.2,0.5),k:ag_spr(tt,P.says-0.2)});
      ob_pillL(x,360,720,"one search",tt,P.one,null,{col:AG.green,icon:"tick"});}},
    // one identity per agent, so its work can be seen and stopped; next, every change through review (later:true)
    {later:true,at:c.take,place:"obLab",keys:[[c.take,960,540,1]],push:0.02,draw:(x,tt)=>withA(x,1-ag_in(tt,c.breath,0.9),()=>{ag_roomLight(x,1);
      const la=ag_in(tt,c.take+0.2,0.6);ag_T(x,"One identity per agent,",960,380,{w:700,size:48,align:"center",a:la});
      ag_T(x,"so its work can be seen and stopped.",960,450,{w:700,size:48,align:"center",a:la});
      ob_card(x,650,560,620,{kick:"Next",title:"Every change through review"},{a:ag_in(tt,c.next,0.4),k:ag_spr(tt,c.next)});})}
  ],0.6);
  // the kicker, but for the corner that says "Wednesday" over it: it goes before the corner comes, and comes back once it has gone
  ob_kick(ctx,S,(1-ag_io(t,c.wed-0.5,c.never-0.2,0.45))*(1-ag_in(t,c.breath,0.9)));
  ag_end(ctx,S,t,c.breath,"An agent with its own badge","One identity per agent, so its work can be seen and stopped.","Film 5 of 7","From helper to colleague");});

// every chapter after the opening opens in the room the one before ends in: its camera glides on from there, and the end of the last
// one is drawn through it (a chapter whose first shot is a later moment lets that end leave first)
ag_cutInto(["name","secret","own","logs","stop"]);
