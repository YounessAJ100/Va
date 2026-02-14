
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const mainContainer = document.getElementById('main-container');
const successMessage = document.getElementById('success-message');
const heartRainContainer = document.getElementById('heart-rain');

// "No" Button Evasion Logic
noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('touchstart', moveNoButton); // For mobile

function moveNoButton() {
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate viewport dimensions with padding to keep button visible
    const padding = 20;
    const maxX = window.innerWidth - btnRect.width - padding;
    const maxY = window.innerHeight - btnRect.height - padding;

    let randomX = Math.random() * maxX;
    let randomY = Math.random() * maxY;

    // Ensure it doesn't spawn too close to the edges
    randomX = Math.max(padding, randomX);
    randomY = Math.max(padding, randomY);

    // Apply new position (fixed/absolute relative to viewport for maximum chaos)
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';

    // Add a little rotation for fun, keep it readable
    const rotation = (Math.random() - 0.5) * 30;
    noBtn.style.transform = `rotate(${rotation}deg)`;

    // Force high z-index via JS as well, just in case
    noBtn.style.zIndex = '10000';
}

// "Yes" Button Logic
yesBtn.addEventListener('click', () => {
    mainContainer.classList.add('hidden');
    successMessage.classList.remove('hidden');
    successMessage.style.display = 'flex'; // Override CSS if needed or just rely on class removal

    startHeartRain();
});

// Heart Rain Animation
function startHeartRain() {
    // Create hearts every 100ms
    setInterval(createHeart, 100);
}

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️'; // Or use SVG

    // Random position
    heart.style.left = Math.random() * 100 + 'vw';

    // Random size
    const size = Math.random() * 20 + 10; // 10px to 30px
    heart.style.fontSize = size + 'px';

    // Random falling duration
    const duration = Math.random() * 2 + 3; // 3s to 5s
    heart.style.animationDuration = duration + 's';

    heartRainContainer.appendChild(heart);

    // Remove after animation
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// YouTube Player Logic
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'O6p-_SY5DfM', // User provided video ID
        playerVars: {
            'playsinline': 1,
            'controls': 0,
            'loop': 1
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    // Player is ready
    console.log("Player ready");
}

// Load YouTube IFrame API
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Make function global so API can call it
window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

// Update Yes Button to play music
const originalYesClick = yesBtn.onclick; // Preserving if any direct onclick was set (though we used addEventListener)

// We need to add this to the EXISTING click listener or just a new one
yesBtn.addEventListener('click', () => {
    if (player && player.playVideo) {
        player.playVideo();
        player.unMute(); // Ensure it's not muted
        player.setVolume(100);
    }
});
