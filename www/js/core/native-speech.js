/* SpeakUp English - speech recognition adapter
 * ---------------------------------------------------------------
 * Android app (Capacitor): uses the native plugin
 *   @capacitor-community/speech-recognition  (Android SpeechRecognizer)
 *   -> asks the real RECORD_AUDIO permission, works inside the APK.
 * Normal browser (Chrome): falls back to the browser's own
 *   SpeechRecognition / webkitSpeechRecognition.
 *
 * Both return an object with the same small interface the app already uses:
 *   rec.lang, rec.interimResults, rec.maxAlternatives
 *   rec.start(), rec.stop(), rec.abort()
 *   rec.onstart, rec.onresult(e), rec.onerror({error}), rec.onend
 *   e.results[i] = [{transcript}, ...] with .isFinal
 */
var SpeakUpSpeech = (function () {
  var Cap = window.Capacitor;
  var isNative = !!(Cap && Cap.isNativePlatform && Cap.isNativePlatform());
  function plugin() { return isNative && Cap.Plugins && Cap.Plugins.SpeechRecognition; }

  function NativeRec() {
    this.lang = "en-US"; this.interimResults = true; this.maxAlternatives = 3;
    this._active = false; this._aborted = false; this._last = null; this._handles = [];
  }
  NativeRec.prototype._emit = function (matches, isFinal) {
    var r = matches.map(function (t) { return { transcript: t }; });
    r.isFinal = isFinal;
    if (this.onresult) this.onresult({ results: [r] });
  };
  NativeRec.prototype._finish = function (err) {
    if (!this._active) return;
    this._active = false;
    this._handles.forEach(function (h) { try { h.remove(); } catch (e) {} });
    this._handles = [];
    if (err && this.onerror) this.onerror({ error: err });
    if (this.onend) this.onend();
  };
  NativeRec.prototype.start = function () {
    var self = this, P = plugin();
    if (!P) { setTimeout(function () { self._active = true; self._finish("service-not-allowed"); }); return; }
    self._active = true; self._aborted = false; self._last = null;
    P.available()
      .then(function (a) { if (!a || !a.available) throw "service-not-allowed"; return P.checkPermissions(); })
      .then(function (p) { return p.speechRecognition === "granted" ? p : P.requestPermissions(); })
      .then(function (p) { if (p.speechRecognition !== "granted") throw "not-allowed"; })
      .then(function () {
        return Promise.all([
          P.addListener("partialResults", function (d) {
            if (!self._active || !d || !d.matches || !d.matches.length) return;
            self._last = d.matches;
            if (self.interimResults) self._emit(d.matches, false);
          }),
          P.addListener("listeningState", function (d) {
            if (!d || d.status !== "stopped" || !self._active) return;
            if (self._aborted) return self._finish();
            if (self._last) { self._emit(self._last, true); self._finish(); }
            else self._finish("no-speech");
          })
        ]);
      })
      .then(function (h) {
        self._handles = h;
        return P.start({ language: self.lang, maxResults: self.maxAlternatives, partialResults: true, popup: false });
      })
      .then(function () { if (self._active && self.onstart) self.onstart(); })
      .catch(function (e) {
        var msg = typeof e === "string" ? e : ((e && (e.message || e.error || e.code)) || "error");
        if (/permission|denied/i.test(msg)) msg = "not-allowed";
        self._finish(msg);
      });
  };
  NativeRec.prototype.stop = function () { var P = plugin(); if (P && this._active) P.stop().catch(function () {}); };
  NativeRec.prototype.abort = function () { this._aborted = true; this.stop(); };

  return {
    isNative: isNative,
    // true if some kind of speech recognition can be used here
    supported: function () { return isNative || !!(window.SpeechRecognition || window.webkitSpeechRecognition); },
    // create a new recogniser (or null if not supported)
    create: function () {
      if (isNative) return new NativeRec();
      var B = window.SpeechRecognition || window.webkitSpeechRecognition;
      return B ? new B() : null;
    }
  };
})();
