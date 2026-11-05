/* ===== From a branch to production: the chapters =====
   Each chapter is a few shots (ag_shots). In one room the camera glides from framing to framing and only what changes fades; between
   rooms a shot cuts where both show the same people or words, and dissolves where the whole picture changes. Times inside a chapter
   come from its cues and the words of its lines (wAt), so the pictures stay with the voice if it's recorded again. Words on screen are
   on cards, slips, pills, tags and pages, at least 28 px as seen, and above the captions. */

DP_PEOPLE.push("sam","jun","noor","mei");
const BP_FILM="From a branch to production";
// the kicker, its top line held while each title comes and goes in turn: titles [[text, from, to], ...]
function bp_kickers(ctx,S,t,top,titles,o){o=o||{};const t0=titles[0][1],t1=titles[titles.length-1][2],a=bp_io(t,t0,t1,0.6);if(a<=0)return;setScreen(ctx,S);
  dp_kicker(ctx,top,"",{a});for(const [s,f,u] of titles){const b=ag_io(t,f,u,0.45);if(b>0)dp_T(ctx,s,72,172,{w:700,size:46,a:b});}}
// the opening's lessons, small at the top right of the frame (in the frame's own space, so they hold still while the camera glides)
function bp_lessonsAt(ctx,S,t,o){setScreen(ctx,S);bp_lessons(ctx,Object.assign({u:1},o));}
// a person in the hall, at the left of the track, facing it; on a page shot, at the right of the page, facing it
const bp_left=(x,who,t,a,o)=>dp_person(x,who,220,662,0.86,Object.assign({t,a},o||{}));
const bp_right=(x,who,t,a,o)=>dp_person(x,who,1660,662,0.86,Object.assign({t,a,flip:true},o||{}));

// ---- 1 · Principles first: South Africa, 1993. The parties negotiating the end of apartheid must agree how a constitution will be
//          written; the smaller parties fear what a majority could write, the larger won't accept a text nobody elected; so the
//          principles come first, fixed, and the text will count only once a court that didn't write it certifies it ----
scene("principles",(ctx,S,t,sc)=>{const c=sc.cues,P=bp_once(sc,"P",()=>({
    fear:wAt(sc,"fear","rights a later"),courts:wAt(sc,"fear","courts"),nobody:wAt(sc,"elected","negotiators"),
    rights:wAt(sc,"first","rights for"),judges:wAt(sc,"first","judges"),temp:wAt(sc,"fixed","temporary"),fixedN:wAt(sc,"fixed","nobody may"),
    assemblyW:wAt(sc,"assembly","Constitutional Assembly"),which:wAt(sc,"court","which"),certifies:wAt(sc,"court","certifies")}));
  ag_shots(ctx,S,t,sc.dur,[
    // the negotiating table at night: chairs, papers, microphones; no one's face
    {at:0,place:"bpTable",keys:[[0,960,600,1.18],[0.4,960,560,1.06]],d:9,draw:(x,t)=>{}},
    // April 1994: at dawn, a queue up the road to the hall where the votes are cast
    {at:c.vote-0.4,place:"bpRoad",keys:[[c.vote-0.4,760,690,1.32],[c.vote,980,580,1.04]],d:6.5,draw:(x,t)=>{bp_voters(x,t-c.vote+40,{});}},
    // the parliament to come: its seats lit block by block, most in one shade; what the smaller parties fear, and what the larger won't accept
    {at:c.seats-0.3,place:"bpChamber",keys:[[c.seats-0.3,600,560,1.30],[c.fear+0.2,760,520,1.12]],d:2.4,draw:(x,t)=>{
      const lit=BP_PARTY.map((n,i)=>ag_in(t,c.seats+1.0+i*0.32,0.6)),dim=1-0.55*ag_in(t,c.change+0.4,1.2);
      const edge=ag_io(t,c.fear,c.elected,0.6),big=ag_io(t,c.elected,c.change+0.6,0.6);
      bp_seatsLit(x,{blocks:lit.map(v=>v*lerp(0.55,1,dim)),boost:[big,edge,edge,edge,edge,edge,edge]});
      const k1=ag_in(t,P.fear-0.2,0.5),k2=ag_in(t,P.courts-0.2,0.5),k3=ag_in(t,P.nobody-0.4,0.5);
      if(k1>0)dp_card(x,1010,236,480,{title:"Rights a later vote could take away"},{col:"coral",a:k1*dim,k:ag_spr(t,P.fear-0.2,0.6)});
      if(k2>0)dp_card(x,1010,400,480,{title:"Courts that answer to a party"},{col:"coral",a:k2*dim,k:ag_spr(t,P.courts-0.2,0.6)});
      if(k3>0)dp_card(x,1010,564,480,{title:"Written by negotiators nobody elected?"},{col:"coral",a:k3*dim,k:ag_spr(t,P.nobody-0.4,0.6)});}},
    // back at the table: the principles first, 34 of them, written into a temporary constitution that nobody may change
    {at:c.first-0.3,place:"bpTable",keys:[[c.first-0.3,960,520,1.0]],d:2.0,draw:(x,t)=>{
      const up=ag_spr(t,c.first+0.2,1.1),a=ag_in(t,c.first+0.1,0.6),ty=lerp(420,250,clamp(up,0,1.1));
      const sp=bp_tablet(x,680,ty,{a,lit:[ag_in(t,P.rights-0.2,0.5),ag_in(t,P.judges-0.2,0.5)]});
      if(sp){const r1=ag_in(t,P.rights-0.1,0.5),r2=ag_in(t,P.judges-0.1,0.5);
        if(r1>0)dp_tag(x,250,ty+40,"Rights for everyone","ink",{a:r1,to:sp[0],p:ag_in(t,P.rights,0.5)});
        if(r2>0)dp_tag(x,1300,ty+40,"Judges no party controls","ink",{a:r2,to:sp[1],p:ag_in(t,P.judges,0.5)});}
      const tg=ag_in(t,P.temp-0.2,0.5);if(tg>0)dp_slip(x,960,ty+452,"The interim Constitution · in force 27 April 1994","grey",{a:tg,ink:true,align:"center"});
      const nb=ag_in(t,P.fixedN-0.2,0.5);if(nb>0){x.save();x.globalAlpha*=nb;const bx=760,by=ty+330;dp_panel(x,bx,by,400,66,{col:"coral",r:14,glowR:26});dp_lock(x,bx+42,by+34,34,"coral",0);
        dp_T(x,"Nobody may change them",bx+80,by+44,{w:700,size:28,col:"coral"});x.restore();}}},
    // the Assembly will write the text; it counts only once the Court, which didn't write it, certifies it keeps every principle
    {at:c.assembly-0.3,place:"bpChamber",cut:true,keys:[[c.assembly-0.3,960,540,1.0]],d:2.0,draw:(x,t)=>{
      const all=ag_in(t,c.assembly+0.2,1.4);bp_seatsLit(x,{blocks:BP_PARTY.map(()=>0.6),all});
      bp_tablet(x,680,70,{a:1});
      const la=ag_in(t,P.assemblyW-0.3,0.5);if(la>0)dp_slip(x,560,792,"The Constitutional Assembly · 490 members","grey",{a:la,ink:true,align:"center"});
      const ba=ag_in(t,c.court-0.2,0.6);if(ba>0){bp_book(x,430,330,{a:ba});}
      const ca=ag_in(t,P.which-0.4,0.6);bp_benchLit(x,ca);if(ca>0)dp_slip(x,1560,700,"The Constitutional Court","grey",{a:ca,ink:true,align:"center"});
      const pa=ag_in(t,P.certifies-0.2,1.6);if(pa>0)bp_poly(x,[[700,520],[1000,560],[1290,520]],pa,"cyan",{dash:[12,10],alpha:0.8});}}],0.6);
  bp_kickers(ctx,S,t,"Opening story",[["South Africa, 1993",0.6,c.vote-0.7],["April 1994",c.vote,c.seats-0.6],["South Africa, 1993",c.seats,c.assembly-0.6],["South Africa, 1994",c.assembly,sc.dur+5]]);});

// ---- 2 · Sent back: adopted in May 1996; on 6 September the Court declines to certify it, on nine points; five weeks later the
//          Assembly has fixed all nine; certified on 4 December, signed on 10 December, in force from 4 February 1997; every side
//          could trust it, because no side could put it into force alone; the title ----
scene("sent",(ctx,S,t,sc)=>{const c=sc.cues,P=bp_once(sc,"P",()=>({
    members:wAt(sc,"adopts","members"),agree:wAt(sc,"declines","all agreeing"),decl:wAt(sc,"declines","decline"),
    fixes:wAt(sc,"weeks","fixes"),amended:wAt(sc,"weeks","amended"),cert:wAt(sc,"certifies","certifies"),
    signs:wAt(sc,"signs","signs"),force:wAt(sc,"signs","comes into force"),
    judges:wAt(sc,"both","judges"),promises:wAt(sc,"both","promises"),counted:wAt(sc,"both","counted")}));
  // where the text is: at the Assembly, gliding to the bench, back to the Assembly, and to the bench again
  const AX=380,BX=1430,TY=300,go=(t0,t1)=>ag_sine(clamp((t-t0)/(t1-t0),0,1));
  const bx=()=>{let x=AX;x=lerp(x,BX,go(P.members+0.6,c.declines-0.6));x=lerp(x,AX,go(c.weeks+0.2,c.weeks+2.6));x=lerp(x,BX,go(P.amended+0.6,c.certifies-0.2));return x;};
  const marks=()=>{const on=ag_in(t,c.nine+0.2,0.4);return Array.from({length:9},(_,i)=>{const g=clamp((t-(P.fixes+0.3+i*0.42))/0.5,0,1);return on>0?(g>0?g:-on):0;});};
  ag_shots(ctx,S,t,sc.dur,[
    {at:0,place:"bpChamber",keys:[[0,960,540,1.0],[0.5,640,500,1.18],[P.members+0.6,1120,470,1.18],[c.declines-0.6,1300,470,1.28],[c.weeks+0.2,700,470,1.22],[P.amended+0.6,1240,470,1.24]],d:2.4,draw:(x,t)=>{
      bp_seatsLit(x,{blocks:BP_PARTY.map(()=>0.6),all:1-0.4*ag_in(t,P.members+0.4,1.0)+0.4*ag_in(t,c.weeks+0.2,0.8)-0.4*ag_in(t,P.amended+0.6,1.0)});
      bp_benchLit(x,1);bp_tablet(x,680,70,{a:1-ag_in(t,0.3,0.8)});
      const X=bx();bp_book(x,X,TY,{marks:marks(),glow:ag_in(t,P.cert,1.2)*(1-ag_in(t,P.cert+1.4,0.8))});
      const ad=ag_io(t,0.9,P.members+1.4,0.5);if(ad>0)dp_card(x,140,140,520,{kick:"Adopted · 8 May 1996",title:"86% of members"},{col:"grey",a:ad,k:ag_spr(t,0.9,0.6)});
      const nc=ag_io(t,P.decl,c.weeks+0.2,0.4);if(nc>0)bp_stamp(x,BX+130,TY+400,"Not certified · 6 September 1996","coral",{a:nc,k:ag_spr(t,P.decl,0.5)});
      const ag=ag_io(t,P.agree-0.2,c.nine+1.6,0.5);if(ag>0)dp_slip(x,BX-30,TY-112,"All the judges agreeing","grey",{a:ag,ink:true});
      const r1=ag_io(t,c.rights,c.weeks,0.5),r2=ag_io(t,c.officials,c.weeks,0.5);
      if(r1>0)dp_card(x,BX-560,TY+10,500,{title:"Rights changed too easily"},{col:"coral",a:r1,k:ag_spr(t,c.rights,0.6)});
      if(r2>0)dp_card(x,BX-560,TY+160,500,{title:"The officials who check the government, not protected enough"},{col:"coral",a:r2,k:ag_spr(t,c.officials,0.6)});
      const am=ag_io(t,P.amended-0.2,c.certifies,0.5);if(am>0)dp_card(x,AX+300,TY-150,440,{kick:"Amended text",title:"11 October 1996"},{col:"grey",a:am,k:ag_spr(t,P.amended-0.2,0.6)});
      const ce=ag_in(t,P.cert,0.4);if(ce>0)bp_stamp(x,BX+130,TY+400,"Certified · 4 December 1996","green",{a:ce,k:ag_spr(t,P.cert,0.5)});}},
    // signed, and in force: the text open at its last page, a pen, the seal; then closed, still the constitution today
    {at:c.signs-0.3,place:"bpSigning",cut:true,keys:[[c.signs-0.3,960,540,1.08],[c.still,960,560,1.0]],d:4,draw:(x,t)=>{
      bp_openBook(x,960,540,{close:clamp((t-c.still-0.2)/1.4,0,1)});bp_pen(x,1430,700,1-ag_in(t,c.still,0.8));bp_goldSeal(x,1470,420,46,1);
      const s1=ag_in(t,P.signs-0.2,0.5),s2=ag_in(t,P.force-0.2,0.5);
      if(s1>0)dp_slip(x,560,120,"Signed · 10 December 1996","grey",{a:s1,ink:true});if(s2>0)dp_slip(x,1000,120,"In force · 4 February 1997","green",{a:s2,ink:true});}},
    // every side could trust it: the Assembly and the Court both lit, the text between them, and what that gave them
    {at:c.trust-0.3,place:"bpChamber",cut:true,keys:[[c.trust-0.3,960,500,1.0]],d:2.0,draw:(x,t)=>{
      bp_seatsLit(x,{blocks:BP_PARTY.map(()=>0.6),all:ag_in(t,c.trust+0.5,1.0)});bp_benchLit(x,ag_in(t,c.trust+0.9,1.0));
      bp_book(x,830,200,{glow:0});}},
    // a change to production can work the same way: the hall, and the three lessons with it
    {at:c.same-0.2,place:"bpHall",cut:true,keys:[[c.same-0.2,960,540,1.0]],d:2.0,draw:(x,t)=>{bp_hall(x,t,{rooms:ag_in(t,c.same+0.4,0.8)});}}],0.6);
  // the three lessons, in the frame's own space so they hold still across the cut into the hall
  const la=ag_in(t,P.judges-0.3,0.4)*(1-ag_in(t,c.breath-0.6,0.5));
  if(la>0){setScreen(ctx,S);bp_lessons(ctx,{a:la,u:0,each:[ag_in(t,P.promises-0.3,0.5),ag_in(t,P.judges-0.3,0.5),ag_in(t,P.counted-0.3,0.5)],lit:[1,1,1],behind:false});}
  bp_kickers(ctx,S,t,"Opening story",[["South Africa, 1996",0.3,c.same-0.4]]);
  dp_title(ctx,S,t,c.breath,BP_FILM,"","FILM 8 OF 9 · LOCKS BEFORE THE DATA");});

["nogate","rules","review","door","supply","force"].forEach(id=>scene(id,(ctx,S,t,sc)=>{ag_shots(ctx,S,t,sc.dur,[{at:0,place:"bpHall",keys:[[0,960,540,1]],draw:(x,t)=>{bp_hall(x,t,{rooms:1});}}]);}));
ag_cutInto(["sent","nogate"]);
