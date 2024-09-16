// https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple
const questionElement = document.querySelector("#question");
const answerBtns = document.querySelector(".answers");
const nextBtn = document.querySelector("#nextBtn");
let currentQuestionIndex = 0;
let score = 0;



async function fetchQuestion() {
  const responce = await fetch(
    `https://opentdb.com/api.php?amount=9&category=18&difficulty=easy&type=multiple`
  );
  const data = await responce.json();
  console.log(data);


  reSetState();


  let currentQuestion = data.results[currentQuestionIndex].question;
  questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion}`;
  
  let correctAnswer = data.results[currentQuestionIndex].correct_answer;
  let incorrectAnswer = data.results[currentQuestionIndex].incorrect_answers;
  const allAnswers = [correctAnswer, ...incorrectAnswer];

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.7);
  const shuffledAnswers = shuffleArray(allAnswers);

  shuffledAnswers.forEach(answer => {
    const button= document.createElement("button")
    button.innerHTML=answer
    button.classList.add="btn"
    button.addEventListener("click",()=>handleAnswerClick(answer)
    )
    answerBtns.appendChild(button)
  });
  hasAnswered = false;
  nextBtn.disabled = true; 
  console.log(shuffledAnswers);
}
function handleAnswerClick(selectAnswer){
  if(selectAnswer===correctAnswer){
    button.classList.add("correct")
  }
  else{
    selectAnswer.classList.add("wrong")
  }
}
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  fetchQuestion();
}

function reSetState(){
  while(answerBtns.firstChild){
    answerBtns.removeChild(answerBtns.firstChild);
  }
}

startQuiz();
