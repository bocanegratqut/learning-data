// test frames for the opening's places
scene("principles",(ctx,S,t,sc)=>{const P=["bpTable","bpRoad","bpChamber","bpSigning"],i=Math.min(3,Math.floor(t/10));
  ag_shots(ctx,S,t,sc.dur,[{at:0,place:P[i],keys:[[0,960,540,1]],push:0,draw:(x,tt)=>{
    if(i===0){const sp=bp_tablet(x,680,330,{a:1,lit:[1,1]});}
    if(i===1)bp_voters(x,tt,{});
    if(i===2){bp_seatsLit(x,{blocks:[1,1,1,1,1,1,1],boost:[0,1,1,1,1,1,1]});bp_benchLit(x,1);bp_book(x,880,300,{marks:[-1,-1,-1,-1,0.5,1,1,1,1],glow:0.5});bp_stamp(x,1010,690,"Not certified · 6 September 1996","coral",{});}
    if(i===3){bp_openBook(x,960,700,{close:0});bp_pen(x,1380,760,1);bp_goldSeal(x,1460,640,46,1);}
  }}]);setScreen(ctx,S);dp_kicker(ctx,"Opening story",["South Africa, 1993","April 1994","South Africa, 1996","South Africa, 1996"][i]);});
["sent","nogate","rules","review","door","supply","force"].forEach(id=>scene(id,(ctx,S,t,sc)=>{ag_shots(ctx,S,t,sc.dur,[{at:0,place:"hall",keys:[[0,960,540,1]],draw:(x,t)=>{}}]);}));
