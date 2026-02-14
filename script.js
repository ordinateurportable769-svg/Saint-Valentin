document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const overlay = document.getElementById('overlay');
    const confettiContainer = document.getElementById('confetti');
    const counterNo = document.getElementById('counterNo');
    const bgHearts = document.querySelector('.background-hearts');
    
    // Modal prénom
    const nameModal = document.getElementById('nameModal');
    const nameInput = document.getElementById('nameInput');
    const nameSubmit = document.getElementById('nameSubmit');
    
    // Gestion du modal et localStorage
    const savedName = localStorage.getItem('valentineNom') || '';
    // Préremplit l'input si un prénom est déjà enregistré
    if (nameInput) nameInput.value = savedName;
    // Affiche toujours le modal au chargement pour permettre une nouvelle saisie
    if (nameModal) nameModal.style.display = 'flex';
    
    nameSubmit.addEventListener('click', () => {
        const nom = nameInput.value.trim();
        if (nom) {
            localStorage.setItem('valentineNom', nom);
            // Vérifie si c'est la personne élue pour la chasse au trésor
            const prenomLower = nom.toLowerCase();
            const isElue = ['thyphène', 'thyphene'].includes(prenomLower);
            localStorage.setItem('valentineElue', isElue ? 'true' : 'false');
            nameModal.style.display = 'none';
            nameInput.value = '';
        }
    });
    
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const nom = nameInput.value.trim();
            if (nom) {
                localStorage.setItem('valentineNom', nom);
                // Vérifie si c'est la personne élue pour la chasse au trésor
                const prenomLower = nom.toLowerCase();
                const isElue = ['thyphène', 'thyphene', 'aimée', 'aimee'].includes(prenomLower);
                localStorage.setItem('valentineElue', isElue ? 'true' : 'false');
                nameModal.style.display = 'none';
                nameInput.value = '';
            }
        }
    });
    
    let noClickCount = 0;
    const messages = [
        "🥺 Allez, tu peux pas refuser comme ça...",
        "😢 Je suis sûr que non, réessaie !",
        "😭 C'est cruel de ta part !",
        "💔 Je suis blessé...",
        "😘 Aller, dis OUI ! ❤️"
    ];

    yesBtn.addEventListener('click', () => {
        showCelebration();
        setTimeout(() => {
            window.location.href = 'yes.html';
        }, 2500);
    });

    noBtn.addEventListener('click', () => {
        if (noClickCount < messages.length) {
            counterNo.textContent = messages[noClickCount];
            counterNo.style.display = 'block';
            noClickCount++;
        }
        
        if (noClickCount >= 2) {
            makeButtonEvasive();
        }
    });

    function makeButtonEvasive() {
        moveButtonAway();
        noBtn.addEventListener('mouseover', moveButtonAway);
    }

    function moveButtonAway() {
        const randomX = Math.random() * (window.innerWidth - 150);
        const randomY = Math.random() * (window.innerHeight - 50);
        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        noBtn.style.zIndex = '999';
    }

    function createFloatingHearts() {
        const hearts = ['💖', '💕', '💗', '💝', '💞', '❤️'];
        for (let i = 0; i < 8; i++) {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '100%';
            heart.style.fontSize = '2rem';
            heart.style.pointerEvents = 'none';
            heart.style.animation = 'float-up 6s ease-in infinite';
            heart.style.zIndex = '10';
            document.body.appendChild(heart);

            setTimeout(() => heart.remove(), 6000);
        }
    }

    function showCelebration() {
        createFloatingHearts();
        createConfetti();
    }

    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.top = '0';
        confetti.style.left = '0';
        confetti.style.width = '100%';
        confetti.style.height = '100%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '999';
        document.body.appendChild(confetti);

        const colors = ['#ff6fa6', '#ffb6d2', '#ff85b8', '#c2185b', '#ff9cc8'];
        for (let i = 0; i < 50; i++) {
            const piece = document.createElement('div');
            piece.style.position = 'absolute';
            piece.style.width = Math.random() * 10 + 5 + 'px';
            piece.style.height = Math.random() * 10 + 5 + 'px';
            piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            piece.style.left = Math.random() * 100 + '%';
            piece.style.top = '-10px';
            piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            piece.style.animation = 'confetti-fall 3s ease-in forwards';
            piece.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.appendChild(piece);
        }

        setTimeout(() => confetti.remove(), 3500);
    }

    createFloatingHearts();
    setInterval(createFloatingHearts, 5000);
});
