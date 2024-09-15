// https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple

async function fetchQuestion() {
  const responce = await fetch(
    `https://opentdb.com/api.php?amount=9&category=18&difficulty=easy&type=multiple`
  );
  const data = await responce.json();
  console.log(data);
}
fetchQuestion();
