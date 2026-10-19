const admin = require("firebase-admin");

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function sendDailyMessage() {
  const snapshot = await db.collection("subscribers").get();

  const subscribers = snapshot.docs.filter(
    (doc) => doc.data().token
  );

  if (subscribers.length === 0) {
    console.log("No subscribers found.");
    return;
  }

  const notification = {
    title: "Everyday!",
    body: "Never ever give up! — Hujjat"
  };

  const results = await Promise.all(
    subscribers.map(async (doc) => {
      try {
        await admin.messaging().send({
          token: doc.data().token,
          notification: notification,
          webpush: {
            fcmOptions: {
              link: "https://hujjat22.github.io/Everyday/"
            }
          }
        });

        return true;
      } catch (error) {
        console.error("Could not send to a subscriber:", error.code);

        if (
          error.code === "messaging/registration-token-not-registered" ||
          error.code === "messaging/invalid-registration-token"
        ) {
          await doc.ref.delete();
        }

        return false;
      }
    })
  );

  const sentCount = results.filter(Boolean).length;
  console.log(`Sent ${sentCount} notification(s).`);
}

sendDailyMessage().catch((error) => {
  console.error("Daily message failed:", error);
  process.exitCode = 1;
});
