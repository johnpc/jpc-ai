# ai.jpc.io

A dead-simple app for chatting with gen ai

The app is available live at [https://ai.jpc.io](https://ai.jpc.io). You can download the app for iOS devices on the [App Store](https://apps.apple.com/us/app/jpc-ai/id6737018549).

## Setup

Clone the repo, install dependencies, deploy backend resources:

```bash
git clone git@github.com:johnpc/jpc-ai.git
cd jpc-ai
npm install
npx cap sync
npx ampx sandbox
```

Then, to run the frontend app

```bash
# on web
npm run dev
```

or

```bash
# on ios
npm run ios
```

## Deploying

Deploy this application to your own AWS account in one click:

[![amplifybutton](https://oneclick.amplifyapp.com/button.svg)](https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/johnpc/jpc-ai)
