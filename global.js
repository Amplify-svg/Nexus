/* global.js - Updated to match your specific CSS classes */

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    // 1. Inject the HTML Structure
    const navHTML = `
        <div class="header">
            <div class="hamburger" id="menuBtn">
                <span></span><span></span><span></span>
            </div>
            <div style="font-weight:bold; font-size:20px; color:#4285f4; margin-left:10px;">NEXUS</div>
            <div class="user-info">
                <div class="avatar" id="userInitial">?</div>
            </div>
        </div>

        <div class="sidebar" id="sidebar">
            <div class="sidebar-header">NEXUS</div>
            <div class="nav-items">
                <a href="Home.html" class="nav-item">🏠 Home</a>
                <a href="research.html" class="nav-item">🌐 Research Portal</a>
                <a href="chat.html" class="nav-item">💬 Chat</a>
                <a href="call.html" class="nav-item">📞 Video Call</a>
                <a href="games.html" class="nav-item">🎮 Games</a>
            </div>
            <div class="sidebar-footer">
                <button class="footer-btn settings-btn" id="darkToggle">⚙️ Settings / Dark Mode</button>
                <button class="footer-btn logout-btn" id="logoutBtn">🚪 Logout</button>
            </div>
        </div>
        <div class="overlay" id="overlay"></div>
    `;

    body.insertAdjacentHTML('afterbegin', navHTML);

    // 2. Selectors
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const darkToggle = document.getElementById('darkToggle');

    // 3. Toggle Logic
    const toggleSidebar = () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    };

    menuBtn.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

    // 4. Dark Mode Logic
    const enableDarkMode = () => {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    };

    const disableDarkMode = () => {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    };

    if (localStorage.getItem('theme') === 'dark') enableDarkMode();

    darkToggle.addEventListener('click', () => {
        body.classList.contains('dark-mode') ? disableDarkMode() : enableDarkMode();
    });
});
