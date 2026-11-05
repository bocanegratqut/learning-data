/* ===== More readers than people: the scenes =====
   Six chapters, each timed to its narration: wAt(sc, "line", "word") is the moment a word is said. The places are painted once:
   the road at night (world.js), and the module's "night" and "map" (the kit's look.js); what moves is drawn live in the shots of
   ag_shots. On the map, one room, the camera glides on from shot to shot and from chapter to chapter (ag_cutInto), and a new
   moment there is a later one (later:true), so what was there leaves before what comes in; between the road and the night, the
   whole picture changes, so the shots dissolve. The title card ends chapter 1, the end card chapter 6. */

/* ---------------------------------------------------------------- 1 · Signs anyone can read */
const MR_PLATES=["VIRAGE DANGEREUX","GEFÄHRLICHE KURVE","CURVA PELIGROSA","DANGEROUS CURVE"];
const MR_SIGNX=1240,MR_SIGNY=470;
scene("signs",(ctx,S,t,sc)=>{const c=sc.cues,T=mr_once(sc,"T",()=>({
    place:wAt(sc,"place","Vienna"),drive:wAt(sc,"drive","drive"),next:wAt(sc,"drive","the next"),
    month:wAt(sc,"meet","a month"),rules:wAt(sc,"meet","rules of the road"),
    differ:wAt(sc,"differ","still differ"),words:wAt(sc,"differ","in words"),lang:wAt(sc,"differ","own language"),
    bend:wAt(sc,"miss","sharp bend"),never:wAt(sc,"miss","never know"),crashW:wAt(sc,"crash","crash"),
    n31:wAt(sc,"sign","thirty-one"),conv:wAt(sc,"sign","Convention"),
    shape:wAt(sc,"once","shape"),colour:wAt(sc,"once","colour"),symbol:wAt(sc,"once","symbol"),
    tri:wAt(sc,"shapes","triangle"),warns:wAt(sc,"shapes","warns"),circ:wAt(sc,"shapes","A circle"),blue:wAt(sc,"shapes","A blue circle"),
    n75:wAt(sc,"today","seventy-five"),sameS:wAt(sc,"today","same signs"),
    nobody:wAt(sc,"new","nobody"),every:wAt(sc,"cars","every new car"),eu:wAt(sc,"cars","European Union"),read:wAt(sc,"cars","read the speed limit"),passes:wAt(sc,"cars","passes"),
    dataW:wAt(sc,"data","Data"),ppl:wAt(sc,"readers","by people"),rep:wAt(sc,"readers","Finance's reports"),app:wAt(sc,"readers","an app"),agt:wAt(sc,"readers","an agent"),part:wAt(sc,"readers","a partner"),
    own:wAt(sc,"wrong","counts its own way"),elseW:wAt(sc,"wrong","someone else"),shouldnt:wAt(sc,"wrong","shouldn't"),
    itself:wAt(sc,"right","each as itself"),sameN:wAt(sc,"right","same number"),may:wAt(sc,"right","only what it may")}));
  ag_shots(ctx,S,t,sc.dur,[
    // near Vienna, at night: more people than ever drive from one country into the next
    {at:0,place:"mrRoad",keys:[[0,960,540,1.0]],push:0.03,draw:(cx,tt)=>{
      md_label(cx,96,150,"Vienna · November 1968",{a:ag_in(tt,T.place-0.2,0.6),col:MD.ink});
      mr_border(cx,1500,ag_in(tt,T.next-0.4,0.6));
      for(let i=0;i<5;i++){const u=(tt-(-1.2+i*2.4))/7.2;if(u>0&&u<1)mr_carOn(cx,MR_LANE,u,{});}}},
    // a month of talks in Vienna, on the rules of the road
    {at:c.meet-0.5,place:"night",keys:[[0,960,540,1.0]],push:0.02,draw:(cx,tt)=>{
      md_textCard(cx,460,250,1000,{kick:"United Nations",title:"Conference on Road Traffic",sub:"Vienna"},{edge:MD.flow,a:ag_in(tt,c.meet-0.3,0.5),k:mr_k(tt,c.meet-0.3)});
      const days=33,u=ag_sine(clamp((tt-T.month+0.2)/2.4,0,1)),x0=460,cw=26,gap=4.3,y0=560;
      for(let i=0;i<days;i++){const f=clamp(u*days-i,0,1);if(f<=0)continue;cx.save();cx.globalAlpha*=f;rr(cx,x0+i*(cw+gap),y0,cw,cw,5);cx.fillStyle=rgba(MD.flow,0.5);cx.fill();cx.restore();}
      md_T(cx,"7 October",x0,y0+76,{w:600,size:28,col:MD.soft,a:ag_in(tt,T.month-0.2,0.4)});
      md_T(cx,"8 November",x0+days*(cw+gap)-gap,y0+76,{w:600,size:28,align:"right",col:MD.soft,a:ag_in(tt,T.month+2.0,0.4)});}},
    // but the signs still differ: many in words, each in its own country's language (later: the conference leaves first)
    {later:true,at:T.differ-0.4,place:"night",keys:[[0,960,540,1.0]],push:0.02,draw:(cx,tt)=>{
      md_label(cx,960,250,"A sharp bend ahead, before 1968",{align:"center",a:ag_in(tt,T.differ-0.2,0.5)});
      MR_PLATES.forEach((p,i)=>{const x=i%2?1300:620,y=i<2?420:600;mr_sign(cx,"plate",x,y,0,{text:p,size:34,a:ag_in(tt,T.words-0.3+i*0.3,0.4),k:mr_k(tt,T.words-0.3+i*0.3)});});
      md_tag(cx,960,760,"in each country's own language",{align:"center",col:MD.soft,a:ag_in(tt,T.lang-0.3,0.5)});}},
    // a driver from abroad passes a warning in words, and misses the bend
    {at:c.miss-0.5,place:"mrRoad",keys:[[0,960,540,1.0],[T.crashW-1.6,900,560,1.1]],d:2.4,push:0,draw:(cx,tt)=>{
      mr_sign(cx,"plate",MR_SIGNX,MR_SIGNY-10,0,{text:MR_PLATES[1],size:32,post:70,a:ag_in(tt,c.miss-0.5,0.5)});
      const t0=c.miss-0.3,u=clamp((tt-t0)/(T.crashW-t0),0,1),hit=ag_in(tt,T.crashW-0.05,0.15),q=mr_carOn(cx,MR_MISS,u,{lights:1-0.6*ag_in(tt,T.crashW+0.6,1.2)});
      const pa=ag_in(tt,T.never-0.2,0.4)*(1-hit);if(pa>0)md_pill(cx,q.x,q.y-86,"?",{col:MD.wait,a:pa,size:32});
      if(hit>0){const f=Math.exp(-Math.max(0,tt-T.crashW)*0.9);glow(cx,q.x-40,q.y,150,MD.fail,0.55*hit*(0.35+0.65*f));md_icon(cx,"warn",q.x-40,q.y-100,54,MD.fail,{a:hit});}}},
    // the treaty: each sign defined once, by its shape, its colour and its symbol; then the three kinds
    {at:c.sign-0.5,place:"night",keys:[[0,960,540,1.0]],push:0.015,draw:(cx,tt)=>{
      md_textCard(cx,380,130,1160,{kick:"Vienna, 8 November 1968",title:"Convention on Road Signs and Signals"},{edge:MD.agreed,icon:"contract",a:ag_in(tt,c.sign-0.3,0.5),k:mr_k(tt,c.sign-0.3)});
      md_pill(cx,960,330,"Signed by 31 countries",{col:MD.agreed,size:30,a:ag_in(tt,T.n31-0.1,0.4),k:mr_k(tt,T.n31-0.1)});
      const mv=ag_sine(clamp((tt-T.tri+0.6)/1.2,0,1)),sx=lerp(960,560,mv),sy=590,ss=230;
      mr_signBuild(cx,sx,sy,ss,{shape:ag_in(tt,T.shape-0.1,0.6),colour:ag_in(tt,T.colour-0.1,0.5),symbol:ag_in(tt,T.symbol-0.1,0.5)});
      const ta=1-ag_in(tt,T.tri-0.8,0.4);["its shape","its colour","its symbol"].forEach((w,i)=>md_tag(cx,700+i*260,800,w,{align:"center",col:MD.ink,a:ta*ag_in(tt,[T.shape,T.colour,T.symbol][i]-0.15,0.4)}));
      md_T(cx,"warns",560,800,{w:700,size:32,align:"center",a:ag_in(tt,T.warns-0.2,0.4)});
      mr_sign(cx,"limit",960,sy,ss*0.92,{a:ag_in(tt,T.circ-0.2,0.4),k:mr_k(tt,T.circ-0.2)});md_T(cx,"forbids, or sets a limit",960,800,{w:700,size:32,align:"center",a:ag_in(tt,T.circ+0.6,0.4)});
      mr_sign(cx,"must",1360,sy,ss*0.92,{a:ag_in(tt,T.blue-0.2,0.4),k:mr_k(tt,T.blue-0.2)});md_T(cx,"says what you must do",1360,800,{w:700,size:32,align:"center",a:ag_in(tt,T.blue+0.6,0.4)});}},
    // today: the same signs from one country to the next; and a reader nobody planned for, a car that reads the limit
    {at:c.today-0.5,place:"mrRoad",keys:[[0,960,540,1.0]],push:0.03,draw:(cx,tt)=>{
      mr_border(cx,1500,1);
      mr_sign(cx,"warn",1700,MR_SIGNY,120,{post:70,glow:ag_io(tt,T.sameS-0.2,T.sameS+1.6,0.4)?MD.pass:null});
      mr_sign(cx,"warn",MR_SIGNX,MR_SIGNY,120,{post:70,glow:ag_io(tt,T.sameS-0.2,T.sameS+1.6,0.4)?MD.pass:null});
      md_pill(cx,300,150,"75 countries keep it",{col:MD.agreed,size:30,a:ag_in(tt,T.n75-0.2,0.4),k:mr_k(tt,T.n75-0.2)});
      // the first car takes the bend
      const u1=(tt-(c.today-0.1))/7.4;if(u1>0&&u1<1){const q=mr_carOn(cx,MR_LANE,u1,{});const ok=ag_io(tt,c.today+4.6,c.today+6.4,0.3);if(ok>0)md_icon(cx,"tick",q.x+70,q.y-60,46,MD.pass,{a:ok});}
      // the limit, and the second car, which reads it
      const la=ag_in(tt,T.every-0.6,0.5);mr_sign(cx,"limit",980,MR_SIGNY,110,{post:70,a:la});
      const u2=(tt-(T.every-0.4))/7.6;let q2=null;if(u2>0&&u2<1)q2=mr_carOn(cx,MR_LANE,u2,{});
      const rd=ag_io(tt,T.read-0.3,T.passes+0.6,0.4);if(q2&&rd>0){cx.save();cx.globalAlpha*=rd;cx.globalCompositeOperation="lighter";const g=cx.createLinearGradient(q2.x,q2.y,980,MR_SIGNY);g.addColorStop(0,rgba(MD.flow,0.45));g.addColorStop(1,rgba(MD.flow,0.08));
        cx.fillStyle=g;cx.beginPath();cx.moveTo(q2.x-30,q2.y-14);cx.lineTo(980-60,MR_SIGNY-40);cx.lineTo(980+60,MR_SIGNY+40);cx.closePath();cx.fill();cx.restore();}
      const da=ag_in(tt,T.read+0.2,0.5);if(da>0){md_card(cx,1430,150,400,170,{edge:MD.flow,a:da});md_T(cx,"THE CAR'S DISPLAY",1460,202,{w:800,size:28,ls:4,col:MD.flow,a:da});mr_sign(cx,"limit",1520,262,74,{a:da});md_T(cx,"read off the sign",1580,272,{w:600,size:28,col:MD.soft,a:da});}
      md_tag(cx,96,240,"Every new car in the EU, since July 2024",{col:MD.flow,a:ag_in(tt,T.eu-0.3,0.5)});}},
    // data has readers nobody planned for, too: the measure, and its five readers
    {at:c.data-0.6,place:"map",keys:[[0,960,540,1.0]],push:0,draw:(cx,tt)=>{
      const ua=ag_in(tt,T.ppl-0.4,0.6);if(ua>0){md_card(cx,90,190,1740,520,{dash:[12,10],edge:MD.dim,a:ua*0.9});md_label(cx,960,240,"The university",{align:"center",a:ua});}
      mr_measure(cx,MR_M.x,MR_M.y,MR_M.w,{a:ag_in(tt,T.dataW-0.1,0.5),k:mr_k(tt,T.dataW-0.1),lit:ag_io(tt,T.itself,T.may+1.2,0.6)});
      const at_=[T.ppl,T.rep,T.app,T.agt,T.part],bad=ag_in(tt,T.own-0.2,0.4)*(1-ag_in(tt,T.itself-0.3,0.5)),as=ag_in(tt,T.elseW-0.2,0.4)*(1-ag_in(tt,T.itself-0.3,0.5)),good=ag_in(tt,T.itself-0.2,0.5);
      MR_READERS.forEach((R,i)=>{const a=ag_in(tt,at_[i]-0.2,0.4),lane=ag_sine(clamp((tt-at_[i])/0.9,0,1));
        const isBad=R.k==="bi",isAs=R.k==="app";
        mr_reader(cx,R,{a,lane:isBad?lane*(1-0.55*bad):lane,col:isBad&&bad>0.5?MD.fail:MD.agreed,dash:isBad&&bad>0.5,t:tt,flow:good,edge:isBad&&bad>0.5?MD.fail:null});
        if(isBad&&bad>0)mr_says(cx,R,"A$1.56M",{col:MD.fail,icon:"cross",a:bad});
        if(isAs&&as>0){mr_key(cx,R.x+R.w-30,R.y-4,MD.fail,as);md_tag(cx,R.x+60,R.y+150,"other faculties' claims",{col:MD.personal,icon:"lock",a:as});}
        if(good>0){mr_key(cx,R.x+R.w-30,R.y-4,MD.pass,good);
          if(R.k!=="partner")mr_says(cx,R,"A$1.84M",{a:ag_in(tt,T.sameN-0.2+i*0.12,0.4)});else mr_says(cx,R,"totals by faculty",{a:ag_in(tt,T.sameN+0.4,0.4),inset:170});}});}}],0.5);
  md_title(ctx,S,t,c.breath,"More readers than people","One definition, every reader","FILM 3 OF 3 · FROM TABLES TO DECISIONS");
});
