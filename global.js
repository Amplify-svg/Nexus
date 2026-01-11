/* global.js - Master Script with Firebase Integration */

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// Firebase Config
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
    const body = document.body;

    // 1. Inject UI
    const navHTML = `
        <div class="header">
            <div class="hamburger" id="menuBtn">
                <span></span><span></span><span></span>
            </div>
            <div class="logo-text" style="font-weight:bold; font-size:22px; color:#4285f4; margin-left:15px; letter-spacing:1px;">NEXUS</div>
            <div class="user-info">
                <div class="avatar" id="headerAvatar">?</div>
                <span id="headerUsername" style="font-weight: 500; font-size: 14px;">Loading...</span>
            </div>
        </div>

        <div class="sidebar" id="sidebar">
            <div style="padding:25px; font-weight:bold; font-size: 20px; color: #4285f4; border-bottom: 1px solid #333;">Nexus Menu</div>
            <div class="nav-items">
                <a href="Home.html" class="nav-item">🏠 Home</a>
                <a href="chat.html" class="nav-item">💬 Global Chat</a>
                <a href="call.html" class="nav-item">📞 Video Call</a>
                <a href="research.html" class="nav-item">🌐 Research</a>
                <a href="games.html" class="nav-item">🎮 Games</a>
                <a href="settings.html" class="nav-item">⚙️ Settings</a>
            </div>
            <div class="sidebar-footer">
                <button class="footer-btn logout-btn" id="logoutBtn">🚪 Logout</button>
            </div>
        </div>
        <div class="overlay" id="overlay"></div>
    `;
    body.insertAdjacentHTML('afterbegin', navHTML);

    // 2. Elements
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const logoutBtn = document.getElementById('logoutBtn');

    // 3. Toggle Sidebar Logic
    const toggleSidebar = () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    };

    menuBtn.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

    // 4. Firebase User Data Loading
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const avatar = document.getElementById('headerAvatar');
            const nameSpan = document.getElementById('headerUsername');

            try {
                const snapshot = await get(child(ref(database), `users/${user.uid}`));
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const username = data.username || user.email.split('@')[0];
                    
                    // Update UI
                    if (nameSpan) nameSpan.textContent = username;
                    if (avatar) avatar.textContent = username[0].toUpperCase();
                }
            } catch (err) {
                console.error("User data fetch failed", err);
            }
        } else {
            // Not logged in? Redirect to home unless already there
            if(!window.location.href.includes('Home.html')) {
                window.location.href = 'Home.html';
            }
        }
    });

    // 5. Logout Function
    logoutBtn.addEventListener('click', () => {
        signOut(auth).then(() => {
            window.location.href = 'Home.html';
        });
    });

    // 6. Theme Persistence
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
    }
});
