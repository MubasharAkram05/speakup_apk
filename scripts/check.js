// Syntax-checks every JS file and verifies index.html references exist.
const fs = require("fs"), path = require("path"), vm = require("vm");
const www = path.join(__dirname, "..", "www");
const html = fs.readFileSync(path.join(www, "index.html"), "utf8");
const refs = [...html.matchAll(/(?:src|href)="((?:js|css)\/[^"]+)"/g)].map(m => m[1]);
let bad = 0;
for (const r of refs) {
  const f = path.join(www, r);
  if (!fs.existsSync(f)) { console.error("MISSING", r); bad++; continue; }
  if (r.endsWith(".js")) {
    try { new vm.Script(fs.readFileSync(f, "utf8"), { filename: r }); }
    catch (e) { console.error("SYNTAX", r, e.message); bad++; }
  }
}
console.log(bad ? `${bad} problem(s)` : `OK - ${refs.length} files checked`);
process.exit(bad ? 1 : 0);
