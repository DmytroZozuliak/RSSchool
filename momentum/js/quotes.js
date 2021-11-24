export function quotes() {
  const changeQuote = document.querySelector('.change-quote');
  const quoteDiv = document.querySelector('.quote');
  const authorDiv = document.querySelector('.author');
  let randomNumQuote;
  let quotes;
  let changeLanguage = document.querySelector('.change-language');
  let language;

  if (localStorage.getItem('language')) {
    language = localStorage.getItem('language').toString();
  } else {
    language = 'en';
  }

  function languageFunction() {
    if (language === 'en') {
      language = 'ru';
    } else if (language === 'ru') {
      language = 'en';
    }
    getQuotes();
  }
  changeLanguage.addEventListener('click', languageFunction);

  async function getQuotes() {
    if (language === 'en') {
      quotes = './js/dataEn.json';
    } else {
      quotes = './js/dataRu.json';
    }

    const res = await fetch(quotes);
    const data = await res.json();
    let quotesArr = data.quotes;
    randomNumQuote = getRandomNum(0, quotesArr.length - 1);
    quoteDiv.textContent = `"${data.quotes[randomNumQuote].quote}"`;
    authorDiv.textContent = `${data.quotes[randomNumQuote].author}`;
  }

  //   random quote
  function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getQuotes();
  changeQuote.addEventListener('click', getQuotes);
}
