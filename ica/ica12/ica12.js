const newBtn = document
  .querySelector("#js-new-quote")
  .addEventListener("click", getQuote);

const answerBtn = document
  .querySelector("#js-tweet")
  .addEventListener("click", displayAnswer);

const endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";

let current = {
  question: "",
  answer: "",
};

async function getQuote() {
  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();
    current.question = json.question;
    current.answer = json.answer;
    displayQuote(current.question);
  } catch (err) {
    console.log(err);
    alert("Fail");
  }
}

function displayQuote(quote) {
  const quoteText = document.querySelector("#js-quote-text");
  const answerText = document.querySelector("#js-answer-text");

  quoteText.textContent = quote;
  answerText.textContent = "";
}

function displayAnswer() {
  const answerText = document.querySelector("#js-answer-text");
  answerText.textContent = current.answer;
}

getQuote();
