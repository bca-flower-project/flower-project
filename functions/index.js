const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");

admin.initializeApp();

const SENDGRID_API_KEY = functions.config().sendgrid.key;
const SENDGRID_SENDER = functions.config().sendgrid.sender;
const NEW_FRIEND_REQUEST_TEMPLATE_ID = "d-97c526305ef74111b143a680617654dd";
const NEW_USER_EMAIL_TEMPLATE_ID = "d-7a1bc4cdc3d84efdab47c7e2edf6909d";
const NEW_FLOWER_TEMPLATE_ID = "d-dca0af08c28148b5975bdc311c557121";
const HAPPY_BIRTHDAY_EMAIL_TEMPLATE_ID = "d-7930e6c61d964ab19f63ea031e312701";
const UNSUBSCRIBE_GROUP_ID = 15650;

sgMail.setApiKey(SENDGRID_API_KEY);

exports.newInvitation = functions.firestore
  .document("invitation/{invitationId}")
  .onCreate(async (snap, ctx) => {
    const invitationData = snap.data();
    functions.logger.info(JSON.stringify({ invitationData, params: ctx.params }));

    try {
      const msg = {
        to: invitationData.recipient,
        from: SENDGRID_SENDER,
        templateId: NEW_FRIEND_REQUEST_TEMPLATE_ID,
        asm: {
          groupId: UNSUBSCRIBE_GROUP_ID,
        },
        dynamic_template_data: {
          subject: `${invitationData.senderName} invited you to join flowers.community!`
        },
      };

      functions.logger.info(
        "Sending new flower email to " +
          invitationData.recipient +
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

exports.newFriendRequest = functions.firestore
  .document("friendRequest/{friendRequestId}")
  .onCreate(async (snap, ctx) => {
    const friendRequestData = snap.data();
    functions.logger.info(JSON.stringify({ friendRequestData, params: ctx.params }));

    let recipientData;

    await admin
      .firestore()
      .collection("user")
      .where('email', '==', friendRequestData.recipient).get().then( async (item) => {
        recipientData = item.docs[0].data();
      });

    await admin
    .firestore()
    .collection("user")
    .doc(recipientData.uid)
    .collection("notifications")
    .add({
      read: false,
      sender: friendRequestData.sender,
      name: friendRequestData.senderName,
      date: friendRequestData.createdAt,
      type: "Friend Request"
    })

    try {
      const msg = {
        to: friendRequestData.recipient,
        from: SENDGRID_SENDER,
        templateId: NEW_FRIEND_REQUEST_TEMPLATE_ID,
        asm: {
          groupId: UNSUBSCRIBE_GROUP_ID,
        },
        dynamic_template_data: {
          subject: `${friendRequestData.senderName} wants to be friends on flowers.community!`
        },
      };

      functions.logger.info(
        "Sending new friend request email to " +
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

  exports.newSendFlower = functions.firestore
  .document("user/{userId}/sentFlowers/{sentFlowerId}")
  .onCreate(async (snap, ctx) => {
    const sentFlowerData = snap.data();
    functions.logger.info(JSON.stringify({ sentFlowerData, params: ctx.params }));

    let recipientData;
    await admin
      .firestore()
      .collection("user")
      .where('uid', '==', sentFlowerData.toUid).get().then( async (item) => {
        recipientData = item.docs[0].data();
      });

    await admin
      .firestore()
      .collection("user")
      .doc(recipientData.uid)
      .collection("receivedFlowers")
      .add(sentFlowerData)

    await admin
      .firestore()
      .collection("user")
      .doc(recipientData.uid)
      .collection("notifications")
      .add({
        read: false,
        name: sentFlowerData.fromName,
        date: sentFlowerData.createdAt,
        type: "New Flower"
      })

    try {
      const msg = {
        to: recipientData.email,
        from: SENDGRID_SENDER,
        templateId: NEW_FRIEND_REQUEST_TEMPLATE_ID,
        asm: {
          groupId: UNSUBSCRIBE_GROUP_ID,
        },
        dynamic_template_data: {
          subject: `${sentFlowerData.fromName} sent you a flower!`
        },
      };

      functions.logger.info(
        "Sending new flower sent email to " +
          recipientData.email +
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

  exports.updateFriendRequest = functions.firestore
  .document("friendRequest/{friendRequestId}")
  .onUpdate(async (change, ctx) => {
    const oldFriendRequestData = change.before.data();
    const friendRequestData = change.after.data();
    functions.logger.info(JSON.stringify({ friendRequestData, params: ctx.params }));

    if((oldFriendRequestData.status == 'Pending') && (friendRequestData.status == 'Accepted')) {
      await admin
      .firestore()
      .collection("user")
      .where('email', '==', friendRequestData.recipient).get().then( async (item) => {
        const recipientData = item.docs[0].data();

        await admin.firestore().collection("user").doc(recipientData.uid).collection("friends").add({
          uid: friendRequestData.sender,
          name: friendRequestData.senderName,
          dateOfBirth: friendRequestData.senderDOB
        })

        await admin.firestore().collection("user").doc(friendRequestData.sender).collection("friends").add({
          uid: recipientData.uid,
          name: recipientData.name,
          dateOfBirth: recipientData.dateOfBirth
        })
      })

      return { success: true };
    }
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
