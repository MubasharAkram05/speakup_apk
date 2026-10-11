/* ---- intro camera: close-ups like Duolingo, then zoom out before the first exercise ---- */
// SH = camera positions (x, y, zoom) for the intro close-ups: microphone, mixing desk, Lucy.
var SH={mic:{x:238,y:168,k:4.5},mix:{x:73,y:214,k:6.2},lucy:{x:160,y:119,k:1.5}};
// camBox(): HTML of the scene used for the camera intro.
function camBox(sp){return '<div class="bcs"><div class="camv zm'+(sp?' mixing':'')+'" id="camv"'+(sp?' data-a="nx"':'')+'><div class="scn">'+LUCY+'<div class="sbb" id="pbub"></div></div>'+(sp?'<div class="spb off" id="spb"><div class="sbadge"><div class="sface">'+LUCY.replace('class="lucy" viewBox="0 16 320 292"','viewBox="152 20 112 92"')+'</div><div class="slab">ASK LUCY</div></div></div>':'')+'</div></div>'}
// camTo(shot, noAnimation): moves / zooms the camera to a position.
function camTo(sh,na){
  var cv=document.getElementById("camv"),sc=cv&&cv.querySelector(".scn");if(!sc)return;
  var H=cv.clientHeight,sw=sc.offsetWidth,u=sw/320,k=sh.k;
  if(na)sc.style.transition="none";
  sc.style.transform="translate("+(sw/2-k*sh.x*u)+"px,"+(H*.46-k*(sh.y-16)*u)+"px) scale("+k+")";
  if(na){void sc.offsetWidth;sc.style.transition=""}
}
// camInit(step): sets the starting camera for a splash step.
function camInit(s){if(s.t==="splash")document.getElementById("ls").classList.add("nohud");camTo(s.t==="splash"?SH.mix:SH.lucy,1)}
// spbPlace(): positions the speech bubble next to the microphone.
function spbPlace(){
  var cv=document.getElementById("camv"),sc=cv&&cv.querySelector(".scn"),b=document.getElementById("spb"),bd=b&&b.firstChild;if(!sc||!bd)return;
  var m=SH.mic,ku=m.k*sc.offsetWidth/320,H=cv.clientHeight;
  var top=H*.46+ku*(161-m.y),by=top-H*.1;
  bd.style.transform="";
  b.style.top=Math.max(4,by-bd.offsetHeight)+"px";b.style.transform="";
}
// splashRun(step): the animated "Welcome to Ask Lucy" intro before the first listening exercise.
function splashRun(s){
  var ok=function(){return inL&&L&&L.steps[L.i]===s&&!L.fail},done=0,shown=0;
  var W="Welcome to Ask Lucy, where people ask me anything and everything.",AK=W.indexOf("Ask");
  function showB(){if(shown||!ok())return;shown=1;var b=document.getElementById("spb");if(b)b.classList.remove("off")}
  function fin(){
    if(done||!ok())return;done=1;
    var b=document.getElementById("spb");if(b)b.classList.add("off");
    var cv=document.getElementById("camv");if(cv)cv.classList.remove("mshot");
    camTo(SH.lucy);
    setTimeout(function(){if(ok())nx()},1300);
  }
  setTimeout(function(){
    if(!ok())return;
    var cv=document.getElementById("camv");if(!cv)return;
    cv.classList.remove("mixing");cv.classList.add("mshot");
    document.getElementById("ls").classList.remove("nohud");
    camTo(SH.mic);spbPlace();
    var tmo=setTimeout(fin,9000);
    setTimeout(function(){
      if(!ok())return;
      if(typeof SpeechSynthesisUtterance==="undefined"||!window.speechSynthesis){clearTimeout(tmo);setTimeout(showB,900);setTimeout(fin,5200);return}
      try{
        speechSynthesis.cancel();
        var u=new SpeechSynthesisUtterance(W);u.lang="en-US";u.rate=.92;u.pitch=1.2;
        var v=pickVoice(0);if(v)u.voice=v;
        u.onboundary=function(e){if(e.charIndex>=AK)showB()};
        u.onend=function(){showB();clearTimeout(tmo);setTimeout(fin,500)};
        u.onerror=function(){showB();clearTimeout(tmo);setTimeout(fin,3000)};
        speechSynthesis.speak(u);
        clearTimeout(tmo);tmo=setTimeout(fin,14000);
        setTimeout(showB,1500);
      }catch(e){clearTimeout(tmo);setTimeout(showB,900);setTimeout(fin,5200)}
    },300);
  },1700);
}
// zoomOut(callback): camera zooms out to the full scene, then calls the callback.
function zoomOut(cb){
  var cv=document.getElementById("camv"),sc=cv&&cv.querySelector(".scn");
  if(!sc){cb();return}
  var nh=sc.offsetWidth*292/320;
  cv.style.height=cv.offsetHeight+"px";void cv.offsetHeight;
  cv.style.transition="height 1.1s cubic-bezier(.45,0,.2,1)";cv.style.height=nh+"px";
  sc.style.transform="translate(0px,0px) scale(1)";
  setTimeout(cb,1150);
}
// podUi(line): shows the speech bubble and highlights who is talking; closes the mouth for the guest.
function podUi(l){
  var b=document.getElementById("pbub");if(!b)return;
  var st=b.parentNode;if(st)st.classList.toggle("hs",!!l&&l.sp===0);
  if(!l||l.sp!==0)lipStop();
  if(!l){b.className="sbb";b.innerHTML="";return}
  if(l.sp===0){b.className="sbb";b.innerHTML="";return}b.className="sbb on c";b.innerHTML='<span class="pav">'+l.e+'</span><span class="dots"><i></i><i></i><i></i><i></i></span>';
}
// setPl(on): switches the play button icon between play and pause.
function setPl(on){var b=document.getElementById("ppl");if(b)b.innerHTML=on?IC_P:IC_Y}
// podStop(): stops the podcast, the lip sync and any speech.
function podStop(){if(PD)PD.on=false;lipStop();try{speechSynthesis.cancel()}catch(e){}}
// podPlay(lines, from, to, auto, step): starts reading lines [from, to) aloud one by one.
function podPlay(lines,from,to,auto,step){
  podStop();
  PD={lines:lines,i:from||0,to:to==null?lines.length:to,auto:!!auto,step:step||null,on:true,done:false,gen:++PG};
  setPl(1);podNext(PD.gen);
}
// podNext(generation): speaks the next line, then waits PTO ms. Stops if a newer playback has started.
function podNext(g){
  if(!PD||PD.gen!==g||!PD.on)return;
  if(PD.i>=PD.to){
    var stp=PD.step,au=PD.auto;PD.on=false;PD.done=true;podUi(null);setPl(0);
    if(au&&stp)setTimeout(function(){if(!(inL&&L&&L.steps[L.i]===stp&&!L.fail))return;if(stp.intro)zoomOut(function(){if(inL&&L&&L.steps[L.i]===stp&&!L.fail)nx()});else nx()},450);
    return;
  }
  var l=PD.lines[PD.i];podUi(l);var tk=l.sp===0?lipStart(l.x):0;
  function nxt(){if(PD&&PD.gen===g&&PD.on){PD.i++;setTimeout(function(){podNext(g)},350)}}
  if(typeof SpeechSynthesisUtterance==="undefined"||!window.speechSynthesis){setTimeout(function(){if(tk&&tk===LIP.id)lipEnd();nxt()},PTO);return}
  var u=new SpeechSynthesisUtterance(l.x);u.lang="en-US";u.rate=.92;u.pitch=l.p||1;
  var v=pickVoice(l.sp);if(v)u.voice=v;
  u.onstart=function(){if(tk&&tk===LIP.id)lipAnchor(0)};u.onboundary=function(e){if(tk&&tk===LIP.id&&(e.name==="word"||e.name==null))lipAnchor(e.charIndex)};u.onend=function(){if(tk&&tk===LIP.id)lipEnd();nxt()};u.onerror=function(){if(tk&&tk===LIP.id)lipEnd();nxt()};
  try{speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){setTimeout(nxt,PTO)}
}
// pod(action): handles the podcast buttons - pt = play / pause, pk = back 5 seconds, pf = forward.
function pod(a){
  var s=L.steps[L.i];if(!s||!s.pl)return;
  var seg=s.t==="pod",from=seg?s.from:Math.max(0,s.at-1),to=seg?s.to:s.at;if(s.rp){from=s.rp[0];to=s.rp[1]}
  if(a==="pt"){
    if(PD&&PD.on){var i=PD.i;podStop();PD.i=i;podUi(null);setPl(0)}
    else{var st=PD&&!PD.done&&PD.i>=from&&PD.i<to?PD.i:from;podPlay(s.pl,st,to,seg,s)}
  }
  if(a==="pk")podPlay(s.pl,Math.max(from,(PD?PD.i:from)-1),to,seg,s);
  if(a==="pf"&&seg)podPlay(s.pl,Math.min(to-1,(PD?PD.i:from)+1),to,seg,s);
}
// bcs(): wrapper that draws the broadcast studio scene with content on top.
function bcs(x,bh,solo){return '<div class="bcs'+(solo?' solo':'')+'" style="--bh:'+bh+'px">'+studio()+'<div class="bq">'+x+'</div></div>'}
// LUCY = SVG picture of Lucy at her radio desk (template string - do not add comments inside).
var LUCY=`<svg class="lucy" viewBox="0 16 320 292" role="img" aria-label="Lucy at her radio desk"><defs><linearGradient id="shg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#9ccbf5"/></linearGradient><linearGradient id="lucyTop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fdebc8"/><stop offset=".55" stop-color="#f3cd96"/><stop offset="1" stop-color="#e5b377"/></linearGradient><linearGradient id="lucyFront" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8a96d"/><stop offset="1" stop-color="#bd8c54"/></linearGradient><linearGradient id="lucyShade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a4d22" stop-opacity=".38"/><stop offset="1" stop-color="#7a4d22" stop-opacity="0"/></linearGradient></defs>
<g class="lfig"><rect x="126" y="114" width="164" height="110" rx="30" fill="#7c858b"/><rect x="126" y="114" width="164" height="10" rx="5" fill="#8f979d"/>
<g transform="rotate(10 274 196)"><rect x="262" y="112" width="28" height="92" rx="14" fill="#4b565d"/><rect x="269" y="134" width="11" height="42" rx="5" fill="#404b52"/></g>
<g transform="translate(48 0)">
<path d="M114 76C112 40 134 24 160 24C186 24 208 40 206 76L214 164C216 178 210 188 200 190L120 190C110 188 104 178 106 164Z" fill="#5d4037"/>
<path d="M84 206C86 160 100 132 134 124H186C220 132 234 160 236 206Z" fill="url(#shg)"/>
<path d="M186 130C204 138 226 160 232 206H214C212 170 202 148 184 138Z" fill="#8fc0ee" opacity=".35"/>
<rect x="150" y="100" width="20" height="30" rx="8" fill="#e9bd9a"/>
<path d="M148 124L160 148L172 124Z" fill="#e9bd9a"/>
<path d="M134 124L152 126L160 150L138 142Z" fill="#fff" stroke="#c9dff3" stroke-width="1.6" stroke-linejoin="round"/>
<path d="M186 124L168 126L160 150L182 142Z" fill="#fff" stroke="#c9dff3" stroke-width="1.6" stroke-linejoin="round"/>
<circle cx="160" cy="166" r="2.8" fill="#7fb2e0"/><circle cx="160" cy="186" r="2.8" fill="#7fb2e0"/>
<g class="head">
<ellipse cx="160" cy="76" rx="37" ry="41" fill="#f6d3b6"/>
<path d="M158 86q2 3 5 0" stroke="#cf9d7c" stroke-width="2.4" stroke-linecap="round" fill="none"/>
<path d="M137 64q9-5 17-1M166 63q9-4 17 1" stroke="#4e342e" stroke-width="3" stroke-linecap="round" fill="none"/>
<g class="eyes"><ellipse cx="146" cy="76" rx="4.4" ry="5.2" fill="#4e342e"/><ellipse cx="174" cy="76" rx="4.4" ry="5.2" fill="#4e342e"/></g><g class="gls" transform="translate(124 52.85) scale(.0913)"><path d="M394,218C300,165 150,148 45,155L18,178C25,200 45,230 65,275C85,330 110,355 160,370C230,385 320,365 360,320C380,298 385,262 394,262Z" fill="#000"/><path d="M394,218C300,165 150,148 45,155L18,178C25,200 45,230 65,275C85,330 110,355 160,370C230,385 320,365 360,320C380,298 385,262 394,262Z" fill="#000" transform="translate(788 0) scale(-1 1)"/><path d="M28,172L150,28Q168,8 205,14" fill="none" stroke="#000" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/><path d="M28,172L150,28Q168,8 205,14" fill="none" stroke="#000" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" transform="translate(788 0) scale(-1 1)"/><path d="M394,218C420,224 420,224 394,262" fill="none"/></g>
<path class="mc" d="M147 96q13 10 26 0" stroke="#b5513b" stroke-width="3.4" stroke-linecap="round" fill="none"/>
<g class="mo"><path class="lm" d="M150.5 96.5C155 96.2 165 96.2 169.5 96.5C165 97 155 97 150.5 96.5Z" fill="#8a3a3a" stroke="#b5513b" stroke-width="2.4" stroke-linejoin="round"/><path class="lt" d="" fill="#fff" opacity="0"/></g>
<g class="mk"><path d="M128 86C140 90 150 87 160 87C170 87 180 90 192 86C196 96 194 102 188 107C182 112 174 115 160 116C146 115 138 112 132 107C126 102 124 96 128 86Z" fill="#eaf5fd" stroke="#b7d8ee" stroke-width="1.5" stroke-linejoin="round"/><path d="M132 95Q160 100 188 95M133 102Q160 107 187 102M139 109Q160 113 181 109" stroke="#c6e0f1" stroke-width="1.8" stroke-linecap="round" fill="none"/><path d="M144 88Q160 84 176 88" stroke="#b7d8ee" stroke-width="1.6" stroke-linecap="round" fill="none"/></g>
<path d="M160 28C136 28 116 46 116 78C116 98 112 124 104 156C118 164 130 156 134 144C130 122 130 100 133 86C144 76 154 60 160 44Z" fill="#6d4c41"/>
<path d="M160 28C184 28 204 46 204 78C204 98 208 124 216 156C202 164 190 156 186 144C190 122 190 100 187 86C176 76 166 60 160 44Z" fill="#6d4c41"/>
<path d="M121 92C119 120 116 138 113 150M199 92C201 120 204 138 207 150" stroke="#8d6e63" stroke-width="3" stroke-linecap="round" fill="none" opacity=".7"/>
</g>
</g>
<path d="M276 146Q300 180 248 200" stroke="#c9e2f8" stroke-width="22" stroke-linecap="round" fill="none"/></g>
<path d="M38 254H282V294a8 8 0 0 1-8 8H46a8 8 0 0 1-8-8Z" fill="#f6c98c"/><rect x="38" y="254" width="244" height="12" fill="#ecb978"/><path d="M28 208a22 22 0 0 1 22-22H270a22 22 0 0 1 22 22V244a14 14 0 0 1-14 14H42a14 14 0 0 1-14-14Z" fill="#f4c88c"/><path d="M28 208a22 22 0 0 1 22-22H270a22 22 0 0 1 22 22V234a12 12 0 0 1-12 12H40a12 12 0 0 1-12-12Z" fill="#fcd9a6"/><path d="M33 206a18 18 0 0 1 18-15H140" stroke="#fff1d6" stroke-width="3" stroke-linecap="round" fill="none" opacity=".9"/><g transform="translate(80 218) rotate(26) scale(-1 1)"><rect x="-38" y="-24" width="76" height="48" rx="10" fill="#4a565d"/><rect x="-38" y="-24" width="76" height="7" rx="3.5" fill="#5c6a72"/><rect x="-31" y="-13" width="14" height="11" rx="3.5" fill="#ff9a14"/><rect x="-15" y="-13" width="14" height="11" rx="3.5" fill="#ff9a14"/><rect x="-31" y="0" width="14" height="11" rx="3.5" fill="#ff9a14"/><rect x="-15" y="0" width="14" height="11" rx="3.5" fill="#ff9a14"/><circle cx="-24" cy="15" r="6" fill="#3a4449"/><rect x="6" y="-15" width="4" height="19" rx="2" fill="#2b363c"/><rect x="26" y="-15" width="4" height="19" rx="2" fill="#2b363c"/><rect x="3" y="8" width="29" height="10" rx="4" fill="#7cc8ff"/><g class="hnd"><rect x="2" y="-23" width="12" height="11.5" rx="5.75" fill="#3c3c3c"/><rect x="22" y="-18" width="12" height="11.5" rx="5.75" fill="#3c3c3c"/><rect x="6" y="17" width="24" height="17" rx="4" fill="#ffb200"/><g fill="none" stroke="#fccaa4" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 -13.3L15 9" stroke-width="9.6"/><path d="M28 -8.3L21 9" stroke-width="9.6"/></g><ellipse cx="18" cy="13" rx="13" ry="11" fill="#fccaa4"/></g></g><ellipse cx="146" cy="231" rx="23" ry="7.5" fill="#fff" stroke="#d3dee6" stroke-width="2"/><ellipse cx="146" cy="230" rx="14" ry="4.4" fill="none" stroke="#e3ecf2" stroke-width="1.6"/><circle cx="162.5" cy="221" r="5.6" fill="none" stroke="#d3dee6" stroke-width="5"/><circle cx="162.5" cy="221" r="5.6" fill="none" stroke="#fff" stroke-width="2.8"/><path d="M131 214q0 17 15 17q15 0 15-17z" fill="#fff" stroke="#dbe5ec" stroke-width="1.6" stroke-linejoin="round"/><path d="M135 222q3 6 9 7" stroke="#e8eff4" stroke-width="2.4" stroke-linecap="round" fill="none"/><ellipse cx="146" cy="214" rx="15" ry="5" fill="#fff" stroke="#dbe5ec" stroke-width="1.6"/><ellipse cx="146" cy="214.3" rx="12.3" ry="3.7" fill="#d49a62"/><path d="M141 214q3-1.6 6 0t5-.4" stroke="#8d5b36" stroke-width="1.1" stroke-linecap="round" fill="none"/><path d="M142 207q-3-4 0-7q3-3 0-6M150 208q-3-4 0-7q3-3 0-6" stroke="#b7c3cb" stroke-width="2" stroke-linecap="round" fill="none" opacity=".85"/><g transform="translate(210 222) rotate(8)"><rect x="-35" y="-26" width="35" height="52" rx="3" fill="#fff" stroke="#e1e9ee" stroke-width="1.2"/><rect x="0" y="-24" width="29" height="49" rx="3" fill="#f1f5f8" stroke="#e1e9ee" stroke-width="1.2"/><path d="M0 -26V26" stroke="#d0dae0" stroke-width="1.6"/><rect x="-29" y="-17" width="22" height="3" rx="1.5" fill="#b9c5cc"/><rect x="-29" y="-8" width="24" height="3" rx="1.5" fill="#b9c5cc"/><rect x="-29" y="1" width="20" height="3" rx="1.5" fill="#b9c5cc"/><rect x="-29" y="10" width="23" height="3" rx="1.5" fill="#b9c5cc"/><rect x="-29" y="19" width="14" height="3" rx="1.5" fill="#b9c5cc"/><rect x="5" y="-14" width="18" height="3" rx="1.5" fill="#b9c5cc"/><rect x="5" y="-5" width="20" height="3" rx="1.5" fill="#b9c5cc"/><rect x="5" y="4" width="13" height="3" rx="1.5" fill="#b9c5cc"/></g><rect x="225" y="189" width="28" height="16" rx="8" fill="#f6d3b6"/><ellipse cx="254" cy="230" rx="18" ry="6.5" fill="#3f4a52"/><ellipse cx="254" cy="227" rx="18" ry="6.5" fill="#52616a"/><rect x="248.5" y="202" width="11" height="26" rx="5.5" fill="#5b6972"/><rect x="250.6" y="203" width="2.4" height="24" rx="1.2" fill="#7a8991" opacity=".7"/><g transform="translate(264 198) rotate(-40)"><rect x="-13.5" y="-48" width="27" height="46" rx="13.5" fill="#3c3c3f"/><rect x="-9" y="-40" width="4" height="28" rx="2" fill="#5a5c61" opacity=".75"/><rect x="-14.5" y="-9" width="29" height="13" rx="6" fill="#55636c"/></g><circle cx="264" cy="200" r="10" fill="#4e5c65"/>
</svg>`;
// studio(): HTML of the studio scene (Lucy + speech bubble).
function studio(){return '<div class="studio"><div class="scn">'+LUCY+'<div class="sbb" id="pbub"></div></div></div>'}
// IC_B, IC_P, IC_Y ... = small SVG icons for the podcast buttons (back, play, pause ...).
var IC_B='<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 9a13 13 0 1 1-12 8.5" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M21 2.5L13.5 9 21 15.5" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><text x="20.5" y="27" text-anchor="middle" font-size="15" font-weight="800" fill="currentColor" font-family="Nunito,system-ui,sans-serif">5</text></svg>',
IC_F='<svg viewBox="0 0 40 40" aria-hidden="true"><g transform="translate(40 0) scale(-1 1)"><path d="M20 9a13 13 0 1 1-12 8.5" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M21 2.5L13.5 9 21 15.5" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></g><text x="19.5" y="27" text-anchor="middle" font-size="15" font-weight="800" fill="currentColor" font-family="Nunito,system-ui,sans-serif">5</text></svg>',
IC_P='<svg viewBox="0 0 40 40" aria-hidden="true"><rect x="9" y="6" width="8" height="28" rx="4" fill="currentColor"/><rect x="23" y="6" width="8" height="28" rx="4" fill="currentColor"/></svg>',
IC_Y='<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M13 8L32 20L13 32Z" fill="currentColor" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/></svg>';
// pctl(): the podcast control buttons (back, play / pause, forward).
function pctl(q){return '<div class="pctl"><button class="icon ghost" data-a="pk" aria-label="Back 5 seconds">'+IC_B+'</button><button class="icon" id="ppl" data-a="pt" aria-label="Pause or play">'+IC_P+'</button><button class="icon ghost" data-a="pf" aria-label="Forward 5 seconds"'+(q?' disabled':'')+'>'+IC_F+'</button></div>'}
// others(unit, n, filter): n random other units (used for wrong answers).
function others(d,n,f){return BASE.filter(function(u){return u.id!==d.id&&(!f||f(u))}).sort(rnd).slice(0,n)}
// cw(line, minLength): list of the longer real words of a line (candidates for the "choose 3 words" question).
function cw(line,min){var seen={},o=[];wd(line).forEach(function(w){var k=w.toLowerCase();if(/^[A-Za-z]+$/.test(w)&&w.length>=min&&!seen[k]){seen[k]=1;o.push(w.toLowerCase())}});return o}
// sh2(array): a shuffled copy of the array.
function sh2(a){return a.slice().sort(rnd)}
// listenLesson(unit): builds the whole podcast lesson: Lucy's intro, dialogue segments, questions about it.
function listenLesson(d){
  var s=d.s,x=hash(d.id||d.t),G=M[x%5],H=["👩‍💼","Lucy"],ch=d.ch||["How are you today?","I am fine, thank you.","I am a banana."];
  function a(i){return s[(x+i)%s.length]}
  function ln(sp,tx){return{sp:sp,e:sp?G[0]:H[0],n:sp?G[1]:H[1],x:tx,p:sp?.85:1.2}}
  var topic=d.t.toLowerCase();
  var intro=[ln(0,"I am Lucy. Today's topic is "+topic+"."),ln(0,"Here are some words you need to know.")];
  var C=[ln(0,"Hello, you are on Ask Lucy. Who is calling?"),ln(1,"Hi Lucy, my name is "+G[1]+". I need some help."),ln(0,"Of course. What is your question?"),ln(1,ch[0]),ln(0,ch[1]),ln(1,a(0)),ln(0,a(1)),ln(1,"Thank you so much, Lucy. That really helps."),ln(0,"You are welcome. Thanks for calling Ask Lucy. Goodbye!")];
  var txt=C.slice(3,7).map(function(l){return l.x}).join(" "),pool=cw(txt,6);
  if(pool.length<4)pool=cw(txt,4);
  if(pool.length<4)pool=pool.concat(d.w.map(function(w){return w[0].toLowerCase()}));
  var ws=pool.filter(function(w,i){return pool.indexOf(w)===i}).sort(rnd).slice(0,4),ro=ws.map(function(_,i){return i}).sort(rnd);
  var oth=others(d,3),st=[];
  st.push({t:"splash"});
  st.push({t:"pod",pl:intro,from:0,to:2,intro:1,topic:d.t});
  st.push({t:"pairs",ws:ws,ro:ro});
  st.push({t:"pod",pl:C,from:0,to:4,ring:1});
  var t1=Math.random()<.5;
  st.push({t:"tf",pl:C,at:3,rp:[1,3],q:t1?G[1]+" is calling Lucy to ask for help.":"Lucy is calling "+G[1]+" to ask for help.",o:["True","False"],a:t1?0:1});
  var qo=[ch[0]].concat(others(d,2,function(u){return u.ch&&u.ch[0]}).map(function(u){return u.ch[0]})).sort(rnd);
  st.push({t:"pq",pl:C,at:4,rp:[3,4],q:"What does "+G[1]+" ask?",o:qo,a:qo.indexOf(ch[0])});
  st.push({t:"pod",pl:C,from:4,to:5});
  var rp=[ch[1]].concat(others(d,2,function(u){return u.ch&&u.ch[1]}).map(function(u){return u.ch[1]})).sort(rnd);
  st.push({t:"pq",pl:C,at:5,rp:[4,5],q:"How did Lucy answer?",o:rp,a:rp.indexOf(ch[1])});
  st.push({t:"pod",pl:C,from:5,to:7});
  var line=C[6].x,words=cw(line,5);if(words.length<3)words=cw(line,4);
  var ans=words.sort(rnd).slice(0,3),used=cw(line,1),dis=[];
  oth.forEach(function(u){cw(u.s[0]+" "+u.s[1],5).forEach(function(w){if(used.indexOf(w)<0&&dis.indexOf(w)<0)dis.push(w)})});
  dis=dis.sort(rnd).slice(0,2);while(dis.length<2)dis.push(["table","window","garden"][dis.length]);
  st.push({t:"hw",s:line,ans:ans,ch:ans.concat(dis).sort(rnd)});
  st.push({t:"pod",pl:C,from:7,to:9});
  var t2=Math.random()<.5,fake=oth[0]?oth[0].s[0]:"I would like some tea.";
  st.push({t:"tf",pl:C,at:9,rp:[5,6],q:'"'+(t2?C[5].x:fake)+'" was said in the call.',o:["True","False"],a:t2?0:1});
  var to=[d.t].concat(oth.slice(0,2).map(function(u){return u.t})).sort(rnd);
  st.push({t:"pq",pl:C,at:9,rp:[7,9],q:"What was this call about?",o:to,a:to.indexOf(d.t)});
  var W=d.w[d.w.length-1],W2=d.w[d.w.length-2]||W,ex=W[2]||a(2),ex2=W2[2]||a(3);
  var C2=[ln(0,"Before we finish, here is our word of the day."),ln(0,W[0]+". It means: "+W[1].toLowerCase()+"."),ln(1,"Could you use it in a sentence, Lucy?"),ln(0,ex),ln(0,"Here is one more word. "+W2[0]+". "+W2[1]+"."),ln(0,ex2),ln(0,"Keep practising every day. This is Lucy, and you are listening to Ask Lucy.")];
  st.push({t:"pod",pl:C2,from:0,to:4});
  var so=[ex].concat(oth.slice(0,2).map(function(u){return u.s[0]}).filter(function(x){return x!==ex}));while(so.length<3)so.push(["I will call you later.","Please send me the file.","Thank you for your help."][so.length-1]);so=so.sort(rnd);
  st.push({t:"pq",pl:C2,at:3,rp:[0,3],q:"Which sentence did Lucy say?",o:so,a:so.indexOf(ex)});
  st.push({t:"pod",pl:C2,from:4,to:7});
  var wo=[W2[0]].concat(sh2(d.w.filter(function(w){return w!==W2}).map(function(w){return w[0]})).slice(0,2));while(wo.length<3)wo.push(["table","window","garden"][wo.length-1]);wo=wo.sort(rnd);
  st.push({t:"pq",pl:C2,at:6,rp:[4,6],q:"Which word did Lucy say?",o:wo,a:wo.indexOf(W2[0])});
  return st;
}
// ring(): plays a phone-ring sound with the Web Audio API.
function ring(){
  try{var A=new(window.AudioContext||window.webkitAudioContext)(),t=A.currentTime;
    [0,.32,.9,1.22].forEach(function(o,i){var os=A.createOscillator(),g=A.createGain();os.type="sine";os.frequency.value=i%2?1040:880;g.gain.setValueAtTime(.14,t+o);g.gain.exponentialRampToValueAtTime(.001,t+o+.26);os.connect(g);g.connect(A.destination);os.start(t+o);os.stop(t+o+.3)})}catch(e){}
}
// hwSel(i): select / unselect a word in the "choose the 3 words you heard" question (max 3).
function hwSel(i){
  if(L.chk)return;L.ms=L.ms||[];var p=L.ms.indexOf(i);
  if(p>-1)L.ms.splice(p,1);else if(L.ms.length<3)L.ms.push(i);
  document.querySelectorAll(".hwt").forEach(function(b){b.classList.toggle("sel",L.ms.indexOf(+b.dataset.m)>-1)});
  var c=document.getElementById("ck");if(c)c.disabled=L.ms.length!==3;
}
// pAud(i): in the audio-to-word matching question, plays audio number i and selects it.
function pAud(i){
  L.pm=L.pm||[];if(L.chk||L.pm.indexOf(i)>-1)return;L.pa=i;say(L.steps[L.i].ws[i]);
  document.querySelectorAll(".pa").forEach(function(b){b.classList.toggle("sel",+b.dataset.pa===i)});
}
// pWord(j): pairs the selected audio with word j (right = locked, wrong = -1 energy).
function pWord(j){
  var s=L.steps[L.i];L.pm=L.pm||[];
  if(L.chk||L.pa==null||L.pm.indexOf(j)>-1)return;
  var wb=document.querySelector('.pw[data-pw="'+j+'"]');
  if(j===L.pa){
    L.pm.push(j);
    [wb,document.querySelector('.pa[data-pa="'+j+'"]')].forEach(function(b){if(b)b.classList.add("ok")});
    document.querySelectorAll(".pa").forEach(function(b){b.classList.remove("sel")});L.pa=null;
    if(L.pm.length===s.ws.length)ck();
  }else{
    L.combo=0;S.hearts=Math.max(0,S.hearts-1);save();
    if(wb){wb.classList.add("no");setTimeout(function(){wb.classList.remove("no")},400)}
  }
}
// nx(): "Continue" - charges 1 energy for a wrong step when needed, resets step state and shows the next step (or the result).
function nx(){
  if(DREC){try{DREC.abort()}catch(e){}DREC=null}
  podStop();
  var s=L.steps[L.i];
  if(s&&s.t!=="learn"&&s.t!=="story"&&s.t!=="pod"&&s.t!=="splash"){regen();if(S.hearts>=EN)S.ets=Date.now();S.hearts=Math.max(0,S.hearts-1);save();if(S.hearts<=0&&L.i+1<L.steps.length)L.fail=1}
  L.sel=null;L.ba=[];L.ms=[];L.pm=[];L.pa=null;L.chk=0;L.md=[];L.msel=null;L.i++;enter()}
// sayCard(text, character, action, width): "Repeat after ..." card with the sentence, listen / slow buttons and the mic. Used by Speak and speaking steps.
function sayCard(t,mm,act,sx){
  return '<div class="sayw" style="--sx:'+sx+'px"><h2 class="ttl">Repeat after '+mm[1]+'</h2>'+
  '<div class="bub c" id="tgt"><button class="sp" data-a="listen" aria-label="Listen">🔊</button><button class="sp" data-a="slow" aria-label="Slow">🐢</button> '+dw(t)+'</div>'+
  '<div class="av big">'+mm[0]+'</div>'+
  '<button class="mic" id="mic" data-a="rec" aria-label="Record">'+MICSVG+'</button><div class="note ctr2" id="st"></div><div id="res" class="ctr2"></div>'+
  '<button class="lnk" data-a="'+act+'">Can\'t speak now</button></div>';
}
// ls(): draws the lesson screen for the current step: top bar (close, progress, energy), the step body and the bottom Check / Continue bar. Also shows the "out of energy" and "lesson finished" screens.
function ls(){
  var el=document.getElementById("ls"),s=L.steps[L.i],n=L.steps.length,m=M[(L.x+L.i)%5],b="",f="",i0=0;
  el.style.display="block";el.classList.remove("nohud");
  var top='<div class="combo" id="cmb">'+(L.combo>=2?"COMBO x "+L.combo:"&nbsp;")+'</div><div class="row" style="margin-bottom:8px"><button class="x" data-a="x" aria-label="Close">✕</button><div class="bar'+(L.combo>=2?" cb":"")+'" id="pb" style="flex:1"><i style="width:'+Math.min(100,L.i/Math.max(1,n)*100)+'%"></i></div><b class="enp"><svg viewBox="0 0 36 22" aria-hidden="true"><rect x="0" y="1" width="31" height="20" rx="6" fill="#ff86d0"/><rect x="32" y="7" width="3" height="8" rx="1.5" fill="#ff86d0"/><path d="M17.5 4l-6 8.5h5l-1.5 6 6.5-9h-5z" fill="#fff"/></svg><span id="len">'+(regen(),S.hearts)+'</span></b></div>';
  if(L.fail){
    b='<div class="ctr"><div style="font-size:64px">⚡</div><div class="big">Out of energy</div><p class="note">Next energy in <b id="cd2">'+mmss(RG-(Date.now()-S.ets))+'</b>. You get 1 energy every 5 minutes. Practice tab is free meanwhile.</p></div>';f='<button id="rt" data-a="retry"'+(S.hearts>0?'':' disabled')+'>Try again</button>';
  }else if(!s){
    if(!L.fin){L.fin=1;L.xp=10+L.ok*2;if(L.n===prog(L.u))S.p[L.id]=L.n+1;gain(L.xp)}
    b='<div class="ctr"><div style="font-size:72px">'+"🎉"+'</div><div class="big">'+"Lesson complete!"+'</div><p style="font-size:32px;font-weight:800;color:#ffc800">+'+L.xp+' XP</p><p class="note">Streak: '+S.streak+' days</p>'+(prog(L.u)>=NLS?'<p class="note"><b>Unit complete! 🏆</b></p>':'')+'</div>';
    f='<button data-a="x">Continue</button>';
  }else{
    if(s.c&&s.s)i0=s.s.indexOf(s.c);
    if(s.t==="splash"){
      b=camBox(1);f='';
    }else if(s.t==="mp"){
      b=mpHtml(s);f=CK(!!(L.md&&L.md.length===s.items.length));
    }else if(s.t==="pat"){
      b='<div class="npt"><i>'+PATSVG+'</i>NEW PATTERN</div><h2 class="ttl">Select the missing word</h2><div class="patc">'+s.l.map(function(x){return '<div class="patl">'+patLine(x)+'</div>'}).join("")+'</div>'+opts(s,1);
      f=CK(false);
    }else if(s.t==="cor"){
      b='<h2 class="ttl">Which sentence is correct?</h2>'+opts(s,1);
      f=CK(false);
    }else if(s.t==="say"){
      b=sayCard(s.s,m,"nx",225);
      f='<button id="cb" data-a="cont" disabled>Continue</button>';
    }else if(s.t==="learn"){
      b='<h2 class="ttl">New word</h2><div class="card ctr" style="padding:36px 16px"><div style="font-size:34px;font-weight:800">'+s.w[0]+'</div><p class="big">'+s.w[1]+'</p><button class="icon" data-a="wl" aria-label="Listen">🔊</button></div>';
      f='<button data-a="nx">Continue</button>';
    }else if(s.t==="fill"){
      b='<h2 class="ttl">Fill in the blank</h2><div class="scene"><div class="av">'+m[0]+'</div><div class="bub">'+dw(s.s.slice(0,i0))+' <span class="bl" id="bl"></span> '+dw(s.s.slice(i0+s.c.length))+'</div></div>'+opts(s,1);
      f=CK(false);
    }else if(s.t==="chat"){
      b='<h2 class="ttl">Complete the chat</h2><div class="bub" style="margin-bottom:12px"><button class="sp" data-a="listen" aria-label="Listen">🔊</button> '+dw(s.s)+'</div><div class="bub right"><span class="bl2" id="bl2">&nbsp;</span></div>'+opts(s,1);
      f=CK(false);
    }else if(s.t==="listen"){
      var bars="";for(var k=0;k<20;k++)bars+='<i style="height:'+Math.round(8+Math.abs(Math.sin(k*1.7))*26)+'px"></i>';
      b='<h2 class="ttl">Tap what you hear</h2><div class="scene"><div class="av">'+m[0]+'</div><div style="flex:1"><button class="bub wv" data-a="listen" aria-label="Play">🔊 '+bars+'</button><div style="text-align:right"><button class="lnk sl" data-a="slow">Slow</button></div></div></div>'+
      '<div class="ansarea">'+L.ba.map(function(bi,j){return '<button class="tile" data-k="a'+j+'">'+esc(s.bank[bi])+'</button>'}).join("")+'</div>'+
      '<div class="bank">'+s.bank.map(function(w,i){return '<button class="tile'+(L.ba.indexOf(i)>-1?" used":"")+'" data-k="b'+i+'">'+esc(w)+'</button>'}).join("")+'</div><button class="lnk" data-a="nx">Can\'t listen now</button>';
      f=CK(L.ba.length>0);
    }else if(s.t==="type"){
      b='<h2 class="ttl">Type the missing word</h2><div class="scene"><div class="av">'+m[0]+'</div><div class="bub">'+dw(s.s.slice(0,i0))+' <input id="ty" class="inl" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"> '+dw(s.s.slice(i0+s.c.length))+'</div></div>'+tyOpts(s);
      f=CK(false);
    }else if(s.t==="story"){
      var rows=s.lines.map(function(l,ix){return '<div class="sl'+(l.r?" r":"")+(ix===s.lines.length-1?" new":"")+'"><span class="sa">'+l.e+'</span><div class="sbub"><small>'+esc(l.n)+'</small>'+dw(l.x)+'</div></div>'}).join("");
      var sc=SC[L.u.sec]||SC.work;
      b='<div class="sh" style="--g1:'+sc[0]+';--g2:'+sc[1]+'"><span>'+(L.u.e||"📘")+'</span><div><small>STORY '+(s.k+1)+' OF 3</small><b>'+esc(L.u.t)+'</b></div></div>'+(s.nar?'<p class="nar">'+esc(s.nar)+'</p>':'')+'<div class="story">'+rows+'</div>';
      f='<button data-a="nx">Continue</button>';
    }else if(s.t==="vcx"){
      b='<h2 class="ttl">'+esc(s.q)+'</h2>'+(s.v?
        '<div class="vcb2"><button class="vcb" data-a="listen" aria-label="Listen">'+SPKSVG+'</button><div class="vct">'+dwh(s.s,s.word)+'</div></div>':
        '<div class="scene"><div class="av">'+m[0]+'</div><div class="bub"><button class="sp vsp" data-a="listen" aria-label="Listen">'+SPKSVG+'</button> '+dwh(s.s,s.word)+'</div></div>')+opts(s,1);
      f=CK(false);
    }else if(s.t==="hear"){
      b='<h2 class="ttl">What do you hear?</h2><div class="scene"><div class="av">'+m[0]+'</div><div style="flex:1"><button class="bub wv" data-a="listen" aria-label="Play">🔊 '+wave()+'</button><div style="text-align:right"><button class="lnk sl" data-a="slow">Slow</button></div></div></div>'+opts(s);
      f=CK(false);
    }else if(s.t==="dict"){
      b='<h2 class="ttl">Type what you hear</h2><div class="scene"><div class="av">'+m[0]+'</div><div style="flex:1"><button class="bub wv" data-a="listen" aria-label="Play">🔊 '+wave()+'</button><div style="text-align:right"><button class="lnk sl" data-a="slow">Slow</button></div></div></div><textarea id="ty" class="dict" rows="2" placeholder="Type or speak what you hear..." autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"></textarea><div class="dicrow"><button class="dicbtn" data-dic="1" aria-label="Speak your answer">'+DICSVG+'</button></div>';
      f=CK(false);
    }else if(s.t==="pod"){
      b=s.intro?camBox(0):bcs('',100,1);
      f=pctl(0);
    }else if(s.t==="pq"||s.t==="tf"){
      b=bcs('<h2 class="ttl ctr2">'+esc(s.q)+'</h2>'+(s.t==="tf"?'<div class="tfrow"><button class="opt tfb" data-o="0" aria-label="True">✔</button><button class="opt tfb" data-o="1" aria-label="False">✖</button></div>':opts(s)),100);
      f=pctl(1);
    }else if(s.t==="hw"){
      b=bcs('<h2 class="ttl ctr2">Select 3 words you hear</h2><div class="ctr2"><button class="bub wv" style="max-width:320px;margin:0 auto" data-a="listen" aria-label="Play">🔊 '+wave()+'</button></div><div class="bank">'+s.ch.map(function(w,i){return '<button class="tile hwt'+((L.ms||[]).indexOf(i)>-1?" sel":"")+'" data-m="'+i+'">'+esc(w)+'</button>'}).join("")+'</div>',100);
      f=CK((L.ms||[]).length===3);
    }else if(s.t==="pairs"){
      b=bcs('<h2 class="ttl ctr2">Tap the matching pairs</h2><div class="pgrid"><div class="pcol">'+s.ws.map(function(w,i){return '<button class="pbtn pa" data-pa="'+i+'" aria-label="Play word '+(i+1)+'">🔊 '+wave().split("</i>").slice(0,9).join("</i>")+'</i></button>'}).join("")+'</div><div class="pcol">'+s.ro.map(function(i){return '<button class="pbtn pw" data-pw="'+i+'">'+esc(s.ws[i])+'</button>'}).join("")+'</div></div>',20);
      f='';
    }else{
      b='<h2 class="ttl">'+(s.q.indexOf("mean")>0?"Select the meaning":"Choose the answer")+'</h2><p class="big">'+esc(s.q)+'</p>'+opts(s);
      f=CK(false);
    }
  }
  el.innerHTML='<div class="lw">'+top+b+'</div><div class="lbar">'+f+'</div>';
  if(s&&!L.fail&&(s.t==="splash"||s.intro))camInit(s);
}
// pick(i): the learner tapped answer option i - highlight it and enable Check (true / false questions check at once).
function pick(i){
  if(L.chk)return;
  var s=L.steps[L.i];L.sel=i;
  document.querySelectorAll("#ls .opt").forEach(function(b,j){b.classList.toggle("sel",j===i)});
  var t=document.getElementById(s.t==="chat"?"bl2":"bl");if(t)t.textContent=s.o[i];
  var c=document.getElementById("ck");if(c)c.disabled=false;
  if(s.t==="pq"||s.t==="tf")setTimeout(function(){if(inL&&L&&L.steps[L.i]===s&&!L.chk)ck()},180);
}
// tile(key): tap on a word tile - moves it between the word bank and the answer line.
function tile(k){
  if(L.chk)return;
  var i=+k.slice(1);
  if(k[0]==="b"){if(L.ba.indexOf(i)<0)L.ba.push(i)}else L.ba.splice(i,1);
  ls();
}
// ck(): Check button. Decides if the answer is right for each step type, colours the options, updates combo and progress bar, shows "Nicely done" or the right answer.
function ck(){
  if(L.chk)return;
  var s=L.steps[L.i],c=false,exp="";
  if(s.t==="listen"){c=norm(L.ba.map(function(i){return s.bank[i]}).join(" ")).join(" ")===norm(s.s).join(" ");exp=s.s}
  else if(s.t==="pairs"||s.t==="mp"){c=true;exp=""}else if(s.t==="hw"){var p3=(L.ms||[]).map(function(i){return s.ch[i]});c=p3.length===3&&p3.every(function(w){return s.ans.indexOf(w)>-1});exp=s.ans.join(", ")}else if(s.t==="type"||s.t==="dict"){var ty=document.getElementById("ty");if(s.t==="dict"){c=sim(ty.value,s.s)>=.85;exp=s.s}else{c=ty.value.trim().toLowerCase()===s.c.toLowerCase();exp=s.c}ty.readOnly=true}
  else{
    c=L.sel===s.a;exp=s.o[s.a];
    document.querySelectorAll("#ls .opt").forEach(function(b,j){b.classList.remove("sel");if(j===s.a)b.classList.add("ok");else if(j===L.sel)b.classList.add("no")});
  }
  // From here the step is locked (checked): update score, combo and the feedback bar.
  L.chk=1;
  if(c){L.ok++;L.combo++}else{L.combo=0}
  var f=document.querySelector(".lbar");f.className="lbar "+(c?"ok":"bad");
  f.innerHTML='<div class="fs"><div class="ft">'+(c?"Nicely done! 🎉":"Correct solution:")+'</div>'+(c?"":'<div>'+esc(exp)+'</div>')+'<button data-a="nx">Continue</button></div>';
  var cm=document.getElementById("cmb");if(cm)cm.innerHTML=L.combo>=2?"COMBO x "+L.combo:"&nbsp;";
  var pb=document.getElementById("pb");if(pb){pb.className="bar"+(L.combo>=2?" cb":"");pb.firstChild.style.width=Math.min(100,(L.i+(c?1:0))/L.steps.length*100)+"%"}
}
