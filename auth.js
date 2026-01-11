// auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

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

// Make functions global so HTML buttons can see them
window.register = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            const username = user.email.split('@')[0];
            await set(ref(database, `users/${user.uid}`), { username, appearance: 'light' });
        }).catch(err => alert(err.message));
};

window.login = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    signInWithEmailAndPassword(auth, email, password).catch(err => alert(err.message));
};

window.logout = () => {
    signOut(auth).then(() => { 
        if(location.pathname.includes('Home.html')) {
            location.reload();
        } else {
            location.href = 'Home.html'; 
        }
    });
};

onAuthStateChanged(auth, async user => {
    const authBox = document.getElementById("auth");
    const content = document.getElementById("content");
    const header = document.getElementById("header");

    if (user) {
        if (authBox) authBox.style.display = "none";
        if (content) content.style.display = "block";
        if (header) header.style.display = "flex";

        const snap = await get(child(ref(database), `users/${user.uid}`));
        if (snap.exists()) {
            const data = snap.val();
            document.getElementById("headerUsername").textContent = data.username;
            document.getElementById("userAvatar").textContent = data.username[0].toUpperCase();
            if (data.appearance === 'dark') document.body.classList.add('dark-mode');
        }
    } else {
        if (authBox) authBox.style.display = "block";
        if (content) content.style.display = "none";
        if (header) header.style.display = "none";
        document.body.classList.remove('dark-mode');
    }
});
