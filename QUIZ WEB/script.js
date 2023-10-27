const quizForm = document.getElementById('quiz-form');
const startButton = document.getElementById('start-button');
const startQuizDiv = document.getElementById('start-quiz');
const questionDiv = document.getElementById('question');
const optionsDiv = document.getElementById('options');
const resultDiv = document.getElementById('result');
const resetButton = document.getElementById('reset-button');

const questions = [
    {
        question: 'Siapakah hero di Mobile Legends yang dikenal sebagai "Master of Gravity"?',
        options: ['Lylia', 'Aldous', 'Grock', 'Granger'],
        correctAnswer: 'Grock'
    },
    {
        question: 'Berapa jumlah pemain dalam satu tim di Mobile Legends?',
        options: ['3', '4', '5', '6'],
        correctAnswer: '5'
    },
    {
        question: 'Apa tipe role yang dimiliki oleh hero Miya?',
        options: ['Fighter', 'Tank', 'Assassin', 'Marksman'],
        correctAnswer: 'Marksman'
    },
    {
        question: 'Hero apa yang memiliki kemampuan "Death Sonnet"?',
        options: ['Lancelot', 'Esmeralda', 'X.Borg', 'Leomord'],
        correctAnswer: 'Esmeralda'
    },
    {
        question: 'Siapakah developer dari Mobile Legends: Bang Bang?',
        options: ['Tencent', 'Riot Games', 'Moonton', 'Supercell'],
        correctAnswer: 'Moonton'
    }
];

let currentQuestionIndex = 0;
let totalScore = 0;
let quizStarted = false;

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionDiv.classList.add('question-transition'); // Tambahkan animasi
    questionDiv.textContent = currentQuestion.question;
    optionsDiv.innerHTML = '';

    for (let i = 0; i < currentQuestion.options.length; i++) {
        const option = document.createElement('input');
        option.type = 'radio';
        option.name = 'option';
        option.value = currentQuestion.options[i];
        option.id = 'option' + i;

        const label = document.createElement('label');
        label.textContent = currentQuestion.options[i];
        label.htmlFor = 'option' + i;

        optionsDiv.appendChild(option);
        optionsDiv.appendChild(label);
        optionsDiv.appendChild(document.createElement('br'));
    }
}

function checkAnswer() {
    if (!quizStarted) {
        startQuiz();
    }

    const selectedOption = document.querySelector('input[name="option"]:checked');

    if (!selectedOption) {
        alert('Masak Ga Tau Jawabannya.');
        return;
    }

    if (selectedOption.value === questions[currentQuestionIndex].correctAnswer) {
        totalScore += 20;
    }

    questionDiv.classList.remove('question-transition'); // Hapus animasi

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        setTimeout(displayQuestion, 500); // Tampilkan pertanyaan berikutnya setelah 0.5 detik
    } else {
        showResult();
    }
}

function startQuiz() {
    quizStarted = true;
    startQuizDiv.style.display = 'none';
    quizForm.style.display = 'block';
    displayQuestion();
}

function showResult() {
    quizForm.style.display = 'none';
    resetButton.style.display = 'block';

    resultDiv.innerHTML = `Skor Akhir: ${totalScore}`;
    resultDiv.style.display = 'block';
}

function resetQuiz() {
    quizStarted = false;
    currentQuestionIndex = 0;
    totalScore = 0;
    resetButton.style.display = 'none';
    resultDiv.style.display = 'none';
    startQuizDiv.style.display = 'block';
}

quizForm.addEventListener('submit', (event) => {
    event.preventDefault();
    checkAnswer();
});

startButton.addEventListener('click', () => {
    startQuiz();
});

resetButton.addEventListener('click', () => {
    resetQuiz();
});


// Kode Partikel
const max_particles = 2500;
let particles = [];
const frequency = 10;
const init_num = max_particles;
const max_time = frequency * max_particles;
let time_to_recreate = false;

// Enable repopolate
setTimeout(function () {
  time_to_recreate = true;
}.bind(this), max_time);

// Popolate particles
popolate(max_particles);

const tela = document.getElementById('particles-canvas');
tela.width = $(window).width();
tela.height = $(window).height();
$("#particles-container").append(tela);

const canvas = tela.getContext('2d');

class Particle {
  constructor(canvas) {
    let random = Math.random();
    this.progress = 0;
    this.canvas = canvas;
    this.center = {
      x: $(window).width() / 2,
      y: $(window).height() / 2
    };

    this.point_of_attraction = {
      x: $(window).width() / 2,
      y: $(window).height() / 2
    };

    if (Math.random() > 0.5) {
      this.x = $(window). width() * Math.random();
      this.y = Math.random() > 0.5 ? -Math.random() - 100 : $(window).height() + Math.random() + 100;
    } else {
      this.x = Math.random() > 0.5 ? -Math.random() - 100 : $(window).width() + Math.random() + 100;
      this.y = $(window).height() * Math.random();
    }

    this.s = Math.random() * 2;
    this.a = 0;
    this.w = $(window).width();
    this.h = $(window).height();
    this.radius = random > .2 ? Math.random() * 1 : Math.random() * 3;
    this.color = random > .2 ? "#694FB9" : "#9B0127";
    this.radius = random > .8 ? Math.random() * 2.2 : this.radius;
    this.color = random > .8 ? "#3CFBFF" : this.color;
  }

  calculateDistance(v1, v2) {
    let x = Math.abs(v1.x - v2.x);
    let y = Math.abs(v1.y - v2.y);
    return Math.sqrt(x * x + y * y);
  }

  render() {
    this.canvas.beginPath();
    this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.canvas.lineWidth = 2;
    this.canvas.fillStyle = this.color;
    this.canvas.fill();
    this.canvas.closePath();
  }

  move() {
    let p1 = {
      x: this.x,
      y: this.y
    };

    let distance = this.calculateDistance(p1, this.point_of_attraction);
    let force = Math.max(100, 1 + distance);

    let attr_x = (this.point_of_attraction.x - this.x) / force;
    let attr_y = (this.point_of_attraction.y - this.y) / force;

    this.x += Math.cos(this.a) * this.s + attr_x;
    this.y += Math.sin(this.a) * this.s + attr_y;
    this.a += Math.random() > 0.5 ? Math.random() * 0.9 - 0.45 : Math.random() * 0.4 - 0.2;

    if (distance < 30 + Math.random() * 100) {
      return false;
    }

    this.render();
    this.progress++;
    return true;
  }
}

function popolate(num) {
  for (var i = 0; i < num; i++) {
    setTimeout(function (x) {
      return function () {
        particles.push(new Particle(canvas));
      };
    }(i), frequency * i);
  }
  return particles.length;
}

function createSphera() {
  let radius = 320;
  let center = {
    x: $(window).width() / 2,
    y: $(window).height() / 2
  };
}

function clear() {
  canvas.globalAlpha = 0.08;
  canvas.fillStyle = '#110031';
  canvas.fillRect(0, 0, tela.width, tela.height);
  canvas.globalAlpha = 1;
}

function update() {
  particles = particles.filter(function (p) {
    return p.move();
  });
  if (time_to_recreate) {
    if (particles.length < init_num) {
      popolate(1);
      console.log("Ricreo");
    }
  }
  clear();
  requestAnimationFrame(update.bind(this));
}
update();