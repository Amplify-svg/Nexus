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
                <span id="headerUserName" style="font-size: 14px; font-weight: 500; margin-right: 5px;"></span>
                <div class="avatar" id="userInitial">?</div>
            </div>
        </div>

        <div class="sidebar" id="sidebar">
            <div class="sidebar-header">NEXUS</div>
            <div class="nav-items">
                <a href="Home.html" class="nav-item">🏠 Home</a>
                <a href="chat.html" class="nav-item">💬 Chat</a>
                <a href="call.html" class="nav-item">📞 Video Call</a>
                <a href="research.html" class="nav-item">🌐 Research Portal</a>
                <a href="games.html" class="nav-item">🎮 Games</a>
                <a href="settings.html" class="nav-item">⚙️ Settings</a>
            </div>
            <div class="sidebar-footer">
                <button class="footer-btn logout-btn" id="logoutBtn" style="background:#ea4335; color:white;">🚪 Logout</button>
            </div>
        </div>
        <div class="overlay" id="overlay"></div>
    `;

    body.insertAdjacentHTML('afterbegin', navHTML);

    // 2. Selectors
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const userInitial = document.getElementById('userInitial');
    const headerUserName = document.getElementById('headerUserName');
    const logoutBtn = document.getElementById('logoutBtn');

    // 3. Username & Initial Logic
    // This pulls the 'userName' we saved in settings.html
    const savedName = localStorage.getItem('userName');
    const savedEmail = localStorage.getItem('userEmail');

    if (savedName && savedName !== "undefined") {
        headerUserName.textContent = savedName;
        userInitial.textContent = savedName.charAt(0).toUpperCase();
    } else if (savedEmail) {
        // Fallback to email if username isn't set yet
        userInitial.textContent = savedEmail.charAt(0).toUpperCase();
    }

    // 4. Toggle Logic
    const toggleSidebar = () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    };

    if (menuBtn) menuBtn.addEventListener('click', toggleSidebar);
    if (overlay) overlay.addEventListener('click', toggleSidebar);

    // 5. Theme Persistence
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
    }

    // 6. Logout Logic
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.clear();
            window.location.href = "Home.html";
        });
    }
});
