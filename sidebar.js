// sidebar.js
document.addEventListener('DOMContentLoaded', () => {
    const sidebarHTML = `
        <div class="header" id="header">
            <div class="hamburger" onclick="toggleSidebar()"><span></span><span></span><span></span></div>
            <div class="user-info">
                <div class="avatar" id="userAvatar">?</div>
                <span id="headerUsername">Loading...</span>
            </div>
        </div>

        <div class="sidebar" id="sidebar">
            <div class="sidebar-header">Menu</div>
            <div class="nav-items">
                <div class="nav-item" onclick="window.location.href = 'Home.html'">🏠 Home</div>
                <div class="nav-item proxy-link" onclick="window.location.href = 'math.html'">🌐 Research Portal</div>
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

    // Insert the sidebar into the top of the body
    document.body.insertAdjacentHTML('afterbegin', sidebarHTML);
});

// Sidebar Toggle Function
window.toggleSidebar = () => {
    document.getElementById("sidebar").classList.toggle("open");
    document.getElementById("overlay").classList.toggle("active");
};
