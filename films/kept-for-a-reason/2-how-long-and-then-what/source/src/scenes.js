/* ===== How long, and then what: the chapters =====
   Seven chapters, re-timed to the voice: every moment is a word's time (wAt). The opening (A flood of paper, Decided once, before) is
   Washington in 1943, in its own places (hl_past.js) with its live pieces (hl_open.js); the rest is the university, in the module's hall
   (hl_uni.js). In one room the camera glides and only what changes fades; between rooms, a dissolve where the whole picture changes. */

DP_PEOPLE.push([HL_CLERK,"lamp"],"ingrid","yusuf","linh");

// the clerk at her cabinets, her far hand on the top drawer's handle of the cabinet beside her (the drawer she has just closed)
const HL_CLERK_AT=[426,591,1.0],HL_CLERK_POSE={near:[4,34,"rest"],far:[10,100,"hold"]};
function hl_clerk(c,t,a){if(a<=0)return;const [x,y,s]=HL_CLERK_AT;const draw=cc=>dp_person(cc,HL_CLERK,x,y,s,{light:"lamp",t,pose:HL_CLERK_POSE,gaze:[3,1]});
  if(a>=1)draw(c);else{const [bc,bx]=ag_buf("clerk",c.canvas.width,c.canvas.height);bx.setTransform(c.getTransform());bx.clearRect(-4000,-4000,9000,9000);draw(bx);
    c.save();c.setTransform(1,0,0,1,0,0);c.globalAlpha=a;c.drawImage(bc,0,0);c.restore();}}

/* ---------------------------------------------------------------- 1 · A flood of paper */
scene("flood",(ctx,S,t,sc)=>{
  const tGlide=wAt(sc,"war","country")-0.4,tWall=wAt(sc,"war","office")-0.3,tFour=wAt(sc,"cabinets","four"),tRooms=wAt(sc,"cabinets","rooms"),tFloors=wAt(sc,"cabinets","floors");
  const tFlood=wAt(sc,"flood","flood"),tYear=wAt(sc,"flood","every year"),tWorth=wAt(sc,"flood","building");
  const tMost=wAt(sc,"eighty","most"),tEighty=wAt(sc,"eighty","eighty");
  const tList=wAt(sc,"list","destroyed"),tLift=wAt(sc,"list","list"),tCong=wAt(sc,"list","Congress"),tPile=wAt(sc,"again","every new pile"),tNew=wAt(sc,"again","new list");
  const tKept=wAt(sc,"kept","simply")-1.6,tJob=wAt(sc,"kept","nobody"),tRent=wAt(sc,"cost","rent"),tStaff=wAt(sc,"cost","staff"),tSteel=wAt(sc,"cost","steel");
  const tClose=wAt(sc,"close","close")-0.6,tVal=wAt(sc,"close","valuable"),tClaim=wAt(sc,"proof","prove a claim"),tServ=wAt(sc,"proof","their service"),tLost=sc.ends.proof+0.2;
  const tabs=[["Orders",wAt(sc,"war","orders")],["Contracts",wAt(sc,"war","contracts")],["Payrolls",wAt(sc,"war","payrolls")],["Letters",wAt(sc,"war","letters")]];
  ag_shots(ctx,S,t,sc.dur,[
    // Washington's avenue at night; the camera glides in to a lit window
    {at:0,place:"hlStreet",push:0.02,d:tWall-tGlide,keys:[[0,960,540,1],[tGlide,HL_STREET_WINDOW.x,HL_STREET_WINDOW.y,2.4]]},
    // the clerk at her cabinets; four folder tabs rise from an open drawer; the camera draws back along the row; boxes pile up
    {at:tWall,place:"hlWall",dis:0.9,push:0.015,keys:[[tWall,900,600,1.12],[tFour,960,540,1]],draw:(x,tt)=>{
      hl_boxes(x,hl_wallX(1)+20,HL_WALL.top-16,HL_WALL.w-40,ag_in(tt,tRooms,1.2),3);hl_boxes(x,hl_wallX(3)+20,HL_WALL.top-16,HL_WALL.w-40,ag_in(tt,tRooms+0.3,1.2),7);
      hl_wallDrawer(x,0,{});hl_wallDrawer(x,1,{out:0.06*(1-ag_eo(clamp((tt-tWall-0.4)/0.5,0,1)))});
      hl_wallDrawer(x,3,{});hl_wallDrawer(x,4,{});
      const d=hl_wallDrawer(x,2,{out:1,full:0.9}),cx=d.x+d.w/2;
      tabs.forEach(([w,at],i)=>hl_tab(x,cx+(i%2?70:-70),668-i*80,w,ag_eo(clamp((tt-at+0.25)/0.7,0,1)),{rise:120+i*80}));
      hl_clerk(x,tt,1);}},
    // the building in section, its floors filling; the Archives beside it filling too; ten drawers, eight dimmed; the lists
    {at:tFloors,place:"hlNight",dis:0.8,push:0.015,draw:(x,tt)=>{
      const fill=[0,1,2,3,4,5].map(i=>ag_in(tt,tFloors+0.4+i*0.32,0.5)),aS=hl_v(tt,tFloors,tMost,0.6);
      hl_section(x,250,300,560,540,fill,aS);dp_tag(x,250,190,"A war office","grey",{a:aS*ag_in(tt,tFloors+0.3,0.5),size:30});
      hl_archGlass(x,1010,330,700,510,ag_in(tt,tYear,2.4),hl_v(tt,tFlood,tMost,0.7));
      dp_card(x,1010,150,700,{title:"Every year: a building's worth"},{a:hl_v(tt,tWorth,tMost,0.6),k:ag_spr(tt,tWorth,0.9)});
      // ten drawers of the year's papers, eight of them dimming: no lasting value
      const aT=hl_v(tt,tMost+0.3,tList-0.4,0.6);if(aT>0){x.save();x.globalAlpha*=aT;for(let i=0;i<10;i++)hl_drawerIcon(x,250+i*146,450,124,120,i<8?ag_in(tt,tEighty+i*0.08,0.6):0);x.restore();}
      dp_card(x,250,240,620,{title:"80% · no lasting value"},{a:hl_v(tt,tEighty+0.4,tList-0.4,0.6),k:ag_spr(tt,tEighty+0.4,0.9)});
      // the lists: a pile, its list lifting and travelling to Congress; a second pile, a second list
      const aL=ag_in(tt,tList,0.7);hl_pile(x,420,820,Math.round(26*ag_in(tt,tList,1.2)),{a:aL,seed:4});
      const lu=ag_eo(clamp((tt-tLift)/1.8,0,1)),sx=lerp(270,1180,lu),sy=lerp(560,330,lu);
      dp_link(x,[600,600],[1220,330],"grey",ag_in(tt,tLift-0.2,1.2),{dash:[4,14],lw:3,dot:false,alpha:0.8});
      dp_card(x,1260,250,420,{title:"Congress"},{a:ag_in(tt,tCong,0.6),k:ag_spr(tt,tCong,0.9)});
      hl_sheet(x,sx,sy,330,230,{title:["List of papers","for disposal"],lines:3,a:aL,rot:lerp(-0.05,0.03,lu)});
      hl_pile(x,420,820-26*7,Math.round(30*ag_in(tt,tPile,1.6)),{a:ag_in(tt,tPile,0.5),seed:12});
      hl_sheet(x,250,330,330,180,{title:["List No. 2"],lines:2,a:ag_in(tt,tNew,0.8),rot:-0.04});}},
    // back in the office: the drawers stay shut, the room dims; nobody's job; what keeping it all costs
    {at:tKept,place:"hlOffice",dis:0.9,push:0.0,keys:[[tKept,1060,520,1],[tKept+0.5,1060,500,1.16]],d:6,draw:(x,tt)=>{
      x.fillStyle=rgba([0,6,8],0.32*ag_in(tt,tKept+1.2,2.5));x.fillRect(0,0,W,H);
      dp_card(x,640,170,840,{title:"No one's job to decide"},{a:ag_in(tt,tJob,0.6),k:ag_spr(tt,tJob,0.9)});
      [["Rent",tRent,700],["Staff",tStaff,900],["Steel cabinets",tSteel,1110]].forEach(([w,at,px])=>{const u=ag_in(tt,at,0.5);if(u>0){x.save();x.translate(0,(1-ag_spr(tt,at,0.9))*-20);dp_slip(x,px,330,w,"grey",{a:u,ink:true});x.restore();}});}},
    // the platform at night: crates of papers for a freight car; the valuable with the useless; two that someone will need, lost
    {at:tClose,place:"hlPlatform",dis:0.9,push:0.02,draw:(x,tt)=>{
      hl_heap(x,{a:ag_in(tt,tVal-0.3,0.8),warm:ag_in(tt,tVal,0.8)});
      dp_card(x,1060,110,760,{title:"The valuable with the useless"},{a:ag_in(tt,tVal+0.2,0.6),k:ag_spr(tt,tVal+0.2,0.9),behind:"hlPlatform"});
      const sink=ag_eo(clamp((tt-tLost)/1.4,0,1));
      [["To prove a claim",tClaim,560],["To prove their service",tServ,880]].forEach(([w,at,px],i)=>{const up=ag_eo(clamp((tt-at)/1.0,0,1))*(1-sink);if(up<=0)return;
        const y=lerp(640,380+i*120,up);x.save();x.globalAlpha*=clamp(up*2,0,1);x.save();x.shadowColor="rgba(255,226,180,0.55)";x.shadowBlur=24;x.fillStyle="rgb(246,236,212)";x.fillRect(px-20,y-46,dp_tw(x,w,{w:700,size:30})+40,70);x.restore();
        dp_T(x,w,px,y+3,{w:700,size:30,col:HL_INK});x.restore();});
      if(tt>tLost){const u=ag_in(tt,tLost+0.6,0.7);dp_slip(x,520,420,"Lost with the rest","coral",{a:u});}}}
  ],0.8);
  dp_kicker(ctx,"Opening story","Washington, 1943",{a:hl_v(t,0.5,tGlide+0.4,0.8)});
});

/* ---------------------------------------------------------------- 2 · Decided once, before */
scene("before",(ctx,S,t,sc)=>{
  const P=HL_DESK_PAGE,tSign=wAt(sc,"law","signs"),tDraft=wAt(sc,"law","drafted"),tComm=wAt(sc,"law","committee");
  const tTurn=wAt(sc,"once","schedule"),tLong=wAt(sc,"kind","how long"),tThen=wAt(sc,"kind","then"),tArch=wAt(sc,"approve","Archivist"),tCong=wAt(sc,"approve","Congress");
  const tWall=wAt(sc,"approve","papers not")-0.5,tLabel=wAt(sc,"approve","written"),tFill=wAt(sc,"pile","pile"),tClaim=wAt(sc,"claim","money"),tBand=wAt(sc,"claim","stay until");
  const tOther=wAt(sc,"other","destroyed"),tOpen=sc.cues.saved,tSaves=wAt(sc,"saved","saves"),tBudget=wAt(sc,"budget","budget");
  const tSteps=sc.cues.today-0.4,tGood=wAt(sc,"today","kept for good"),tCase=sc.cues.family-0.3,tHall=sc.cues.uni-0.3,tNoEnd=wAt(sc,"uni","no end date"),tEnd=wAt(sc,"end","end date");
  // the drawers that empty, one at a time, each with its own note; the one under the band stays full
  const empties=[[1,tOpen+2.0],[2,tOpen+3.6],[4,tOpen+5.2]];
  const label="Payrolls · 1944",typed=Math.floor(label.length*clamp((t-tLabel)/1.1,0,1));
  ag_shots(ctx,S,t,sc.dur,[
    // the desk: the Act; who drafted it; the page turns to a schedule; its columns light; two stamps
    {at:0,place:"hlDesk",push:0.02,draw:(x,tt)=>{
      hl_actPage(x,P,{turn:ag_sine(clamp((tt-tTurn)/1.3,0,1)),litLong:hl_v(tt,tLong,tThen,0.4),litThen:ag_in(tt,tThen,0.4)});
      hl_stamp(x,P.x+P.w/2+40,P.y+P.h-210,"Approved · the Archivist",ag_in(tt,tArch,0.5),-0.05);
      hl_stamp(x,P.x+P.w/2-20,P.y+P.h-110,"Approved · Congress",ag_in(tt,tCong,0.5),0.04);
      dp_card(x,1420,150,400,{title:"7 July 1943"},{a:hl_v(tt,tSign,tTurn,0.6),k:ag_spr(tt,tSign,0.9)});
      const aC=hl_v(tt,tDraft,tTurn,0.6);dp_card(x,60,330,440,{title:"The National Archives"},{a:aC,k:ag_spr(tt,tDraft,0.9)});
      dp_card(x,1420,330,440,{title:"A committee of Congress"},{a:hl_v(tt,tComm,tTurn,0.6),k:ag_spr(tt,tComm,0.9)});
      dp_link(x,[500,420],[P.x,420],"grey",aC,{dot:false,alpha:0.7});dp_link(x,[P.x+P.w,420],[1420,420],"grey",hl_v(tt,tComm,tTurn,0.6),{dot:false,alpha:0.7});}},
    // the cabinets: a label written before its papers; the drawer fills only after; a band for a claim; nothing any other way; the
    // savings; the drawers empty one at a time, the one under the band left full
    {at:tWall,place:"hlWall",dis:0.9,push:0.0,keys:[[tWall,1180,560,1.2],[tClaim,1300,560,1.12],[tOpen,960,540,1]],d:1.8,draw:(x,tt)=>{
      const open=ag_eo(clamp((tt-tOpen)/0.8,0,1));
      hl_wallDrawer(x,0,{});
      for(const [i,te] of [[1,empties[0][1]],[4,empties[2][1]]]){const gone=ag_in(tt,te,0.6),shut=ag_eo(clamp((tt-te-0.7)/0.6,0,1));hl_wallDrawer(x,i,{out:open*(1-shut),full:1-gone});}
      {const te=empties[1][1],gone=ag_in(tt,te,0.6),shut=ag_eo(clamp((tt-te-0.7)/0.6,0,1)),fl=ag_in(tt,tFill,0.9);
        const d=hl_wallDrawer(x,2,{out:Math.max(ag_eo(clamp((tt-tLabel-1.2)/0.6,0,1))*(1-ag_in(tt,tFill+1.2,0.6)),open*(1-shut)),full:fl*(1-gone),big:true,label:label.slice(0,typed)});
        // the folder that isn't written yet: an outline, sliding into the drawer
        const fu=ag_eo(clamp((tt-tLabel-1.6)/0.9,0,1))*(1-ag_in(tt,tFill,0.5));if(fu>0){x.save();x.globalAlpha*=fu;x.setLineDash([10,8]);x.strokeStyle=rgba(DP.ice,0.9);x.lineWidth=3;
          const fx=d.x+d.w/2,fy=lerp(560,d.y-20,fu);x.strokeRect(fx-120,fy-70,240,90);x.restore();}}
      const d3=hl_wallDrawer(x,3,{out:open,full:1});
      hl_bandAcross(x,d3.x-40,d3.y+80,d3.w+80,58,"closed","Kept until the claim is settled",ag_in(tt,tBand,0.8));
      hl_clerk(x,tt,1);
      dp_card(x,1180,130,620,{title:"No paper destroyed any other way"},{a:hl_v(tt,tOther,tSaves-0.3,0.6),k:ag_spr(tt,tOther,0.9)});
      const cs=dp_card(x,1160,110,640,{title:"$927,000 saved",sub:"Army Air Forces alone · 1944"},{a:ag_in(tt,tSaves,0.6),k:ag_spr(tt,tSaves,0.9)});
      dp_slip(x,1160,cs.y+cs.h+14,"About the Archives' whole budget","grey",{a:ag_in(tt,tBudget,0.6),ink:true});}},
    // the Archives today: the few folders go up the steps into the light
    {at:tSteps,place:"hlSteps",dis:0.9,push:0.025,draw:(x,tt)=>{
      const D=HL_STEPS_DOOR;dp_link(x,[960,1040],[960,D.y+D.h/2-30],"grey",ag_in(tt,tSteps+0.5,1.4),{dash:[4,14],lw:3,dot:false,alpha:0.7});
      for(let i=0;i<3;i++){const u=clamp((tt-tSteps-0.8-i*0.7)/2.6,0,1);if(u<=0||u>=1)continue;const y=lerp(1000,D.y+D.h/2,ag_sine(u)),a=Math.min(1,u*4,(1-u)*4);
        x.save();x.globalAlpha*=a;x.shadowColor="rgba(255,226,180,0.8)";x.shadowBlur=20;x.fillStyle="rgb(232,204,150)";x.fillRect(930,y-24,60,44);x.restore();}
      dp_card(x,1180,170,600,{title:"Kept for good today: 1 to 3%"},{a:ag_in(tt,tGood,0.6),k:ag_spr(tt,tGood,0.9),behind:"hlSteps"});}},
    // a family's page and a service record in a glass case, read by lamplight
    {at:tCase,place:"hlCase",dis:0.9,push:0.035},
    // the university: its platform keeps every record, with no end date; one shelf becomes a drawer with its end date
    {at:tHall,place:"hlHall",dis:0.9,push:0.02,draw:(x,tt)=>{
      const dr=ag_in(tt,tEnd,0.9),sh=[0,1,2,3,4,5,6].map(i=>({n:8,warm:i===0,drawer:i===2?dr:0,label:"Pay records"}));hl_block(x,sh,{behind:"hlHall"});
      dp_slip(x,HL_BLOCK.x+HL_BLOCK.w+30,hl_shelfAt(2,7)[1]-35,"Until …","grey",{a:ag_in(tt,tEnd+0.4,0.6),ink:true});
      hl_bandAcross(x,HL_BLOCK.x-60,470,HL_BLOCK.w+120,64,"none","No end date",hl_v(tt,tNoEnd,tEnd-0.2,0.7));}}
  ],0.8);
  if(t<tHall)dp_kicker(ctx,"Washington","7 July 1943",{a:hl_v(t,0.4,tWall-0.4,0.8)});
  dp_kicker(ctx,"Washington","Today",{a:hl_v(t,tSteps+0.4,tHall-0.6,0.8)});
  dp_title(ctx,S,t,sc.cues.breath,"How long, and then what","An end date for every record","FILM 2 OF 5 · KEPT FOR A REASON");
});

/* ---------------------------------------------------------------- 3 · Three lives of a record */
scene("lives",(ctx,S,t,sc)=>{
  const tPay=wAt(sc,"pay","Pay records"),tApps=wAt(sc,"pay","applications"),tNever=wAt(sc,"never","Nothing"),tThree=wAt(sc,"three","three lives");
  const tUse=wAt(sc,"use","in use"),tLinh=wAt(sc,"use","Linh"),tArch=wAt(sc,"archived","archived"),tCold=wAt(sc,"archived","read rarely");
  const tDel=wAt(sc,"deleted","deleted"),tGood=wAt(sc,"good","kept for good"),tYear=sc.cues.year-0.3,tLeak=wAt(sc,"year","leak"),tPlan=wAt(sc,"plan","deleting"),tLaw=wAt(sc,"plan","the law");
  const panesA=hl_v(t,tThree,tYear,0.8);
  ag_shots(ctx,S,t,sc.dur,[{at:0,place:"hlHall",push:0.0,keys:[[0,960,540,1],[tPay-0.4,1000,480,1.18],[tThree-0.6,960,540,1],[tYear,980,470,1.14],[tPlan+1.5,960,540,1]],d:1.8,draw:(x,tt)=>{
    // the platform: full, nothing ever deleted; dimmed while the three lives are shown
    const bA=1-0.82*panesA,yrs=Math.round(lerp(2016,2026,clamp((tt-tLeak+1.5)/2.6,0,1))),coral=ag_in(tt,tLeak,1.2);
    const sh=[0,1,2,3,4,5,6].map(i=>({n:8,warm:i===6,coral:i===0?coral:0}));hl_block(x,sh,{a:bA,behind:"hlHall"});
    dp_tag(x,1200,hl_shelfAt(1,7)[1]-31,"Pay records · since 2016","grey",{a:hl_v(tt,tPay,tThree-0.6,0.6)*bA,to:hl_shelfAt(1,7),p:ag_in(tt,tPay+0.2,0.6),size:28});
    dp_tag(x,1200,hl_shelfAt(3,7)[1]-31,"Applications, not hired · since 2017","grey",{a:hl_v(tt,tApps,tThree-0.6,0.6)*bA,to:hl_shelfAt(3,7),p:ag_in(tt,tApps+0.2,0.6),size:28});
    hl_bandAcross(x,HL_BLOCK.x-80,470,HL_BLOCK.w+160,64,"none","Nothing ever deleted",hl_v(tt,tNever,tThree-0.6,0.7));
    // the oldest card: its years counting up, its rim turning coral
    if(tt>tYear){const a=hl_v(tt,tYear+0.6,tPlan-0.3,0.6);dp_slip(x,HL_BLOCK.x-250,HL_BLOCK.y-6,String(yrs),"grey",{a,ink:true});
      dp_slip(x,1200,HL_BLOCK.y+60,"Could leak · could be misused","coral",{a:hl_v(tt,tLeak+0.3,tPlan-0.3,0.6)});}
    // deleting without a plan: a record the law needs goes too soon
    if(tt>tPlan){const u=ag_in(tt,tLaw,1.6);hl_rec(x,1200,420,470,["Pay record the law needs"],{a:ag_in(tt,tPlan,0.6)*(1-0.75*u),coral:u,behind:"hlHall"});
      dp_slip(x,1200,520,"Gone too soon","coral",{a:ag_in(tt,tLaw+1.0,0.6)});}
    // three lives: in use, archived, deleted; kept for good above archived
    if(panesA>0){x.save();x.globalAlpha*=panesA;
      hl_pane(x,440,470,330,330,"In use",{behind:"hlHall",glow:0.8+ag_in(tt,tUse,0.6)*hl_v(tt,tUse,tArch,0.5)});
      hl_pane(x,800,470,330,330,"Archived",{behind:"hlHall"});hl_pane(x,1160,470,330,330,"Deleted",{behind:"hlHall"});
      hl_pane(x,800,200,330,240,"Kept for good",{behind:"hlHall",a:ag_in(tt,tGood-0.4,0.6)});
      hl_rec(x,465,575,280,["Pay records","this year"],{a:ag_in(tt,tUse+0.3,0.6),warm:true,behind:"hlHall"});
      dp_pill(x,605,725,"Linh Nguyen","identity",{a:ag_in(tt,tLinh,0.6),align:"center"});
      ["2023","2024","2025"].forEach((y,i)=>hl_rec(x,835+i*90,575,80,[y],{a:ag_in(tt,tArch+0.3+i*0.25,0.6),dim:0.35,behind:"hlHall"}));
      dp_slip(x,965,668,"Read rarely","grey",{a:ag_in(tt,tCold,0.6),ink:true,align:"center"});
      const fade=ag_in(tt,tDel+0.3,1.4);hl_rec(x,1255,575,140,["2016"],{a:ag_in(tt,tDel-0.3,0.4)*(1-fade),dim:0.4,behind:"hlHall"});
      const up=ag_eo(clamp((tt-tGood)/1.4,0,1));hl_rec(x,835,lerp(575,300,up),260,["Degrees","and results"],{a:ag_in(tt,tGood-0.2,0.5),behind:"hlHall"});
      x.restore();}
    // Ingrid, who owns HR's records, and Yusuf, from data governance
    dp_person(x,"ingrid",250,612,0.95,{t:tt,gaze:[3,0]});dp_person(x,"yusuf",1670,612,0.95,{t:tt,flip:true,gaze:[3,0]});
    dp_pill(x,250,742,"Ingrid Holm","identity",{a:hl_v(tt,sc.cues.look,tPay+0.6,0.6),align:"center"});
    dp_pill(x,1670,742,"Yusuf Demir","identity",{a:hl_v(tt,wAt(sc,"look","Yusuf"),tPay+0.6,0.6),align:"center"});}}]);
  dp_kicker(ctx,"The university","October 2026",{a:hl_v(t,0.5,sc.cues.look+3.5,0.8)});
});

/* ---------------------------------------------------------------- 4 · One schedule, by kind of record */
scene("schedule",(ctx,S,t,sc)=>{
  const tLists=wAt(sc,"lists","Washington"),tOne=wAt(sc,"one","one schedule"),tRow=wAt(sc,"row","kind"),tOwner=wAt(sc,"row","owner"),tReason=wAt(sc,"row","reason");
  const tLong=wAt(sc,"row","how long"),tThen=wAt(sc,"row","then what"),tOwners=wAt(sc,"owners","Ingrid"),tKeeps=wAt(sc,"owners","Yusuf keeps");
  const tPay=sc.cues.payrow,tAcad=sc.cues.academic,tMail=wAt(sc,"others","mailing"),tApps=wAt(sc,"others","applications"),tPills=wAt(sc,"reason","A reason");
  const tSign=wAt(sc,"signed","sign"),tClean=wAt(sc,"first","clean-up"),tGone=sc.cues.went;
  const aT=hl_v(t,tOne,tClean-0.6,0.8);
  ag_shots(ctx,S,t,sc.dur,[{at:0,place:"hlHall",push:0.0,keys:[[0,960,540,1],[tClean,960,500,1.1]],d:1.8,draw:(x,tt)=>{
    // Washington's lists, for a moment
    hl_sheet(x,780,300,360,220,{title:["List No. 2"],lines:3,a:hl_v(tt,tLists-0.4,tOne-0.8,0.6),rot:-0.03});
    hl_schedule(x,{a:aT,behind:"hlHall",head:[ag_in(tt,tRow,0.4),ag_in(tt,tOwner,0.4),ag_in(tt,tReason,0.4),ag_in(tt,tLong,0.4),ag_in(tt,tThen,0.4)],
      rows:[ag_in(tt,tPay,0.8),ag_in(tt,tAcad,0.8),ag_in(tt,tMail,0.8),ag_in(tt,tApps,0.8)],owners:ag_in(tt,tOwners,0.6),pills:1,pillGlow:hl_v(tt,tPills,tSign,0.5),
      kept:ag_in(tt,tKeeps,0.6),signed:ag_in(tt,tSign,0.8)});
    // the first clean-up: the shelves of 2016, 2017 and 2018 empty one after another, and old applications leave together
    const bA=ag_in(tt,tClean-0.4,0.8);if(bA>0){const years=["2016","2017","2018","2019","2020"],sh=years.map((y,i)=>({n:8*(i<3?1-ag_in(tt,tGone+i*0.9,0.7):1),drawer:0}));
      sh.push({n:8*(1-ag_in(tt,tGone+3.0,1.2))});sh.push({n:8,warm:true});hl_block(x,sh,{a:bA,behind:"hlHall"});
      years.forEach((y,i)=>dp_slip(x,HL_BLOCK.x-160,HL_BLOCK.y+i*HL_BLOCK.h/7+14,y,"grey",{a:bA*(i<3?1-0.6*ag_in(tt,tGone+i*0.9+0.6,0.6):1),ink:true,size:28}));
      dp_tag(x,1200,hl_shelfAt(5,7)[1]-31,"Applications, not hired","grey",{a:bA,to:hl_shelfAt(5,7),p:1,size:28});}}}]);
});

/* ---------------------------------------------------------------- 5 · The clock starts at an event */
scene("clock",(ctx,S,t,sc)=>{
  const tEvent=wAt(sc,"event","event"),tNot=wAt(sc,"event","not from"),tEach=wAt(sc,"contract","each contract"),tEight=wAt(sc,"eight","eight end dates");
  const tFirst=wAt(sc,"firstc","kept until"),tLast=wAt(sc,"lastc","kept until"),tApp=wAt(sc,"others","application"),tMail=wAt(sc,"others","mailing");
  const tFri=wAt(sc,"friday","Friday"),tEnds=wAt(sc,"friday","ends"),tNobody=sc.cues.nobody;
  ag_shots(ctx,S,t,sc.dur,[{at:0,place:"hlHall",push:0.015,draw:(x,tt)=>{
    // a record, its event, and how long counting from the event
    const aE=hl_v(tt,0.6,tEach-0.3,0.7);if(aE>0){x.save();x.globalAlpha*=aE;hl_rec(x,560,250,300,["Pay record"],{behind:"hlHall"});
      const ev=ag_in(tt,tEvent,0.6);x.globalAlpha*=1;dp_slip(x,1000,180,"Event","grey",{a:ev,ink:true});x.save();x.globalAlpha*=ev;x.strokeStyle=rgba(DP.ice,0.9);x.lineWidth=3;x.beginPath();x.moveTo(1060,250);x.lineTo(1060,360);x.stroke();x.restore();
      const p=ag_eo(clamp((tt-tNot)/1.4,0,1));if(p>0){dp_link(x,[1060,320],[lerp(1060,1640,p),320],"grey",1,{dot:false,lw:4});dp_T(x,"How long",1260,300,{w:700,size:30,a:p});}x.restore();}
    // Linh's eight contracts, and each one's end date
    for(let i=0;i<8;i++){const dim=ag_in(tt,tApp-0.2,0.6)*(1-ag_in(tt,tFri-0.3,0.6))*(i===7?0:1)+ag_in(tt,tFri,0.6)*(i===7?0:0.6);
      hl_contract(x,i,ag_in(tt,tEach+i*0.18,0.6),ag_in(tt,i===0?tFirst:i===7?tLast:tEight+0.2+(i-1)*0.32,0.5),{dim,behind:"hlHall"});}
    dp_slip(x,1380,HL_CY+7*HL_CH-3,"Ended","grey",{a:ag_in(tt,tEnds,0.6),ink:true});
    // other kinds, other events
    dp_card(x,1220,190,640,{title:"Application",sub:"from the decision"},{a:hl_v(tt,tApp,tFri-0.4,0.6),k:ag_spr(tt,tApp,0.9)});
    dp_card(x,1220,400,640,{title:"Mailing list",sub:"from the last contact, or a no"},{a:hl_v(tt,tMail,tFri-0.4,0.6),k:ag_spr(tt,tMail,0.9)});
    dp_card(x,1220,190,640,{title:"Friday 20 November 2026"},{a:ag_in(tt,tFri,0.6),k:ag_spr(tt,tFri,0.9)});
    // Linh, the casual tutor whose contracts they are
    dp_person(x,"linh",270,612,0.95,{t:tt,gaze:[3,0]});
    dp_pill(x,270,742,"Linh Nguyen","identity",{a:hl_v(tt,wAt(sc,"eight","Linh"),tFirst,0.6),align:"center"});}}]);
});

/* ---------------------------------------------------------------- 6 · A hold stops the clock */
scene("hold",(ctx,S,t,sc)=>{
  const tTutor=wAt(sc,"tutor","former tutor"),tDue=wAt(sc,"due","due to go"),tShow=wAt(sc,"show","neither"),tPlace=wAt(sc,"places","places a hold");
  const tNames=wAt(sc,"names","names"),tReason=wAt(sc,"names","reason"),tPlaced=wAt(sc,"names","placed"),tLift=wAt(sc,"names","lift");
  const tSkips=wAt(sc,"skips","skips"),tCase=wAt(sc,"never","just in case"),tSettled=wAt(sc,"lifts","settled"),tLifts=wAt(sc,"lifts","lifts"),tNext=wAt(sc,"lifts","next clean-up");
  const t43=sc.cues.as43;
  ag_shots(ctx,S,t,sc.dur,[{at:0,place:"hlHall",push:0.015,draw:(x,tt)=>{
    // the drawer of 2019's pay records, due to go in January; hers among them
    const aD=ag_in(tt,0.6,0.8),dim=0.35*hl_v(tt,tShow,tPlace,0.6),D={x:150,y:300,w:820,h:300};
    x.save();x.globalAlpha*=aD*(1-dim);dp_panel(x,D.x,D.y,D.w,D.h,{r:18,behind:"hlHall"});dp_T(x,"Pay records · 2019",D.x+30,D.y+56,{w:700,size:34});
    for(let k=0;k<10;k++){const hers=k>=7,leave=hers?ag_in(tt,tNext,1.0):ag_in(tt,tSkips+0.4+k*0.08,0.9),a=1-leave;if(a<=0)continue;x.save();x.globalAlpha*=a;x.translate(0,-30*leave);
      x.fillStyle="rgba(190,240,240,0.16)";rr(x,D.x+40+k*76,D.y+100,56,160,6);x.fill();x.strokeStyle=rgba(DP.ice,0.6);x.lineWidth=1.6;rr(x,D.x+40+k*76,D.y+100,56,160,6);x.stroke();x.restore();}
    x.restore();
    dp_slip(x,D.x+D.w-370,D.y-90,"Due to go: January","grey",{a:aD*hl_v(tt,tDue,tSkips-0.3,0.6),ink:true});
    // the hold, across her records only
    const band=ag_in(tt,tPlace,0.9)*(1-ag_in(tt,tLifts,0.9));hl_bandAcross(x,D.x+40+7*76-14,D.y+150,3*76+12,60,"closed","Hold",band);
    // the claim, and the hold's card
    dp_card(x,1060,150,700,{title:"A former tutor's pay claim",sub:"not settled"},{a:hl_v(tt,tTutor,tNames-0.4,0.6)*(1-dim*0.8),k:ag_spr(tt,tTutor,0.9),behind:"hlHall"});
    const hc=hl_v(tt,tNames,tSettled,0.6);if(hc>0){x.save();x.globalAlpha*=hc;dp_panel(x,1060,150,760,360,{col:"coral",r:20,behind:"hlHall"});
      dp_T(x,"HOLD",1100,214,{w:800,size:28,ls:4,col:"coral"});
      [["Records: her pay records, 2019",tNames],["Reason: her pay claim",tReason],["Placed by: the legal office",tPlaced],["Lifted by: the legal office",tLift]].forEach(([s,at],i)=>
        dp_T(x,s,1100,282+i*58,{w:600,size:30,a:ag_in(tt,at,0.5)}));x.restore();}
    dp_card(x,1060,560,380,{title:"January"},{a:hl_v(tt,tSkips-0.2,tCase-0.2,0.6),k:ag_spr(tt,tSkips-0.2,0.9),behind:"hlHall"});
    // never just in case
    const jc=hl_v(tt,tCase-0.4,tSettled-0.2,0.6);if(jc>0){const bb=dp_slip(x,1060,560,"Just in case","grey",{a:jc,ink:true});hl_strike(x,bb.x+16,bb.y+bb.h/2+2,bb.w-32,ag_in(tt,tCase+0.2,0.6)*jc);}
    dp_card(x,1060,560,420,{title:"Next clean-up"},{a:hl_v(tt,tNext-0.4,t43-0.2,0.6),k:ag_spr(tt,tNext-0.4,0.9),behind:"hlHall"});
    // as in 1943: the drawer kept until the claim is settled, for a moment
    const m=hl_v(tt,t43,sc.ends.as43+0.6,0.7);if(m>0){x.save();x.globalAlpha*=m;dp_panel(x,1040,560,780,300,{r:18,behind:"hlHall"});
      x.save();rr(x,1056,576,748,268,12);x.clip();x.drawImage(ag_place("hlWall"),1380,640,700,250,1056,576,748,268);x.translate(1056-1380*748/700,576-640*268/250);x.scale(748/700,268/250);
      const d3=hl_wallDrawer(x,3,{});x.restore();hl_bandAcross(x,1070,690,720,58,"closed","Kept until the claim is settled",1);x.restore();}}}]);
});

/* ---------------------------------------------------------------- 7 · An end date for every record */
scene("end",(ctx,S,t,sc)=>{
  const tSoon=wAt(sc,"short","Deleted too soon"),tLong=wAt(sc,"long","Kept too long"),tLaws=wAt(sc,"laws","keep personal"),tOut=wAt(sc,"outside","outside the schedule");
  const tHold=wAt(sc,"outside","except"),tCopy=wAt(sc,"copy","every copy"),tDmd=wAt(sc,"dmd","Deleted means"),t43=sc.cues.pile-0.3,tFew=wAt(sc,"few","rest went"),tUni=sc.cues.every-0.3;
  const panes=["Platform","Archive","Old versions","Logs"];
  ag_shots(ctx,S,t,sc.dur,[
    {at:0,place:"hlHall",push:0.015,draw:(x,tt)=>{
      hl_lifeline(x,{a:hl_v(tt,0.4,tLaws-0.3,0.8),soon:hl_v(tt,tSoon,tLong,0.5),long:ag_in(tt,tLong,0.5)});
      dp_card(x,360,170,1200,{title:"Keep personal data no longer than its reason needs"},{a:hl_v(tt,tLaws,tCopy-0.4,0.6),k:ag_spr(tt,tLaws,0.9),behind:"hlHall"});
      const sg=hl_v(tt,tOut,tCopy-0.4,0.6);if(sg>0){dp_card(x,560,420,520,{title:"Retention schedule"},{a:sg,behind:"hlHall"});hl_bandAcross(x,1130,436,200,64,"closed","Hold",ag_in(tt,tHold,0.8)*sg);}
      const slide=ag_eo(clamp((tt-tDmd)/1.6,0,1));
      panes.forEach((p,i)=>{const a=ag_in(tt,tCopy+i*0.35,0.6)*(1-ag_in(tt,tDmd+0.8,0.8));if(a<=0)return;const px=240+i*370+(i<2?-1:1)*slide*260;
        hl_pane(x,px,300,330,300,p,{a,behind:"hlHall"});dp_slip(x,px+165,430,"Until 20 Nov 2033","grey",{a,ink:true,align:"center",size:28});});}},
    // 1943: the cabinets labelled; most drawers empty, a few folders on their way to the Archives
    {at:t43,place:"hlWall",dis:0.9,push:0.02,keys:[[t43,960,540,1]],draw:(x,tt)=>{
      [["Orders · 1941",0.1],["Contracts · 1942",0.15],["Payrolls · 1943",1],["Letters · 1943",0.1]].forEach(([l,f],k)=>hl_wallDrawer(x,k+1,{big:true,label:l,out:0.6,full:f}));
      hl_wallDrawer(x,0,{});hl_clerk(x,tt,1);
      for(let i=0;i<3;i++){const u=clamp((tt-tFew-i*0.6)/2.4,0,1);if(u<=0||u>=1)continue;const px=lerp(1210,1900,ag_sine(u)),py=lerp(700,420,ag_sine(u))-Math.sin(u*Math.PI)*60;
        x.save();x.globalAlpha*=Math.min(1,u*4,(1-u)*3);x.shadowColor="rgba(255,226,180,0.7)";x.shadowBlur=18;x.fillStyle="rgb(222,196,140)";x.fillRect(px-36,py-26,72,52);x.restore();}}},
    // the university: every shelf a drawer with its label and its date
    {at:tUni,place:"hlHall",dis:0.9,push:0.02,draw:(x,tt)=>{
      const rows=[["Pay records · 2026","Until 20 Nov 2033"],["Pay records · 2025","Until 21 Nov 2032"],["Academic records","Kept for good"],["Mailing list","Until a no"],["Applications","12 months"],["Pay records · 2024","Until 15 Nov 2031"],["Pay records · 2023","Until 17 Nov 2030"]];
      const sh=rows.map((r,i)=>({n:8,drawer:1,label:r[0],warm:i===0}));hl_block(x,sh,{behind:"hlHall"});
      rows.forEach((r,i)=>dp_slip(x,HL_BLOCK.x+HL_BLOCK.w+24,HL_BLOCK.y+i*HL_BLOCK.h/7+14,r[1],"grey",{ink:true,size:28,a:ag_in(tt,tUni+0.6+i*0.15,0.6)}));}}
  ],0.8);
  dp_end(ctx,S,t,sc.cues.breath,"How long, and then what","Every record has an end date, decided before it's needed.","Film 2 of 5","Kept for a reason");
});

ag_cutInto(["schedule","clock","hold","end"]);
