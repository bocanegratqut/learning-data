/* ===== From a branch to production: the hall, the path and the tools' pages =====
   The university's scenes: the module's hall at night with three glass rooms, development, test and production (as Walls, doors and
   keys sets them), each holding its workspace, a block of clear glass; production's block is tall and has a door, lit, where the
   path ends. This film lays a glass track in front of the rooms, from main to test to production, and its gates appear on it one at a
   time as the film sets them. The tools' pages are GitHub's and Databricks' as their docs show them on the day, drawn with the kit's
   dp_page (each with its official logo, unaltered, credited in NOTICE.md), on bpDesk, the hall seen dim, so a cut to a page is a cut
   to another room. Places: bpHall, bpDesk. Live: bp_hall(ctx, t, st), which draws what a chapter shows in the hall from a state of
   alphas and positions, and the pages, bp_gh* (GitHub) and bp_db* (Databricks). */

const BP_FLOOR=640,BP_TRACK=740;
const BP_ROOM={dev:{x:640,y:350,w:330,h:290,label:"development",block:[728,438,154,202],door:805},
               test:{x:1030,y:350,w:330,h:290,label:"test",block:[1118,438,154,202],door:1195},
               prod:{x:1420,y:300,w:450,h:340,label:"production",block:[1548,352,196,288],door:1646}};
// where the track's stations are: main at its left end, the gates between, the test room's door, the production room's door
const BP_AT={main:470,pr:640,owner:800,checks:960,test:1195,approver:1420,prod:1646};
AG_PLACES.bpHall=c=>{dp_paintHall(c,{seed:12,horizon:650,vx:1040,lights:14,panes:6,haze:0.08,pools:[[260,980,520,0.10],[1650,900,520,0.08],[1080,800,760,0.05]]});
  // each room: a box of glass on the floor, clear, its edges catching the light, and in it its workspace, a block of clear glass
  for(const k of ["dev","test","prod"]){const r=BP_ROOM[k],[bx,by,bw,bh]=r.block;
    c.save();const g=c.createLinearGradient(0,r.y,0,r.y+r.h);g.addColorStop(0,"rgba(150,215,220,0.07)");g.addColorStop(1,"rgba(150,215,220,0.025)");c.fillStyle=g;c.fillRect(r.x,r.y,r.w,r.h);
    c.fillStyle="rgba(190,245,245,0.45)";c.fillRect(r.x,r.y,r.w,2);c.fillStyle="rgba(190,245,245,0.22)";c.fillRect(r.x,r.y,2,r.h);c.fillRect(r.x+r.w-2,r.y,2,r.h);
    // its top, seen a little from below: a thin band going back
    c.fillStyle="rgba(150,215,220,0.06)";c.beginPath();c.moveTo(r.x,r.y);c.lineTo(r.x+26,r.y-22);c.lineTo(r.x+r.w-26,r.y-22);c.lineTo(r.x+r.w,r.y);c.closePath();c.fill();
    c.strokeStyle="rgba(190,245,245,0.18)";c.lineWidth=1.2;c.stroke();
    const bg=c.createLinearGradient(bx,0,bx+bw,0);bg.addColorStop(0,"rgba(120,200,210,0.16)");bg.addColorStop(0.5,"rgba(120,200,210,0.06)");bg.addColorStop(1,"rgba(120,200,210,0.12)");c.fillStyle=bg;c.fillRect(bx,by,bw,bh);
    c.fillStyle="rgba(200,250,250,0.5)";c.fillRect(bx,by,bw,1.6);c.fillStyle="rgba(200,250,250,0.25)";c.fillRect(bx,by,1.4,bh);c.fillRect(bx+bw-1.4,by,1.4,bh);
    // the door at the block's foot, unlit
    c.fillStyle="rgba(6,18,22,0.9)";c.fillRect(r.door-22,by+bh-72,44,72);c.strokeStyle="rgba(190,245,245,0.3)";c.lineWidth=1.4;c.strokeRect(r.door-22,by+bh-72,44,72);
    // its gloss in the floor
    const rg=c.createLinearGradient(0,r.y+r.h,0,r.y+r.h+80);rg.addColorStop(0,"rgba(150,215,220,0.08)");rg.addColorStop(1,"rgba(150,215,220,0)");c.fillStyle=rg;c.fillRect(r.x,r.y+r.h,r.w,80);c.restore();}};
// the hall seen dim, behind the tools' pages
AG_PLACES.bpDesk=c=>{dp_paintHall(c,{seed:21,horizon:700,vx:900,lights:16,panes:8,haze:0.07,pools:[[1640,980,560,0.09]]});c.fillStyle="rgba(4,14,18,0.35)";c.fillRect(0,0,W,H);};

/* ---------------------------------------------------------------- the track and its gates */
// the track: a band of glass on the floor from x0 to x1 at BP_TRACK, a spur up to each door it serves; glow [from, to, a] lights a
// stretch of it in cyan, lit [from, to, a] in green (the path walked and passed)
function bp_track(ctx,o){o=o||{};const a=o.a==null?1:o.a;if(a<=0)return;const x0=BP_AT.main,x1=BP_AT.prod,y=BP_TRACK,u=o.lay==null?1:o.lay;
  ctx.save();ctx.globalAlpha*=a;const xe=lerp(x0,x1,ag_sine(u));
  ctx.save();ctx.shadowColor="rgba(120,220,230,0.35)";ctx.shadowBlur=18;rr(ctx,x0-12,y-13,xe-x0+24,26,13);ctx.fillStyle="rgba(10,30,36,0.85)";ctx.fill();ctx.restore();
  rr(ctx,x0-12,y-13,xe-x0+24,26,13);ctx.strokeStyle="rgba(190,245,245,0.55)";ctx.lineWidth=1.8;ctx.stroke();
  // spurs to the test and production doors
  for(const [k,need] of [["test",0.6],["prod",0.98]]){const sp=clamp((u-need)/0.1,0,1);if(sp<=0)continue;const dx=BP_ROOM[k].door;ctx.save();ctx.globalAlpha*=sp;
    rr(ctx,dx-10,BP_FLOOR,20,y-BP_FLOOR,8);ctx.fillStyle="rgba(10,30,36,0.85)";ctx.fill();ctx.strokeStyle="rgba(190,245,245,0.45)";ctx.lineWidth=1.4;ctx.stroke();ctx.restore();}
  const band=(f,t,al,col)=>{if(!(al>0))return;const c=dp_f(col),xa=lerp(x0,x1,f),xb=lerp(x0,x1,t);ctx.save();ctx.globalCompositeOperation="lighter";ctx.shadowColor=rgba(c,0.9);ctx.shadowBlur=16;
    rr(ctx,xa-6,y-4,xb-xa+12,8,4);ctx.fillStyle=rgba(c,0.85*al);ctx.fill();ctx.restore();};
  if(o.glow)band(o.glow[0],o.glow[1],o.glow[2],"cyan");if(o.lit)band(o.lit[0],o.lit[1],o.lit[2],"green");
  ctx.restore();}
// where along the track a station is, 0 to 1
const bp_along=x=>(x-BP_AT.main)/(BP_AT.prod-BP_AT.main);
// a gate: an arch of glass standing on the track at x, its label below the track; lit (0 to 1) turns it green
function bp_gate(ctx,x,label,o){o=o||{};const a=o.a==null?1:o.a;if(a<=0)return;const L=o.lit||0,k=o.k==null?1:ag_spr(0,0,1)*0+o.k,y=BP_TRACK,
    col=mix(DP.F.cyan,DP.F.green,L);ctx.save();ctx.globalAlpha*=a;ctx.translate(x,y);ctx.scale(1,lerp(0.3,1,clamp(k,0,1.2)));ctx.translate(-x,-y);
  ctx.save();ctx.shadowColor=rgba(col,0.8);ctx.shadowBlur=14;ctx.strokeStyle=rgba(mix(col,[255,255,255],0.35),1);ctx.lineWidth=5;ctx.lineCap="round";
  ctx.beginPath();ctx.moveTo(x-30,y+6);ctx.lineTo(x-30,y-56);ctx.quadraticCurveTo(x-30,y-86,x,y-86);ctx.quadraticCurveTo(x+30,y-86,x+30,y-56);ctx.lineTo(x+30,y+6);ctx.stroke();ctx.restore();
  ctx.save();ctx.beginPath();ctx.moveTo(x-28,y);ctx.lineTo(x-28,y-56);ctx.quadraticCurveTo(x-28,y-84,x,y-84);ctx.quadraticCurveTo(x+28,y-84,x+28,y-56);ctx.lineTo(x+28,y);ctx.closePath();
  ctx.fillStyle=rgba(col,0.10+0.12*L);ctx.fill();ctx.restore();ctx.restore();
  if(label){ctx.save();ctx.globalAlpha*=a*(o.la==null?1:o.la);dp_T(ctx,label,x,y+62,{w:700,size:28,align:"center",col:L>0.5?"green":"ink"});ctx.restore();}}
// the stations' names under the track: main, and the rooms' doors
function bp_station(ctx,x,text,o){o=o||{};const a=o.a==null?1:o.a;if(a<=0)return;ctx.save();ctx.globalAlpha*=a;
  ctx.fillStyle=rgba(DP.F.cyan,0.9);ctx.beginPath();ctx.arc(x,BP_TRACK,9,0,TAU);ctx.fill();
  if(text)dp_T(ctx,text,x,BP_TRACK+62,{w:500,size:30,align:"center",f:o.mono?"mono":undefined,col:o.col||"ink"});ctx.restore();}

/* ---------------------------------------------------------------- what the hall shows: bp_hall(ctx, t, st)
   st holds, for each thing, its alpha (0 hides it) and what it needs: rooms, two (the "02:00" slip), track {a, lay, glow, lit},
   gates [{x, label, a, lit, k}], main (the station), repo (GitHub's page at the left), mainLine (0 to 1, the branch line from the
   repo to the production door), team {a, lines, thief}, noGate, recs {a, flow, aside, lit}, leak, tray, branch (Jun's branch, 0 to 1),
   runner {a, u}, outline, priv, lock {a, lit}, note {a, u}, others {a, u}, agent, badge, lessons {a, u, lit}. */
function bp_hall(ctx,t,st){st=st||{};const A=v=>v==null?0:typeof v==="number"?v:(v.a==null?1:v.a);
  // the university's network, round the rooms and the runners
  if(A(st.outline)>0){const a=A(st.outline);ctx.save();ctx.globalAlpha*=a;ctx.setLineDash([14,10]);rr(ctx,404,222,1500,632,28);ctx.strokeStyle=rgba(DP.F.cyan,0.6);ctx.lineWidth=2;ctx.stroke();ctx.setLineDash([]);
    dp_T(ctx,"The university's network",440,262,{w:700,size:28,col:"cyan"});ctx.restore();}
  // the rooms' names, and what is lit inside production
  if(A(st.rooms)>0){ctx.save();ctx.globalAlpha*=A(st.rooms);for(const k of ["dev","test","prod"]){const r=BP_ROOM[k];dp_T(ctx,r.label,r.x+r.w/2,r.y-36,{w:700,size:30,align:"center"});}ctx.restore();}
  const P=BP_ROOM.prod,[pbx,pby,pbw,pbh]=P.block,door=[P.door,pby+pbh-36];
  if(A(st.doorLit)>0){const a=A(st.doorLit);ctx.save();ctx.globalAlpha*=a;const g=ctx.createLinearGradient(0,pby+pbh-72,0,pby+pbh);g.addColorStop(0,"rgba(220,250,250,0.9)");g.addColorStop(1,"rgba(160,230,235,0.75)");
    ctx.shadowColor="rgba(160,240,245,0.9)";ctx.shadowBlur=22;ctx.fillStyle=g;ctx.fillRect(P.door-22,pby+pbh-72,44,72);ctx.restore();dp_halo(ctx,P.door,pby+pbh-30,140,"cyan",0.12*a);}
  if(A(st.two)>0)dp_slip(ctx,P.x+18,P.y+18,"02:00",st.twoCol||"grey",{a:A(st.two),size:30,ink:true});
  if(st.recs&&A(st.recs)>0){const R=st.recs;bp_rows(ctx,pbx+28,pby+40,{a:A(R),n:8,w:pbw-56,h:16,gap:12,flow:R.flow,aside:R.aside,tray:[pbx-206,pby+176],from:[P.door,pby+pbh-30],lit:R.lit});}
  if(A(st.tray)>0)bp_tray(ctx,pbx-230,pby+150,170,"Set aside",A(st.tray));
  if(A(st.leak)>0){const u=A(st.leak);ctx.save();ctx.strokeStyle=rgba(DP.F.coral,1);ctx.lineWidth=3.4;ctx.shadowColor=rgba(DP.F.coral,0.8);ctx.shadowBlur=12;ctx.setLineDash([12,8]);
    const p=[P.door,pby+pbh-50,P.door+150,pby+pbh-110,P.x+P.w+40,pby+80,P.x+P.w+110,pby-10];ag_bzPath(ctx,p,0,u);ctx.stroke();ctx.restore();}
  // the track, the stations and the gates
  if(st.track&&A(st.track)>0)bp_track(ctx,st.track);
  if(A(st.main)>0)bp_station(ctx,BP_AT.main,"main",{a:A(st.main),mono:true});
  for(const g of st.gates||[])bp_gate(ctx,g.x,g.label,g);
  // the lock on production's door
  if(st.lock&&A(st.lock)>0){const L=st.lock;dp_lock(ctx,P.door,pby+pbh-112,46,L.lit>0.5?"cyan":"grey",0);if(L.lit>0)dp_halo(ctx,P.door,pby+pbh-112,120,"cyan",0.25*L.lit);}
  if(A(st.noGate)>0){const a=A(st.noGate);ctx.save();ctx.globalAlpha*=a;ctx.shadowColor=rgba(DP.F.coral,0.9);ctx.shadowBlur=16;ctx.strokeStyle=rgba(DP.F.coral,1);ctx.lineWidth=3;
    ctx.strokeRect(P.door-26,pby+pbh-76,52,76);ctx.restore();dp_tag(ctx,P.door+60,pby+pbh-190,"No gate","coral",{a,to:[P.door+26,pby+pbh-60]});}
  // GitHub's repository, its main branch, and the team who can push to it
  if(A(st.repo)>0){const a=A(st.repo);ctx.save();ctx.globalAlpha*=a;ctx.translate(-60*(1-ag_eo(a)),0);
    const b=dp_page(ctx,40,300,420,236,{tool:"github",name:"GitHub",title:"uni-example / data-platform"});dp_pill(ctx,b.x,b.y+56,"main","grey",{size:28});ctx.restore();}
  if(A(st.mainLine)>0){const u=A(st.mainLine),pts=[[250,536],[250,640],[BP_AT.main,BP_TRACK],[P.door,BP_TRACK],[P.door,pby+pbh-6]];bp_poly(ctx,pts,u,st.mainCol||"cyan");}
  if(st.team&&A(st.team)>0){const T=st.team;[[96,690,"jun"],[200,690,"sam"],[304,690,"noor"],[150,800,"x"],[254,800,"y"]].forEach(([x,y],i)=>{bp_mini(ctx,x,y,0.62,"cyan",A(T));
      if(T.lines>0)dp_link(ctx,[x,y+30],[BP_AT.main-14,BP_TRACK],"cyan",clamp(T.lines*1.4-i*0.1,0,1),{alpha:0.7,dot:false,lw:2});});
    if(T.thief>0){bp_mini(ctx,380,836,0.62,"grey",T.thief);dp_link(ctx,[380,866],[BP_AT.main-14,BP_TRACK+6],"grey",T.thief,{alpha:0.8,dot:false,lw:2,dash:[8,8]});}}
  // Jun's branch, from main up to the development room
  if(A(st.branch)>0){const D=BP_ROOM.dev;bp_poly(ctx,[[BP_AT.main,BP_TRACK],[BP_AT.main+60,BP_TRACK-60],[D.door,BP_TRACK-60],[D.door,D.block[1]+D.block[3]-6]],A(st.branch),"cyan",{dash:st.branchJoin>0?null:[10,8]});}
  // the runner, inside the university's network, and the private path from it to the rooms
  if(st.runner&&A(st.runner)>0){const R=st.runner,a=A(R),x=lerp(300,440,ag_eo(R.u==null?1:R.u));ctx.save();ctx.globalAlpha*=a;dp_panel(ctx,x,560,150,110,{col:"cyan",r:16});
    ctx.save();ctx.translate(x+75,620);ctx.scale(0.5,0.5);dp_gearPic(ctx,0,0,"cyan");ctx.restore();ctx.restore();
    if(R.label>0)dp_tag(ctx,440,474,"Runner group · university-network","cyan",{a:a*R.label,to:[x+75,560]});}
  if(A(st.priv)>0){const u=A(st.priv);for(const k of ["test","prod"]){const r=BP_ROOM[k];dp_link(ctx,[590,600],[r.x+12,r.y+r.h-30],"cyan",u,{dash:[10,8],alpha:0.9});}}
  // the note GitHub gives the deploy for one sign-in, sealed, travelling along the track; and notes from elsewhere that stop short
  if(st.others&&A(st.others)>0){const O=st.others;[[0,-150],[1,-40]].forEach(([i,dy])=>{const x=lerp(560,1270-i*120,ag_sine(O.u||0));dp_sealed(ctx,x,BP_TRACK-170+dy,330,"environment production",{sub:"from another branch",col:"grey",a:A(O)});});
    if(O.stop>0)dp_cross(ctx,1460,BP_TRACK-140,"coral",O.stop);}
  if(st.note&&A(st.note)>0){const N=st.note,u=N.u||0,x=lerp(N.x0||500,P.door-170,ag_sine(u)),y=lerp(N.y0||BP_TRACK-150,pby+pbh-200,ag_sine(u));
    dp_sealed(ctx,x,y,340,"registrar-loader",{sub:N.sub||"from GitHub Actions",a:A(N)});}
  if(A(st.agent)>0){ag_model(ctx,BP_AT.main-110,BP_TRACK-70,38,{t,a:A(st.agent)});}
  if(st.badge&&A(st.badge)>0){const B=st.badge;ctx.save();ctx.translate(B.x,B.y);ctx.scale(B.s,B.s);
    dp_badge(ctx,0,0,600,372,{kind:"Workload identity",title:"registrar-loader",lines:[["Owned by Sam Okafor"],["Its rights: the loader role"]],pic:dp_gearPic,t,a:A(B),behind:"bpHall"});ctx.restore();}}
// a line of light through points, drawn on (u 0 to 1) along its length
function bp_poly(ctx,pts,u,col,o){o=o||{};if(u<=0)return;const L=[];let tot=0;for(let i=1;i<pts.length;i++){const d=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);L.push(d);tot+=d;}
  let left=tot*clamp(u,0,1);const c=dp_f(col);ctx.save();ctx.strokeStyle=rgba(c,o.alpha==null?0.95:o.alpha);ctx.lineWidth=o.lw||3;ctx.lineCap="round";ctx.lineJoin="round";ctx.shadowColor=rgba(c,0.8);ctx.shadowBlur=10;
  if(o.dash)ctx.setLineDash(o.dash);ctx.beginPath();ctx.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length&&left>0;i++){const f=Math.min(1,left/L[i-1]);ctx.lineTo(lerp(pts[i-1][0],pts[i][0],f),lerp(pts[i-1][1],pts[i][1],f));left-=L[i-1];}
  ctx.stroke();ctx.restore();}

/* ---------------------------------------------------------------- the tools' pages, drawn as their docs show them on the day */
// GitHub's ruleset, as Settings shows it: its name, that it's active, its target, its rules, each with a tick as it's said, and its
// bypass list (empty: nobody)
const BP_RULES=["Restrict deletions","Block force pushes","Require a pull request before merging","Require review from Code Owners","Require approval of the most recent reviewable push","Require status checks to pass"];
function bp_ghRuleset(ctx,x,y,o){o=o||{};const a=o.a==null?1:o.a;if(a<=0)return;ctx.save();ctx.globalAlpha*=a;
  const b=dp_page(ctx,x,y,1240,700,{tool:"github",name:"GitHub",where:"Settings · Rules · Rulesets",title:"main: every change through review"});
  dp_field(ctx,b.x,b.y+10,"Enforcement status","Active",{col:"green"});dp_field(ctx,b.x+380,b.y+10,"Target branches","main",{mono:true});
  const ticks=o.ticks||[];BP_RULES.forEach((r,i)=>{const ry=b.y+128+i*52,u=ticks[i]||0;ctx.save();ctx.globalAlpha*=0.35+0.65*Math.min(1,u*2);dp_T(ctx,r,b.x+60,ry,{w:600,size:28});ctx.restore();dp_tick(ctx,b.x+20,ry-10,"green",u);});
  dp_field(ctx,b.x+760,b.y+10,"Bypass list","",{});if(o.bypass>0){dp_pill(ctx,b.x+760,b.y+58,"Nobody","green",{size:28,a:o.bypass});}
  ctx.restore();}
// the code owners file, as GitHub shows a file: its path, its lines in the code font; o.lines how many have come in
function bp_ghOwners(ctx,x,y,o){o=o||{};const a=o.a==null?1:o.a;if(a<=0)return;ctx.save();ctx.globalAlpha*=a;
  const b=dp_page(ctx,x,y,1240,330,{tool:"github",name:"GitHub",where:"main",title:".github/CODEOWNERS"});
  const L=[["registrar/","@uni-example/platform"],[".github/","@uni-example/platform @uni-example/data-governance"]];
  L.forEach((l,i)=>{const la=o.lines?clamp(o.lines[i]||0,0,1):1;if(la<=0)return;ctx.save();ctx.globalAlpha*=la;dp_T(ctx,l[0],b.x+10,b.y+40+i*58,{w:500,size:30,f:"mono",col:"cyan"});dp_T(ctx,l[1],b.x+220,b.y+40+i*58,{w:500,size:30,f:"mono"});ctx.restore();});
  ctx.restore();}
// a pull request's own copy of that file, greyed: a line added in it, which GitHub doesn't read
function bp_ghOwnersCopy(ctx,x,y,o){o=o||{};const a=o.a==null?1:o.a;if(a<=0)return;ctx.save();ctx.globalAlpha*=a;dp_panel(ctx,x,y,620,190,{col:"grey",r:18});
  dp_T(ctx,"In a pull request",x+30,y+52,{w:700,size:28,col:"mut"});dp_T(ctx,"registrar/  @someone-else",x+30,y+112,{w:500,size:28,f:"mono",col:"grey"});
  if(o.not>0){dp_pill(ctx,x+30,y+166,"Not read","coral",{size:28,a:o.not});}ctx.restore();}
// a pull request, as GitHub shows it: its title, who wants to merge it, its checks, one changed line, the reviews
function bp_ghPR(ctx,x,y,o){o=o||{};const a=o.a==null?1:o.a;if(a<=0)return null;ctx.save();ctx.globalAlpha*=a;
  const b=dp_page(ctx,x,y,1240,720,{tool:"github",name:"GitHub",where:"Pull requests · #212",title:o.title||"Set unreadable rows aside, load the rest"});
  dp_T(ctx,o.by||"Jun Park wants to merge into main",b.x,b.y+14,{w:600,size:28,col:"mut"});
  ctx.restore();return b;}
// a check on a pull request: a tick as it passes, its name
function bp_check(ctx,x,y,name,u,a){if(a<=0)return;ctx.save();ctx.globalAlpha*=a;dp_tick(ctx,x+20,y-10,"green",u);ctx.save();ctx.globalAlpha*=0.4+0.6*clamp(u*2,0,1);dp_T(ctx,name,x+56,y,{w:600,size:28});ctx.restore();ctx.restore();}
// a workflow run's jobs, as GitHub draws them: a box for each job, a line between them
function bp_ghRun(ctx,x,y,o){o=o||{};const a=o.a==null?1:o.a;if(a<=0)return null;ctx.save();ctx.globalAlpha*=a;
  const b=dp_page(ctx,x,y,1240,640,{tool:"github",name:"GitHub",where:"Actions · deploy.yml",title:o.title||"Set unreadable rows aside, load the rest"});
  ctx.restore();return b;}
function bp_job(ctx,x,y,name,o){o=o||{};const a=o.a==null?1:o.a;if(a<=0)return;ctx.save();ctx.globalAlpha*=a;dp_panel(ctx,x,y,360,o.h||150,{col:o.col||"grey",r:16,glowR:24});
  dp_T(ctx,name,x+76,y+56,{w:700,size:32,f:"mono"});if(o.tick>0)dp_tick(ctx,x+38,y+46,"green",o.tick);else if(o.wait>0){ctx.save();ctx.globalAlpha*=o.wait;ctx.strokeStyle=rgba(DP.T.mut,1);ctx.lineWidth=3;ctx.beginPath();ctx.arc(x+38,y+46,14,0,TAU);ctx.stroke();ctx.restore();}
  if(o.sub)dp_T(ctx,o.sub,x+30,y+108,{w:600,size:28,col:o.subCol||"mut",a:o.subA==null?1:o.subA});ctx.restore();}
// GitHub's box that asks a release approver: the environment waiting, who may approve, and its two buttons
function bp_ghReview(ctx,x,y,o){o=o||{};const a=o.a==null?1:o.a;if(a<=0)return null;ctx.save();ctx.globalAlpha*=a;if(o.k!=null)ag_about(ctx,x+500,y+330,lerp(0.94,1,o.k));
  dp_panel(ctx,x,y,1000,660,{col:"cyan",r:20,glowR:40});dp_T(ctx,"Review pending deployments",x+40,y+66,{w:700,size:36});
  ctx.fillStyle=rgba(DP.T.mut,0.4);ctx.fillRect(x+40,y+96,920,1.4);
  dp_tick(ctx,x+60,y+150,"cyan",1);dp_T(ctx,"production",x+96,y+160,{w:500,size:30,f:"mono"});dp_T(ctx,"Waiting for release-approvers",x+380,y+160,{w:600,size:28,col:"mut"});
  ctx.restore();return{x:x+40,y:y+200,w:920};}
// a button, as GitHub draws one: solid in its colour, dark words, or quiet
function bp_button(ctx,x,y,text,col,o){o=o||{};const a=o.a==null?1:o.a;if(a<=0)return 0;const w=dp_tw(ctx,text,{w:700,size:28})+56,h=58;ctx.save();ctx.globalAlpha*=a;
  if(col){const c=dp_f(col);ctx.save();ctx.shadowColor=rgba(c,0.6*(o.glow||0.5));ctx.shadowBlur=18;rr(ctx,x,y,w,h,10);ctx.fillStyle=rgba(c,1);ctx.fill();ctx.restore();dp_T(ctx,text,x+28,y+39,{w:700,size:28,col:DP.on});}
  else{rr(ctx,x,y,w,h,10);ctx.strokeStyle=rgba(DP.T.mut,0.8);ctx.lineWidth=1.6;ctx.stroke();dp_T(ctx,text,x+28,y+39,{w:700,size:28,col:"mut"});}
  if(o.press>0){ctx.save();ctx.globalCompositeOperation="lighter";rr(ctx,x,y,w,h,10);ctx.fillStyle=rgba([255,255,255],0.25*Math.sin(Math.PI*clamp(o.press,0,1)));ctx.fill();ctx.restore();}
  ctx.restore();return w;}
// a workflow file, as GitHub shows a file: its path, and its lines in the code font, each drawn by draw(ctx, x, y, i)
function bp_ghFile(ctx,x,y,path,o){o=o||{};const a=o.a==null?1:o.a;if(a<=0)return null;ctx.save();ctx.globalAlpha*=a;
  const b=dp_page(ctx,x,y,o.w||1240,o.h||560,{tool:"github",name:"GitHub",where:o.where||"main",title:path});ctx.restore();return b;}
// Databricks' page for the nightly job: its name, and fields under it
function bp_dbJob(ctx,x,y,w,h,o){o=o||{};const a=o.a==null?1:o.a;if(a<=0)return null;ctx.save();ctx.globalAlpha*=a;
  const b=dp_page(ctx,x,y,w,h,{tool:"databricks",name:"Databricks",where:o.where,title:o.title,behind:o.behind});ctx.restore();return b;}
