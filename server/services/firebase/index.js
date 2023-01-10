const admin = require("firebase-admin");

const serviceAccount = require("../../../configs/firebase/ServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
