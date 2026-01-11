// global.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject the Sidebar and Header HTML
    const navHTML = `
        <div class="header" id="header" style="display: none;">
            <div class="hamburger" onclick="toggleSidebar()"><span></span><span></span><span></span></div>
            <div class="user-info">
                <div class="avatar" id="userAvatar">U</div>
                <span id="headerUsername">Username</span>
            </div>
        </div>

        <div class="sidebar" id="sidebar">
            <div class="sidebar-header">Menu</div>
            <div class="nav-items">
                <div class="nav-item" onclick="window.location.href = 'Home.html'">🏠 Home</div>
                <div class="nav-item proxy-link" onclick="window.location.href = 'chatty.html'">🌐 Proxy</div>
                <div class="nav-item" onclick="window.location.href = 'chat.html'">💬 Chat</div>
                <div class="nav-item" onclick="window.location.href = 'games.html'">🎮 Games</div>
            </div>
            <div class="sidebar-footer">
                <button class="footer-btn settings-btn" onclick="window.location.href='settings.html'">⚙️ Settings</button>
                <button class="footer-btn logout-btn" onclick="logout()">🚪 Logout</button>
            </div>
        </div>
        <div class="overlay" id="overlay" onclick="toggleSidebar()"></div>
    `;

    document.body.insertAdjacentHTML('afterbegin', navHTML);
});

// 2. Sidebar Toggle Logic
window.toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    if (sidebar) sidebar.classList.toggle("open");
    if (overlay) overlay.classList.toggle("active");
};
