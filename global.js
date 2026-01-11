/* global.js - Controls Sidebar, Header, and Dark Mode */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject the Header and Sidebar HTML automatically
    const body = document.body;
    const navHTML = `
        <div class="header">
            <div class="hamburger" id="menuBtn">
                <span></span><span></span><span></span>
            </div>
            <div class="logo" style="font-weight:bold; font-size:20px; color:#4285f4;">NEXUS</div>
            <div class="user-info">
                <div class="avatar" id="userInitial">?</div>
            </div>
        </div>

        <div class="sidebar" id="sidebar">
            <div class="sidebar-header">NEXUS MENU</div>
            <div class="nav-items">
                <a href="Home.html" class="nav-item">🏠 Home</a>
                <a href="chat.html" class="nav-item">💬 Global Chat</a>
                <a href="call.html" class="nav-item">📞 Video Call</a>
                <div class="nav-item proxy-link">🌐 Proxy Settings</div>
            </div>
            <div class="sidebar-footer">
                <button class="footer-btn settings-btn" id="darkToggle">🌓 Toggle Dark Mode</button>
                <button class="footer-btn logout-btn" id="logoutBtn">🚪 Logout</button>
            </div>
        </div>
        <div class="overlay" id="overlay"></div>
    `;

    // Insert at the beginning of body
    body.insertAdjacentHTML('afterbegin', navHTML);

    // 2. Element Selectors
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const darkToggle = document.getElementById('darkToggle');

    // 3. Sidebar Toggle Logic
    const toggleSidebar = () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    };

    menuBtn.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

    // 4. Dark Mode Logic (Syncs with LocalStorage)
    const enableDarkMode = () => {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    };

    const disableDarkMode = () => {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    };

    // Check saved preference
    if (localStorage.getItem('theme') === 'dark') {
        enableDarkMode();
    }

    darkToggle.addEventListener('click', () => {
        body.classList.contains('dark-mode') ? disableDarkMode() : enableDarkMode();
    });

    // 5. User Initial Display
    const savedUser = localStorage.getItem('userEmail'); // Set this during login in auth.js
    if (savedUser) {
        document.getElementById('userInitial').textContent = savedUser.charAt(0).toUpperCase();
    }
});
