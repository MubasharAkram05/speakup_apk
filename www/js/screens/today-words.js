/* ---- Today Words: 6 new words every day ---- */
// TWP = cached word list (built once by twPool).
var TWP=null;
// TWEX = hand-written example sentences for words that have no example sentence anywhere in the course.
var TWEX={"Peak": "Sales reached their peak in December.", "Skip": "I skipped breakfast because I was late.", "Optimize": "We need to optimize the code to make the app faster.", "Hobby": "Reading novels is my favourite hobby.", "Idiom": "Break a leg is an idiom that means good luck.", "Infer": "From his tone, I could infer that he was upset.", "Suspicious": "I received a suspicious email from an unknown sender.", "Expertise": "She has great expertise in network security.", "Come up with": "Can you come up with a better idea for the project?", "Elaborate": "Could you elaborate on your last point, please?", "Literal": "The literal meaning of the word is different from how people use it.", "Alternative": "Is there an alternative to this plan?", "Moreover": "The course is useful; moreover, it is free.", "Junction": "Turn left at the next junction.", "Marginal": "There was only a marginal improvement in the results.", "Hypothetical": "Let us discuss a hypothetical situation.", "Discipline": "Good study habits need discipline.", "Fixed expression": "By the way is a fixed expression in English.", "Likelihood": "There is a high likelihood of rain tomorrow.", "Figurative": "She used figurative language to describe the sunset.", "Persuade": "I tried to persuade him to join our team.", "Dictionary": "I looked up the word in the dictionary.", "Metaphor": "Time is money is a common metaphor.", "Workaround": "We found a workaround until the bug is fixed.", "Luggage": "Please keep your luggage with you at the airport.", "Reminder": "I set a reminder for the meeting at nine.", "Overcome": "She worked hard to overcome her fear of speaking.", "Paraphrase": "Please paraphrase the sentence in your own words.", "Provided that": "You can go out provided that you finish your homework.", "Cashier": "The cashier gave me the receipt.", "Qualification": "A degree is the main qualification for this job.", "Fairness": "The teacher treated everyone with fairness.", "Postpone": "We had to postpone the meeting until Monday.", "Pronounce": "How do you pronounce this word?", "Helpful": "The staff were very helpful and polite.", "Rebuttal": "He gave a strong rebuttal to the criticism.", "Reassure": "The nurse tried to reassure the nervous patient.", "Readable": "Clear names make your code more readable.", "Plagiarism": "Copying someone's essay without a reference is plagiarism.", "Prerequisite": "Maths is a prerequisite for this course.", "Overwhelmed": "I felt overwhelmed by the amount of work.", "Deliverable": "The final deliverable is due on Friday.", "Fall through": "Our plan fell through at the last minute.", "Voicemail": "I left you a voicemail this morning.", "Adjacent": "The library is adjacent to the main building.", "Acknowledge": "Please acknowledge receipt of this email.", "Procrastinate": "Don't procrastinate; start your assignment today.", "Troubleshoot": "Let us troubleshoot the problem step by step.", "Outcome": "We are happy with the outcome of the project.", "Probation": "New employees are on probation for three months.", "Disruption": "The noise caused a disruption in the lesson.", "Inconclusive": "The test results were inconclusive.", "Mitigate": "We must mitigate the risks before the launch.", "Departure": "The departure time of the train is six o'clock.", "Hazard": "A wet floor is a safety hazard.", "Predator": "The lion is a predator that hunts zebras.", "Timeout": "The request failed because of a timeout.", "Tentative": "We made a tentative plan for next week.", "Efficient": "This method is more efficient than the old one.", "Trajectory": "The company's growth trajectory looks positive.", "Component": "The battery is an important component of the phone.", "Peer review": "The paper went through peer review before publication.", "Regression": "The update caused a regression in the login feature.", "Rigorous": "The study used a rigorous method.", "Take over": "She will take over the project next month.", "Colloquial": "Gonna is a colloquial form of going to.", "Distractor": "One option in the test is a distractor to confuse you.", "Boarding": "Boarding starts forty minutes before the flight.", "Landmark": "The tower is a famous landmark in the city.", "Ambiguous": "The instructions were ambiguous and confusing.", "Correspondence": "All correspondence should be sent by email.", "Operation": "The doctor explained the operation to the patient.", "Controversial": "The topic is controversial, so people disagree.", "Corroborate": "New data corroborate the earlier findings.", "Memorable": "It was a memorable trip for all of us.", "Empirical": "Empirical evidence comes from observation and experiments.", "Run out of": "We have run out of milk again.", "Concession": "Each side made a concession to reach an agreement.", "Inquiry": "I am writing in response to your inquiry.", "Blueprint": "The engineer checked the blueprint of the building.", "Appetizer": "We ordered soup as an appetizer.", "Skeleton": "The human skeleton has more than two hundred bones.", "Switchboard": "Please call the switchboard and ask for extension five.", "Counterargument": "Include a counterargument in your essay.", "Substantiate": "You must substantiate your claim with evidence.", "Accountability": "Managers should take accountability for their team's results."};
// ALLS = cached list of every sentence in the course (used to find an example for a word).
var ALLS=null;
// allSents(): every sentence of every unit in one array (built once).
function allSents(){if(!ALLS){ALLS=[];function ad(u){u.s.forEach(function(x){ALLS.push(x)})}BASE.forEach(ad);for(var k in FIELDS)FIELDS[k].forEach(function(g){g.units.forEach(ad)})}return ALLS}
// twPool(): list of {w word, m meaning, x example, f topic, c section key}, sorted in a fixed pseudo-random order.
function twPool(){
  // Use the cached list if it already exists.
  if(TWP)return TWP;var seen={},a=[];
  // add(unit): adds each word of the unit once (duplicates are skipped by lower-case word).
  function add(u){u.w.forEach(function(w){var k=w[0].toLowerCase();if(seen[k])return;seen[k]=1;
    // Regex that matches the whole word inside a sentence (special characters are escaped).
    var re=new RegExp("\\b"+k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\b","i"),ex=w[2]||"";
    // EXAMPLE 1: use the example given with the word, else the first sentence of the same unit that contains the word.
    if(!ex){for(var i=0;i<u.s.length;i++)if(re.test(u.s[i])){ex=u.s[i];break}}
    // EXAMPLE 2: use the hand-written sentence from TWEX.
    if(!ex)ex=TWEX[w[0]]||"";
    // EXAMPLE 3: search every sentence in the course using the word stem (word without its last 2 letters).
    if(!ex){var st=k.length>5?k.slice(0,k.length-2):k,r2=new RegExp("\\b"+st.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"i"),A=allSents();for(var j=0;j<A.length;j++)if(r2.test(A[j])){ex=A[j];break}}
    // EXAMPLE 4 (last resort): ask the learner to make a sentence. In the current data this is never needed.
    if(!ex)ex="Can you use the word \u201c"+w[0].toLowerCase()+"\u201d in a sentence?";
    // Save the word: w=word, m=meaning, x=example, f=unit title, c=section key (first part of the unit id).
    a.push({w:w[0],m:w[1],x:ex,f:u.t,c:u.id.split("/")[0]})})}
  // Collect words from the base units first, then from all field units.
  BASE.forEach(add);for(var k in FIELDS)FIELDS[k].forEach(function(g){g.units.forEach(add)});
  // Sort by hash so the order looks random but is always the same.
  a.sort(function(p,q){return hash(p.w.toLowerCase())-hash(q.w.toLowerCase())});
  return TWP=a;
}
// twSeed(): a number that changes once per local day (so "Today" changes at midnight) and when S.tw.r changes.
function twSeed(){return Math.floor((Date.now()-new Date().getTimezoneOffset()*6e4)/864e5)*17+((S.tw&&S.tw.r)||0)}
// twToday(): the 3 words for today, taken from the pool starting at (seed x 3). Also resets S.tw when the date changed.
function twToday(){
  // n = how many cards per day (3).
  var P=twPool(),n=3,sd=twSeed(),t=[];
  for(var i=0;i<n;i++)t.push(P[(sd*n+i)%P.length]);
  // New day -> reset the list of words learned today (S.tw.k).
  var key=new Date().toDateString();
  if(!S.tw||S.tw.d!==key)S.tw={d:key,k:[],r:0};
  return t;
}
// LEGACY: speaking sentences for the old Today tab. No longer shown in Today, kept because curS() still refers to it.
var TWS=null;
function twSents(){
  if(!TWS){TWS=[];function add(u){u.s.forEach(function(x){TWS.push(x)})}BASE.forEach(add);for(var k in FIELDS)FIELDS[k].forEach(function(g){g.units.forEach(add)})}
  var sd=twSeed(),a=[];for(var i=0;i<3;i++)a.push(TWS[(sd*3+i*977)%TWS.length]);return a;
}
// VOCABULARY FILTERS: VQ = search text, VF = all|learned|new, VC = category key, VN = how many cards are shown (60 per "Load more"), VCO = category list open.
var VQ="",VF="all",VC="all",VN=60,VCO=false;
// vCat(): the Category button and (when VCO is true) the drop-down list under it.
function vCat(){
  var cur=VC==="all"?["all","All categories"]:[VC,secName(VC)],k=SC[VC]||SC.work,ic=VC==="all"?"🗂️":k[2];
  var h='<div class="ddrow one" style="margin-bottom:'+(VCO?'6':'10')+'px"><button class="ddb'+(VCO?' open':'')+'" data-wd="vco" style="--g1:'+(VC==="all"?"#58cc02":k[0])+'"><small>Category</small><b>'+ic+' '+esc(cur[1])+'</b></button></div>';
  if(VCO)h+='<div class="ddl" style="margin-bottom:10px"><button class="ddo'+(VC==="all"?' act':'')+'" data-wd="vcp" data-w="all" style="--g1:#58cc02"><span>🗂️</span><b>All categories</b></button>'+SECS.map(function(c){var kk=SC[c[0]]||SC.work;return '<button class="ddo'+(VC===c[0]?' act':'')+'" data-wd="vcp" data-w="'+c[0]+'" style="--g1:'+kk[0]+'"><span>'+kk[2]+'</span><b>'+esc(secName(c[0]))+'</b></button>'}).join("")+'</div>';
  return h;
}
// secName(key): section display name without the bracket part, e.g. "Advanced English (B1+ to C1)" -> "Advanced English".
function secName(k){for(var i=0;i<SECS.length;i++)if(SECS[i][0]===k)return SECS[i][1].replace(/ \(.*\)$/,"");return k}
// vDotsHtml(index, total): the 5 swipe dots under the Vocabulary cards (the active dot moves inside the 5).
function vDotsHtml(i,n){
  var k=Math.min(5,n),a=i;
  if(n>5){a=i<2?i:(i>=n-2?5-(n-i):2)}
  var h="";for(var j=0;j<k;j++)h+='<i'+(j===a?' class="on"':'')+'></i>';return h;
}
// vIdx(): which card is in view in the Vocabulary carousel (scroll position / card width).
function vIdx(){var c=document.getElementById("vcar");return c&&c.clientWidth?Math.round(c.scrollLeft/c.clientWidth):0}
// vGo(i): jumps the carousel to card i.
function vGo(i){var c=document.getElementById("vcar");if(c)c.scrollLeft=i*c.clientWidth}
// When the Vocabulary carousel scrolls: update the "n / total" counter and the dots.
document.addEventListener("scroll",function(e){var c=e.target;if(!c||!c.classList||!c.classList.contains("vcar"))return;var el=document.getElementById("vcnt"),n=+c.dataset.n;var ix=Math.min(vIdx(),n-1);if(el)el.textContent=(ix+1)+" / "+n;var dd=document.getElementById("vdots");if(dd)dd.innerHTML=vDotsHtml(ix,n)},true);
// vItems(): the list of words after search, learned / not learned and category filters, sorted A-Z.
function vItems(){
  var V=S.vocab||{},q=VQ.trim().toLowerCase();
  var a=twPool().slice().sort(function(x,y){return x.w.toLowerCase()<y.w.toLowerCase()?-1:1});
  return a.filter(function(x){
    // Filter 1: learned only. Filter 2: not learned only. Filter 3: category. Filter 4: search in word or meaning.
    if(VF==="learned"&&!V[x.w])return false;
    if(VF==="new"&&V[x.w])return false;
    if(VC!=="all"&&x.c!==VC)return false;
    return !q||x.w.toLowerCase().indexOf(q)>-1||x.m.toLowerCase().indexOf(q)>-1;
  });
}
// vCard(word, isLearned): HTML of one vocabulary card (word, speaker button, meaning, example, Mark learned button). Fixed height 300px. Also used by the Today tab.
function vCard(x,on){
  return '<div class="card vcd"><div class="row" style="justify-content:space-between"><div class="tww" style="font-size:24px"><bdi>'+esc(x.w)+'</bdi></div><button class="icon ghost" data-wd="vsay" data-w="'+esc(x.w)+'" aria-label="Listen to '+esc(x.w)+'">🔊</button></div><div class="twm"><bdi>'+esc(x.m)+'</bdi></div><div class="twe">\u201c<bdi>'+esc(x.x)+'</bdi>\u201d</div><div class="row" style="justify-content:flex-end;margin-top:auto"><button class="'+(on?'ghost':'')+'" style="min-height:44px;padding:0 14px" data-wd="vtog" data-w="'+esc(x.w)+'">'+(on?'Learned ✓':'Mark learned')+'</button></div></div>';
}
// vList(): the carousel of cards (+ counter, dots and a "Load more" card after VN cards).
function vList(){
  var V=S.vocab||{},it=vItems(),sh=it.slice(0,VN);
  if(!it.length)return '<div class="card ctr"><div style="font-size:40px">🔍</div><b>No words found</b></div>';
  var h='<div class="vnav"><b id="vcnt">1 / '+it.length+'</b></div><div class="vcar" id="vcar" data-n="'+it.length+'">';
  h+=sh.map(function(x){return '<div class="vsl">'+vCard(x,!!V[x.w])+'</div>'}).join("");
  if(it.length>VN)h+='<div class="vsl"><div class="card vcd ctr" style="justify-content:center"><b>'+(it.length-VN)+' more words</b><button data-wd="vmore" style="margin-top:14px">Load more</button></div></div>';
  return h+'</div><div class="vdots" id="vdots">'+vDotsHtml(0,it.length)+'</div>';
}
// menuPage(): simple list page for the Menu items (not used now - the Menu opens as a drop-up).
function menuPage(){
  return '<header><div><h1>Menu</h1><div class="sub">More sections</div></div></header>'+MENU.map(function(m){
    return '<button class="pko" data-t="'+m[0]+'"><span class="pe">'+m[1]+'</span><span><b>'+m[2]+'</b><small>'+m[3]+'</small></span><span class="ck">›</span></button>'}).join("");
}
// vocab(): the Vocabulary page = title, search box, category drop-down, filter chips, carousel.
function vocab(){
  var V=S.vocab||{},tot=twPool().length,ln=Object.keys(V).length;
  var h='<header><div><h1>Vocabulary</h1><div class="sub">'+tot+' words · '+ln+' learned</div></div></header>';
  h+='<input id="vq" type="search" placeholder="Search a word or meaning" value="'+esc(VQ)+'" autocomplete="off" autocapitalize="off" spellcheck="false" style="width:100%;margin-bottom:10px">';
  h+='<div id="vcd">'+vCat()+'</div>';
  h+='<div class="chips">'+[["all","All"],["learned","Learned"],["new","Not learned"]].map(function(c){return '<button class="chip'+(VF===c[0]?' act':'')+'" data-wd="vf" data-w="'+c[0]+'">'+c[1]+'</button>'}).join("")+'</div>';
  return h+'<div id="vl">'+vList()+'</div>';
}
// words(): the Today tab. Shows one card at a time (card number = ti). The Learned button saves the word and shows the next card.
function words(){
  var t=twToday(),N=t.length,V=S.vocab||{},k=(S.tw&&S.tw.k)||[];
  var h='<header><div><h1>Today</h1><div class="sub">'+new Date().toLocaleDateString(undefined,{weekday:"long",day:"numeric",month:"long"})+'</div></div></header>';
  h+='<div class="bar" style="margin-bottom:12px"><i style="width:'+(Math.min(ti,N)/N*100)+'%"></i></div>';
  // st = current card number (never more than N).
  var st=Math.min(ti,N);
  // All 3 cards done -> show the "All done for today" screen with a Start again button.
  if(st>=N)return h+'<div class="sayw" style="--sx:330px"><div class="ctr" style="margin:auto 0"><div style="font-size:72px">🎉</div><div class="big">All done for today</div></div><button data-wd="again" style="margin-top:auto">Start again</button></div>';
  var x=t[st];
  // Reuse the Vocabulary card but swap its "Mark learned" button for the "Learned" button (data-wd="learned").
  h+=vCard(x,false).replace(/<button class="[^"]*" style="[^"]*" data-wd="vtog" data-w="[^"]*">[^<]*<\/button>/,'<button style="min-height:44px;padding:0 14px" data-wd="learned">Learned ✓</button>');
  return h;
}
// Typing in the Vocabulary search box: update the list only (the box keeps focus).
document.addEventListener("input",function(e){if(e.target.id==="vq"){VQ=e.target.value;VN=60;var l=document.getElementById("vl");if(l)l.innerHTML=vList()}});
document.addEventListener("click",function(e){
  var b=e.target.closest("[data-wd]");if(!b)return;
  // LEGACY: refresh button was removed from the screen; handler kept (gives a new set of words for today).
  if(b.dataset.wd==="refresh"){S.tw.r=(S.tw.r||0)+1;S.tw.k=[];ti=0;save();render();scrollTo(0,0);return}
  // Start again: go back to card 1 of Today.
  if(b.dataset.wd==="again"){ti=0;render();scrollTo(0,0);return}
  // Today > Learned: save the word and go to the next card (see twGo).
  if(b.dataset.wd==="learned"){twGo(1);return}
  // Speaker button on a card: read the word and its example aloud.
  if(b.dataset.wd==="vsay"){var vw=twPool().filter(function(z){return z.w===b.dataset.w})[0];if(vw)say(vw.w+". "+vw.x);return}
  // Vocabulary > Mark learned / Learned: toggle the word in S.vocab. First time a word of today is marked = +5 XP (+10 bonus when all 3 are done). Updates the button in place so the carousel does not jump.
  if(b.dataset.wd==="vtog"){var wv=b.dataset.w,pw=twPool().filter(function(z){return z.w===wv})[0];S.vocab=S.vocab||{};var on=!!S.vocab[wv];if(on)delete S.vocab[wv];else if(pw){S.vocab[wv]={m:pw.m,x:pw.x,f:pw.f,t:Date.now()};var tt=twToday(),kk=S.tw.k;if(tt.some(function(q){return q.w===wv})&&kk.indexOf(wv)<0){kk.push(wv);gain(5);if(kk.length===tt.length)gain(10)}}save();var bi=document.querySelector("#v .bar i");if(bi)bi.style.width=(S.tw.k.length/twToday().length*100)+"%";on=!on;b.textContent=on?"Learned ✓":"Mark learned";b.classList.toggle("ghost",on);var sb=document.querySelector("#v .sub");if(sb)sb.textContent=twPool().length+" words · "+Object.keys(S.vocab).length+" learned";return}
  // Open / close the Category drop-down.
  if(b.dataset.wd==="vco"){VCO=!VCO;var cd=document.getElementById("vcd");if(cd)cd.innerHTML=vCat();return}
  // Pick a category: close the drop-down, redraw the button and the cards.
  if(b.dataset.wd==="vcp"){VC=b.dataset.w;VCO=false;VN=60;var cd2=document.getElementById("vcd"),vl2=document.getElementById("vl");if(cd2)cd2.innerHTML=vCat();if(vl2)vl2.innerHTML=vList();return}
  // Pick a filter chip (All / Learned / Not learned).
  if(b.dataset.wd==="vf"){VF=b.dataset.w;VN=60;render();return}
  // "Load more": show 60 more cards and stay on the same card.
  if(b.dataset.wd==="vmore"){var c0=vIdx();VN+=60;render();vGo(c0);return}
  // LEGACY: old arrow buttons of the carousel (arrows were removed, swipe is used).
  if(b.dataset.wd==="vprev"||b.dataset.wd==="vnext"){var cr=document.getElementById("vcar");if(cr)cr.scrollBy({left:(b.dataset.wd==="vnext"?1:-1)*cr.clientWidth,behavior:"smooth"});return}
  // LEGACY: speaker button of the old Today card (uses data-i = card number).
  var t=twToday(),x=t[+b.dataset.i];if(!x)return;
  if(b.dataset.wd==="say"){say(x.w+(x.x?". "+x.x:""));return}
});
// twGo(direction): +1 = learned, go to next card; -1 = previous card. Adds XP and saves the word into S.vocab.
function twGo(d){
  var t=twToday();
  // Stop at the first / last card.
  if(d>0?ti>=t.length:ti<=0)return;
  // First time this word is learned today: +5 XP, and +10 more when all of today's words are learned. Then save it in S.vocab.
  if(d>0){var x=t[ti];if(x){var k=S.tw.k;if(k.indexOf(x.w)<0){k.push(x.w);gain(5);if(k.length===t.length)gain(10)}S.vocab=S.vocab||{};S.vocab[x.w]={m:x.m,x:x.x,f:x.f,t:Date.now()}}ti++}
  else ti--;
  try{speechSynthesis.cancel()}catch(e){}
  save();render();scrollTo(0,0);
}

// setSth(): measures the stats bar height and stores it in --sth, so unit banners can stick right under it.
function setSth(){var s=document.querySelector(".stats");if(s)document.documentElement.style.setProperty("--sth",s.offsetHeight+"px")}
/* the banner that is pinned at the top (or the first one before scrolling) is the "current" card; only it opens the field picker */
// markCur(): marks the unit banner that is pinned at the top as "current" (.cb) and hides the older ones (.old).
function markCur(){
  var bs=document.querySelectorAll("#v .ub");if(!bs.length)return;
  var sth=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--sth"))||56,ci=0,i;
  for(i=0;i<bs.length;i++){if(bs[i].getBoundingClientRect().top<=sth+2)ci=i;else break}
  /* banners before the current one are hidden, so a taller old banner never peeks out from under the new one */
  for(i=0;i<bs.length;i++){
    var on=i===ci,old=i<ci,c=bs[i].classList;
    if(c.contains("cb")!==on)c.toggle("cb",on);
    if(c.contains("old")!==old)c.toggle("old",old);
  }
}
// Scroll / resize listeners (throttled with requestAnimationFrame) keep the pinned banner correct.
var mt=0;
window.addEventListener("scroll",function(){if(mt)return;mt=requestAnimationFrame(function(){mt=0;markCur()})},{passive:true});
window.addEventListener("resize",function(){setSth();markCur()});
// stats(): the top bar on Home: language, streak, XP and energy.
function stats(){return '<div class="stats"><span>🇺🇸 EN</span><span>🔥 '+S.streak+'</span><span>💎 '+S.xp+'</span><span style="color:#ff86d0">⚡ <b id="en">'+enTxt()+'</b></span></div>'}
// path(): the Home screen = stats bar, section chips and the learning path (units with 8 lesson circles).
function path(){
  // Make sure the selected section exists, then draw the stats bar and the section chips.
  if(!SECS.some(function(s){return s[0]===S.cs}))S.cs=SECS[0][0];
  var h=stats()+'<div class="chips sc">'+SECS.map(function(s){return '<button class="chip'+(s[0]===S.cs?' act':'')+'" data-s="'+s[0]+'">'+s[1].split(" ")[0]+'</button>'}).join("")+'</div>'+lvBar();
  // gi = running unit number (used to choose colours and the zig-zag offset).
  var gi=0;
  // Go through every section. Only the selected section (S.cs) is drawn; others are only counted.
  SECS.forEach(function(s,si){
    var k=s[0],pk=s[2],n=0;
    // Not the selected section: just advance the unit counter and skip.
    if(k!==S.cs){groups(k).forEach(function(g){gi+=g.units.length});return}
    // Section title.
    h+='<div class="sec">Section '+(si+1)+' · '+s[1]+'</div>';
    // LEVEL FILTER: nothing at this level yet -> show a "coming soon" card instead of an empty path.
    var cnt=0;groups(k).forEach(function(g){cnt+=g.units.length});
    if(!cnt)h+='<div class="card ctr"><div style="font-size:40px">🚧</div><b>'+lvName()+' lessons for '+esc(s[1])+' are coming soon</b><p class="note">Pick another level above for now.</p></div>';
    // Each group = base units, then one group per chosen field.
    groups(k).forEach(function(g){
      // A chosen field with no units at this level is skipped.
      if(g.n&&!g.units.length)return;
      // Field header bar with a CHANGE button (only for field groups).
      if(g.n)h+='<div class="fh" data-p="'+k+'" role="button" tabindex="0"><span>'+g.e+' '+esc(g.n)+'</span><b>CHANGE</b></div>';
      // prev = previous unit; a unit unlocks when the previous one is fully done (8 lessons).
      var prev=null;
      // Draw one unit: banner + 8 lesson buttons.
      g.units.forEach(function(u,ui){
        // P = lessons done. open = first unit, or started, or jumped to, or previous unit finished. dn = unit finished. lk = locked.
        var P=prog(u),open=ui===0||P>0||!!S.op[u.id]||(prev&&prog(prev)>=NLS),dn=P>=NLS,lk=!open,ux=gi++,col=COL[ux%COL.length];n++;
        // Unit banner (coloured bar with the title, pinned while scrolling).
        h+='<div class="ub" data-x="1" data-sec="'+k+'"'+(ui===0?' id="ub-'+k+(g.o?'-'+g.o:'')+'"':'')+' style="background:'+col+'"><div><small>SECTION '+(si+1)+', UNIT '+n+'</small><div class="tl">'+esc(s[1]+': '+u.t)+'</div></div><span>📋</span></div>';
        // Locked unit: "JUMP HERE?" button to unlock it.
        if(lk)h+='<div class="jw"><div class="jb" style="color:'+col+'">JUMP HERE?</div><button class="nd jmp" style="--c:'+col+'" data-j="'+esc(u.id)+'" aria-label="Unlock '+esc(u.t)+'">⏩</button></div>';
        // The 8 lesson circles: done (gold), current (coloured with START) or locked (grey), placed in a zig-zag.
        for(var m=0;m<NLS;m++){
          // st = state of this lesson; off = sideways offset in px for the zig-zag.
          var st=m<P?"done":(m===P&&open)?"cur":"lock",off=Math.round(Math.sin(ux*NLS+m)*65);
          h+='<div class="nw" style="transform:translateX('+off+'px)">'+(st==="cur"?'<div class="sb" style="--c:'+col+'">START</div>':'')+
          (m===4?'<div class="mas" style="'+(off>0?"right":"left")+':calc(50% + 105px)"><div class="'+(lk?"gr":"")+'">'+u.e+'</div><div class="s3'+(dn?" g":"")+'">'+(dn?"★★★":"☆☆☆")+'</div></div>':'')+
          '<button class="nd '+st+'" style="--c:'+(st==="done"?"#ffc800":st==="lock"?"#e5e5e5":col)+'"'+(st==="lock"?' aria-label="Locked lesson"':' data-g="'+esc(u.id)+'" data-n="'+m+'" aria-label="Lesson '+(m+1)+' of '+esc(u.t)+'"')+'>'+ICO[m]+'</button></div>';
        }
        // This unit becomes "previous" for the next one.
        prev=u;
      });
    });
    // Sections with a picker (Work, Study, Teaching, Interview) and no field chosen yet: show the "Choose your field" bar.
    // The field bar only shows when this section has field units at the picked level.
    var fieldHas=pk&&(FIELDS[k]||[]).some(function(o){return o.units.some(function(u){return lvOf(u)===lvCur()})});
    if(pk&&fieldHas&&!(S.fl[k]||[]).length)h+='<div class="fh new" data-p="'+k+'" role="button" tabindex="0"><span>🎯 Choose your field</span><b>EXTRA UNITS</b></div>';
  });
  // Footer card explaining how to get more units.
  return h+'<div class="card ctr"><div style="font-size:40px">🎯</div><b>Want more units?</b><p class="note">In Work, Study, Teaching and Interview, tap the Choose your field bar under the units to add extra units.</p></div>';
}
// MENU DROP-UP: renderMn(1) shows the small list above the Menu button, renderMn(0) closes it.
// It is a transparent full-screen layer (#mn) so a tap outside closes it.
