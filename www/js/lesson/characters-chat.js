/* ---- characters, chat ---- */
// M = the 5 characters (emoji, name) that "talk" in the lessons.
var M=[["🧕","Zari"],["🐻","Falstaff"],["👳","Sam"],["👩‍🦰","Lily"],["🧔","Junior"]];
// wd(text): words of a sentence without . , ? !
function wd(s){return s.replace(/[.,?!]/g,"").split(/\s+/)}
// dw(text): HTML where every word is a <span class="dw"> (so words can be coloured when speaking).
function dw(s){return s.split(/\s+/).filter(Boolean).map(function(w){return '<span class="dw">'+esc(w)+'</span>'}).join(" ")}
// pool(unit): all words of all sentences of the unit (used to make wrong options).
function pool(d){var a=[];d.s.forEach(function(x){a=a.concat(wd(x))});return a}
// pickW(sentence): the longest word - this is the word that gets hidden in fill-in exercises.
function pickW(s){var w=wd(s).filter(function(x){return /^[A-Za-z]+$/.test(x)}),k=0;w.forEach(function(x,i){if(x.length>w[k].length)k=i});return w[k]}
// fill(unit, sentence): "fill the blank" step. 3 options: the hidden word + 2 words from the same unit.
function fill(d,s){
  var c=pickW(s),o=[c],p=pool(d).filter(function(x){return x.length>2&&x.toLowerCase()!==c.toLowerCase()}).sort(rnd);
  for(var i=0;o.length<3&&i<p.length;i++)if(o.indexOf(p[i])<0)o.push(p[i]);
  o.sort(rnd);return{t:"fill",s:s,c:c,o:o,a:o.indexOf(c)};
}
// shortS(unit, sentence): a sentence of 6 words or fewer for listening (long ones are replaced by a short one from the unit).
function shortS(d,s){
  if(wd(s).length<=6)return s;
  var c=d.sh&&d.sh.length?d.sh:[6,8].map(function(m){return d.s.filter(function(x){return wd(x).length<=m})}).filter(function(a){return a.length})[0];
  if(!c)return s;
  return c[hash(s)%c.length];
}
// lis(unit, sentence): "tap the words you hear" step (word bank = the words + 2 extra words).
function lis(d,s){
  s=shortS(d,s);
  var w=wd(s),p=pool(d).filter(function(x){return w.indexOf(x)<0}).sort(rnd).slice(0,2);
  return{t:"listen",s:s,bank:w.concat(p).sort(rnd)};
}
// typ(sentence): "type what you hear" step. The hidden word is the longest word.
function typ(s){return{t:"type",s:s,c:pickW(s)}}
// VOC = cached list of every word in the course (used to find look-alike words for the type exercise).
var VOC=null;
// lev(a,b): Levenshtein distance = how many letters must change to turn word a into word b.
function lev(a,b){
  var m=a.length,n=b.length,p=[],i,j;
  for(j=0;j<=n;j++)p[j]=j;
  for(i=1;i<=m;i++){var q=[i];for(j=1;j<=n;j++)q[j]=Math.min(p[j]+1,q[j-1]+1,p[j-1]+(a[i-1]===b[j-1]?0:1));p=q}
  return p[n];
}
/* real words from the whole course that look like the target (present -> presentation, presenting, represent...) */
// similar(word): up to 6 real course words that look like the target (used as tricky wrong options).
function similar(c){
  if(!VOC){var seen={};VOC=[];Object.keys(BYID).forEach(function(id){BYID[id].s.forEach(function(t){wd(t).forEach(function(w){var k=w.toLowerCase();if(k.length>=3&&/^[a-z]+$/.test(k)&&!seen[k]){seen[k]=1;VOC.push(k)}})})})}
  var sc=[];
  VOC.forEach(function(w){
    if(w===c)return;
    var d=lev(c,w),pre=0,suf=0;
    while(pre<3&&w[pre]===c[pre])pre++;
    while(suf<3&&w[w.length-1-suf]===c[c.length-1-suf])suf++;
    var contains=w.indexOf(c)>-1||c.indexOf(w)>-1;
    var score=d-(contains?2:0)-(pre>=3?1:0)-(suf>=3?1:0);
    if(d<=Math.max(2,Math.ceil(c.length/2))||(contains&&Math.min(w.length,c.length)>=5))sc.push([score+Math.random()*.9,w]);
  });
  sc.sort(function(x,y){return x[0]-y[0]});
  return sc.slice(0,6).sort(rnd).map(function(x){return x[1]});
}
// tyOpts(step): the word-bank tiles for a type exercise (right word + 2 look-alikes, shuffled, with matching capital letter).
function tyOpts(s){
  if(!s.o){
    var c=s.c.toLowerCase(),cap=s.c[0]!==s.c[0].toLowerCase(),p=similar(c).slice(0,2);
    if(p.length<2){var seen={};p.forEach(function(x){seen[x]=1});pool(L.u).forEach(function(x){var k=x.toLowerCase();if(p.length<2&&k.length>=3&&k!==c&&!seen[k]&&/^[a-z]+$/.test(k)){seen[k]=1;p.push(k)}})}
    s.o=[s.c].concat(p.map(function(x){return cap?x[0].toUpperCase()+x.slice(1):x})).sort(rnd);
  }
  return '<div class="bank">'+s.o.map(function(w,i){return '<button class="tile" data-ty="'+i+'">'+esc(w)+'</button>'}).join("")+'</div>';
}
// sy(sentence): "say this sentence" (speaking) step.
function sy(s){return{t:"say",s:s}}
// chat(unit): conversation step - one question and 2 answers (right / silly).
function chat(d){var c=d.ch,o=[c[1],c[2]].sort(rnd);return{t:"chat",s:c[0],o:o,a:o.indexOf(c[1])}}
// ctx(unit, i): "What does this word mean?" shown inside a real sentence (vcx). Falls back to mq() when no sentence is found.
function ctx(d,i){
  var w=d.w[i],ex=w[2]||"";
  if(!ex){var re=new RegExp("\\b"+w[0].toLowerCase().replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\b","i");for(var j=0;j<d.s.length;j++)if(re.test(d.s[j])){ex=d.s[j];break}}
  if(!ex)return mq(d,i);
  var o=[w[1]];d.w.forEach(function(x,j){if(j!==i&&o.length<3)o.push(x[1])});
  var c=o[0];o.sort(rnd);
  return{t:"vcx",s:ex,word:w[0],v:i%2,q:"\u201C"+w[0]+"\u201D means\u2026",o:o,a:o.indexOf(c)};
}
// dwh(sentence, word): like dw() but highlights the target word (and its forms) in the sentence.
function dwh(s,word){
  var wt=word.toLowerCase().split(/[^a-z']+/).filter(Boolean);
  return s.split(/\s+/).filter(Boolean).map(function(t){
    var k=t.toLowerCase().replace(/[^a-z']/g,""),hl=wt.some(function(x){return k===x||(x.length>=5&&k.indexOf(x.slice(0,x.length-2))===0)});
    return '<span class="dw'+(hl?' vhl':'')+'">'+esc(t)+'</span>';
  }).join(" ");
}
// SPKSVG: speaker icon (SVG).
var SPKSVG='<svg viewBox="0 0 28 24" width="30" height="26" aria-hidden="true"><path d="M2 8.5h5.5L14 3v18l-6.5-5.5H2z" fill="currentColor"/><path d="M18 8a5.5 5.5 0 0 1 0 8M21.5 4.5a10.5 10.5 0 0 1 0 15" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>';
// mq(unit, i): multiple choice "What does X mean?" - right meaning + 2 others.
function mq(d,i){
  var o=[d.w[i][1]];d.w.forEach(function(w,j){if(j!==i&&o.length<3)o.push(w[1])});
  var c=o[0];o.sort(rnd);
  return{t:"mcq",q:'What does "'+d.w[i][0]+'" mean?',o:o,a:o.indexOf(c)};
}
// wave(): the animated sound bars shown while audio plays.
function wave(){var b="";for(var k=0;k<20;k++)b+='<i style="height:'+Math.round(8+Math.abs(Math.sin(k*1.7))*26)+'px"></i>';return b}
// sim(a,b): similarity 0-1 = share of words of b that appear in a (used to score speech).
function sim(a,b){var x=norm(a),y=norm(b),h=0;if(!y.length)return 0;y.forEach(function(w){if(x.indexOf(w)>-1)h++});return h/y.length}
// hear(unit, i): "Which sentence did you hear?" - audio plays, learner picks 1 of 3 sentences.
function hear(d,i){var s=d.s,c=s[i%s.length],o=[c];for(var j=1;o.length<3&&j<s.length;j++){var x=s[(i+j*5)%s.length];if(o.indexOf(x)<0)o.push(x)}o.sort(rnd);return{t:"hear",s:c,o:o,a:o.indexOf(c)}}
// dict(unit, i): dictation step - hear a sentence and write it.
function dict(d,i){return{t:"dict",s:d.s[i%d.s.length]}}
// rq(unit, i): reverse question - read a meaning, pick the word.
function rq(d,i){var o=[d.w[i][0]];d.w.forEach(function(w,j){if(j!==i&&o.length<3)o.push(w[0])});var c=o[0];o.sort(rnd);return{t:"mcq",q:'Which word fits: "'+d.w[i][1]+'"?',o:o,a:o.indexOf(c)}}
// story(unit, k): a short chat story between two characters, with questions (who said it, fill, listening...).
function story(d,k){
  var s=d.s,x=hash(d.id||d.t),A=M[(x+k)%5],B=M[(x+k+2)%5],acc=[],st=[];
  function mk(i){var b=i%2===1,p=b?B:A;return{n:p[1],e:p[0],x:s[(k*6+i)%s.length],r:b}}
  st.push({t:"story",k:k,lines:[],nar:A[1]+" and "+B[1]+" are talking about "+d.t.toLowerCase()+"."});
  for(var i=0;i<6;i++){
    var ln=mk(i);acc.push(ln);
    st.push({t:"story",k:k,lines:acc.slice(-4)});
    if(i===1){var o=[A[1],B[1]].sort(rnd);st.push({t:"mcq",q:'Who said: "'+ln.x+'"?',o:o,a:o.indexOf(ln.n)})}
    if(i===3)st.push(fill(d,ln.x));
    if(i===5){st.push(lis(d,ln.x));if(k===1)st.push(chat(d));if(k===2)st.push(typ(mk(4).x))}
  }
  return st;
}
// DICSVG: dictation microphone icon (SVG).
var DICSVG='<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><rect x="9" y="2.5" width="6" height="11.5" rx="3" fill="#fff"/><path d="M5 11.2a7 7 0 0 0 14 0" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/><path d="M12 18.2v2.6M8.6 21h6.8" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>';
// build0(unit, lessonNo): builds the steps of ONE lesson (lessonNo 0-7 = the 8 circles on the path).
// Real lesson types: 0 mixed practice, 1 vocabulary, 2 listening / podcast (Lucy), 3 story, 4 typing / dictation,
// 5 speaking, 6 hearing, 7 final quiz.
// (Type 2 "vocabulary part 2" below is not used: n is taken from [0,1,3,4,5,6,7,8].)
function build0(d,n0){
  // n0 = circle number; n = lesson type used in the if(n===...) blocks below.
  var n=[0,1,3,4,5,6,7,8][n0];
  var s=n===0&&d.es&&d.es.length>=6?d.es:d.s,st=[],nw=d.w.length,h1=Math.ceil(nw/2),i,sh0=d.sh;
  if(n===0)d.sh=(d.shE||[]).concat(["Could you repeat that, please?","Let us start now.","I will call you later.","Please send me the file.","Thank you for your help.","I need a little more time.","See you tomorrow at nine.","Can you help me, please?"]);
  // a(i): sentence number i (wraps around if the unit has fewer sentences).
  function a(i){return s[i%s.length]}
  // Lesson 0 (⭐): fill, say, listen, say, type ... 12 mixed steps.
  if(n===0)st=[fill(d,a(0)),sy(a(1)),lis(d,a(2)),sy(a(3)),typ(a(4)),sy(a(5)),lis(d,a(6)),sy(a(7)),fill(d,a(8)),sy(a(9)),lis(d,a(18)),typ(a(19))];
  // Lesson 1 (📖): teach each word (learn card + sentence question), then 5 reverse questions.
  if(n===1){for(i=0;i<nw;i++){st.push({t:"learn",w:d.w[i]});st.push(ctx(d,i))}var ord1=[];for(i=0;i<nw;i++)ord1.push(i);ord1.sort(rnd).slice(0,5).forEach(function(k){st.push(rq(d,k))})}
  // Lesson 5 (✍️): fill, type and dictation steps.
  if(n===5)st=[fill(d,a(2)),typ(a(3)),fill(d,a(4)),typ(a(5)),dict(d,6),fill(d,a(7)),typ(a(8)),dict(d,9),fill(d,a(10)),typ(a(11)),dict(d,12),typ(a(13))];
  // Lesson 3 (🎧): the listening / podcast with Lucy.
  if(n===3)st=listenLesson(d);
  // Lesson 4 (💬): story conversation.
  if(n===4)st=story(d,1);
  if(n===2){for(i=h1;i<nw;i++){st.push({t:"learn",w:d.w[i]});st.push(ctx(d,i))}var ord=[];for(i=0;i<nw;i++)ord.push(i);ord.sort(rnd).slice(0,5).forEach(function(k){st.push(rq(d,k))})}
  // Lesson 6 (🎤): 10 speaking sentences + one chat step.
  if(n===6){for(i=14;i<24;i++)st.push(sy(a(i)));st.splice(5,0,chat(d))}
  // Lesson 7 (👂): hearing and dictation steps.
  if(n===7){var dd={id:d.id,t:d.t,s:(d.sh&&d.sh.length>=6?d.sh:d.s),w:d.w,ch:d.ch};for(i=0;i<9;i++)st.push(i%3===2?dict(dd,i):hear(dd,i));st.push(hear(dd,9),dict(dd,10),hear(dd,11))}
  // Final quiz (🏆): all quiz questions of the unit, then listen, fill, chat and speaking.
  if(n===8){d.q.forEach(function(q){st.push({t:"mcq",q:q[0],o:q[1],a:q[2]})});st.push(lis(d,a(6)),fill(d,a(13)),chat(d),sy(a(9)),sy(a(14)),sy(a(17)))}
  d.sh=sh0;
  // Warm-up: puts 1-2 "which sentence did you hear" steps at the start of lessons 4, 5 and 8 (only if the lesson stays within 15 steps).
  if(n===4||n===5||n===8){
    var tx="";st.forEach(function(x){if(x.s)tx+=" "+x.s;if(x.lines)x.lines.forEach(function(l){tx+=" "+l.x})});tx=tx.toLowerCase();
    var mc=n===4?[hear(d,2),hear(d,6)]:n===8?[hear(d,4)]:[];
    if(mc.length&&st.length+mc.length<=15)st=mc.concat(st);
  }
  return st;
}
