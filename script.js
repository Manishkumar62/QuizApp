const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const nextButton = document.getElementById('next-button');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');

const questions = [
  {
    question: 'What is the capital of France?',
    choices: ['Paris', 'Madrid', 'Rome', 'Berlin'],
    correctAnswer: 0,
  },
  {
    question: 'Which planet is known as the Red Planet?',
    choices: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
    correctAnswer: 0,
  },
  {
    question: 'Which famous scientist developed the theory of relativity?',
    choices: ['Isaac Newton', 'Albert Einstein', 'Galileo Galilei', 'Nikola Tesla'],
    correctAnswer: 1,
  },
  {
    question: 'What is the largest mammal?',
    choices: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
    correctAnswer: 1,
  },
  {
    question: 'What gas do plants absorb from the atmosphere?',
    choices: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
    correctAnswer: 1,
  },
  {
    question: 'Which instrument is used to measure earthquakes?',
    choices: ['Thermometer', 'Barometer', 'Seismometer', 'Altimeter'],
    correctAnswer: 2,
  },
  {
    question: 'Which element has the chemical symbol "Fe"?',
    choices: ['Iron', 'Fluorine', 'Helium', 'Iodine'],
    correctAnswer: 0,
  },
];


let currentQuestionIndex = 0;
let score = 0;
let showingResult = false; // Flag to prevent multiple clicks

function showQuestion(questionIndex) {
  resultElement.textContent = ''; // Clear previous result
  showingResult = false; // Reset the result flag

  const question = questions[questionIndex];
  questionElement.textContent = `${questionIndex + 1}. ${question.question}`;

  choicesElement.innerHTML = '';
  question.choices.forEach((choice, index) => {
    const choiceButton = document.createElement('button');
    choiceButton.textContent = choice;
    choiceButton.addEventListener('click', () => checkAnswer(index));
    choicesElement.appendChild(choiceButton);
  });

  scoreElement.textContent = `Score: ${score} / 5 (to win)`;
}



function checkAnswer(selectedIndex) {
  if (showingResult) {
    return; // Avoid multiple clicks during result display
  }

  const question = questions[currentQuestionIndex];
  if (selectedIndex === question.correctAnswer) {
    score++;
    resultElement.textContent = 'Correct!';
  } else {
    resultElement.textContent = 'Incorrect!';
  }

  showingResult = true; // Set the result flag
  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      showQuestion(currentQuestionIndex);
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  questionElement.style.display = 'none';
  choicesElement.style.display = 'none';
  nextButton.style.display = 'none';

  if (score >= questions.length / 2) {
    resultElement.innerHTML = '<p>Congratulations! You are a winner!</p><img src="winner.gif">';
  } else {
    resultElement.innerHTML = '<p>Sorry, you did not win this time.</p><img src="loser.gif">';
  }
}

nextButton.addEventListener('click', () => {
  if (!showingResult) {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion(currentQuestionIndex);
    } else {
      showResult();
    }
  }
});

showQuestion(currentQuestionIndex);
