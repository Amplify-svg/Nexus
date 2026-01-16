/* global.js - Final Verified Version */
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    // 1. Inject the HTML Structure
    const navHTML = `
        <div class="header">
            <div class="hamburger" id="menuBtn">
                <span></span><span></span><span></span>
            </div>
            <div style="font-weight:bold; font-size:20px; color:#4285f4; margin-left:10px; letter-spacing:1px;">NEXUS</div>
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

    // 3. The Update Function
    const refreshUserData = () => {
        const savedName = localStorage.getItem('userName');
        if (savedName && savedName !== "undefined" && savedName !== "null") {
            headerUserName.textContent = savedName;
            userInitial.textContent = savedName.charAt(0).toUpperCase();
        }
    };

    refreshUserData();
    window.addEventListener('nameUpdated', refreshUserData);

    // 4. Sidebar Logic
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    const toggleSidebar = () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    };

    if (menuBtn) menuBtn.onclick = toggleSidebar;
    if (overlay) overlay.onclick = toggleSidebar;

    if (localStorage.getItem('theme') === 'dark') body.classList.add('dark-mode');

    // --- Logout Visibility Logic ---
    // Shows button only on Home.html or root
    const isHomePage = window.location.pathname.endsWith('Serendipity.html') || window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
    if (logoutBtn && isHomePage) {
        logoutBtn.style.display = 'block';
    }

    // --- Firebase Integration Logout ---
    logoutBtn.onclick = () => {
        // 1. Clear Local Data
        localStorage.clear();
        sessionStorage.clear();
        
        // 2. Trigger the Firebase Logout from auth.js
        if (typeof window.logout === 'function') {
            window.logout();
        } else {
            // Fallback if auth.js isn't loaded/ready
            window.location.replace("Serendipity.html");
        }
    };
});
