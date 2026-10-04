/*
  Customer login uses Firebase Authentication (a free service from Google).
  Until you paste your own project's settings below, the login popup will
  say that login is not switched on yet. Nothing else on the site is affected.

  Where to find these values:
  Firebase console -> Project settings (gear icon) -> "Your apps" -> Web app
  -> "SDK setup and configuration" -> Config.

  These values are safe to keep in a public website file. They only identify
  your project; they are not passwords. Security is controlled in the Firebase
  console (Authentication -> Settings -> Authorized domains).
*/
window.MUHEVA_FIREBASE_CONFIG = {
  apiKey: "PASTE_API_KEY_HERE",
  authDomain: "PASTE_PROJECT_ID_HERE.firebaseapp.com",
  projectId: "PASTE_PROJECT_ID_HERE",
  appId: "PASTE_APP_ID_HERE"
};
