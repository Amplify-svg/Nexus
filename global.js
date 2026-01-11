import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

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

// --- USERNAME LOADING LOGIC ---
onAuthStateChanged(auth, (user) => {
  const navUsername = document.getElementById('navUsername');
  const userAvatar = document.querySelector('.user-avatar-small');

  if (user) {
    // Reference to the specific user in the Realtime Database
    const userRef = ref(database, `users/${user.uid}`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.username) {
        if (navUsername) navUsername.textContent = data.username;
        if (userAvatar) userAvatar.textContent = data.username.charAt(0).toUpperCase();
      } else {
        // Fallback to email if no username set
        const fallback = user.email.split('@')[0];
        if (navUsername) navUsername.textContent = fallback;
        if (userAvatar) userAvatar.textContent = fallback.charAt(0).toUpperCase();
      }
    });
  } else {
    if (navUsername) navUsername.textContent = "Guest";
  }
});

// --- SIDEBAR TOGGLE ---
window.toggleSidebar = () => {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.toggle('open');
};

// --- LOGOUT FUNCTION ---
window.logout = () => {
  signOut(auth).then(() => {
    window.location.href = 'index.html';
  });
};
