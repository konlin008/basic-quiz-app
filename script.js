const questionElement = document.querySelector("#question");
const answerBtns = document.querySelector(".answers");
const nextBtn = document.querySelector("#nextBtn");
const qndiv = document.querySelector(".qn");
let currentQuestionIndex = 0;
let score = 0;
let correctAnswer;
let questions = [];
let isFetching = false;

async function fetchQuestions(retryCount = 0) {
  const maxRetries = 5;
  const delay = Math.pow(2, retryCount) * 1000;

  try {
    isFetching = true;
    const apiUrl =
      "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";
    const response = await fetch(apiUrl);

    if (response.status === 429) {
      if (retryCount < maxRetries) {
        console.warn(
          `Rate limit exceeded. Retrying in ${delay / 1000} seconds...`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        return fetchQuestions(retryCount + 1);
      } else {
        throw new Error("Rate limit exceeded. Please try again later.");
      }
    }

    const data = await response.json();

    if (data.results.length === 0) {
      throw new Error("No questions found");
    }

    questions = data.results;
    if (questions.length > 0) {
      displayQuestion();
    } else {
      throw new Error("No questions available");
    }
  } catch (error) {
    console.error(error);
    questionElement.innerHTML =
      "An error occurred while fetching questions. Please try again later.";
    nextBtn.style.display = "none";
  } finally {
    isFetching = false;
  }
}

function displayQuestion() {
  reSetState();
  qndiv.style.display = "block";
  const currentQuestion = questions[currentQuestionIndex].question;
  questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion}`;

  correctAnswer = questions[currentQuestionIndex].correct_answer;
  const incorrectAnswers = questions[currentQuestionIndex].incorrect_answers;
  const allAnswers = [correctAnswer, ...incorrectAnswers];

  const shuffledAnswers = shuffleArray(allAnswers);

  shuffledAnswers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer;
    button.classList.add("btn");
    button.addEventListener("click", () => handleAnswerClick(button, answer));
    answerBtns.appendChild(button);
  });

  nextBtn.style.display = "none";
}

function handleAnswerClick(button, selectedAnswer) {
  const buttons = answerBtns.querySelectorAll("button");
  buttons.forEach((btn) => (btn.disabled = true));

  if (selectedAnswer === correctAnswer) {
    button.style.backgroundColor = "rgba(110, 233, 110, 0.76)";
    score++;
  } else {
    button.style.backgroundColor = "rgba(233, 44, 11, 0.774)";
    buttons.forEach((btn) => {
      if (btn.innerHTML === correctAnswer) {
        btn.style.backgroundColor = "rgba(110, 233, 110, 0.76)";
      }
    });
  }

  nextBtn.style.display = "block";
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function reSetState() {
  while (answerBtns.firstChild) {
    answerBtns.removeChild(answerBtns.firstChild);
  }
}

function handleNextBtn() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  reSetState();
  questionElement.innerHTML = `You Scored ${score} Out of ${questions.length}`;
  nextBtn.innerHTML = "Play Again";
  nextBtn.style.display = "block";
}

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  fetchQuestions();
}

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length && !isFetching) {
    handleNextBtn();
  } else if (currentQuestionIndex >= questions.length) {
    startQuiz();
  }
});

startQuiz();
