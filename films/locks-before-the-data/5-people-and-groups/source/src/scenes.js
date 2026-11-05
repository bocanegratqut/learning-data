/* ===== People and groups: the eight chapters =====
   Each chapter is cut into shots (ag_shots), each a place under a slow camera; every moment waits for a word of the narration
   (wAt(sc, line, word)), so the pictures stay with the voice if it's recorded again; tools/score.py times its sounds to the same words.
   The opening is the hotel card lock (Moss and its hotels in the 1970s, Atlanta in 1978) to the title; then the university: the
   platform as it was (Still a key), one directory, one way to sign in, admin power switched on for a task, no personal token left,
   and back to the hotel's corridor to close. The 1970s places and people are in pg_past.js, the university's in pg_uni.js, and the
   pieces both use in pg_kit.js. */

const PG_LINE="FILM 5 OF 9 · LOCKS BEFORE THE DATA";

/* ================================================================ 1 · Keys that outlive the stay */
// Room 312's pigeonhole at the hotel's desk: an empty one near the middle (the same dice as the desk's painter, in the same order)
const PG_HOLE=(()=>{const R=ag_rnd(21),px=90,py=150,cw=78,ch=74;let best=null;for(let j=0;j<5;j++)for(let i=0;i<8;i++){const has=R()<0.6,d=Math.abs(i-4.5)+Math.abs(j-2.2);
  if(!has&&(!best||d<best.d))best={x:px+i*cw,y:py+j*ch,w:cw,h:ch,d};}return best;})();
// the key's place on the pavement, under the street lamp
const PG_KEYST=[1420,815];
scene("keys",(ctx,S,t,sc)=>{const C=sc.cues;
  const tMakes=wAt(sc,"factory","makes locks"),tSornes=C.sornes,tHotels=C.hotels,tForget=wAt(sc,"forget","forget to hand"),tLose=wAt(sc,"forget","or lose"),
    tStill=wAt(sc,"opens","still opens"),tAnyone=C.anyone,tLet=wAt(sc,"anyone","let themselves"),tSlept=wAt(sc,"anyone","while that guest slept");
  const HO=PG_HOLE,[lx,ly]=PG_LOCK;
  const shots=[
    // dusk on the fjord at Moss: the factory on the water, its windows warm
    {at:0,place:"pgFjord",keys:[[0,960,540,1.0],[0.4,1000,470,1.14]],d:7,push:0,draw(ctx,t){pg_tag(ctx,S,"Moss, Norway · 1970s",ag_in(t,1.0,0.7));}},
    // its workshop: lock cases, springs and ice skates on the bench; Tor Sørnes behind it, a lock case in his hand
    {at:tMakes-0.5,place:"pgWorkshop",keys:[[0,900,520,1.0],[tSornes-0.6,780,520,1.08]],d:3,push:0,draw(ctx,t){
      dp_person(ctx,PG_SORNES,470,520,1.0,{t,light:"lamp",cut:PG_BENCH,pose:"hold",hold:(c,h)=>pg_heldCase(c,h),gaze:[3,2],nod:0.04});pg_front(ctx,"pgWorkshop",PG_BENCH);
      dp_slip(ctx,720,300,"Tor Sørnes · research","cyan",{a:ag_in(t,tSornes-0.1,0.5),ink:true});}},
    // a hotel's front desk at night, its rooms' keys in their pigeonholes: Room 312's is empty, its key not handed in
    {at:tHotels-0.5,place:"pgDesk",keys:[[0,960,540,1.0],[tForget-0.3,HO.x+HO.w/2+170,HO.y+70,1.5]],d:2.2,push:0,draw(ctx,t){
      pg_tag(ctx,S,"A hotel · 1970s",ag_in(t,tHotels+0.1,0.6)*(1-ag_in(t,tForget-0.6,0.5)));
      const ha=ag_in(t,tForget+0.7,0.5);if(ha>0){ctx.save();ctx.globalAlpha*=ha;ctx.strokeStyle=rgba(DP.F.coral,1);ctx.shadowColor=rgba(DP.F.coral,0.9);ctx.shadowBlur=14;ctx.lineWidth=3;
        ctx.strokeRect(HO.x+5,HO.y+5,HO.w-10,HO.h-10);ctx.restore();}
      dp_pill(ctx,HO.x+HO.w+30,HO.y+HO.h/2+14,"Room 312 · key not handed in","coral",{a:ha});}},
    // or lost on the way: the key on a wet pavement, under a street lamp; whoever holds it, it still opens its door
    {at:tLose-0.4,place:"pgStreet",keys:[[0,1180,640,1.3],[tStill-0.5,1280,700,1.5]],d:2.4,push:0,draw(ctx,t){const ka=ag_in(t,tStill+0.1,0.6);
      pg_key(ctx,PG_KEYST[0],PG_KEYST[1],0.62,{rot:-0.15,num:"312",rim:"coral",rimA:ka,deco:1});
      dp_pill(ctx,1150,640,"Still opens Room 312","coral",{a:ka});}},
    // anyone who found it, or kept it: the key in Room 312's lock, and the light under the door dims as the next guest sleeps
    {at:tAnyone-0.4,place:"pgCorridor",keys:[[0,960,540,1.0],[tAnyone+0.2,990,520,1.6]],d:4.4,push:0.015,draw(ctx,t){
      pg_doorLight(ctx,ag_in(t,tSlept,1.8));pg_plate(ctx);pg_escutcheon(ctx,lx,ly,0.42);
      const ka=ag_in(t,tLet-0.2,0.7);pg_keyInLock(ctx,lx,ly,0.42,{a:ka,rim:"coral",rimA:0.9*ka,deco:1});}}];
  ag_shots(ctx,S,t,sc.dur,shots,0.6);});

/* ================================================================ 2 · A card for each stay */
const PG_RD={x:860,y:150,w:960};   // the lock, drawn as glass beside the bench and the desk: the corridor on its left, the room on its right
scene("card",(ctx,S,t,sc)=>{const C=sc.cues;
  const tInside=wAt(sc,"inside","Inside each lock"),tPut=wAt(sc,"inside","put in from inside"),tNewPat=wAt(sc,"guest","puts in a new pattern"),tGives=wAt(sc,"guest","gives the guest"),
    tLast=C.last,tNothing=wAt(sc,"last","opens nothing"),tAtl=C.atlanta,tFirst=wAt(sc,"atlanta","the first go"),tBurg=wAt(sc,"atlanta","troubled by burglaries"),
    tLost=C.lost,tLostN=wAt(sc,"lost","opens nothing"),tNew=wAt(sc,"lost","only a new card"),tSpread=C.spread,tRooms=wAt(sc,"spread","six and a half million"),tEnds=C.ends,
    tUni=C.uni,tJob=wAt(sc,"uni","outlive a person's job"),tTask=wAt(sc,"uni","outlived the task"),tToken=C.token,tBuilds=C.builds,tThree=wAt(sc,"builds","three earlier films"),
    tEntra=wAt(sc,"builds","Microsoft Entra ID"),tAzure=wAt(sc,"builds","Azure Databricks");
  const R=PG_RD,u=(a,d)=>clamp((t-a)/d,0,1);
  // the lock at the desk: the old pattern out and the new one in; the guest's new card in, and green; then the last guest's card, coral
  const deskLock=(t)=>{const o={a:1,labels:[ag_in(t,tGives+0.7,0.5),1]};const swap=tNewPat+0.6;
    if(t<swap){o.seed=5;o.pattern=1;o.pOut=u(tNewPat-0.3,0.9);}else{o.seed=9;o.pattern=u(swap,1.0);}
    const g2=tLast+0.25;
    if(t<g2){o.gSeed=9;o.guest=u(tGives+0.05,1.1);o.gOut=u(tLast-0.45,0.7);o.check=u(tGives+1.2,0.8)*(1-ag_in(t,tLast-0.8,0.3));o.verdict=ag_in(t,tGives+1.7,0.5)*(1-ag_in(t,tLast-0.8,0.3));}
    else{o.gSeed=5;o.old=true;o.guest=u(g2,1.0);o.check=u(tNothing-0.4,0.8);o.verdict=ag_in(t,tNothing+0.1,0.5);}
    return o;};
  const toDoor=[PG_PLAT.door[0]-8,PG_PLAT.door[1]+PG_PLAT.door[3]*0.45];
  const shots=[
    // the workshop: Sørnes with a punched plastic card; the lock beside him, as glass: the pattern card goes in from inside the room
    {at:0,place:"pgWorkshop",keys:[[0,960,540,1.0]],push:0.015,draw(ctx,t){
      dp_person(ctx,PG_SORNES,400,520,1.0,{t:t+3,light:"lamp",cut:PG_BENCH,pose:"hold",hold:(c,h)=>pg_heldCard(c,h,5),gaze:[3,2],nod:0.03});pg_front(ctx,"pgWorkshop",PG_BENCH);
      pg_reader(ctx,R.x,R.y,R.w,{a:ag_in(t,tInside-0.3,0.5),k:ag_spr(t,tInside-0.3,0.7),seed:5,pattern:u(tPut-0.2,1.2),labels:[0,ag_in(t,tPut+0.5,0.5)]});}},
    // the hotel's desk: for each new guest, a new pattern, and a card punched to match; the last guest's card opens nothing
    {cut:true,at:tNewPat-1.4,place:"pgDesk",keys:[[0,960,540,1.0]],push:0.015,draw(ctx,t){const gone=ag_in(t,tGives-0.35,0.4);
      dp_person(ctx,PG_CLERK,400,470,1.0,{t,light:"lamp",cut:PG_COUNTER,pose:"hold",pose2:"hang",mix:ag_in(t,tGives+0.15,0.45),hold:(c,h)=>pg_heldCard(c,h,9,1-gone),gaze:[3,1],nod:0.03});
      pg_front(ctx,"pgDesk",PG_COUNTER);pg_reader(ctx,R.x,R.y,R.w,deskLock(t));}},
    // Atlanta, 1978: a big new hotel, troubled by burglaries; its floors light as the card locks go in
    {at:tAtl-0.4,place:"pgAtlanta",keys:[[0,960,560,1.0],[tAtl,980,520,1.1]],d:6,push:0,draw(ctx,t){pg_towerLights(ctx,ag_in(t,tFirst,4.5));
      pg_tag(ctx,S,"Atlanta · 1978",ag_in(t,tAtl+0.2,0.6));dp_slip(ctx,1240,330,"Troubled by burglaries","coral",{a:ag_in(t,tBurg-0.2,0.5)});}},
    // a lost card opens nothing once the next guest arrives; changing the lock takes only a new pattern card
    {at:tLost-0.4,place:"pgStreet",keys:[[0,1200,640,1.25]],push:0.02,draw(ctx,t){const ca=ag_in(t,tLostN-0.1,0.6);
      pg_punch(ctx,1330,770,170,{seed:5,rot:-0.12,rim:"coral",rimA:ca});dp_slip(ctx,1030,700,"Opens nothing","coral",{a:ca});
      pg_reader(ctx,1250,250,560,{a:ag_in(t,tNew-0.4,0.5),k:ag_spr(t,tNew-0.4,0.6),mini:true,seed:11,pattern:u(tNew+0.1,1.0)});}},
    // by 2011, six and a half million rooms: the corridor's doors light green, one card lock after another
    {at:tSpread-0.4,place:"pgCorridor",keys:[[0,960,540,1.0],[tEnds-0.6,990,500,1.55]],d:2.6,push:0,draw(ctx,t){
      pg_plate(ctx);pg_sideLocks(ctx,ag_in(t,tRooms-0.3,3.2));pg_cardLock(ctx,ag_in(t,tRooms+2.8,0.6),true);
      dp_card(ctx,100,170,600,{kick:"By 2011",title:"6.5 million hotel rooms, in 166 countries",sub:"The company's figure"},{a:ag_io(t,tSpread+0.1,tEnds-1.0,0.6),k:ag_spr(t,tSpread+0.1,0.6)});
      dp_pill(ctx,990,236,"A key that ends with the stay","green",{a:ag_in(t,tEnds-0.1,0.6),align:"center"});}},
    // the university's hall: the platform's block of glass, its one lit door, and what outlived the stay
    {at:tUni-0.4,place:"pgHall",keys:[[0,960,540,1.0]],push:0.02,draw(ctx,t){const ta=1-ag_in(t,tBuilds-0.3,0.5);
      dp_tag(ctx,560,300,"A place that outlived the job","coral",{a:ag_in(t,tJob-0.1,0.5)*ta,to:toDoor,p:ag_in(t,tJob+0.2,0.6)});
      dp_tag(ctx,560,420,"Power that outlived the task","coral",{a:ag_in(t,tTask-0.1,0.5)*ta,to:toDoor,p:ag_in(t,tTask+0.2,0.6)});
      dp_tag(ctx,560,540,"A token with no end date","coral",{a:ag_in(t,tToken+0.1,0.5)*ta,to:toDoor,p:ag_in(t,tToken+0.4,0.6)});
      // the answer, built from three earlier films, in the two tools
      const fa=ag_in(t,tThree-0.2,0.5);["Who is it, really?","No secret to lose","Power you switch on"].forEach((s,i)=>dp_tag(ctx,140,300+i*104,s,"grey",{a:ag_in(t,tThree-0.2+0.3*i,0.5)*fa}));
      pg_toolSlip(ctx,620,404,"entra","Microsoft Entra ID",ag_in(t,tEntra-0.1,0.5),{k:ag_spr(t,tEntra-0.1,0.6)});pg_platName(ctx,ag_in(t,tAzure-0.1,0.5));}}];
  ag_shots(ctx,S,t,sc.dur,shots,0.6);
  dp_title(ctx,S,t,C.breath,"People and groups","Keys that end with the stay",PG_LINE);});

/* ================================================================ 3 to 8: placeholders while the chapters are drawn */
for(const id of ["before","directory","signin","power","tokens","close"])scene(id,(ctx,S,t,sc)=>{ag_shots(ctx,S,t,sc.dur,[{at:0,place:"pgHall",keys:[[0,960,540,1.0]]}],0.6);
  pg_kick(ctx,S,sc.name,ag_io(t,0.6,5.5,0.6));});
