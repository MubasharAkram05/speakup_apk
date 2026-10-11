/* ---- field picker ---- */
// renderMn(on): shows or hides the Menu drop-up (Speak, Vocabulary, Me).
function renderMn(on){
  var el=document.getElementById("mn");
  if(!on){el.style.display="none";el.innerHTML="";return}
  el.innerHTML='<div class="dup" role="menu" aria-label="Menu">'+MENU.map(function(m){return '<button class="dui'+(tab===m[0]?' on':'')+'" role="menuitem" data-t="'+m[0]+'"><span>'+m[1]+'</span>'+m[2]+'</button>'}).join("")+'</div>';
  el.style.display="block";
}
// Tap on the empty area around the drop-up closes it.
document.getElementById("mn").addEventListener("click",function(e){if(e.target.id==="mn")renderMn(0)});
// renderPk(): the "Choose your field" sheet - one button per field, tap to add / remove its units (S.fl).
function renderPk(){
  var el=document.getElementById("pk"),k=PK;
  if(!k){el.style.display="none";el.innerHTML="";return}
  var sel=S.fl[k]||[];
  el.innerHTML='<div class="sheet" role="dialog" aria-label="'+esc(ASK[k])+'"><div class="row" style="justify-content:space-between;margin-bottom:6px"><b class="tt">'+esc(ASK[k])+'</b><button class="x" data-a="pkx" aria-label="Close">✕</button></div>'+
  '<p class="note" style="margin:0 0 14px">Pick one or more. Each choice adds new units to this section. Your current units stay.</p>'+
  FIELDS[k].map(function(o){var on=sel.indexOf(o.id)>-1;
    return '<button class="pko'+(on?' on':'')+'" data-q="'+o.id+'"><span class="pe">'+o.e+'</span><span><b>'+esc(o.n)+'</b><small>'+o.units.map(function(u){return esc(u.t)}).join(" · ")+'</small></span><span class="ck">'+(on?"✓":"+")+'</span></button>'}).join("")+
  '<button data-a="pkx" style="width:100%;margin-top:6px">Done</button></div>';
  el.style.display="flex";
}
// BACK BUTTON SUPPORT: the app pushes browser-history entries (HS = stack of names) so the phone Back button closes
// a lesson, picker or topic instead of leaving the app. HIG counts back-steps the app made itself.
var HS=[],HIG=0;
// hpush(name): add a history entry.
function hpush(k){HS.push(k);try{history.pushState({hs:HS.slice()},"")}catch(e){HS.pop()}}
// hpop(name): remove our history entry when we close something by code.
function hpop(k){if(HS.length&&HS[HS.length-1]===k){HS.pop();HIG++;try{history.back()}catch(e){HIG--}}}
// hstale(name): true if that screen is already closed (so a stale history entry is skipped).
function hstale(k){return k==="L"?!inL:k==="pk"?!PK:k==="topic"?(tab!=="prac"||pc===null):k==="tab"?tab==="learn":true}
// Back button pressed: close the top screen (picker, lesson, Speak topic or tab).
window.addEventListener("popstate",function(e){
  var old=HS;HS=(e.state&&e.state.hs)||[];
  if(HIG>0){HIG--;return}
  var k=old[old.length-1];if(!k)return;
  if(hstale(k)){try{history.back()}catch(e){}return}
  if(k==="pk")closePk();
  else if(k==="L")closeL();
  else if(k==="topic"){pc=null;pi=0;render();scrollTo(0,0)}
  else if(k==="tab"){tab="learn";seen=0;render();scrollTo(0,0)}
});
// closeL(): closes the lesson screen, stops audio and redraws the page.
function closeL(){podStop();document.getElementById("ls").style.display="none";inL=false;try{speechSynthesis.cancel()}catch(x){}render()}
// openPk(section): opens the field picker.
function openPk(k){PK=k;FOC=null;renderPk();hpush("pk")}
// closePk(): closes the field picker and scrolls to the unit that was just added.
function closePk(){
  PK=null;hpop("pk");renderPk();render();
  if(FOC){var f=document.getElementById(FOC);if(f)f.scrollIntoView({behavior:"smooth",block:"start"})}
  FOC=null;
}
/* ---- sections screen (opens from the pinned unit card) ---- */
// SXI = icon and "I can ..." sentence shown on each card of the Sections screen.
var SXI={work:["🧑‍💼","I can talk about my work in English."],study:["🎓","I can talk about my studies in English."],teaching:["👩‍🏫","I can teach and explain in English."],interview:["🤝","I can do well in a job interview."],everyday:["🏠","I can take part in daily life in English."],tech:["💻","I can talk about technology in English."],adv:["🚀","I can use advanced English with confidence."],ielts:["🏅","I can get a high band score in IELTS."]};
// openSx(): the Sections screen (list of all sections with progress bars) opened from the pinned banner.
function openSx(){
  var cs=S.cs||"work",el=document.getElementById("sx");
  el.innerHTML='<div class="sxh"><button class="x" data-a="sxx" aria-label="Close">✕</button><b>Sections</b><span></span></div><div class="sxl">'+SECS.map(function(s,i){
    var us=pUnits(s[0]),tot=us.length*NLS,dn=0;us.forEach(function(u){dn+=prog(u)});
    var cur=s[0]===cs,pct=Math.max(4,Math.round(dn/tot*100));
    return '<div class="sxc" data-sj="'+s[0]+'"><div class="sxt"><div class="sxb">'+SXI[s[0]][1]+'</div><div class="sxm">'+SXI[s[0]][0]+'</div></div><div class="sxf"><div class="row" style="justify-content:space-between"><b class="sxn">Section '+(i+1)+' · '+esc(s[1])+'</b><span class="pill">'+us.length+' units</span></div>'+((cur||dn>0)?'<div class="bar" style="margin-top:12px"><i style="width:'+pct+'%"></i></div>':'')+(cur?'':'<div class="jh">JUMP HERE</div>')+'</div></div>'}).join("")+'</div>';
  el.style.display="block";el.scrollTop=0;
}
// closeSx(): closes the Sections screen.
function closeSx(){var el=document.getElementById("sx");el.style.display="none";el.innerHTML=""}
// jumpSec(section): picks a section from the Sections screen and shows its path.
function jumpSec(k){closeSx();S.cs=k;save();seen=1;render();scrollTo(0,0)}
// LESSON ENGINE
// A lesson = L.steps (array of step objects). build(unit, lessonNumber) creates the steps; ls() draws the current step;
// pick() / tile() / ck() check answers; nx() goes to the next step.
// Step types (t): fill, listen, type, say, chat, vcx, mcq, hear, dict, learn, story, pod, pat, mp, cor, splash ...
