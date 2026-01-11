import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// Your Firebase Config (Matches your chat config)
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

// Logic to load Username in Top Right
onAuthStateChanged(auth, (user) => {
    const navName = document.getElementById('navUsername');
    
    if (user) {
        // Listen to the specific user node for the custom username
        const userRef = ref(database, `users/${user.uid}`);
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data && data.username) {
                if (navName) navName.textContent = data.username;
            } else {
                // Fallback to email if username isn't set yet
                if (navName) navName.textContent = user.email.split('@')[0];
            }
        });
    } else {
        if (navName) navName.textContent = "Guest";
    }
});

// Particle System Initialization (Shared across pages)
const canvas = document.getElementById('particleCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = 'rgba(66, 133, 244, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        particlesArray = [];
        for (let i = 0; i < 100; i++) { particlesArray.push(new Particle()); }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

    init();
    animate();
}
