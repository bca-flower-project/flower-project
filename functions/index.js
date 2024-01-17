const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");

admin.initializeApp();

const SENDGRID_API_KEY = functions.config().sendgrid.key;
const SENDGRID_SENDER = functions.config().sendgrid.sender;
// const NEW_FRIEND_REQUEST_TEMPLATE_ID = ;
const NEW_USER_EMAIL_TEMPLATE_ID = "d-7a1bc4cdc3d84efdab47c7e2edf6909d";
const NEW_FLOWER_TEMPLATE_ID = "d-dca0af08c28148b5975bdc311c557121";
const HAPPY_BIRTHDAY_EMAIL_TEMPLATE_ID = "d-7930e6c61d964ab19f63ea031e312701";
const UNSUBSCRIBE_GROUP_ID = 15650;

sgMail.setApiKey(SENDGRID_API_KEY);

exports.newFriendRequest = functions.firestore
  .document("friendRequest/{friendRequestId}")
  .onCreate(async (snap, ctx) => {
    const friendRequestData = snap.data();
    functions.logger.info(JSON.stringify({ friendRequestData, params: ctx.params }));

    try {
      const msg = {
        to: friendRequestData.recipient,
        from: SENDGRID_SENDER,
        templateId: NEW_USER_EMAIL_TEMPLATE_ID,
        asm: {
          groupId: UNSUBSCRIBE_GROUP_ID,
        },
        dynamic_template_data: {
          subject: `${friendRequestData.senderName} wants to be friends on flowers.community!`,
          name: friendRequestData.senderName,
        },
      };

      functions.logger.info(
        "Sending new flower email to " +
          friendRequestData.recipient +
          " " +
          JSON.stringify(msg)
      );

      const [response] = await sgMail.send(msg);

      functions.logger.info("Email sent.");
    } catch (error) {
      functions.logger.error(JSON.stringify(error));
    }
    return { success: true };
  });

exports.flowerOnCreate = functions.firestore
  .document("/user/{userId}/flower/{flowerId}")
  .onCreate(async (snap, ctx) => {
    let userData;
    await admin
      .firestore()
      .collection("user")
      .doc(ctx.params.userId)
      .get()
      .then((doc) => (userData = doc.data()));

    try {
      const msg = {
        to: userData.email,
        from: SENDGRID_SENDER,
        templateId: NEW_FLOWER_TEMPLATE_ID,
        asm: {
          groupId: UNSUBSCRIBE_GROUP_ID,
        },
        dynamic_template_data: {
          subject: "Nice work! You created a flower!",
          name: userData.name,
        },
      };

      functions.logger.info(
        "Sending new flower email to " +
          userData.email +
          " " +
          JSON.stringify(msg)
      );

      const [response] = await sgMail.send(msg);

      functions.logger.info("Email sent.");
    } catch (error) {
      functions.logger.error(JSON.stringify(error));
    }

    return { success: true };
  });

exports.newUserEmail = functions.firestore
  .document("user/{userId}")
  .onCreate(async (snap, ctx) => {
    const userData = snap.data();
    functions.logger.info(JSON.stringify({ userData, params: ctx.params }));

    try {
      const msg = {
        to: userData.email,
        from: SENDGRID_SENDER,
        templateId: NEW_USER_EMAIL_TEMPLATE_ID,
        asm: {
          groupId: UNSUBSCRIBE_GROUP_ID,
        },
        dynamic_template_data: {
          subject: "Welcome to flowers.community",
          name: userData.name,
        },
      };

      functions.logger.info(
        "Sending new flower email to " +
          userData.email +
          " " +
          JSON.stringify(msg)
      );

      const [response] = await sgMail.send(msg);

      functions.logger.info("Email sent.");
    } catch (error) {
      functions.logger.error(JSON.stringify(error));
    }
    return { success: true };
  });

exports.happyBirthday = functions.pubsub
  .schedule("0 6 * * * ")
  .onRun(async (context) => {
    const today = new Date();
    const currMonth = `${today.getMonth() + 1}`.padStart(2, "0");
    const currDay = `${today.getDate()}`.padStart(2, "0");

    const users = await admin
      .firestore()
      .collection("user")
      .where("monthOfBirth", "==", currMonth)
      .where("dayOfBirth", "==", currDay)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          const userData = doc.data();

          try {
            const msg = {
              to: userData.email,
              from: SENDGRID_SENDER,
              templateId: HAPPY_BIRTHDAY_EMAIL_TEMPLATE_ID,
              asm: {
                groupId: UNSUBSCRIBE_GROUP_ID,
              },
              dynamic_template_data: {
                subject: "Happy Birthday from flowers.community",
                name: userData.name,
              },
            };

            functions.logger.info(
              "Sending new flower email to " +
                userData.email +
                " " +
                JSON.stringify(msg)
            );

            const [response] = await sgMail.send(msg);

            functions.logger.info("Email sent.");
          } catch (error) {
            functions.logger.error(JSON.stringify(error));
          }
        });
      })
      .catch((error) => {
        functions.logger.error("Error getting documents: ", error);
      });
    return null;
  });
