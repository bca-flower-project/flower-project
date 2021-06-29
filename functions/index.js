const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp()

exports.happyBirthday = functions.pubsub
  .schedule("every 24 hours")
  .onRun(async (context) => {
    const today = new Date()
    const currMonth = `${today.getMonth() + 1}`.padStart(2, '0')
    const currDay = `${today.getDate()}`.padStart(2, '0')

    functions.logger.info("Querying users with birthday of " + currMonth + "/" + currDay);

    const users = await admin
      .firestore()
      .collection("user")
      .where("monthOfBirth", "==", currMonth)
      .where("dayOfBirth", "==", currDay)
      .get()
			.then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
					functions.logger.info(
            JSON.stringify(doc.data()),
            {structuredData: true}
          );
        });
    })
    .catch((error) => {
        functions.logger.error("Error getting documents: ", error);
    });
    return null;
  });
