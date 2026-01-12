import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getDatabase, ref, set, get, child, onDisconnect, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCN8ypq4TxhLwjseqnDJneBO2j_BlARz0M",
    authDomain: "chat-or-somethig.firebaseapp.com",
    databaseURL: "https://chat-or-somethig-default-rtdb.firebaseio.com",
    projectId: "chat-or-somethig",
    storageBucket: "chat-or-somethig.firebasestorage.app",
    messagingSenderId: "598777875087",
    appId: "1:598777875087:web:d100536dd269bc0a9d7efa"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

window.register = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            const username = user.email.split('@')[0];
            await set(ref(database, `users/${user.uid}`), { username, appearance: 'dark', isAdmin: false });
        }).catch(err => alert(err.message));
};

window.login = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    signInWithEmailAndPassword(auth, email, password).catch(err => alert(err.message));
};

window.logout = () => {
    signOut(auth).then(() => { 
        window.location.href = 'Home.html'; 
    });
};

onAuthStateChanged(auth, async user => {
    if (user) {
        document.body.classList.add('logged-in');
        document.getElementById("auth").style.display = "none";
        document.getElementById("content").style.display = "block";

        // Ghost Fix: Mark online and remove on disconnect
        const statusRef = ref(database, `online/${user.uid}`);
        set(statusRef, { timestamp: serverTimestamp() });
        onDisconnect(statusRef).remove();

        const snap = await get(child(ref(database), `users/${user.uid}`));
        if (snap.exists()) {
            const data = snap.val();
            document.getElementById("displayUser").textContent = data.username;
            document.getElementById("userInitial").textContent = data.username[0].toUpperCase();
        }
    } else {
        document.body.classList.remove('logged-in');
        document.getElementById("auth").style.display = "block";
        document.getElementById("content").style.display = "none";
    }
});
