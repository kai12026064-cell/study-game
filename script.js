const questions = {
  math: [
    {
      question: '2 × 8 は？',
      options: ['12', '14', '16', '18'],
      answer: '16',
      hint: '2を8回足すイメージです。'
    },
    {
      question: '3 + 5 × 2 は？',
      options: ['10', '13', '16', '11'],
      answer: '13',
      hint: '掛け算を先に計算します。'
    },
    {
      question: '円周率の記号として使う文字は？',
      options: ['π', 'α', 'β', 'δ'],
      answer: 'π',
      hint: 'ギリシャ文字のひとつです。'
    },
    {
      question: '1/2 + 1/2 は？',
      options: ['1/4', '1', '2/4', '3/2'],
      answer: '1',
      hint: '同じ分数を足すと、分子が2になります。'
    },
    {
      question: '12 の約数でないものは？',
      options: ['3', '4', '5', '6'],
      answer: '5',
      hint: '12を割り切れる数を考えます。'
    }
  ],
  english: [
    {
      question: '「学校」を英語で言うと？',
      options: ['school', 'house', 'store', 'park'],
      answer: 'school',
      hint: '勉強する場所です。'
    },
    {
      question: '「I am hungry.」の意味は？',
      options: ['お腹が空いています', '眠いです', '嬉しいです', '元気です'],
      answer: 'お腹が空いています',
      hint: 'hungry は空腹の意味です。'
    },
    {
      question: '「apple」は何？',
      options: ['りんご', 'みかん', 'バナナ', 'ぶどう'],
      answer: 'りんご',
      hint: '赤い果物です。'
    },
    {
      question: '「book」の意味は？',
      options: ['本', 'ペン', '机', '椅子'],
      answer: '本',
      hint: '読書に使います。'
    },
    {
      question: '「cat」は何？',
      options: ['猫', '犬', '鳥', '魚'],
      answer: '猫',
      hint: 'にゃーと鳴く動物です。'
    }
  ],
  science: [
    {
      question: '太陽の光を受けて植物が作るものは？',
      options: ['糖', '石', '鉄', '水'],
      answer: '糖',
      hint: '光合成で作られます。'
    },
    {
      question: '水が沸騰する温度はおおよそ何度？',
      options: ['50度', '80度', '100度', '120度'],
      answer: '100度',
      hint: 'よく知られた温度です。'
    },
    {
      question: '地球の周りを回っている天体は？',
      options: ['月', '太陽', '星', '雲'],
      answer: '月',
      hint: '夜空に見えるものです。'
    },
    {
      question: '電気を通す物質は何と呼ぶ？',
      options: ['絶縁体', '導体', '液体', '気体'],
      answer: '導体',
      hint: '電流が流れやすい性質です。'
    },
    {
      question: '空気の主な成分は何？',
      options: ['酸素', '二酸化炭素', '窒素', '水蒸気'],
      answer: '窒素',
      hint: '一番多く含まれています。'
    }
  ]
};

const subjectButtons = document.querySelectorAll('.subject-btn');
const homeCard = document.getElementById('homeCard');
const stageCard = document.getElementById('stageCard');
const gameCard = document.getElementById('gameCard');
const resultCard = document.getElementById('resultCard');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const nextButton = document.getElementById('nextButton');
const hintButton = document.getElementById('hintButton');
const hintText = document.getElementById('hintText');
const feedback = document.getElementById('feedback');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('options');
const questionCount = document.getElementById('questionCount');
const progressFill = document.getElementById('progressFill');
const xpValue = document.getElementById('xpValue');
const streakValue = document.getElementById('streakValue');
const scoreValue = document.getElementById('scoreValue');
const subjectLabel = document.getElementById('subjectLabel');
const subjectDescription = document.getElementById('subjectDescription');
const resultMessage = document.getElementById('resultMessage');
const finalScore = document.getElementById('finalScore');
const finalXp = document.getElementById('finalXp');
const stageTitle = document.getElementById('stageTitle');
const stageDescription = document.getElementById('stageDescription');
const enemyEmoji = document.getElementById('enemyEmoji');
const playerHpFill = document.getElementById('playerHpFill');
const enemyHpFill = document.getElementById('enemyHpFill');
const playerHpText = document.getElementById('playerHpText');
const enemyHpText = document.getElementById('enemyHpText');

let currentSubject = 'math';
let currentIndex = 0;
let score = 0;
let streak = 0;
let xp = 0;
let currentQuestion = null;
let answered = false;
let questionDeck = [];
let playerHp = 5;
let enemyHp = 5;
const maxHp = 5;

const subjectMeta = {
  math: {
    label: '数学のクエスト',
    description: '公式を使って、短時間で解ける問題に挑戦します。',
    stageTitle: '第1ステージ: 数学の森',
    stageDescription: '計算の魔物を倒して道を開こう。',
    emoji: '🧮',
    background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.18), rgba(59, 130, 246, 0.24))',
    accent: '#38bdf8',
    accent2: '#3b82f6',
    pageBackground: 'linear-gradient(135deg, #020617, #0f172a 45%, #1e3a8a)'
  },
  english: {
    label: '英語のクエスト',
    description: '単語と基本文を覚えながらレベルアップします。',
    stageTitle: '第2ステージ: 英語の塔',
    stageDescription: '単語の扉を開いて上へ進もう。',
    emoji: '📚',
    background: 'linear-gradient(135deg, rgba(244, 114, 182, 0.22), rgba(168, 85, 247, 0.24))',
    accent: '#f472b6',
    accent2: '#a855f7',
    pageBackground: 'linear-gradient(135deg, #2d0b3a, #4c1d95 45%, #7c3aed)'
  },
  science: {
    label: '理科のクエスト',
    description: '身近な現象から、科学の基本を学びます。',
    stageTitle: '第3ステージ: 科学の洞窟',
    stageDescription: '自然の秘密を解き明かして先へ進もう。',
    emoji: '🔬',
    background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.2), rgba(16, 185, 129, 0.24))',
    accent: '#4ade80',
    accent2: '#10b981',
    pageBackground: 'linear-gradient(135deg, #052e16, #14532d 45%, #2f855a)'
  }
};

function updateStageDisplay() {
  const meta = subjectMeta[currentSubject];
  stageTitle.textContent = meta.stageTitle;
  stageDescription.textContent = meta.stageDescription;
  enemyEmoji.textContent = meta.emoji;
  document.querySelector('.stage-card').style.background = meta.background;
  document.querySelector('.stage-card').style.borderColor = `${meta.accent}55`;
  document.querySelector('.vs-mark').style.color = meta.accent;
  document.body.style.background = meta.pageBackground;
  document.documentElement.style.setProperty('--accent', meta.accent);
  document.documentElement.style.setProperty('--accent-2', meta.accent2);
  playerHpFill.style.width = `${(playerHp / maxHp) * 100}%`;
  enemyHpFill.style.width = `${(enemyHp / maxHp) * 100}%`;
  playerHpText.textContent = `${playerHp}/${maxHp}`;
  enemyHpText.textContent = `${enemyHp}/${maxHp}`;
}

function resetStageState() {
  playerHp = maxHp;
  enemyHp = maxHp;
  updateStageDisplay();
}

function showHomeScreen() {
  homeCard.classList.remove('hidden');
  stageCard.classList.add('hidden');
  gameCard.classList.add('hidden');
  resultCard.classList.add('hidden');
}

function showStartScreen() {
  homeCard.classList.add('hidden');
  stageCard.classList.remove('hidden');
  gameCard.classList.add('hidden');
  resultCard.classList.add('hidden');
}

function startAdventure() {
  showStartScreen();
  resetStageState();
  updateStats();
}

function selectSubject(subject) {
  currentSubject = subject;
  currentIndex = 0;
  score = 0;
  streak = 0;
  xp = 0;
  answered = false;
  feedback.textContent = '';
  feedback.className = 'feedback';
  hintText.classList.add('hidden');
  hintText.textContent = '';
  nextButton.classList.add('hidden');
  hintButton.classList.remove('hidden');

  subjectButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.subject === subject);
  });
  subjectLabel.textContent = subjectMeta[subject].label;
  subjectDescription.textContent = subjectMeta[subject].description;
  currentSubject = subject;
  resetStageState();
  updateStats();
  showStartScreen();
}

function updateStats() {
  xpValue.textContent = xp;
  streakValue.textContent = streak;
  scoreValue.textContent = score;
}

function showQuestion() {
  answered = false;
  feedback.textContent = '';
  feedback.className = 'feedback';
  hintText.classList.add('hidden');
  hintText.textContent = '';
  nextButton.classList.add('hidden');
  hintButton.classList.remove('hidden');

  const questionsForSubject = questionDeck;
  currentQuestion = questionsForSubject[currentIndex];
  questionText.textContent = currentQuestion.question;
  questionCount.textContent = `${currentIndex + 1} / ${questionsForSubject.length}`;
  progressFill.style.width = `${((currentIndex + 1) / questionsForSubject.length) * 100}%`;
  optionsContainer.innerHTML = '';

  currentQuestion.options.forEach((option) => {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.textContent = option;
    button.addEventListener('click', () => handleAnswer(option));
    optionsContainer.appendChild(button);
  });
}

function handleAnswer(option) {
  if (answered) return;

  answered = true;
  const buttons = document.querySelectorAll('.option-btn');
  buttons.forEach((button) => {
    const isCorrect = button.textContent === currentQuestion.answer;
    if (isCorrect) {
      button.classList.add('correct');
    } else if (button.textContent === option) {
      button.classList.add('wrong');
    }
  });

  if (option === currentQuestion.answer) {
    score += 1;
    streak += 1;
    xp += 20 + streak * 5;
    enemyHp = Math.max(0, enemyHp - 1);
    feedback.textContent = '正解！モンスターにダメージを与えた。';
    feedback.classList.add('good');
  } else {
    streak = 0;
    xp += 5;
    playerHp = Math.max(0, playerHp - 1);
    feedback.textContent = `不正解…正解は ${currentQuestion.answer} です。勇者がダメージを受けた。`;
    feedback.classList.add('bad');
  }

  updateStageDisplay();
  updateStats();
  hintButton.classList.add('hidden');
  nextButton.classList.remove('hidden');
}

function startGame() {
  currentIndex = 0;
  score = 0;
  streak = 0;
  xp = 0;
  questionDeck = createQuestionDeck(questions[currentSubject]);
  resetStageState();
  updateStats();
  homeCard.classList.add('hidden');
  stageCard.classList.add('hidden');
  resultCard.classList.add('hidden');
  gameCard.classList.remove('hidden');
  showQuestion();
}

function showResult() {
  gameCard.classList.add('hidden');
  resultCard.classList.remove('hidden');
  finalScore.textContent = score;
  finalXp.textContent = xp;
  if (score >= 4) {
    resultMessage.textContent = '素晴らしい！今日の勉強がしっかり身についています。';
  } else if (score >= 2) {
    resultMessage.textContent = 'おしい！次はもう少しだけ挑戦してみましょう。';
  } else {
    resultMessage.textContent = 'まずは基礎から。ヒントを見ながらもう一回挑戦してみてください。';
  }
}

startButton.addEventListener('click', () => {
  startAdventure();
  startGame();
});
restartButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  const questionsForSubject = questionDeck;
  if (currentIndex < questionsForSubject.length - 1) {
    currentIndex += 1;
    showQuestion();
  } else {
    showResult();
  }
});

hintButton.addEventListener('click', () => {
  hintText.textContent = currentQuestion.hint;
  hintText.classList.remove('hidden');
});

subjectButtons.forEach((button) => {
  button.addEventListener('click', () => selectSubject(button.dataset.subject));
});

selectSubject(currentSubject);
showHomeScreen();
