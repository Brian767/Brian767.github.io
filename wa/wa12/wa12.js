const newBtn = document
  .querySelector("#js-new-quote")
  .addEventListener("click", getQuote);

const answerBtn = document
  .querySelector("#js-tweet")
  .addEventListener("click", displayAnswer);

const endpoint = "https://meowfacts.herokuapp.com/";

let current = {
  question: "",
  //   answer: "",
};

async function getQuote() {
  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();
    console.log(json);
    current.question = json.data;
    // current.answer = json.answer;
    displayQuote(current.question);
  } catch (err) {
    console.log(err);
    alert("Fail");
  }
}

function displayQuote(quote) {
  const quoteText = document.querySelector("#js-quote-text");
  //   const answerText = document.querySelector("#js-answer-text");

  quoteText.textContent = quote;
  //   answerText.textContent = "";
}

function displayAnswer() {
  const currentFact = current.question[0];
  const tweetText = ` Did you know? ${currentFact}  🐈‍⬛ #CatFacts`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    tweetText
  )}`;
  window.open(twitterUrl, "_blank");
}

getQuote();
