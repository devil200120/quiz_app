// Quiz Application - Advanced Glass Morphic Quiz
class QuizApp {
  constructor() {
    this.currentScreen = 'splash-screen';
    this.currentCategory = null;
    this.currentDifficulty = null;
    this.currentQuestions = [];
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.hintsRemaining = 3;
    this.timer = null;
    this.timeRemaining = 30;
    this.startTime = null;
    this.answers = [];
    this.settings = {
      soundEnabled: true,
      animations: true,
      difficulty: 'medium',
      theme: 'glass',
      hints: 3
    };
    
    // Quiz data from the provided JSON
    this.quizData = {
      "General Knowledge": {
        "easy": [
          {
            "question": "What is the capital of France?",
            "options": ["London", "Berlin", "Paris", "Madrid"],
            "correct": 2,
            "explanation": "Paris is the capital and largest city of France.",
            "timeLimit": 15
          },
          {
            "question": "Which planet is known as the Red Planet?",
            "options": ["Venus", "Mars", "Jupiter", "Saturn"],
            "correct": 1,
            "explanation": "Mars is called the Red Planet due to its reddish appearance from iron oxide on its surface.",
            "timeLimit": 15
          },
          {
            "question": "How many continents are there?",
            "options": ["5", "6", "7", "8"],
            "correct": 2,
            "explanation": "There are 7 continents: Asia, Africa, North America, South America, Antarctica, Europe, and Australia.",
            "timeLimit": 12
          }
        ],
        "medium": [
          {
            "question": "Which element has the chemical symbol 'Au'?",
            "options": ["Silver", "Gold", "Aluminum", "Argon"],
            "correct": 1,
            "explanation": "Au is the chemical symbol for Gold, derived from the Latin word 'aurum'.",
            "timeLimit": 20
          },
          {
            "question": "In which year did World War II end?",
            "options": ["1944", "1945", "1946", "1947"],
            "correct": 1,
            "explanation": "World War II ended in 1945 with the surrender of Japan in September.",
            "timeLimit": 20
          }
        ],
        "hard": [
          {
            "question": "What is the smallest country in the world?",
            "options": ["Monaco", "San Marino", "Vatican City", "Liechtenstein"],
            "correct": 2,
            "explanation": "Vatican City is the smallest country in the world with an area of just 0.17 square miles.",
            "timeLimit": 25
          }
        ]
      },
      "Science": {
        "easy": [
          {
            "question": "What gas do plants absorb from the atmosphere?",
            "options": ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
            "correct": 1,
            "explanation": "Plants absorb carbon dioxide from the atmosphere during photosynthesis.",
            "timeLimit": 15
          },
          {
            "question": "How many bones are in the human body?",
            "options": ["206", "208", "210", "212"],
            "correct": 0,
            "explanation": "The adult human body has 206 bones.",
            "timeLimit": 18
          }
        ],
        "medium": [
          {
            "question": "What is the speed of light in vacuum?",
            "options": ["299,792,458 m/s", "300,000,000 m/s", "299,000,000 m/s", "301,000,000 m/s"],
            "correct": 0,
            "explanation": "The speed of light in vacuum is exactly 299,792,458 meters per second.",
            "timeLimit": 25
          }
        ],
        "hard": [
          {
            "question": "What is the name of the theoretical boundary around a black hole?",
            "options": ["Photon Sphere", "Event Horizon", "Singularity", "Accretion Disk"],
            "correct": 1,
            "explanation": "The Event Horizon is the theoretical boundary around a black hole beyond which nothing can escape.",
            "timeLimit": 30
          }
        ]
      },
      "Technology": {
        "easy": [
          {
            "question": "What does 'WWW' stand for?",
            "options": ["World Wide Web", "World Wide Wire", "World Web Wide", "Wide World Web"],
            "correct": 0,
            "explanation": "WWW stands for World Wide Web, the information system on the Internet.",
            "timeLimit": 12
          },
          {
            "question": "Which company created the iPhone?",
            "options": ["Samsung", "Google", "Apple", "Microsoft"],
            "correct": 2,
            "explanation": "Apple Inc. created and manufactures the iPhone.",
            "timeLimit": 10
          }
        ],
        "medium": [
          {
            "question": "What does 'AI' stand for in technology?",
            "options": ["Automated Intelligence", "Artificial Intelligence", "Advanced Integration", "Algorithmic Interface"],
            "correct": 1,
            "explanation": "AI stands for Artificial Intelligence, the simulation of human intelligence in machines.",
            "timeLimit": 15
          }
        ],
        "hard": [
          {
            "question": "What is the name of the first computer bug?",
            "options": ["Logic Error", "Syntax Error", "Actual Bug", "Runtime Error"],
            "correct": 2,
            "explanation": "The first computer bug was literally a bug - a moth found trapped in a Harvard Mark II computer in 1947.",
            "timeLimit": 25
          }
        ]
      },
      "History": {
        "easy": [
          {
            "question": "Who was the first President of the United States?",
            "options": ["Thomas Jefferson", "George Washington", "John Adams", "Benjamin Franklin"],
            "correct": 1,
            "explanation": "George Washington was the first President of the United States, serving from 1789 to 1797.",
            "timeLimit": 15
          }
        ],
        "medium": [
          {
            "question": "In which year did the Berlin Wall fall?",
            "options": ["1987", "1988", "1989", "1990"],
            "correct": 2,
            "explanation": "The Berlin Wall fell on November 9, 1989, marking the beginning of German reunification.",
            "timeLimit": 20
          }
        ],
        "hard": [
          {
            "question": "Which empire was ruled by Justinian I?",
            "options": ["Roman Empire", "Byzantine Empire", "Ottoman Empire", "Holy Roman Empire"],
            "correct": 1,
            "explanation": "Justinian I ruled the Byzantine Empire from 527 to 565 CE and is known for his legal reforms.",
            "timeLimit": 25
          }
        ]
      },
      "Sports": {
        "easy": [
          {
            "question": "How many players are on a basketball team on the court at one time?",
            "options": ["4", "5", "6", "7"],
            "correct": 1,
            "explanation": "Each basketball team has 5 players on the court at one time.",
            "timeLimit": 12
          }
        ],
        "medium": [
          {
            "question": "Which country has won the most FIFA World Cups?",
            "options": ["Germany", "Argentina", "Brazil", "Italy"],
            "correct": 2,
            "explanation": "Brazil has won the FIFA World Cup 5 times (1958, 1962, 1970, 1994, 2002).",
            "timeLimit": 18
          }
        ],
        "hard": [
          {
            "question": "What is the maximum score possible in ten-pin bowling?",
            "options": ["200", "250", "300", "350"],
            "correct": 2,
            "explanation": "The maximum score in ten-pin bowling is 300, achieved by rolling 12 consecutive strikes.",
            "timeLimit": 22
          }
        ]
      }
    };

    this.achievements = [
      {
        "id": "first_quiz",
        "name": "Getting Started",
        "description": "Complete your first quiz",
        "icon": "🎯"
      },
      {
        "id": "perfect_score",
        "name": "Perfect Score",
        "description": "Get 100% on any quiz",
        "icon": "🏆"
      },
      {
        "id": "speed_demon",
        "name": "Speed Demon",
        "description": "Answer 5 questions in under 30 seconds",
        "icon": "⚡"
      },
      {
        "id": "knowledge_seeker",
        "name": "Knowledge Seeker",
        "description": "Complete quizzes in all categories",
        "icon": "📚"
      }
    ];

    this.unlockedAchievements = new Set();
    this.leaderboard = [];
    
    this.init();
  }

  async init() {
    try {
      await this.waitForDOM();
      this.loadSettings();
      this.loadLeaderboard();
      this.loadAchievements();
      this.setupEventListeners();
      this.startLoadingSequence();
    } catch (error) {
      console.error('Initialization failed:', error);
      this.showToast('Failed to initialize app', 'error');
    }
  }

  waitForDOM() {
    return new Promise((resolve) => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve);
      } else {
        resolve();
      }
    });
  }

  startLoadingSequence() {
    const loadingProgress = document.getElementById('loading-progress');
    const loadingPercentage = document.getElementById('loading-percentage');
    const loadingStatus = document.getElementById('loading-status');
    
    if (!loadingProgress || !loadingPercentage || !loadingStatus) {
      console.error('Loading elements not found, skipping to category screen');
      setTimeout(() => this.showScreen('category-screen'), 500);
      return;
    }

    const loadingSteps = [
      { percent: 15, status: 'Loading quiz data...', delay: 300 },
      { percent: 35, status: 'Initializing components...', delay: 400 },
      { percent: 55, status: 'Setting up animations...', delay: 350 },
      { percent: 75, status: 'Loading achievements...', delay: 300 },
      { percent: 90, status: 'Preparing interface...', delay: 250 },
      { percent: 100, status: 'Ready to start!', delay: 500 }
    ];

    let currentStep = 0;

    const updateLoading = () => {
      if (currentStep >= loadingSteps.length) {
        setTimeout(() => {
          this.showScreen('category-screen');
        }, 800);
        return;
      }

      const step = loadingSteps[currentStep];
      
      loadingProgress.style.width = `${step.percent}%`;
      loadingPercentage.textContent = `${step.percent}%`;
      loadingStatus.textContent = step.status;
      
      currentStep++;
      setTimeout(updateLoading, step.delay);
    };

    // Start loading sequence after a brief delay
    setTimeout(updateLoading, 500);
  }

  setupEventListeners() {
    // Wait for DOM to be ready
    setTimeout(() => {
      // Category selection
      const categoryCards = document.querySelectorAll('.category-card');
      categoryCards.forEach(card => {
        card.addEventListener('click', (e) => {
          const category = e.currentTarget.dataset.category;
          if (category) {
            this.selectCategory(category);
          }
        });
      });

      // Difficulty selection
      const difficultyCards = document.querySelectorAll('.difficulty-card');
      difficultyCards.forEach(card => {
        card.addEventListener('click', (e) => {
          const difficulty = e.currentTarget.dataset.difficulty;
          if (difficulty) {
            this.selectDifficulty(difficulty);
          }
        });
      });

      // Navigation buttons
      this.setupButton('back-to-categories', () => this.showScreen('category-screen'));
      this.setupButton('settings-btn', () => this.showScreen('settings-screen'));
      this.setupButton('leaderboard-btn', () => this.showScreen('leaderboard-screen'));
      this.setupButton('close-settings', () => this.showScreen('category-screen'));
      this.setupButton('close-leaderboard', () => this.showScreen('category-screen'));

      // Quiz controls
      this.setupButton('hint-btn', () => this.useHint());
      this.setupButton('quit-quiz', () => this.quitQuiz());

      // Results actions
      this.setupButton('play-again', () => this.playAgain());
      this.setupButton('change-category', () => this.showScreen('category-screen'));
      this.setupButton('view-leaderboard', () => this.showScreen('leaderboard-screen'));

      // Settings
      this.setupButton('save-settings', () => this.saveSettings());
      this.setupSettingsToggles();

      // Keyboard navigation
      document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }, 100);
  }

  setupButton(id, handler) {
    const button = document.getElementById(id);
    if (button) {
      button.addEventListener('click', handler);
    }
  }

  setupSettingsToggles() {
    const soundToggle = document.getElementById('sound-toggle');
    const animationsToggle = document.getElementById('animations-toggle');
    const defaultDifficulty = document.getElementById('default-difficulty');

    if (soundToggle) {
      soundToggle.checked = this.settings.soundEnabled;
      soundToggle.addEventListener('change', (e) => {
        this.settings.soundEnabled = e.target.checked;
      });
    }

    if (animationsToggle) {
      animationsToggle.checked = this.settings.animations;
      animationsToggle.addEventListener('change', (e) => {
        this.settings.animations = e.target.checked;
      });
    }

    if (defaultDifficulty) {
      defaultDifficulty.value = this.settings.difficulty;
      defaultDifficulty.addEventListener('change', (e) => {
        this.settings.difficulty = e.target.value;
      });
    }
  }

  showScreen(screenId) {
    // Remove active class from all screens
    document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });

    // Add active class to target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
      targetScreen.classList.add('active');
      this.currentScreen = screenId;
    } else {
      console.error(`Screen not found: ${screenId}`);
    }
  }

  selectCategory(category) {
    console.log('Selecting category:', category);
    this.currentCategory = category;
    const categoryNameElement = document.getElementById('selected-category-name');
    if (categoryNameElement) {
      categoryNameElement.textContent = `${category} Quiz`;
    }
    this.showScreen('difficulty-screen');
  }

  selectDifficulty(difficulty) {
    console.log('Selecting difficulty:', difficulty);
    this.currentDifficulty = difficulty;
    this.setupQuiz();
  }

  setupQuiz() {
    console.log('Setting up quiz:', this.currentCategory, this.currentDifficulty);
    
    if (!this.currentCategory || !this.currentDifficulty) {
      console.error('Missing category or difficulty');
      return;
    }

    const categoryData = this.quizData[this.currentCategory];
    if (!categoryData) {
      console.error('Category data not found:', this.currentCategory);
      this.showToast('Quiz category not available', 'error');
      return;
    }

    const difficultyData = categoryData[this.currentDifficulty];
    if (!difficultyData || difficultyData.length === 0) {
      console.error('Difficulty data not found:', this.currentDifficulty);
      this.showToast('Quiz difficulty not available', 'error');
      return;
    }

    // Reset quiz state
    this.currentQuestions = [...difficultyData];
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.answers = [];
    this.startTime = Date.now();
    
    // Set hints based on difficulty
    this.hintsRemaining = this.currentDifficulty === 'easy' ? 3 : this.currentDifficulty === 'medium' ? 2 : 1;
    
    console.log('Quiz setup complete, starting quiz with', this.currentQuestions.length, 'questions');
    
    // Show quiz screen and load first question
    this.showScreen('quiz-screen');
    setTimeout(() => {
      this.updateHintsDisplay();
      this.updateScoreDisplay();
      this.loadQuestion();
    }, 100);
  }

  loadQuestion() {
    if (this.currentQuestionIndex >= this.currentQuestions.length) {
      this.finishQuiz();
      return;
    }

    const question = this.currentQuestions[this.currentQuestionIndex];
    console.log('Loading question:', this.currentQuestionIndex + 1, 'of', this.currentQuestions.length);

    const questionText = document.getElementById('question-text');
    const answersGrid = document.getElementById('answers-grid');
    const progressText = document.getElementById('progress-text');
    const progressFill = document.getElementById('quiz-progress');

    if (questionText) questionText.textContent = question.question;
    if (progressText) {
      progressText.textContent = `Question ${this.currentQuestionIndex + 1} of ${this.currentQuestions.length}`;
    }
    if (progressFill) {
      const progress = ((this.currentQuestionIndex + 1) / this.currentQuestions.length) * 100;
      progressFill.style.width = `${progress}%`;
    }

    // Clear previous answers
    if (answersGrid) {
      answersGrid.innerHTML = '';
      
      question.options.forEach((option, index) => {
        const answerButton = document.createElement('button');
        answerButton.className = 'answer-option';
        answerButton.textContent = option;
        answerButton.addEventListener('click', () => this.selectAnswer(index));
        answersGrid.appendChild(answerButton);
      });
    }

    // Update hint button
    const hintBtn = document.getElementById('hint-btn');
    if (hintBtn) {
      hintBtn.disabled = this.hintsRemaining <= 0;
    }

    // Start timer
    this.timeRemaining = question.timeLimit || 30;
    this.startTimer();
  }

  selectAnswer(answerIndex) {
    if (this.timer) {
      clearInterval(this.timer);
    }

    const question = this.currentQuestions[this.currentQuestionIndex];
    const isCorrect = answerIndex === question.correct;
    const timeTaken = (question.timeLimit || 30) - this.timeRemaining;

    // Record answer
    this.answers.push({
      questionIndex: this.currentQuestionIndex,
      selected: answerIndex,
      correct: question.correct,
      isCorrect: isCorrect,
      timeTaken: timeTaken
    });

    // Update score and streak
    if (isCorrect) {
      const baseScore = 100;
      const timeBonus = Math.max(0, (this.timeRemaining / (question.timeLimit || 30)) * 50);
      const streakBonus = Math.min(this.streak * 10, 50);
      const totalScore = Math.round(baseScore + timeBonus + streakBonus);
      
      this.score += totalScore;
      this.streak++;
    } else {
      this.streak = 0;
    }

    this.updateScoreDisplay();
    this.showAnswerFeedback(isCorrect, question.explanation);

    // Highlight answers
    const answerOptions = document.querySelectorAll('.answer-option');
    answerOptions.forEach((option, index) => {
      if (index === question.correct) {
        option.classList.add('correct');
      } else if (index === answerIndex && !isCorrect) {
        option.classList.add('incorrect');
      }
      option.style.pointerEvents = 'none';
    });

    // Move to next question after delay
    setTimeout(() => {
      this.currentQuestionIndex++;
      this.loadQuestion();
    }, 3000);
  }

  startTimer() {
    const timerText = document.getElementById('timer-text');
    const timerFill = document.getElementById('timer-fill');

    if (timerText) timerText.textContent = this.timeRemaining;

    this.timer = setInterval(() => {
      this.timeRemaining--;

      if (timerText) timerText.textContent = this.timeRemaining;
      if (timerFill) {
        const question = this.currentQuestions[this.currentQuestionIndex];
        const totalTime = question.timeLimit || 30;
        const progress = (this.timeRemaining / totalTime) * 360;
        timerFill.style.background = `conic-gradient(#4facfe ${progress}deg, transparent ${progress}deg)`;
      }

      if (this.timeRemaining <= 0) {
        clearInterval(this.timer);
        this.selectAnswer(-1); // No answer selected
      }
    }, 1000);
  }

  useHint() {
    if (this.hintsRemaining <= 0) return;

    this.hintsRemaining--;
    this.updateHintsDisplay();

    const question = this.currentQuestions[this.currentQuestionIndex];
    const answerOptions = document.querySelectorAll('.answer-option');
    
    // Remove one incorrect answer
    const incorrectOptions = [];
    answerOptions.forEach((option, index) => {
      if (index !== question.correct) {
        incorrectOptions.push(index);
      }
    });

    if (incorrectOptions.length > 0) {
      const removeIndex = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];
      answerOptions[removeIndex].style.opacity = '0.3';
      answerOptions[removeIndex].style.pointerEvents = 'none';
    }

    this.showToast('Hint used! One incorrect answer removed.', 'info');
  }

  updateHintsDisplay() {
    const hintsRemaining = document.getElementById('hints-remaining');
    if (hintsRemaining) {
      hintsRemaining.textContent = this.hintsRemaining;
    }
  }

  updateScoreDisplay() {
    const currentScore = document.getElementById('current-score');
    const streakCounter = document.getElementById('streak-counter');

    if (currentScore) currentScore.textContent = `Score: ${this.score}`;
    if (streakCounter) streakCounter.textContent = `Streak: ${this.streak}`;
  }

  showAnswerFeedback(isCorrect, explanation) {
    const feedback = document.getElementById('answer-feedback');
    const feedbackIcon = document.getElementById('feedback-icon');
    const feedbackText = document.getElementById('feedback-text');
    const feedbackExplanation = document.getElementById('feedback-explanation');

    if (!feedback) return;

    if (feedbackIcon) feedbackIcon.textContent = isCorrect ? '✓' : '✗';
    if (feedbackText) feedbackText.textContent = isCorrect ? 'Correct!' : 'Incorrect';
    if (feedbackExplanation) feedbackExplanation.textContent = explanation;

    feedback.classList.add('show');

    setTimeout(() => {
      feedback.classList.remove('show');
    }, 2500);
  }

  finishQuiz() {
    const endTime = Date.now();
    const totalTime = Math.round((endTime - this.startTime) / 1000);
    const correctAnswers = this.answers.filter(answer => answer.isCorrect).length;
    const accuracy = this.answers.length > 0 ? Math.round((correctAnswers / this.answers.length) * 100) : 0;

    // Update results display
    this.updateResultsDisplay(correctAnswers, totalTime, accuracy);
    
    // Check for achievements
    this.checkAchievements(correctAnswers, totalTime, accuracy);
    
    // Update leaderboard
    this.updateLeaderboard(this.currentCategory, this.currentDifficulty, this.score, accuracy, totalTime);
    
    // Show celebration particles for good performance
    if (accuracy >= 80) {
      this.showCelebrationParticles();
    }

    this.showScreen('results-screen');
  }

  updateResultsDisplay(correctAnswers, totalTime, accuracy) {
    const finalScore = document.getElementById('final-score');
    const correctAnswersEl = document.getElementById('correct-answers');
    const timeTaken = document.getElementById('time-taken');
    const accuracyPercentage = document.getElementById('accuracy-percentage');
    const resultsIcon = document.getElementById('results-icon');
    const resultsTitle = document.getElementById('results-title');

    if (finalScore) finalScore.textContent = this.score;
    if (correctAnswersEl) correctAnswersEl.textContent = `${correctAnswers}/${this.answers.length}`;
    if (timeTaken) {
      const minutes = Math.floor(totalTime / 60);
      const seconds = totalTime % 60;
      timeTaken.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    if (accuracyPercentage) accuracyPercentage.textContent = `${accuracy}%`;

    // Update results icon and title based on performance
    if (resultsIcon && resultsTitle) {
      if (accuracy === 100) {
        resultsIcon.textContent = '🏆';
        resultsTitle.textContent = 'Perfect Score!';
      } else if (accuracy >= 80) {
        resultsIcon.textContent = '🎉';
        resultsTitle.textContent = 'Excellent Work!';
      } else if (accuracy >= 60) {
        resultsIcon.textContent = '👍';
        resultsTitle.textContent = 'Good Job!';
      } else {
        resultsIcon.textContent = '📚';
        resultsTitle.textContent = 'Keep Learning!';
      }
    }
  }

  checkAchievements(correctAnswers, totalTime, accuracy) {
    const newAchievements = [];

    // Getting Started
    if (!this.unlockedAchievements.has('first_quiz')) {
      this.unlockedAchievements.add('first_quiz');
      newAchievements.push(this.achievements.find(a => a.id === 'first_quiz'));
    }

    // Perfect Score
    if (accuracy === 100 && !this.unlockedAchievements.has('perfect_score')) {
      this.unlockedAchievements.add('perfect_score');
      newAchievements.push(this.achievements.find(a => a.id === 'perfect_score'));
    }

    // Speed Demon (answer 5 questions in under 30 seconds total)
    if (this.answers.length >= 5 && totalTime <= 30 && !this.unlockedAchievements.has('speed_demon')) {
      this.unlockedAchievements.add('speed_demon');
      newAchievements.push(this.achievements.find(a => a.id === 'speed_demon'));
    }

    // Display new achievements
    this.displayAchievements(newAchievements);
    this.saveAchievements();
  }

  displayAchievements(achievements) {
    const achievementsGrid = document.getElementById('achievements-grid');
    const achievementsSection = document.getElementById('achievements-section');

    if (!achievementsGrid || !achievementsSection) return;

    if (achievements.length === 0) {
      achievementsSection.style.display = 'none';
      return;
    }

    achievementsSection.style.display = 'block';
    achievementsGrid.innerHTML = '';

    achievements.forEach(achievement => {
      const badge = document.createElement('div');
      badge.className = 'achievement-badge';
      badge.innerHTML = `
        <div class="achievement-icon">${achievement.icon}</div>
        <div class="achievement-name">${achievement.name}</div>
        <div class="achievement-description">${achievement.description}</div>
      `;
      achievementsGrid.appendChild(badge);

      // Show toast notification
      this.showToast(`Achievement Unlocked: ${achievement.name}`, 'success');
    });
  }

  updateLeaderboard(category, difficulty, score, accuracy, time) {
    const entry = {
      category,
      difficulty,
      score,
      accuracy,
      time,
      date: new Date().toLocaleDateString()
    };

    this.leaderboard.push(entry);
    this.leaderboard.sort((a, b) => b.score - a.score);
    this.leaderboard = this.leaderboard.slice(0, 10); // Keep top 10
    
    this.saveLeaderboard();
    this.displayLeaderboard();
  }

  displayLeaderboard() {
    const leaderboardList = document.getElementById('leaderboard-list');
    if (!leaderboardList) return;

    leaderboardList.innerHTML = '';

    if (this.leaderboard.length === 0) {
      leaderboardList.innerHTML = '<p style="color: rgba(255,255,255,0.7); text-align: center;">No scores yet. Complete a quiz to appear here!</p>';
      return;
    }

    this.leaderboard.forEach((entry, index) => {
      const entryElement = document.createElement('div');
      entryElement.className = 'leaderboard-entry';
      entryElement.innerHTML = `
        <div class="leaderboard-rank">${index + 1}</div>
        <div class="leaderboard-info">
          <div class="leaderboard-name">${entry.category} - ${entry.difficulty}</div>
          <div class="leaderboard-details">${entry.accuracy}% accuracy • ${entry.date}</div>
        </div>
        <div class="leaderboard-score">${entry.score}</div>
      `;
      leaderboardList.appendChild(entryElement);
    });
  }

  showCelebrationParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const colors = ['#4facfe', '#00f2fe', '#4caf50', '#ffeb3b', '#ff9800'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = Math.random() * window.innerHeight + 'px';
        
        container.appendChild(particle);

        setTimeout(() => {
          if (container.contains(particle)) {
            container.removeChild(particle);
          }
        }, 3000);
      }, i * 100);
    }
  }

  playAgain() {
    this.setupQuiz();
  }

  quitQuiz() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.showScreen('category-screen');
  }

  saveSettings() {
    try {
      const soundToggle = document.getElementById('sound-toggle');
      const animationsToggle = document.getElementById('animations-toggle');
      const defaultDifficulty = document.getElementById('default-difficulty');
      
      const settings = {
        soundEnabled: soundToggle ? soundToggle.checked : true,
        animations: animationsToggle ? animationsToggle.checked : true,
        difficulty: defaultDifficulty ? defaultDifficulty.value : 'medium'
      };
      
      this.settings = { ...this.settings, ...settings };
      this.showToast('Settings saved successfully!', 'success');
      this.showScreen('category-screen');
    } catch (error) {
      console.error('Failed to save settings:', error);
      this.showToast('Failed to save settings', 'error');
    }
  }

  loadSettings() {
    try {
      // In a real app, this would load from localStorage
      // For now, we use defaults
      this.settings = {
        soundEnabled: true,
        animations: true,
        difficulty: 'medium',
        theme: 'glass',
        hints: 3
      };
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  }

  saveLeaderboard() {
    try {
      // In a real app, this would save to localStorage
      console.log('Leaderboard saved:', this.leaderboard);
    } catch (error) {
      console.error('Failed to save leaderboard:', error);
    }
  }

  loadLeaderboard() {
    try {
      // In a real app, this would load from localStorage
      this.leaderboard = [];
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
      this.leaderboard = [];
    }
  }

  saveAchievements() {
    try {
      // In a real app, this would save to localStorage
      console.log('Achievements saved:', Array.from(this.unlockedAchievements));
    } catch (error) {
      console.error('Failed to save achievements:', error);
    }
  }

  loadAchievements() {
    try {
      // In a real app, this would load from localStorage
      this.unlockedAchievements = new Set();
    } catch (error) {
      console.error('Failed to load achievements:', error);
      this.unlockedAchievements = new Set();
    }
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (container.contains(toast)) {
          container.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }

  handleKeyboard(e) {
    if (this.currentScreen === 'quiz-screen') {
      // Number keys for answer selection
      const num = parseInt(e.key);
      if (num >= 1 && num <= 4) {
        const answerOptions = document.querySelectorAll('.answer-option');
        if (answerOptions[num - 1]) {
          answerOptions[num - 1].click();
        }
      }
      
      // Space for hint
      if (e.code === 'Space') {
        e.preventDefault();
        this.useHint();
      }
    }

    // Escape key to go back
    if (e.key === 'Escape') {
      if (this.currentScreen === 'quiz-screen') {
        this.quitQuiz();
      } else if (this.currentScreen !== 'category-screen') {
        this.showScreen('category-screen');
      }
    }
  }
}

// Initialize the quiz app when the page loads
document.addEventListener('DOMContentLoaded', () => {
  try {
    window.quizApp = new QuizApp();
  } catch (error) {
    console.error('Failed to initialize QuizApp:', error);
  }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.hidden && window.quizApp && window.quizApp.timer) {
    clearInterval(window.quizApp.timer);
  }
});

// Prevent context menu on production
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

// Handle window resize
window.addEventListener('resize', () => {
  // Trigger any necessary layout recalculations
  requestAnimationFrame(() => {
    // Force repaint for glass morphism effects
    document.body.style.transform = 'translateZ(0)';
    setTimeout(() => {
      document.body.style.transform = '';
    }, 0);
  });
});

// Export for debugging purposes
if (typeof window !== 'undefined') {
  window.QuizApp = QuizApp;
}