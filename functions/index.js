const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

// exports.happyBirthday = functions.pubsub
//   .schedule("every 5 minutes")
//   .onRun(async function (context) {
//     console.log("This will be run every 5 minutes!");
//     const users = await admin
//       .firestore()
//       .collection("user")
//       .where("dateOfBirth", "==", "2021-06-15")
//       .get()
//       .data();
//     functions.logger.info(JSON.stringify(users), { structuredData: true });
//     return null;
//   });

exports.scheduledFunctionCrontab = functions.pubsub
    .schedule("every 5 minutes")
    .onRun((context) => {
      console.log("every 5 minutes tripped");
      return null;
    });
