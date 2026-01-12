// global.js - Final Version

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  // 1. Inject the HTML Structure
  const navHTML = `
    <div class="header">
      <div class="hamburger" id="menuBtn">
        <span></span><span></span><span></span>
      </div>
      <div style="font-weight:bold; font-size:20px; color:#4285f4; margin-left:10px; letter-spacing:1px;">
        NEXUS
      </div>
      <div class="user-info">
        <span id="headerUserName" style="font-size: 14px; font-weight: 500; margin-right: 8px;"></span>
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
        <button class="footer-btn logout-btn" id="logoutBtn" style="background:#ea4335; color:white;">
          🚪 Logout
        </button>
      </div>
    </div>

    <div class="overlay" id="overlay"></div>
  `;

  body.insertAdjacentHTML('afterbegin', navHTML);

  // 2. Selectors
  const userInitial = document.getElementById('userInitial');
  const headerUserName = document.getElementById('headerUserName');

  // 3. User data refresh
  const refreshUserData = () => {
    const savedName = localStorage.getItem('userName');
    if (savedName && savedName !== 'undefined' && savedName !== 'null') {
      headerUserName.textContent = savedName;
      userInitial.textContent = savedName.charAt(0).toUpperCase();
    } else {
      headerUserName.textContent = '';
      userInitial.textContent = '?';
    }
  };

  // Run immediately on load
  refreshUserData();

  // Listen for name updates coming from settings.html
  window.addEventListener('nameUpdated', refreshUserData);

  // 4. Sidebar / overlay logic
  const menuBtn = document.getElementById('menuBtn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  const toggleSidebar = () => {
    if (!sidebar || !overlay) return;
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
  };

  if (menuBtn) {
    menuBtn.addEventListener('click', toggleSidebar);
  }
  if (overlay) {
    overlay.addEventListener('click', toggleSidebar);
  }

  // 5. Theme application
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
  }

  // 6. Logout button (fixed)
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      // If you only want to clear specific keys, replace clear() with individual removes.
      // localStorage.removeItem('userName');
      // localStorage.removeItem('theme');
      localStorage.clear();
      window.location.href = 'Home.html';
    });
  }
});
