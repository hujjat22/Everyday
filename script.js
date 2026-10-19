const firebaseConfig = {
  apiKey: "AIzaSyAwGStX_l3lYOo2-9JT6dXZi6FWgWmiLd0",
  authDomain: "everyday-d18d7.firebaseapp.com",
  projectId: "everyday-d18d7",
  storageBucket: "everyday-d18d7.firebasestorage.app",
  messagingSenderId: "947679919385",
  appId: "1:947679919385:web:a8c03040bb053a641a5988",
  measurementId: "G-40R9L8Q7M9"
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
const auth = firebase.auth();
const db = firebase.firestore();

const serviceWorkerRegistrationPromise =
navigator.serviceWorker.register("./firebase-messaging-sw.js");
const nameForm = document.getElementById("name-form");
const welcomeScreen = document.getElementById("welcome-screen");
const notificationScreen = document.getElementById("notification-screen");
const nameInput = document.getElementById("visitor-name");

const skipButton = document.getElementById("skip-notifications");
const allowButton = document.getElementById("allow-notifications");

const homeScreen = document.getElementById("home-screen");
const greeting = document.getElementById("greeting");
const messageText = document.getElementById("message-text");
const messageAuthor = document.getElementById("message-author");
const anotherMessageButton = document.getElementById("another-message");


// Add the other 353 quotes here, 20 at a time.
// Each quote needs text and author.

// Your 12 messages. One unused message is chosen each month.
const hujjatMessages = [
    { text: "Why are you a better man tomorrow?", author: "Hujjat" },
    { text: "Don't let anyone decide your worth.", author: "Hujjat" },
    { text: "You become what you hate!", author: "Hujjat" },
    { text: "Don't live in the past, nor in the future!", author: "Hujjat" },
    { text: "Take me back to the night we met!", author: "Hujjat" },
    { text: "Not every friend is a friend!", author: "Hujjat" },
    { text: "No one can save you from yourself.", author: "Hujjat" },
    { text: "The strongest one can be the most fragile one!", author: "Hujjat" },
    { text: "Live for your dream.", author: "Hujjat" },
    { text: "Never ever give up!", author: "Hujjat" },
    { text: "You can achieve anything you want.", author: "Hujjat" },
    { text: "We often hurt the ones who love us the most!", author: "Hujjat" }
];

nameForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const visitorName = nameInput.value.trim();
    localStorage.setItem("visitorName", visitorName);

    welcomeScreen.hidden = true;
    notificationScreen.hidden = false;
});

function displayMessage(message) {
    messageText.textContent = message.text;
    messageAuthor.textContent = message.author ? `- ${message.author}` : "";
}

function getRandomUnusedMessage(year) {
    if (messages.length === 0) {
        return null;
    }

    const storageKey = `used-messages-${year}`;
    const usedIndexes = JSON.parse(localStorage.getItem(storageKey) || "[]");

    const availableIndexes = messages
        .map(function (message, index) {
            return index;
        })
        .filter(function (index) {
            return !usedIndexes.includes(index);
        });

    // If all messages have been used, choose any message.
    if (availableIndexes.length === 0) {
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex];
    }

    const randomPosition = Math.floor(Math.random() * availableIndexes.length);
    const chosenIndex = availableIndexes[randomPosition];

    usedIndexes.push(chosenIndex);
    localStorage.setItem(storageKey, JSON.stringify(usedIndexes));

    return messages[chosenIndex];
}

function getRandomUnusedHujjatMessage(year) {
    const storageKey = `used-hujjat-messages-${year}`;
    const usedIndexes = JSON.parse(localStorage.getItem(storageKey) || "[]");

    const availableIndexes = hujjatMessages
        .map(function (message, index) {
            return index;
        })
        .filter(function (index) {
            return !usedIndexes.includes(index);
        });

    if (availableIndexes.length === 0) {
        return null;
    }

    const randomPosition = Math.floor(Math.random() * availableIndexes.length);
    const chosenIndex = availableIndexes[randomPosition];

    usedIndexes.push(chosenIndex);
    localStorage.setItem(storageKey, JSON.stringify(usedIndexes));

    return hujjatMessages[chosenIndex];
}

function getTodayKeys() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = String(today.getDate()).padStart(2, "0");
    const monthText = String(month + 1).padStart(2, "0");

    return {
        year: year,
        month: month,
        dateKey: `${year}-${monthText}-${day}`
    };
}

function showTodaysMessage() {
    const dateInfo = getTodayKeys();
    const todayStorageKey = `message-for-${dateInfo.dateKey}`;
    const savedMessage = localStorage.getItem(todayStorageKey);

    // Keep the same message if the visitor opens the site again today.
    if (savedMessage) {
        displayMessage(JSON.parse(savedMessage));
        return;
    }

    const monthsStorageKey = `hujjat-months-${dateInfo.year}`;
    const shownMonths = JSON.parse(
        localStorage.getItem(monthsStorageKey) || "[]"
    );

    // On the first visit of this month, choose one of your unused messages.
    if (!shownMonths.includes(dateInfo.month)) {
        const personalMessage = getRandomUnusedHujjatMessage(dateInfo.year);

        if (personalMessage) {
            shownMonths.push(dateInfo.month);
            localStorage.setItem(monthsStorageKey, JSON.stringify(shownMonths));
            localStorage.setItem(
                todayStorageKey,
                JSON.stringify(personalMessage)
            );

            displayMessage(personalMessage);
            return;
        }
    }

    const dailyMessage = getRandomUnusedMessage(dateInfo.year);

    if (dailyMessage) {
        localStorage.setItem(todayStorageKey, JSON.stringify(dailyMessage));
        displayMessage(dailyMessage);
    } else {
        messageText.textContent = "Your messages will appear here.";
        messageAuthor.textContent = "";
    }
}

function showHomeScreen() {
    notificationScreen.hidden = true;
    homeScreen.hidden = false;

    const savedName = localStorage.getItem("visitorName");
    greeting.textContent = `Hello, ${savedName || "there"}!`;

    showTodaysMessage();
}

function showAnotherMessage() {
    const dateInfo = getTodayKeys();
    const anotherMessage = getRandomUnusedMessage(dateInfo.year);

    if (anotherMessage) {
        const todayStorageKey = `message-for-${dateInfo.dateKey}`;
        localStorage.setItem(todayStorageKey, JSON.stringify(anotherMessage));
        displayMessage(anotherMessage);
    } else {
        messageText.textContent = "Add some messages to the messages list first.";
        messageAuthor.textContent = "";
    }
}

skipButton.addEventListener("click", showHomeScreen);
allowButton.addEventListener("click", async function () {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      showHomeScreen();
      return;
    }

    let user = auth.currentUser;
    if (!user) {
      const signInResult = await auth.signInAnonymously();
      user = signInResult.user;
    }

    const registration = await serviceWorkerRegistrationPromise;
    const token = await messaging.getToken({
      vapidKey: "BF26rEwEJraJW_RD8uNJE9cF5rWomxG18TSPRmvi-MbCGeUlfrkKuoA6gpYodp1eN1rt__lMB8i0aCUSBQhWRec",
      serviceWorkerRegistration: registration
    });

    await db.collection("subscribers").doc(user.uid).set({
      token: token,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    console.log("Notification subscription saved.");
    showHomeScreen();
  } catch (error) {
    console.error("Notification setup failed:", error);
    showHomeScreen();
  }
});

anotherMessageButton.addEventListener("click", showAnotherMessage);
