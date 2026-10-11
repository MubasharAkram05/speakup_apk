// ===== MAIN CLICK HANDLER =====
// One listener for the whole app. Buttons carry data-* attributes and this function reads them:
//   data-t tab | data-c Speak unit | data-a action name | data-o answer option | data-g lesson | data-k word tile
//   data-j jump | data-p field picker | data-q field choice | data-s section chip | data-dd / data-ps Speak drop-down
//   data-x sections screen | data-sj section jump | data-m / data-pa / data-pw podcast questions | data-mp matching pair
document.addEventListener("click",function(e){
  var t=e.target.closest("[data-t],[data-c],[data-a],[data-o],[data-g],[data-k],[data-j],[data-p],[data-q],[data-s],[data-dd],[data-ps],[data-x],[data-sj],[data-m],[data-pa],[data-pw],[data-ty],[data-mp],[data-lv]");if(!t)return;
  // D = all data-* values of the tapped element. a = the action name (data-a).
  var D=t.dataset,a=D.a;
  // Type exercise: tapping a word tile copies it into the input and enables Check.
  if(D.ty!==undefined){
    var ti=document.getElementById("ty"),ts=L&&L.steps[L.i];
    if(ti&&ts&&ts.o&&!L.chk){ti.value=ts.o[+D.ty];var tb=document.getElementById("ck");if(tb)tb.disabled=false}
    return;
  }
  // Matching exercise: tap on a pair button.
  if(D.mp!==undefined){mpTap(D.mp.charAt(0),+D.mp.slice(1));return}
  // Menu button: open / close the drop-up list.
  if(D.t==="menu"){var mo=document.getElementById("mn").style.display==="block";renderMn(mo?0:1);return}
  // Bottom bar / menu item: switch tab, close the drop-up, scroll to top.
  if(D.t){renderMn(0);var pt0=tab;tab=D.t;seen=0;if(pt0==="learn"&&tab!=="learn")hpush("tab");render();scrollTo(0,0);return}
  // Speak: open / close the category drop-down.
  if(D.dd){pdd=pdd===D.dd?null:D.dd;render();return}
  // Speak: choose a section from the drop-down.
  if(D.ps){ps=D.ps;pc=null;pi=0;pdd=null;render();return}
  // Speak: open a unit (circle).
  if(D.c){var wasN=pc===null;pc=D.c;pi=0;pdd=null;if(wasN)hpush("topic");render();scrollTo(0,0);return}
  // LEVEL FILTER: Basic / Intermediate / Advanced button tapped -> save the level and redraw Home.
  if(D.lv){S.lv=D.lv;save();seen=1;render();scrollTo(0,0);return}
  // Home: a section chip was tapped.
  if(D.s){S.cs=D.s;save();seen=1;render();scrollTo(0,0);return}
  if(D.m!==undefined){hwSel(+D.m);return}
  if(D.pa!==undefined){pAud(+D.pa);return}
  if(D.pw!==undefined){pWord(+D.pw);return}
  // Home: open the "Choose your field" sheet.
  if(D.p){openPk(D.p);return}
  // Home: the pinned unit banner opens the Sections screen.
  if(D.x){openSx();return}
  // Sections screen: jump to the chosen section.
  if(D.sj){jumpSec(D.sj);return}
  // Field sheet: add / remove a field (its units appear on the path).
  if(D.q!==undefined){
    var k=PK,arr=S.fl[k]=S.fl[k]||[],ix=arr.indexOf(D.q);
    if(ix<0){arr.push(D.q);FOC="ub-"+k+"-"+D.q}else arr.splice(ix,1);
    save();renderPk();return;
  }
  // "Jump here": unlocks a locked unit.
  if(D.j!==undefined){S.op[D.j]=1;save();seen=0;render();return}
  // A lesson circle: open that lesson.
  if(D.g!==undefined){openL(D.g,+D.n);return}
  // An answer option button.
  if(D.o!==undefined){pick(+D.o);return}
  // A word tile.
  if(D.k!==undefined){tile(D.k);return}
  if(a==="pkx"){closePk();return}
  if(a==="sxx"){closeSx();return}
  // ACTIONS (data-a): listen = read aloud, slow = slow speed, rec = start mic, chk = check typed Speak sentence.
  if(a==="listen")say(curS());
  if(a==="slow")say(curS(),.55);
  if(a==="rec")mic(curS());
  if(a==="chk"){var iv=document.getElementById("ti").value.trim();if(iv)after(showRes(curS(),iv))}
  // mm: switch between Real and Demo mic mode (Me tab).
  if(a==="mm"){S.mic=S.mic==="demo"?"real":"demo";save();render()}
  // pn: next sentence in Speak. (The words branch is LEGACY.)
  if(a==="pn"){if(tab==="words"){ti++;render();scrollTo(0,0)}else{pi++;render();pScroll()}}
  // pp: previous sentence in Speak.
  if(a==="pp"){var n0=curU().s.length;pi=(pi%n0+n0-1)%n0;render()}
  if(a==="wl")say(L.steps[L.i].w[0]);
  // Continue buttons.
  if(a==="cont"||a==="nx")nx();
  // ck: Check button in a lesson.
  if(a==="ck")ck();
  // Podcast play / back / forward.
  if(a==="pt"||a==="pk"||a==="pf")pod(a);
  // retry: try the lesson again when energy is back.
  if(a==="retry"){regen();if(S.hearts>0)openL(L.id,L.n)}
  // x: close the lesson screen.
  if(a==="x"){closeL();hpop("L")}
  // Backup buttons: bx export file, bc copy, bi import file, br restore from pasted text.
  if(a==="bx")bkExport();
  if(a==="bc")bkCopy();
  if(a==="bi"){var bf=document.getElementById("bf");if(bf)bf.click()}
  if(a==="br"){var bt=document.getElementById("bt");if(bt&&bt.value.trim())restore(bt.value.trim());else bmsg("Paste your backup text first.")}
  // reset: clears progress (keeps vocabulary, fields, mic mode and settings).
  if(a==="reset"){S={xp:0,streak:0,last:"",spoken:0,done:0,hearts:100,goal:0,p:{},op:{},vocab:S.vocab||{},fl:S.fl||{},mic:S.mic,mv:S.mv,en2:1,ets:Date.now(),pv:3};save();render()}
});
// Keyboard: Escape closes the picker / Sections screen; Enter or Space on the field bar opens the picker.
document.addEventListener("keydown",function(e){
  if(e.key==="Escape"){if(PK)closePk();else closeSx()}
  if((e.key==="Enter"||e.key===" ")&&e.target.dataset&&e.target.dataset.p){e.preventDefault();openPk(e.target.dataset.p)}
});
// Typing in a type / dictation box: Check is enabled only when the box is not empty.
document.addEventListener("input",function(e){if(e.target.id==="ty"){var b=document.getElementById("ck");if(b)b.disabled=!e.target.value.trim()}});
// Theme button: toggles light / dark by setting data-theme on <html>.
document.getElementById("th").onclick=function(){
  var r=document.documentElement,d=r.dataset.theme?r.dataset.theme==="dark":matchMedia("(prefers-color-scheme:dark)").matches;
  r.dataset.theme=d?"light":"dark";
};
// Every second: refreshes the energy numbers and countdown timers on screen.
setInterval(function(){
  var t=enTxt(),a=document.getElementById("en"),b=document.getElementById("len"),c=document.getElementById("cd2"),r=document.getElementById("rt");
  if(a)a.textContent=t;if(b)b.textContent=S.hearts;
  if(c)c.textContent=mmss(RG-(Date.now()-S.ets));
  if(r)r.disabled=S.hearts<=0;
},1000);
try{
  // START-UP: restore the last open tab, Speak section, unit and sentence.
  var NV=JSON.parse(localStorage.getItem("su2nav")||"null");
  if(NV){
    if(["learn","words","menu","vocab","prac","me"].indexOf(NV.tab)>-1)tab=NV.tab;
    if(SECS.some(function(x){return x[0]===NV.ps}))ps=NV.ps;
    pc=NV.pc||null;pi=+NV.pi||0;
  }
}catch(e){}
// Rebuild the Back-button stack after a page reload.
HS=(history.state&&history.state.hs)||[];
if(tab!=="learn"&&HS.indexOf("tab")<0)hpush("tab");
if(tab==="prac"&&pc!==null&&HS.indexOf("topic")<0)hpush("topic");

// FIRST DRAW of the app (everything above only defines data and functions).
render();
// After the page and fonts load: measure the stats bar again.
window.addEventListener("load",function(){setSth();markCur()});
// Speak drop-downs (units / categories) changed.
document.addEventListener("change",function(e){var t=e.target;if(t&&t.id==="usel"){pc=t.value;pi=0;render()}if(t&&t.id==="csel"){ps=t.value;pc=null;pi=0;render()}});
// Speak tab swipe: swipe left / right on the sentence card for the next / previous sentence.
(function(){var x0=null,y0=null;document.addEventListener("touchstart",function(e){var c=tab==="prac"&&e.target.closest&&e.target.closest(".sayw");if(!c){x0=null;return}x0=e.touches[0].clientX;y0=e.touches[0].clientY},{passive:true});document.addEventListener("touchend",function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0,dy=e.changedTouches[0].clientY-y0;x0=null;if(Math.abs(dx)<50||Math.abs(dx)<Math.abs(dy)*1.5)return;if(dx<0){pi++;render()}else{var n0=curU().s.length;pi=(pi%n0+n0-1)%n0;render()}},{passive:true})})();
// DICTATION: DREC = the running speech recognition for the type exercise.
var DREC=null;
// dictMsg(text): shows a small message under the dictation button.
function dictMsg(t){var r=document.querySelector(".dicrow");if(!r)return;var n=r.querySelector(".dicmsg");if(!n){n=document.createElement("div");n.className="dicmsg";r.appendChild(n)}n.textContent=t||""}
// dictate(button): speak-to-type. Demo mode types a fake sentence; real mode uses browser speech recognition and fills the text box while you speak.
function dictate(btn){
  // OLD (Chrome only): var SR=window.SpeechRecognition||window.webkitSpeechRecognition,ty=document.getElementById("ty"),st=L&&L.steps&&L.steps[L.i];
  var ty=document.getElementById("ty"),st=L&&L.steps&&L.steps[L.i];
  if(!ty||!st)return;
  function set(t){ty.value=t;ty.dispatchEvent(new Event("input",{bubbles:true}))}
  function off(){DREC=null;btn.classList.remove("on")}
  dictMsg("");
  if(DREC){try{DREC.abort()}catch(e){}off();return}
  if(S.mic==="demo"){
    DREC=1;btn.classList.add("on");
    setTimeout(function(){off();set((st.s||"").split(/\s+/).filter(function(w,i){return i===0||Math.random()>.15}).join(" "))},1100);
    return;
  }
  // OLD: if(!SR){dictMsg("Speech not supported here. Use Chrome or switch to Demo mode in Me tab.");return}
  if(!SpeakUpSpeech.supported()){dictMsg("Speech not supported here. Switch to Demo mode in Me tab.");return}
  // OLD: var r=new SR();
  var r=SpeakUpSpeech.create();DREC=r;r.lang="en-US";r.interimResults=true;r.maxAlternatives=1;
  r.onstart=function(){btn.classList.add("on")};
  r.onresult=function(e){var t="";for(var i=0;i<e.results.length;i++)t+=e.results[i][0].transcript+" ";set(t.trim())};
  r.onerror=function(e){off();var c=e&&e.error;if(c&&c!=="no-speech"&&c!=="aborted")dictMsg(c==="not-allowed"||c==="service-not-allowed"?(SpeakUpSpeech.isNative?"Mic blocked. Phone Settings > Apps > SpeakUp English > Permissions > Microphone > Allow.":"Mic blocked. Allow microphone in browser, or switch to Demo mode in Me tab."):"Mic error: "+c)};
  r.onend=off;
  try{r.start()}catch(e){off();dictMsg("Could not start the mic. Try again.")}
}
// Click on the dictation microphone button.
document.addEventListener("click",function(e){var b=e.target.closest("[data-dic]");if(b)dictate(b)});
