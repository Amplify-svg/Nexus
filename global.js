/* global.js - Sidebar with Settings included in nav */

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

    // 3. Toggle Logic
    const toggleSidebar = () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    };

    menuBtn.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

    // 4. Persistence: Set Initial in Avatar
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail && userInitial) {
        userInitial.textContent = savedEmail.charAt(0).toUpperCase();
    }

    // 5. Apply Theme from LocalStorage immediately
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
    }
});
