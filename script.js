// https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple

async function fetchQuestion() {
   const datafetch(`https://opentdb.com/api.php?amount=9&category=18&difficulty=easy&type=multiple`)
    .then(raw=> raw.json())
    .then(result=> console.log(result))
}
fetchQuestion()