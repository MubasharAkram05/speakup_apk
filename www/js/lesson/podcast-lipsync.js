/* ---- podcast listening ---- */
// PD = the playing podcast (lines, position, state). PG = counter to cancel old playbacks. PTO = pause between lines in ms.
var PD=null,PG=0,PTO=1600;
// pickVoice(speaker): picks a female English voice for Lucy (speaker 0) and a male one for the guest.
function pickVoice(sp){
  var vs=[];try{vs=speechSynthesis.getVoices().filter(function(v){return /^en/i.test(v.lang)})}catch(e){}
  if(!vs.length)return null;
  var f=vs.filter(function(v){return /female|zira|samantha|susan|google us english|hazel|fiona|karen|moira|tessa/i.test(v.name)}),
      m=vs.filter(function(v){return /david|daniel|mark|alex|george|fred|rishi|google uk english male|\bmale\b/i.test(v.name)&&!/female/i.test(v.name)});
  return sp===0?(f[0]||vs[0]):(m[0]||vs[vs.length>1?1:0]);
}
/* ---- lip sync: mouth follows the words Lucy speaks ---- */
// LIP = lip-sync state: animation running flag, timing numbers and the mouth shape being drawn.
var LIP={run:false,raf:0,id:0,mpw:62,cw:null,ev:null,tot:0,txt:"",base:0,aT:0,st:0,nb:0,wend:Infinity,k:0,rest:true,last:0,s:{w:9.5,h:.4,c:0,t:0}};
// VZ = mouth shapes (visemes): width, height, ... for closed, f/v, round, "oo", open, mid, smile ...
var VZ={cl:[10,.5,0,0],fv:[11,2.6,0,1],ro:[6.5,10,-.4,0],oo:[5.6,7,-.3,0],op:[11.5,13,0,1],md:[12,8,.8,1],sp:[13.5,5,1.5,1],sc:[10.5,4.5,0,.6],ss:[12,3.5,.8,1],tl:[11,5.5,0,1],pk:[8.5,6,-.3,.4],rs:[10,2,0,0]};
// lipBuild(text): converts the text to a timeline of mouth shapes (vowels / consonants -> viseme).
function lipBuild(txt){
  var t=txt.toLowerCase(),n=t.length,ev=[],cw=new Array(n+1),w=0,i=0,cons=false;
  function add(v,wt,len,push){for(var k=0;k<len;k++)cw[i+k]=w+wt*k/len;if(push)ev.push({w:w,v:VZ[v]});w+=wt;i+=len}
  function vow(v,wt,len){add(v,wt,len,true);cons=false}
  function con(v,wt,len,always){add(v,wt,len,always||!cons);cons=true}
  var V={a:"op",e:"md",i:"sp",o:"ro",u:"oo"},C={b:"cl",p:"cl",m:"cl",f:"fv",v:"fv",w:"oo",q:"oo",s:"ss",z:"ss",x:"ss",c:"ss",t:"tl",d:"tl",n:"tl",l:"tl",r:"pk",j:"pk"};
  while(i<n){
    var c=t.charAt(i),d=t.substr(i,2);
    if(/[a-z]/.test(c)){
      if(d==="th"){con("tl",1.2,2);continue}
      if(d==="sh"||d==="ch"){con("pk",1.2,2);continue}
      if(d==="ph"){con("fv",1.2,2,true);continue}
      if(d==="oo"||d==="ou"||d==="ow"||d==="ew"||d==="oa"||d==="oi"||d==="oy"){vow("ro",2.8,2);continue}
      if(d==="ee"||d==="ea"||d==="ie"){vow("sp",2.8,2);continue}
      if(d==="ai"||d==="ay"||d==="ei"||d==="ey"){vow("md",2.8,2);continue}
      if(d==="wh"){con("oo",1.2,2);continue}
      if(V[c]){vow(V[c],2.2,1);continue}
      if(c==="y"){var nx=t.charAt(i+1);if(/[a-z]/.test(nx))con("sc",.7,1);else vow("sp",2,1);continue}
      if(c==="h"){add("sc",.4,1,false);continue}
      var v=C[c]||"sc";con(v,.7,1,v==="cl"||v==="fv");continue;
    }
    if(/[0-9]/.test(c)){vow("op",1.8,1);continue}
    if(/\s/.test(c)){cw[i]=w;i++;cons=false;continue}
    if(/[.,!?;:]/.test(c)){add("rs",.8,1,true);cons=false;continue}
    cw[i]=w;i++;
  }
  cw[n]=w;ev.push({w:w,v:VZ.rs});
  return{cw:cw,ev:ev,tot:w,txt:t};
}
// lipDraw(): draws the current mouth shape on Lucy's face (SVG).
function lipDraw(){
  var mk=document.querySelector(".scn .mk");if(mk)mk.style.transform="scale("+(1+(LIP.s.w-10)*.006)+","+(1+Math.min(LIP.s.h,13)*.0075)+")";
  var m=document.querySelector(".scn .mo .lm"),t=document.querySelector(".scn .mo .lt");if(!m||!t)return;
  var s=LIP.s,cx=160,cy=96.5,w=s.w,h=Math.max(0,s.h),u=h*.3,l=h*.7,c=s.c,x0=cx-w,x1=cx+w,k=w*.55,yc=cy-c;
  m.setAttribute("d","M"+x0+" "+yc+"C"+(x0+k)+" "+(yc-u*1.3)+" "+(x1-k)+" "+(yc-u*1.3)+" "+x1+" "+yc+"C"+(x1-k)+" "+(yc+l*1.3)+" "+(x0+k)+" "+(yc+l*1.3)+" "+x0+" "+yc+"Z");
  var tw=w*.58,th=Math.min(3,h*.36),ty=yc-u+.9;
  if(s.t>.15&&h>1.6){
    t.setAttribute("d","M"+(cx-tw)+" "+ty+"Q"+cx+" "+(ty-1.3)+" "+(cx+tw)+" "+ty+"L"+(cx+tw-1)+" "+(ty+th)+"Q"+cx+" "+(ty+th-1.5)+" "+(cx-tw+1)+" "+(ty+th)+"Z");
    t.setAttribute("opacity",Math.min(1,s.t));
  }else t.setAttribute("opacity","0");
}
// lipFrame(time): animation frame - moves the mouth smoothly towards the next shape.
function lipFrame(now){
  if(!LIP.run)return;
  var dt=Math.min(64,now-LIP.last);LIP.last=now;
  var tg=VZ.rs;
  if(!LIP.rest&&LIP.ev){
    var wp=LIP.base+(now-LIP.aT)/(LIP.mpw*1.04);
    if(LIP.tot>12&&wp>=LIP.tot){var ls=LIP.tot-10;wp=ls+((wp-ls)%10)}
    else if(wp>=LIP.tot)wp=LIP.tot-.01;
    var ev=LIP.ev,k=LIP.k;
    while(k+1<ev.length&&ev[k+1].w<=wp)k++;
    while(k>0&&ev[k].w>wp)k--;
    LIP.k=k;tg=ev[k].v;
  }
  var a=1-Math.exp(-dt/32),s=LIP.s;
  s.w+=(tg[0]-s.w)*a;s.h+=(tg[1]-s.h)*a;s.c+=(tg[2]-s.c)*a;s.t+=(tg[3]-s.t)*a;
  lipDraw();
  LIP.raf=requestAnimationFrame(lipFrame);
}
// lipAnchor(charIndex): syncs the mouth to the character the speech voice is currently reading.
function lipAnchor(ci){
  if(!LIP.cw)return;
  var now=performance.now();
  ci=Math.max(0,Math.min(ci|0,LIP.cw.length-1));
  if(LIP.lastCi>=0&&ci<=LIP.lastCi)return;
  LIP.lastCi=ci;
  var w=LIP.cw[ci],dw=w-LIP.base,dtm=now-LIP.aT;
  if(ci>0){
    LIP.nb++;
    if(dw>2&&dtm>40){LIP.mpw=Math.max(30,Math.min(130,LIP.mpw*.6+dtm/dw*.4))}
  }
  LIP.base=w;LIP.aT=now;
  var t=LIP.txt,j=ci;
  while(j<t.length&&/[a-z0-9']/.test(t.charAt(j)))j++;
  LIP.wend=LIP.cw[j];
}
// lipStart(text): starts lip animation for a line of speech.
function lipStart(txt){
  var b=lipBuild(txt);
  LIP.cw=b.cw;LIP.ev=b.ev;LIP.tot=b.tot;LIP.txt=b.txt;LIP.k=0;LIP.rest=false;
  LIP.base=0;LIP.aT=LIP.st=performance.now();LIP.wend=Infinity;LIP.nb=0;LIP.lastCi=-1;
  if(!LIP.run){LIP.run=true;LIP.last=performance.now();LIP.raf=requestAnimationFrame(lipFrame)}
  return ++LIP.id;
}
// lipEnd(): the voice finished - learns the speaking speed and closes the mouth.
function lipEnd(){
  if(LIP.nb===0&&LIP.tot>8&&LIP.st){LIP.mpw=Math.max(30,Math.min(130,LIP.mpw*.5+(performance.now()-LIP.st)/LIP.tot*.5))}
  LIP.rest=true;
}
// lipStop(): stops the mouth animation immediately.
function lipStop(){var mk=document.querySelector(".scn .mk");if(mk)mk.style.transform="";LIP.run=false;LIP.rest=true;LIP.id++;try{cancelAnimationFrame(LIP.raf)}catch(e){}}
