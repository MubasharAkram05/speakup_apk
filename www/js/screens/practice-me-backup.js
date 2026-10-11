/* ---- practice & me ---- */
// curU(): the unit open in Speak (falls back to the first unit of the section).
function curU(){
  var a=pUnits(ps);
  for(var i=0;i<a.length;i++)if(a[i].id===pc)return a[i];
  pc=a[0].id;return a[0];
}
// SC = section colours and icon: [colour 1, colour 2, emoji]. Also used by the Vocabulary category list.
var SC={work:["#1cb0f6","#3b82f6","💼"],study:["#ce82ff","#8b5cf6","🎓"],teaching:["#ff9600","#f59e0b","👩‍🏫"],interview:["#ff4b4b","#e11d48","🤝"],everyday:["#58cc02","#16a34a","💬"],tech:["#00cd9c","#0891b2","💻"],ielts:["#e11d48","#9f1239","🏅"]};
// prac(): the Speak tab. Category drop-down, then either the list of unit circles or the sentence card of the chosen unit.
function prac(){
  var c=SC[ps]||SC.work,cn="",si=0;SECS.forEach(function(x,i){if(x[0]===ps){cn=x[1];si=i}});
  var dd='<div class="ddrow one"><button class="ddb'+(pdd==="c"?" open":"")+'" data-dd="c" style="--g1:'+c[0]+'"><small>Category</small><b>'+c[2]+' '+esc(cn)+'</b></button></div>';
  var lst="";
  if(pdd==="c")lst='<div class="ddl">'+SECS.map(function(x){var k=SC[x[0]]||SC.work;return '<button class="ddo'+(x[0]===ps?" act":"")+'" data-ps="'+x[0]+'" style="--g1:'+k[0]+'"><span>'+k[2]+'</span><b>'+esc(x[1])+'</b><small>'+pUnits(x[0]).length+' units</small></button>'}).join("")+'</div>';
  var head='<div class="ph"><h2>Practice speaking</h2></div>'+dd+lst;
  // us = units of the chosen section; ui = position of the open unit (-1 = none open -> show the list).
  var us=pUnits(ps),ui=-1;
  if(pc!==null)us.forEach(function(u,i){if(u.id===pc)ui=i});
  if(ui<0){
    pc=null;
    return head+'<div class="pcw">'+us.map(function(u,i){return '<div class="pnr" style="transform:translateX('+Math.round(Math.sin(i*1.3)*70)+'px)"><button class="pcir" data-c="'+esc(u.id)+'" aria-label="'+esc(u.t)+'" style="background:'+COL[i%COL.length]+'">'+(u.e||"📘")+'</button></div>'}).join("")+'</div>';
  }
  // d = open unit, cur = sentence number (wraps with pi % n). Shows a "Repeat after" card for that sentence.
  var d=us[ui],n=d.s.length,cur=pi%n,col=COL[ui%COL.length];
  var top='<div class="ptn"><div class="pcir sm" style="background:'+col+'">'+(d.e||"📘")+'</div><b>'+esc(d.t)+'</b></div>';
  var cards=sayCard(d.s[cur],M[cur%M.length],"pn",200);
  return top+cards;
}
// me(): the Me tab = level (100 XP per level), stats, daily goal, course progress per section, mic mode, backup and reset.
function me(){
  var ac=active(),tot=0,fin=0;ac.forEach(function(u){tot+=prog(u);if(prog(u)>=NLS)fin++});
  // Level = 1 + XP / 100. lp = XP inside the current level.
  var lv=Math.floor(S.xp/100)+1,lp=S.xp%100;
  var rows=SECS.map(function(s){
    var us=pUnits(s[0]),d=0,k=SC[s[0]]||SC.work;us.forEach(function(u){d+=prog(u)});var mx=us.length*NLS;
    return '<div class="cr"><span class="ce" style="background:linear-gradient(135deg,'+k[0]+','+k[1]+')">'+k[2]+'</span><div style="flex:1;min-width:0"><div class="row" style="justify-content:space-between"><b>'+esc(s[1])+'</b><span class="note">'+d+' / '+mx+'</span></div><div class="bar sm"><i style="width:'+(mx?Math.round(d/mx*100):0)+'%;background:'+k[0]+'"></i></div></div></div>';
  }).join("");
  return '<div class="hero"><div class="hav">🧑‍🎓</div><div style="flex:1;min-width:0"><div class="hn">English Learner</div><div class="hl">Level '+lv+' · '+S.xp+' XP</div><div class="bar"><i style="width:'+lp+'%"></i></div><div class="hs">'+(100-lp)+' XP to level '+(lv+1)+'</div></div></div>'+
  '<div class="grid" style="margin-bottom:14px"><div class="stat"><b>🔥 '+S.streak+'</b><span>Day streak</span></div><div class="stat"><b>⭐ '+S.xp+'</b><span>Total XP</span></div><div class="stat"><b>🎤 '+S.spoken+'</b><span>Spoken</span></div></div>'+
  '<div class="card"><div class="row" style="justify-content:space-between"><b>Daily goal</b><span class="note">'+Math.min(S.goal,50)+' / 50 XP</span></div><div class="bar" style="margin-top:10px"><i id="gb"></i></div></div>'+
  '<div class="card"><b>Your courses</b>'+rows+'</div>'+
  '<div class="card"><b>Mic mode</b><p class="note">'+(S.mic==="demo"?"Demo: no permission needed. Results are simulated.":"Real: uses your microphone and asks permission.")+'</p><button class="ghost" data-a="mm">Switch to '+(S.mic==="demo"?"Real":"Demo")+' mode</button></div>'+
  bkCard()+'<div class="card"><b>Course progress</b><p class="note">'+tot+' of '+ac.length*NLS+' lessons done. Units finished: '+fin+' of '+ac.length+'.</p><button class="ghost" data-a="reset">Reset progress</button></div>';
}
// BACKUP: save S as a JSON file (or text) and restore it on another phone.
/* ---- backup: export / import ---- */
// bkCard(): the Backup card HTML (export, copy, import, paste buttons).
function bkCard(){
  return '<div class="card"><b>Backup</b><p class="note">Save your progress to a file, or restore it on another phone.</p><div class="row" style="flex-wrap:wrap"><button data-a="bx">Export</button><button class="ghost" data-a="bc">Copy</button><button class="ghost" data-a="bi">Import</button></div><input type="file" id="bf" accept=".json,application/json,text/plain" style="display:none"><textarea id="bt" class="dict" rows="3" style="margin-top:12px;min-height:80px;font-size:14px" placeholder="Or paste backup text here, then tap Restore" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"></textarea><button class="ghost" data-a="br" style="margin-top:10px;width:100%">Restore from text</button><div class="note" id="bm" style="margin-top:8px"></div></div>';
}
// bk(): the backup text = JSON {app, v, t (time), s (state)}.
function bk(){return JSON.stringify({app:"speakup",v:1,t:Date.now(),s:S})}
// bmsg(text): shows a message under the backup buttons.
function bmsg(t){var e=document.getElementById("bm");if(e)e.textContent=t}
// restore(text): checks the backup JSON, replaces S with it, saves and redraws.
function restore(txt){
  try{
    var o=JSON.parse(txt),d=o&&o.app==="speakup"?o.s:o;
    if(!d||typeof d!=="object"||typeof d.xp!=="number")throw 0;
    S=Object.assign({xp:0,streak:0,last:"",spoken:0,done:0,hearts:100,goal:0,p:{},op:{},fl:{}},d);
    S.p=S.p||{};S.op=S.op||{};S.fl=S.fl||{};S.mic=S.mic||"real";S.mv=2;S.en2=1;S.en3=1;S.ets=S.ets||Date.now();
    if(!(S.pv>=4))S.pv=4;
    save();seen=0;render();bmsg("Backup restored ✓");
  }catch(e){bmsg("This backup is not valid.")}
}
// bkExport(): downloads the backup as speakup-backup-DATE.json (falls back to showing the text).
function bkExport(){
  var t=bk(),ta=document.getElementById("bt");
  try{
    var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([t],{type:"application/json"}));
    a.download="speakup-backup-"+new Date().toISOString().slice(0,10)+".json";
    document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},1500);
    bmsg("Backup file created. If nothing downloaded, copy the text below.");
  }catch(e){bmsg("Download not possible here. Copy the text below.")}
  if(ta)ta.value=t;
}
// bkCopy(): copies the backup text to the clipboard.
function bkCopy(){
  var t=bk(),ta=document.getElementById("bt");
  function fb(){if(ta){ta.value=t;ta.focus();ta.select();bmsg("Copy the selected text and keep it safe.")}}
  try{navigator.clipboard.writeText(t).then(function(){bmsg("Backup copied ✓")}).catch(fb)}catch(e){fb()}
}
document.addEventListener("change",function(e){
  if(e.target.id!=="bf"||!e.target.files[0])return;
  var r=new FileReader();r.onload=function(){restore(String(r.result))};r.onerror=function(){bmsg("Could not read that file.")};
  r.readAsText(e.target.files[0]);e.target.value="";
});
// pScroll(): scrolls the Speak sentence card to the middle of the screen.
function pScroll(){setTimeout(function(){var e=document.querySelector(".sayw");if(e)e.scrollIntoView({block:"center",behavior:"smooth"})},30)}
// curS(): the sentence being practised now (lesson step, or Speak sentence). The first branch is LEGACY from the old Today speaking cards.
function curS(){return inL?L.steps[L.i].s:tab==="words"?twSents()[ti-twToday().length]:(function(){var d=curU();return d.s[pi%d.s.length]})()}
