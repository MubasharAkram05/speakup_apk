/* ---- speaking: align what was said with the target sentence ---- */
/* returns per target word: "hit" (said correctly), "wrong" (said something else), "miss" (not said) */
// stat(target, said): aligns the spoken words with the target sentence (edit-distance table) and returns "hit" / "wrong" / "miss" per target word.
function stat(tg,said){
  var tw=tg.split(/\s+/).filter(Boolean).map(function(w){return norm(w).join("")}),sw=norm(said),n=tw.length,m=sw.length,d=[],i,j;
  for(i=n;i>=0;i--){d[i]=[];for(j=m;j>=0;j--)d[i][j]=i===n?m-j:j===m?n-i:0}
  for(i=n-1;i>=0;i--)for(j=m-1;j>=0;j--)d[i][j]=Math.min(d[i+1][j+1]+(tw[i]===sw[j]?0:1),d[i+1][j]+1,d[i][j+1]+1);
  var st=[];i=0;j=0;
  while(i<n){
    if(j<m&&d[i][j]===d[i+1][j+1]+(tw[i]===sw[j]?0:1)){st[i]=tw[i]===sw[j]?"hit":"wrong";i++;j++}
    else if(d[i][j]===d[i+1][j]+1){st[i]="miss";i++}
    else j++;
  }
  return st;
}
// hlEls(): the word elements that get coloured (lesson speech bubble or Speak card).
function hlEls(){return document.querySelectorAll(inL?"#ls .bub.c .dw":"#tgt .dw")}
// resetHL(): removes the colours from the words.
function resetHL(){hlEls().forEach(function(e){e.className="dw"})}
// paint(statuses): colours each word green (hit), red (wrong) or grey (miss).
function paint(st){hlEls().forEach(function(e,i){e.className="dw "+(st[i]||"miss")})}
/* while the person is still speaking: colour the words heard so far, the last one stays plain until it is final */
// live(target, said): while the learner is still speaking, colours the words heard so far.
function live(tg,said){
  var st=stat(tg,said),last=-1;
  st.forEach(function(x,i){if(x!=="miss")last=i});
  if(last>-1&&st[last]==="wrong")st[last]="miss";
  paint(st);
}
// talk(on): animates the character avatar while the mic is listening.
function talk(on){var a=document.querySelector(".av.big");if(a)a.classList.toggle("talk",!!on)}
// showRes(target, said): final score % = right words / all words, shows what was heard. Returns the score.
function showRes(tg,said){
  var st=stat(tg,said),hit=st.filter(function(x){return x==="hit"}).length,sc=Math.round(hit/st.length*100);
  paint(st);
  var m=document.getElementById("mic");if(m){m.classList.remove("on");m.classList.toggle("dn",sc>=60)}
  document.getElementById("res").innerHTML='<div class="big" style="font-size:30px">'+sc+'%</div><div class="note">You said: "'+esc(said)+'"</div>';
  document.getElementById("st").textContent="Tap the mic to try again";
  return sc;
}
// after(score): after speaking. 60% or more = good (+5 XP in Speak tab, counts as correct in a lesson). Shows Nice / Amazing / Almost there.
function after(sc){
  var s=inL&&L.steps[L.i],g=sc>=60;
  if(g){S.spoken++;if(!inL)gain(5);save()}
  if(!inL)return;
  if(!s.dn){
    s.dn=1;if(g){L.ok++;L.combo++}else L.combo=0;
    var cm=document.getElementById("cmb");if(cm)cm.innerHTML=L.combo>=2?"COMBO x "+L.combo:"&nbsp;";
    var pb=document.getElementById("pb");if(pb){pb.className="bar"+(L.combo>=2?" cb":"");pb.firstChild.style.width=Math.min(100,(L.i+1)/L.steps.length*100)+"%"}
  }
  var f=document.querySelector(".lbar");f.className="lbar "+(g?"ok":"bad");
  f.innerHTML='<div class="fs"><div class="ft">'+(sc>=90?"Amazing!":g?"Nice!":"Almost there")+'</div>'+(g?'':'<div>Tap the mic to try again, or continue.</div>')+'<button data-a="cont">Continue</button></div>';
}
// micErr(error): turns a speech-recognition error into a clear message (permission denied, no mic, no internet ...).
function micErr(e){
  var n=(e&&(e.name||e.error))||"error",x="";
  if(SpeakUpSpeech.isNative){
    if(n==="not-allowed"||n==="NotAllowedError")return "Microphone permission denied. Open Phone Settings > Apps > SpeakUp English > Permissions > Microphone > Allow.";
    if(n==="service-not-allowed")return "Speech service not found. Install / enable the Google app (Speech Recognition & Synthesis) and try again.";
  }
  if(window.top!==window)return "This page is inside a preview frame. Open the .html file directly in Chrome."+x;
  if(n==="NotAllowedError"||n==="not-allowed"||n==="service-not-allowed")return "Mic denied. Tap the lock icon in the address bar, set Microphone to Allow, then reload."+(location.protocol==="file:"?" If it still fails, run: python -m http.server 8000 in this folder and open http://localhost:8000":"")+x;
  if(n==="NotFoundError"||n==="audio-capture")return "No microphone found."+x;
  if(n==="no-speech")return "I did not hear anything. Try again.";
  if(n==="network")return "Chrome speech service needs internet. Check your connection."+x;
  return "Mic problem ("+n+")."+x;
}
// hits(target, said): how many target words appear in the spoken text (simple count).
function hits(tg,said){var sw=norm(said);return tg.split(/\s+/).filter(function(w){return sw.indexOf(norm(w)[0])>-1}).length}
// mic(target): the mic button. Demo mode = fake result; real mode = browser speech recognition (webkitSpeechRecognition), live colouring while speaking, then showRes + after.
function mic(tg){
  if(!rec)resetHL();
  // OLD (Chrome only): var SR=window.SpeechRecognition||window.webkitSpeechRecognition,st=document.getElementById("st"),m=document.getElementById("mic"),cb=document.getElementById("cb");
  var st=document.getElementById("st"),m=document.getElementById("mic"),cb=document.getElementById("cb");
  function fail(e){st.textContent=micErr(e);m.classList.remove("on");talk(0);if(cb)cb.disabled=false;rec=null}
  m.classList.remove("dn");
  if(S.mic==="demo"){
    if(rec)return;rec=1;m.classList.add("on");talk(1);st.textContent="Demo mode: pretending to listen...";
    setTimeout(function(){
      m.classList.remove("on");talk(0);rec=null;
      var said=tg.split(/\s+/).filter(function(x,i){return i===0||Math.random()>.2}).join(" ");
      after(showRes(tg,said));
      st.textContent="";
    },1100);
    return;
  }
  // OLD: if(!SR){st.textContent="This browser has no speech recognition. Use Chrome.";if(cb)cb.disabled=false;return}
  if(!SpeakUpSpeech.supported()){st.textContent="Speech recognition is not available on this device. Install/enable Google speech services or use Demo mode (Me tab).";if(cb)cb.disabled=false;return}
  if(rec){try{rec.stop()}catch(e){}return}
  function go(){
    // OLD: rec=new SR();rec.lang="en-US";
    rec=SpeakUpSpeech.create();rec.lang="en-US";rec.interimResults=true;rec.maxAlternatives=3;
    rec.onstart=function(){m.classList.add("on");talk(1);st.textContent="Listening... speak now"};
    rec.onresult=function(e){
      var r=e.results[e.results.length-1];
      if(!r.isFinal){st.textContent='Hearing: "'+r[0].transcript+'"';live(tg,r[0].transcript);return}
      var best=r[0].transcript,bh=hits(tg,best);
      for(var i=1;i<r.length;i++){var h=hits(tg,r[i].transcript);if(h>bh){bh=h;best=r[i].transcript}}
      after(showRes(tg,best));
    };
    rec.onspeechend=function(){try{rec.stop()}catch(x){}};
    rec.onerror=fail;
    rec.onend=function(){m.classList.remove("on");talk(0);rec=null};
    try{rec.start()}catch(e){fail(e)}
  }
  // if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){
  // st.textContent="Asking for mic permission...";
  // rec=1;
  // navigator.mediaDevices.getUserMedia({audio:true}).then(function(s){s.getTracks().forEach(function(t){t.stop()});rec=null;go()}).catch(fail);
  // }else go();
  go();
}
// SPEAK + ME TABS
