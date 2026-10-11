# Architecture

Plain HTML/CSS/JS (no framework, no bundler). Scripts are classic scripts that
share one global scope, so **load order in `www/index.html` matters**.

| Layer | Folder | Role |
|---|---|---|
| Data | `js/data/` | Course content: units, words, sentences, quizzes, level content |
| Core | `js/core/` | `native-speech.js` (mic: native plugin on Android, browser API on Chrome), `state.js` (saved progress, `localStorage` key `su2`), `events.js` (global click handler, start-up, dictation) |
| Screens | `js/screens/` | Today words, field picker, Practice / Me / Backup |
| Lesson engine | `js/lesson/` | Characters & chat, exercise cards, podcast + lip-sync, intro camera, speaking |
| Styles | `css/` | Theme variables + components (later files override earlier) |

## Where to change things
- Add / edit lessons: `js/data/`
- Colours & theme: top of `css/base.css` (`:root` and `:root[data-theme="dark"]`)
- Saved progress & backup: `js/core/state.js`, `js/screens/practice-me-backup.js`

## Commands
- `npm start` - run locally at http://localhost:8080
- `npm run check` - syntax-check all JS and references
- `npm run build:single` - one-file bundle in `dist/`
