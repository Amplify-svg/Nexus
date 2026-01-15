/* global.js - Integrated Nexus Version */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getDatabase, ref, set, onValue, onDisconnect, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// --- FIREBASE CONFIG (Ensure this matches your console) ---
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
const db = getDatabase(app);

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    // 1. Inject Nexus HTML Structure (Including Admin Buttons)
    const navHTML = `
        <div class="header">
            <div class="hamburger" id="menuBtn">
                <span></span><span></span><span></span>
            </div>
            <div style="font-weight:bold; font-size:20px; color:#4285f4; margin-left:10px; letter-spacing:1px;">NEXUS</div>
            
            <div id="adminControls" style="display:none; margin-left: 20px; gap: 10px;">
                <button id="adminBanBtn" style="background:#ff8800; color:white; padding: 5px 10px; font-size:12px;">🔨 Bans</button>
                <button id="adminClearBtn" style="background:#ea4335; color:white; padding: 5px 10px; font-size:12px;">🗑️ Clear</button>
            </div>

            <div class="user-info">
                <span id="headerUserName" style="font-size: 14px; font-weight: 500; margin-right: 8px;"></span>
                <div class="avatar" id="userInitial">?</div>
            </div>
        </div>
        <div class="sidebar" id="sidebar">
            <div class="sidebar-header">NEXUS</div>
            <div class="nav-items">
                <a href="Serendipity.html" class="nav-item">🏠 Home</a>
                <a href="chat.html" class="nav-item">💬 Chat</a>
                <a href="call.html" class="nav-item">📞 Video Call</a>
                <a href="research.html" class="nav-item">🌐 Research Portal</a>
                <a href="games.html" class="nav-item">🎮 Games</a>
                <a href="settings.html" class="nav-item">⚙️ Settings</a>
            </div>
            <div id="onlineListSection" style="padding: 20px; border-top: 1px solid #eee;">
                <small style="color: #888;">Online (<span id="onlineCount">0</span>)</small>
                <div id="memberListContent" style="font-size: 13px; margin-top: 10px;"></div>
            </div>
            <div class="sidebar-footer">
                <button class="footer-btn logout-btn" id="logoutBtn" style="background:#ea4335; color:white; display:none;">🚪 Logout</button>
            </div>
        </div>
        <div class="overlay" id="overlay"></div>
    `;
    body.insertAdjacentHTML('afterbegin', navHTML);

    // 2. Selectors
    const userInitial = document.getElementById('userInitial');
    const headerUserName = document.getElementById('headerUserName');
    const logoutBtn = document.getElementById('logoutBtn');
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    // 3. Theme Sync
    if (localStorage.getItem('theme') === 'dark') body.classList.add('dark-mode');

    // 4. Sidebar Logic
    const toggleSidebar = () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    };
    if (menuBtn) menuBtn.onclick = toggleSidebar;
    if (overlay) overlay.onclick = toggleSidebar;

    // 5. Firebase Auth & Status Sync
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            if (!window.location.pathname.endsWith('Serendipity.html')) window.location.replace("Serendipity.html");
            return;
        }

        // Update User Profile UI
        onValue(ref(db, `users/${user.uid}`), (snap) => {
            const data = snap.val() || {};
            const name = data.username || user.email.split('@')[0];
            headerUserName.textContent = name;
            userInitial.textContent = name.charAt(0).toUpperCase();

            // ADMIN DETECTION
            if (data.isAdmin === true) {
                document.getElementById('adminControls').style.display = 'flex';
            }
        });

        // ONLINE STATUS (Fixed logic)
        const statusRef = ref(db, `online/${user.uid}`);
        set(statusRef, { username: user.displayName || user.email.split('@')[0], lastSeen: serverTimestamp() });
        onDisconnect(statusRef).remove();

        // LOGOUT BUTTON VISIBILITY
        if (logoutBtn) logoutBtn.style.display = 'block';
    });

    // 6. Online Member List Listener
    onValue(ref(db, 'online'), (snap) => {
        const users = snap.val() || {};
        const count = Object.keys(users).length;
        document.getElementById('onlineCount').textContent = count;
        const listDiv = document.getElementById('memberListContent');
        listDiv.innerHTML = Object.values(users).map(u => `<div style="margin-bottom:5px;">● ${u.username}</div>`).join('');
    });

    // Logout Action
    if (logoutBtn) {
        logoutBtn.onclick = () => {
            signOut(auth).then(() => {
                localStorage.clear();
                window.location.replace("Serendipity.html");
            });
        };
    }
});
