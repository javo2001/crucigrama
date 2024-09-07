const levels = [
  { word: "PARO" },
  { word: "CONFLICTO" },
  { word: "CAMIONERO" },
  { word: "ACPM" },
  { word: "CULTURA" },
  { word: "GOBIERNO" },
  { word: "TRANSPORTE" },
  { word: "ECONOMIA" },
  { word: "MARX" }
];

let currentLevel = 0;
let timeLeft = 60; // 60 segundos para resolver cada nivel
let timerInterval;

const levelTitle = document.getElementById('level-title');
const crossword = document.getElementById('crossword');
const nextLevelButton = document.getElementById('next-level');
const timerElement = document.getElementById('time');
const hintButton = document.getElementById('hint-button');
const winSound = document.getElementById('win-sound');
const crowdSound = document.getElementById('crowd-sound');

function startTimer() {
  timeLeft = 60;
  timerElement.textContent = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      alert('¡Se acabó el tiempo! Intenta nuevamente.');
      resetLevel();
    }
  }, 1000);
}

function resetLevel() {
  loadLevel(currentLevel);
}

function loadLevel(level) {
  clearInterval(timerInterval);
  startTimer();

  levelTitle.textContent = `Nivel ${level + 1}`;
  crossword.innerHTML = '';

  const word = levels[level].word;
  const wordArray = word.split('');

  wordArray.forEach(letter => {
    const cell = document.createElement('div');
    cell.textContent = '_'; // Espacios en blanco para las letras
    crossword.appendChild(cell);
  });

  nextLevelButton.disabled = true;
}

function showConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

function checkCompletion() {
  const cells = crossword.querySelectorAll('div');
  let completed = true;

  cells.forEach((cell, index) => {
    if (cell.textContent !== levels[currentLevel].word[index]) {
      completed = false;
    }
  });

  if (completed) {
    clearInterval(timerInterval); // Detener el temporizador
    nextLevelButton.disabled = false;
    winSound.play(); // Reproducir sonido de victoria
    crowdSound.play(); // Sonido de multitud celebrando
    showConfetti(); // Mostrar los fuegos artificiales
  }
}

crossword.addEventListener('click', function (e) {
  if (e.target.tagName === 'DIV') {
    const letter = prompt('Introduce la letra:');
    if (letter && letter.length === 1) {
      e.target.textContent = letter.toUpperCase();
      checkCompletion();
    }
  }
});

nextLevelButton.addEventListener('click', function () {
  currentLevel++;
  if (currentLevel < levels.length) {
    loadLevel(currentLevel);
  } else {
    levelTitle.textContent = '¡Has completado todos los niveles!';
    nextLevelButton.style.display = 'none';
  }
});

// Función para mostrar una pista
hintButton.addEventListener('click', function () {
  const cells = crossword.querySelectorAll('div');
  let revealed = false;

  cells.forEach((cell, index) => {
    if (cell.textContent === '_') {
      cell.textContent = levels[currentLevel].word[index]; // Revelar letra
      revealed = true;
      return;
    }
  });

  if (!revealed) {
    alert('Ya no hay más pistas disponibles.');
  }
});

// Cargar el primer nivel
loadLevel(currentLevel);
