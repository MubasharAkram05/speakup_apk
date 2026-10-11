// ================ STATE ================
// S is the one object that holds ALL saved progress (written to localStorage by save()).
//   xp / streak / last / goal   - points, day streak, last active day, XP today
//   hearts / ets                - energy left and the time it last changed
//   p{unitId:lessons done}      - lesson progress per unit      op{unitId:1} - units unlocked with "Jump here"
//   fl{section:[fieldIds]}      - fields chosen with "Choose your field"
//   vocab{word:{m,x,f,t}}       - words marked learned (meaning, example, topic, time)
//   tw{d,k[],r}                 - Today tab: date, words learned today, refresh counter
//   cs / lu / mic               - current section, last unit, mic mode ("real" or "demo")
var S={xp:0,streak:0,last:"",spoken:0,done:0,hearts:100,goal:0,p:{},op:{},fl:{}};
// Load saved progress (merged over the defaults). Ignore errors, e.g. private mode.
try{var o=localStorage.getItem("su2");if(o)S=Object.assign(S,JSON.parse(o))}catch(e){}
// One-time upgrades (run once per saved profile): default mic mode, and reset energy.
if(S.mv!==2){S.mic="real";S.mv=2}
if(S.en2!==1){S.en2=1;S.hearts=100;S.ets=Date.now()}
if(S.en3!==1){S.en3=1;S.hearts=100;S.ets=Date.now()}
// save(): writes S to localStorage. Wrapped in try/catch because storage can be blocked.
function save(){try{localStorage.setItem("su2",JSON.stringify(S))}catch(e){}}
// gain(n): adds n XP, updates the daily streak and resets today's goal when a new day starts, then saves.
function gain(n){
  // New day? Streak +1 if the last active day was yesterday, otherwise restart at 1.
  var t=new Date().toDateString();
  if(S.last!==t){var y=new Date(Date.now()-864e5).toDateString();S.streak=S.last===y?S.streak+1:1;S.last=t;S.goal=0}
  // Add the points to total XP and to the daily goal (goal bar = 50 XP).
  S.xp+=n;S.goal+=n;save();
}
// COL = colours for unit banners / path. ICO = the 8 lesson icons of a unit. NLS = lessons per unit (8).
var COL=["#58cc02","#1cb0f6","#ce82ff","#ff9600","#ff4b4b","#00cd9c","#cc3c8f","#2b70c9","#b7791f","#6366f1","#0891b2","#e11d48","#7c3aed","#65a30d","#475569"],ICO=["⭐","📖","🎧","💬","✍️","🎤","👂","🏆"],NLS=8;
/* ---- course structure ---- */
// SECS = sections: [key, name, hasFieldPicker]. The 3rd value 1 = the section shows "Choose your field" (extra units).
var SECS=[["work","Work",1],["study","Study",1],["teaching","Teaching",1],["interview","Interview",1],["everyday","Everyday conversation",0],["tech","Technology",0],["adv","Advanced English (B1+ to C1)",0],["ielts","IELTS preparation",0]];
// ASK = the question shown in the field picker for each section.
var ASK={work:"What kind of work do you do?",study:"Which degree are you studying?",teaching:"What do you teach?",interview:"Which job are you interviewing for?"};
// BYID = quick lookup of any unit by its id (filled right below).
var BYID={};
// Index BASE units, then all field units, by id.
BASE.forEach(function(u){BYID[u.id]=u});
Object.keys(FIELDS).forEach(function(k){FIELDS[k].forEach(function(o){o.units.forEach(function(u){BYID[u.id]=u})})});
/* migrate old linear progress (S.done counted lessons in the old 15 unit order) */
if(!(S.pv>=3)){
  S.p=S.p||{};S.op=S.op||{};S.fl=S.fl||{};
  if(S.done>0)OLD.forEach(function(t,i){
    for(var j=0;j<BASE.length;j++)if(BASE[j].t===t){S.p[BASE[j].id]=Math.max(S.p[BASE[j].id]||0,Math.max(0,Math.min(5,S.done-i*5)));break}
  });
  S.pv=3;save();
}
// Progress migration v4: old values meant "5 lessons"; new scale is 8 lessons per unit.
if(S.pv!==4){S.p=S.p||{};Object.keys(S.p).forEach(function(k){var v=S.p[k]||0;S.p[k]=v>=5?9:Math.min(v,2)});S.pv=4;save()}
// Progress migration v5: re-maps the v4 numbers onto the final 8-lesson path.
if(S.pv!==5){S.p=S.p||{};Object.keys(S.p).forEach(function(k){var v=S.p[k]||0;S.p[k]=v>=9?8:v>2?v-1:Math.min(v,1)});S.pv=5;save()}
// optOf(section,fieldId): returns the field object (name, emoji, units) or null.
function optOf(k,id){var a=FIELDS[k]||[];for(var i=0;i<a.length;i++)if(a[i].id===id)return a[i];return null}
// groups(section): the unit groups shown on the Home path = base units + one group per chosen field.
// LEVEL FILTER ---------------------------------------------------------------
// LV = the 3 levels: [key, button label]. S.lv (saved) = the level chosen on Home (default "basic").
var LV=[["basic","Basic"],["inter","Intermediate"],["adv","Advanced"]];
// lvOf(unit): level of a unit. A unit without lv is treated as Intermediate.
function lvOf(u){return u.lv||"inter"}
// lvCur(): the level the learner picked on Home.
function lvCur(){return S.lv||"basic"}
// lvName(): the label of the picked level, e.g. "Basic".
function lvName(){for(var i=0;i<LV.length;i++)if(LV[i][0]===lvCur())return LV[i][1];return "Basic"}
// lvBar(): the three filter buttons (Basic / Intermediate / Advanced) shown on Home under the section chips.
function lvBar(){
  return '<div class="lvs" role="group" aria-label="Level">'+LV.map(function(x){return '<button class="'+(x[0]===lvCur()?'act':'')+'" data-lv="'+x[0]+'">'+x[1]+'</button>'}).join("")+'</div>';
}
// groups(section, all): the unit groups of a section = base units + one group per chosen field.
//   all=undefined -> only units of the picked level (used by the Home path)
//   all=1         -> every unit of every level (used by Speak, Sections screen, Me progress)
function groups(k,all){
  function ok(u){return all||lvOf(u)===lvCur()}
  var g=[{n:"",e:"",o:"",units:BASE.filter(function(u){return u.sec===k&&ok(u)})}];
  (S.fl[k]||[]).forEach(function(id){var o=optOf(k,id);if(o)g.push({n:o.n,e:o.e,o:o.id,units:o.units.filter(ok)})});
  return g;
}
// pUnits(section): flat list of all units of a section that the learner can see.
function pUnits(k){var a=[];groups(k,1).forEach(function(g){a=a.concat(g.units)});return a}
// active(): every visible unit of every section.
function active(){var a=[];SECS.forEach(function(s){a=a.concat(pUnits(s[0]))});return a}
// prog(unit): how many lessons of the unit are finished (0-8).
function prog(u){return S.p[u.id]||0}
// hash(text): small stable number from a string. Used to pick "random but repeatable" items (same day = same words).
function hash(s){var h=0;for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))|0;return Math.abs(h)}
// ENERGY: 100 max (EN). Each mistake costs 1; 1 point comes back every 5 minutes (RG = 300000 ms).
/* ---- energy ---- */
var EN=100,RG=300000;
// mmss(ms): milliseconds -> "m:ss" text for the energy countdown.
function mmss(ms){var s=Math.max(0,Math.ceil(ms/1000));return Math.floor(s/60)+":"+("0"+s%60).slice(-2)}
// regen(): gives back energy that has regenerated since the last check.
function regen(){
  var n=Date.now();if(!S.ets)S.ets=n;
  if(S.hearts>=EN){S.hearts=EN;S.ets=n;return}
  // How many 5-minute periods passed since the last update.
  var k=Math.floor((n-S.ets)/RG);
  if(k>0){S.hearts=Math.min(EN,S.hearts+k);S.ets=S.hearts>=EN?n:S.ets+k*RG;save()}
}
// enTxt(): the energy text, e.g. "97 · 3:12" (the timer only shows when energy is not full).
function enTxt(){regen();return S.hearts+(S.hearts<EN?" · "+mmss(RG-(Date.now()-S.ets)):"")}
// say(text, rate): reads text aloud with the browser voice (en-US). r = speed, 0.9 default.
function say(t,r){try{speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(t);u.lang="en-US";u.rate=r||.9;speechSynthesis.speak(u)}catch(e){}}
// esc(text): escapes & < > " so text is safe inside an HTML string (prevents broken markup / injection).
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
// norm(text): lower-case words without punctuation, as an array. Used to compare what was said with the target sentence.
function norm(s){return s.toLowerCase().replace(/[^a-z' ]/g,"").split(/\s+/).filter(Boolean)}
// rnd(): comparator for .sort(rnd) = random shuffle.
function rnd(){return Math.random()-.5}
// MICSVG: the microphone icon (SVG) used on the speaking buttons.
var MICSVG='<svg viewBox="0 0 24 30" aria-hidden="true"><rect x="8" y="1" width="8" height="16" rx="4" fill="#fff"/><path d="M4 13a8 8 0 0 0 16 0M12 21v5M8 27h8" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>';
// UI VARIABLES (not saved):
//   ti = current card number in the Today tab      tab = open tab: learn | words | vocab | prac | me | menu
//   ps = section chosen in Speak                    pc = unit open in Speak (null = list)   pi = sentence number in Speak
//   seen = Home already scrolled to current lesson   L = the lesson that is open (null when none)   inL = lesson screen is open
//   PK = field picker open for this section         FOC = banner to scroll to after the picker closes   pdd = open dropdown in Speak
var ti=0,pdd=null,tab="learn",ps="work",pc=null,pi=0,seen=0,L=null,rec=null,inL=false,PK=null,FOC=null;
// NAV = bottom bar buttons [tab, icon, label]. MENU = items inside the Menu drop-up [tab, icon, name, description].
var NAV=[["learn","🏠","Home"],["words","📖","Today"],["menu","☰","Menu"]],MENU=[["prac","🗣️","Speak","Practice speaking"],["vocab","📚","Vocabulary","All words and examples"],["me","👤","Me","Progress and settings"]];
// render(): draws the current tab. It is called after every state change.
// Steps: 1) remember the tab  2) draw the bottom bar  3) hide the header in Speak topics
//        4) fill #v with the tab's HTML  5) scroll helpers  6) refresh the pinned banner.
function render(){
  // 1) Remember the open tab so the app reopens on it.
  try{localStorage.setItem("su2nav",JSON.stringify({tab:tab,ps:ps,pc:pc,pi:pi}))}catch(e){}
  // 2) Bottom bar: the Menu button also counts as active on Speak, Vocabulary and Me.
  document.getElementById("nv").innerHTML=NAV.map(function(n){return '<button class="'+((tab===n[0]||(n[0]==="menu"&&(tab==="prac"||tab==="vocab"||tab==="me")))?"act":"")+'" data-t="'+n[0]+'"><span>'+n[1]+'</span>'+n[2]+'</button>'}).join("");
  var v=document.getElementById("v");
  // 3) Hide the big page header while a Speak topic is open.
  var hd=document.querySelector("#app>header");if(hd)hd.style.display=(tab==="prac"&&pc!==null)?"none":"";
  // 4) Put the HTML of the selected tab inside <main id="v">.
  v.innerHTML=tab==="learn"?path():tab==="prac"?prac():tab==="words"?words():tab==="vocab"?vocab():tab==="menu"?menuPage():me();
  // 5a) First time on Home: scroll to the lesson the learner is up to.
  if(tab==="learn"&&!seen){seen=1;var c=(S.lu&&v.querySelector('.nd.cur[data-g="'+S.lu+'"]'))||v.querySelector(".nd.cur");if(c)c.scrollIntoView({block:"center"})}
  // 5b) Animate the daily goal bar (50 XP).
  var b=document.getElementById("gb");if(b)setTimeout(function(){b.style.width=Math.min(100,S.goal/50*100)+"%"},60);
  // 5c) In Speak: scroll the selected category / unit chip into view.
  if(tab==="prac"){[".cat.act",".uc.act"].forEach(function(q){var e=v.querySelector(q);if(e&&e.scrollIntoView)e.scrollIntoView({inline:"center",block:"nearest"})})}
  // 6) Measure the stats bar and mark which unit banner is the current (pinned) one.
  setSth();markCur();
}
// TODAY + VOCABULARY
// twPool() builds ONE list of every vocabulary word in the course (586 words, each with a meaning and an example).
// twToday() picks 3 words for today from that list. Vocabulary tab shows the whole list.
