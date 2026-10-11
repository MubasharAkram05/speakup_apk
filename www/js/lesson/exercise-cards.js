/* ---- extra card types: new pattern, matching pairs, sentence halves, which is correct ---- */
// PATS = "new pattern" exercises for normal units. Format: "title|hint|sentence with ___|right|wrong|wrong2".
var PATS=[
"*I* am so hungry!|The long meeting *makes me* hungry.|Looking at the menu made ___ so hungry!|me|I|my",
"*I would like to* book a table.|She *would like to* speak to the manager.|We ___ like to change our seats.|would|will|are",
"I *look forward to meeting* you.|She *looks forward to starting* her course.|We are looking forward to ___ you soon.|seeing|see|saw",
"I *am used to waking* up early.|He *is used to working* late.|They are used to ___ in a big city.|living|live|lived",
"I *used to play* football every day.|She *used to live* in Karachi.|We used to ___ together at school.|study|studying|studied",
"The tea is *too hot to drink*.|He was *too tired to study*.|The bag was too heavy ___ carry.|to|for|that",
"It was *so cold that* we stayed home.|She was *so tired that* she fell asleep.|The test was so difficult ___ nobody finished.|that|which|than",
"He is *old enough to* drive.|She is *tall enough to* reach it.|The room is big ___ for all of us.|enough|too|very",
"*If it rains*, we *will stay* home.|*If you study*, you *will pass*.|If we leave now, we ___ be on time.|will|would|did",
"*If I had* more time, I *would learn* French.|*If she were* here, she *would help* us.|If I ___ rich, I would travel the world.|were|am|will be",
"I *have lived* here *for* five years.|She *has worked* here *since* 2020.|We have known each other ___ ten years.|for|since|ago",
"I *was reading* when you called.|They *were eating* when the lights went out.|She ___ walking home when it started to rain.|was|were|is",
"The report *was finished* yesterday.|The doors *were locked* at nine.|The letter ___ sent last week.|was|were|has",
"The woman *who* called is my aunt.|The book *which* I bought is long.|The man ___ lives next door is a doctor.|who|which|whose",
"I *suggest taking* a taxi.|She *suggested meeting* at six.|He suggested ___ the window.|opening|to open|open",
"*Let me* help you.|*Let me* explain the problem.|Please let me ___ you a question.|ask|to ask|asking",
"*How about going* to the park?|*How about trying* the new cafe?|How about ___ a short break?|taking|take|to take",
"*Could you please* open the window?|*Could you please* repeat that?|Could you please ___ me your number?|give|giving|to give",
"I *have to* finish this today.|She *has to* wake up at six.|We ___ to leave now.|have|has|are",
"I *wish I had* more time.|She *wishes she could* sing.|I wish I ___ how to swim.|knew|know|will know",
"She is *not only* kind *but also* funny.|The hotel is *not only* cheap *but also* clean.|He speaks not only English but ___ French.|also|too|again",
"This bag is *cheaper than* that one.|She is *taller than* her brother.|Cars are faster ___ bicycles.|than|then|that",
"It is *the best* cafe in town.|He is *the tallest* boy in class.|This is the ___ day of my life.|happiest|happier|happy",
"How *much* water do you drink?|How *many* books do you have?|How ___ people are coming tonight?|many|much|more",
"*There is* a book on the table.|*There are* two chairs here.|There ___ a cat under the car.|is|are|be",
"I called *in order to* ask a question.|She left early *in order to* catch the train.|He saves money in order ___ buy a car.|to|for|that",
"You can go *as long as* you finish.|We will stay *as long as* it is quiet.|I will help you ___ long as you ask.|as|so|like",
"I *enjoy reading* books.|She *enjoys cooking* dinner.|We enjoyed ___ to music.|listening|listen|to listen",
"I *want to* learn English.|She *decided to* study abroad.|He hopes ___ find a new job.|to|for|at",
"It was raining, *so* I stayed home.|He was late, *so* he took a taxi.|I was tired, ___ I went to bed early.|so|because|but",
"*Where is* the station?|*What time does* the shop open?|Where ___ you live?|do|does|are"
];
// PATA = the same pattern exercises for Advanced and IELTS units.
var PATA=[
"*Although* it was expensive, we bought it.|*Although* he was tired, he kept working.|___ the weather was bad, they went outside.|Although|Despite|Therefore",
"The *number of* cars *has risen* sharply.|The *number of* students *has increased* slowly.|The number of visitors ___ fallen since 2010.|has|have|are",
"*It is believed that* sleep improves memory.|*It is said that* walking is healthy.|It is widely ___ that exercise helps learning.|believed|believe|believing",
"Fruit, *such as* apples, is healthy.|Cities *such as* Lahore are busy.|I like sports ___ as football.|such|same|so",
"*If I had* more time, I *would learn* French.|*If she were* here, she *would help* us.|If I ___ rich, I would travel the world.|were|am|will be",
"*Despite* the rain, the match continued.|*Despite* being tired, she kept working.|___ the high prices, many people bought it.|Despite|Although|Because",
"The report *was finished* yesterday.|The doors *were locked* at nine.|The results ___ published last week.|were|was|has",
"I *wish I had* more time.|She *wishes she could* sing.|I wish I ___ how to swim.|knew|know|will know"
];
// PATB = the same pattern exercises for BASIC units (lv:"basic").
var PATB=[
"*I am* a student.|She *is* a teacher.|We ___ at work now.|are|is|am",
"*I have* a laptop.|She *has* a phone.|He ___ a new job.|has|have|having",
"*Do you* like tea?|*Does she* work here?|___ he work on Monday?|Does|Do|Is",
"I go *to* work *by* bus.|She goes *to* school *by* car.|They go to the office ___ train.|by|with|at",
"*There is* a desk here.|*There are* two chairs here.|There ___ a computer on the desk.|is|are|am",
"I *can* speak English.|She *can* write emails.|He ___ help you now.|can|cans|is can",
"I start work *at* nine.|The meeting is *on* Monday.|We have lunch ___ one o'clock.|at|on|in",
"*Please* call me.|*Please* wait here.|___ send me the file.|Please|Sorry|Hello",
"I *am going to* call him.|She *is going to* write an email.|We ___ going to start soon.|are|is|am",
"*Can I* sit here?|*Can I* ask a question?|___ I use your phone?|Can|Do|Am"
];
// patLine(text): HTML of the pattern sentence; words between * * are highlighted and ___ is the blank.
function patLine(t){
  var h="";
  t.split("*").forEach(function(p,i){
    p.split(/\s+/).filter(Boolean).forEach(function(w){
      if(w==="___")h+='<span class="bl" id="bl"></span> ';
      else h+='<span class="dw'+(i%2===1?' vhl':'')+'">'+esc(w)+'</span> ';
    });
  });
  return h;
}
// patStep(unit, n): chooses one pattern exercise (advanced set for adv / ielts units).
function patStep(d,n0){
  var adv=/^(adv|ielts)\//.test(d.id||"")||d.lv==="adv",P=d.lv==="basic"?PATB:adv?PATA:PATS,p=P[(hash(d.id||d.t)+n0*5)%P.length].split("|");
  var o=[p[3],p[4]];if(p[5])o.push(p[5]);
  var c=o[0];o.sort(rnd);
  return{t:"pat",l:[p[0],p[1],p[2]],o:o,a:o.indexOf(c),s:p[2].replace("___",c).replace(/\*/g,"")};
}
// mpItems(unit, n, k): picks k word - meaning pairs for the matching exercise.
function mpItems(d,n0,k){
  var w=d.w,nw=w.length,o=[];
  for(var i=0;i<nw&&o.length<k;i++){
    var x=w[(i+n0*2)%nw];
    if(o.every(function(y){return y[0]!==x[0]}))o.push([x[0],x[1]]);
  }
  return o;
}
// mpStep(): "tap the matching pairs" step; right column is shuffled (never left in the same order). h=1 means sentence halves.
function mpStep(d,n0,items,h){
  items=items||mpItems(d,n0,4);
  var ro=items.map(function(_,i){return i}).sort(rnd);
  if(items.length>1&&ro.every(function(v,i){return v===i}))ro.push(ro.shift());
  return{t:"mp",items:items,ro:ro,h:h?1:0,s:""};
}
// mhStep(unit, n): "match the sentence halves" - 3 sentences of 7-12 words cut in the middle.
function mhStep(d,n0){
  var c=d.s.filter(function(x){var n=x.split(/\s+/).length;return n>=7&&n<=12}),o=[];
  for(var i=0;i<c.length&&o.length<3;i++){
    var x=c[(i+n0*3)%c.length],w=x.split(/\s+/),m=Math.ceil(w.length/2);
    o.push([w.slice(0,m).join(" "),w.slice(m).join(" ")]);
  }
  return o.length>=3?mpStep(d,n0,o,1):null;
}
// FWD = small words (to, of, a, an, be) that can be removed to make a wrong sentence.
var FWD=["to","of","a","an","be"];
// corStep(unit, n): "which sentence is correct?" - the real sentence + 2 broken ones (words swapped or a small word removed).
function corStep(d,n0){
  var c=d.s.filter(function(x){var n=x.split(/\s+/).length;return n>=5&&n<=11&&x.indexOf("?")<0}),x=c.length?c[(hash(d.id||d.t)+n0*3)%c.length]:null;
  if(!x)return null;
  var w=x.split(/\s+/),n=w.length,pos=[],rm=[],i;
  for(i=1;i<n-2;i++)if(w[i].toLowerCase()!==w[i+1].toLowerCase()&&!/[.,!?]$/.test(w[i]))pos.push(i);
  if(!pos.length)return null;
  var p=pos[hash(x)%pos.length],a=w.slice(),t=a[p];a[p]=a[p+1];a[p+1]=t;
  var w1=a.join(" ");
  for(i=1;i<n-1;i++)if(FWD.indexOf(w[i].toLowerCase())>-1)rm.push(i);
  var w2;
  if(rm.length){var r=rm[hash(x+"r")%rm.length],b=w.slice();b.splice(r,1);w2=b.join(" ")}
  else{var q=pos[(hash(x)+1)%pos.length],b2=w.slice(),t2=b2[q];b2[q]=b2[q+1];b2[q+1]=t2;w2=b2.join(" ")}
  if(w1===x||w2===x||w1===w2)return null;
  var op=[x,w1,w2].sort(rnd);
  return{t:"cor",o:op,a:op.indexOf(x),s:x};
}
// build(unit, lessonNo): final steps = build0() + the 3 extra cards (pattern, matching pairs, correct sentence).
// Extra cards are placed at about 30%, 60% and 85% of the lesson (listening and story lessons add them at the end).
function build(d,n0){
  var st=build0(d,n0),n=[0,1,3,4,5,6,7,8][n0];
  var ex=[patStep(d,n0),mpStep(d,n0)],al=(n0%2?mhStep(d,n0):corStep(d,n0))||corStep(d,n0)||mhStep(d,n0);
  if(al)ex.push(al);
  if(n===3||n===4){ex.forEach(function(x){st.push(x)});return st}
  var L0=st.length,ps=[.3,.6,.85].slice(0,ex.length).map(function(f){return Math.round(L0*f)});
  for(var i=ex.length-1;i>=0;i--){
    var p=ps[i];
    while(p<st.length&&st[p-1]&&st[p-1].t==="learn")p++;
    st.splice(p,0,ex[i]);
  }
  return st;
}
// mpPaint(): updates colours of the matching buttons (done = green, selected = highlighted).
function mpPaint(){
  var ms=L.msel,md=L.md||[];
  document.querySelectorAll("#ls .mpb").forEach(function(b){
    var k=b.dataset.mp,side=k.charAt(0),i=+k.slice(1);
    b.classList.toggle("done",md.indexOf(i)>-1);
    b.classList.toggle("sel",!!ms&&ms.side===side&&ms.i===i);
  });
}
// mpTap(side, index): a tap in the matching exercise. Two taps on the same pair = correct; otherwise -1 energy and a shake.
function mpTap(side,i){
  if(!L||L.chk)return;
  var s=L.steps[L.i];L.md=L.md||[];
  if(L.md.indexOf(i)>-1)return;
  var ms=L.msel;
  if(side==="l"&&!s.h)say(s.items[i][0]);
  if(!ms||ms.side===side){L.msel={side:side,i:i};mpPaint();return}
  var li=side==="l"?i:ms.i,ri=side==="r"?i:ms.i;
  if(li===ri){
    L.md.push(i);L.msel=null;mpPaint();
    if(L.md.length===s.items.length){var c=document.getElementById("ck");if(c)c.disabled=false}
  }else{
    L.combo=0;regen();if(S.hearts>=EN)S.ets=Date.now();S.hearts=Math.max(0,S.hearts-1);save();
    var le=document.getElementById("len");if(le)le.textContent=S.hearts;
    var e1=document.querySelector('#ls .mpb[data-mp="l'+li+'"]'),e2=document.querySelector('#ls .mpb[data-mp="r'+ri+'"]');
    L.msel=null;mpPaint();
    [e1,e2].forEach(function(b){if(b){b.classList.add("no");setTimeout(function(){b.classList.remove("no")},400)}});
  }
}
// PATSVG: icon (SVG) for the pattern card.
var PATSVG='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l9.5 9.5-9.5 9.5L2.5 12z" fill="#fff"/><circle cx="12" cy="8.3" r="1.6" fill="#ce82ff"/><circle cx="8.3" cy="12" r="1.6" fill="#ce82ff"/><circle cx="15.7" cy="12" r="1.6" fill="#ce82ff"/><circle cx="12" cy="15.7" r="1.6" fill="#ce82ff"/></svg>';
// mpHtml(step): HTML of the two columns of the matching exercise.
function mpHtml(s){
  var dn=L.md||[];
  function bt(side,i,txt,w){return '<button class="mpb'+(w?' w':'')+(dn.indexOf(i)>-1?' done':'')+'" data-mp="'+side+i+'">'+esc(txt)+'</button>'}
  return '<h2 class="ttl">'+(s.h?"Match the sentence halves":"Tap the matching pairs")+'</h2><div class="mpg"><div class="mpc">'+
    s.items.map(function(x,i){return bt("l",i,x[0],!s.h)}).join("")+'</div><div class="mpc">'+
    s.ro.map(function(i){return bt("r",i,s.items[i][1],0)}).join("")+'</div></div>';
}
// CK(enabled): the Check button.
function CK(on){return '<button id="ck" data-a="ck"'+(on?'':' disabled')+'>Check</button>'}
// opts(step): the answer option buttons.
function opts(s,nn){return '<div class="opts'+(nn?' nonum':'')+'">'+s.o.map(function(x,i){return '<button class="opt" data-o="'+i+'">'+esc(x)+'</button>'}).join("")+'</div>'}
// openL(unitId, lessonNo): opens a lesson - only if this lesson is already unlocked (n <= progress). Builds L.
function openL(id,n){
  var u=BYID[id];if(!u||n>prog(u))return;
  // L = the lesson state: steps, current step i, correct answers ok, combo, selected option, tiles ba, checked flag chk, finished fin, out-of-energy fail.
  L={id:id,u:u,x:hash(id),n:n,i:0,ok:0,combo:0,sel:null,ba:[],chk:0,fin:0,fail:0};
  S.lu=id;regen();L.steps=build(u,n);if(S.hearts<=0)L.fail=1;inL=true;if(HS.indexOf("L")<0)hpush("L");enter();
}
// enter(): draws the current step and plays its audio automatically when it has one.
function enter(){
  ls();var s=L.steps[L.i];
  if(s&&!L.fail){if(s.t==="listen"||s.t==="hear"||s.t==="dict"||s.t==="vcx")say(s.s);if(s.t==="pod"){if(s.ring){ring();setTimeout(function(){if(inL&&L&&L.steps[L.i]===s&&!L.fail)podPlay(s.pl,s.from,s.to,true,s)},1500)}else podPlay(s.pl,s.from,s.to,true,s)}if(s.t==="splash")splashRun(s);if(s.t==="learn")say(s.w[0]);if(s.t==="story"&&s.lines.length)say(s.lines[s.lines.length-1].x)}
}
// PODCAST LISTENING (🎧 lessons): Lucy (host) and a guest read a dialogue aloud; the learner listens, answers and can replay parts.
