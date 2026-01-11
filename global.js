import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

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

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject UI First
    const navHTML = `
        <div class="header">
            <div class="hamburger" id="menuBtn"><span></span><span></span><span></span></div>
            <div class="logo-text" style="font-weight:bold; font-size:22px; color:#4285f4; margin-left:15px;">NEXUS</div>
            <div class="user-info">
                <div class="avatar" id="headerAvatar">?</div>
                <span id="headerUsername" style="font-weight: 500; font-size: 14px;">Loading...</span>
            </div>
        </div>
        <div class="sidebar" id="sidebar">
            <div class="sidebar-header">Nexus Menu</div>
            <div class="nav-items">
                <a href="Home.html" class="nav-item">🏠 Home</a>
                <a href="chat.html" class="nav-item">💬 Chat</a>
                <a href="call.html" class="nav-item">📞 Call</a>
                <a href="games.html" class="nav-item">🎮 Games</a>
                <a href="settings.html" class="nav-item">⚙️ Settings</a>
            </div>
            <div class="sidebar-footer"><button class="footer-btn logout-btn" id="logoutBtn">🚪 Logout</button></div>
        </div>
        <div class="overlay" id="overlay"></div>
    `;
    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // 2. Setup Sidebar Toggles
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    menuBtn.onclick = () => { sidebar.classList.toggle('open'); overlay.classList.toggle('active'); };
    overlay.onclick = () => { sidebar.classList.remove('open'); overlay.classList.remove('active'); };

    // 3. Load User Data
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const avatar = document.getElementById('headerAvatar');
            const nameSpan = document.getElementById('headerUsername');
            
            const snap = await get(child(ref(database), `users/${user.uid}`));
            const username = snap.exists() ? snap.val().username : user.email.split('@')[0];

            if (nameSpan) nameSpan.textContent = username;
            if (avatar) avatar.textContent = username[0].toUpperCase();
        }
    });

    document.getElementById('logoutBtn').onclick = () => signOut(auth).then(() => location.href='Home.html');
});
