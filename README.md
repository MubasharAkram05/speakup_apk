# SpeakUp English

Professional English practice app for work, study, teaching and interviews.
Runs in the browser and as an Android app (Capacitor).

## Project structure
```
speakup-apk/
├── www/                      # the app (this is what ships)
│   ├── index.html
│   ├── css/                  # styles split by purpose
│   ├── js/
│   │   ├── data/             # course content
│   │   ├── core/             # state + events/start-up
│   │   ├── screens/          # Today, fields, Practice/Me/Backup
│   │   └── lesson/           # lesson engine
│   └── assets/icons/
├── scripts/                  # check.js, build-single.js
├── docs/ARCHITECTURE.md
├── .github/workflows/        # cloud APK build
├── capacitor.config.json
└── package.json
```

## Develop
```
npm install
npm start            # http://localhost:8080
npm run check        # validate files
npm run build:single # dist/SpeakUp-English.html
```

## Build the Android APK (GitHub Actions)
Push to GitHub -> **Actions** -> latest run -> download artifact **SpeakUp-English-apk**.
Builds are signed with a fixed key (see [docs/SIGNING.md](docs/SIGNING.md)), so updates install over the old app.
Microphone: the Android app uses the native speech plugin; Chrome uses the browser API (`www/js/core/native-speech.js`).

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for details.
