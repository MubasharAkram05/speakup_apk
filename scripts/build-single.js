// Bundles www/ into ONE self-contained file: dist/SpeakUp-English.html
// (handy for sharing the app as a single file). Usage: npm run build:single
const fs = require("fs"), path = require("path");
const www = path.join(__dirname, "..", "www");
const out = path.join(__dirname, "..", "dist");
let html = fs.readFileSync(path.join(www, "index.html"), "utf8");
const read = f => fs.readFileSync(path.join(www, f), "utf8");
const css = [];
html = html.replace(/<link rel="stylesheet" href="(css\/[^"]+)">\n?/g, (_, f) => { css.push(read(f)); return ""; });
html = html.replace("</head>", `<style>\n${css.join("\n")}</style>\n</head>`);
const js = [];
html = html.replace(/<script src="(js\/[^"]+)"><\/script>\n?/g, (_, f) => { js.push(read(f)); return ""; });
html = html.replace("</body>", `<script>\n${js.join("\n")}</script>\n</body>`);
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, "SpeakUp-English.html"), html);
console.log("Built dist/SpeakUp-English.html", (html.length / 1024).toFixed(0) + " KB");
