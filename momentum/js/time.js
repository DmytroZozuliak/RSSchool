export function timeFunc() {
  const body = document.querySelector('body');
  const timeDiv = document.querySelector('.time');
  const dateDiv = document.querySelector('.date');
  const greetingDiv = document.querySelector('.greeting');
  const namegDiv = document.querySelector('.name');
  const nextSliderBtn = document.querySelector('.slide-next');
  const prevSliderBtn = document.querySelector('.slide-prev');
  let changeLanguage = document.querySelector('.change-language');
  let language;

  function languageFunction() {
    if (language === 'en') {
      language = 'ru';
    } else if (language === 'ru') {
      language = 'en';
    }
  }
  changeLanguage.addEventListener('click', languageFunction);

  if (localStorage.getItem('language')) {
    language = localStorage.getItem('language').toString();
  } else {
    language = 'en';
  }

  //   time

  function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    timeDiv.textContent = currentTime;
    showDate();
    showGreeting();
    setTimeout(showTime, 1000);
  }
  showTime();

  //   date
  function showDate() {
    const date = new Date();
    let currentDate;
    //  todo
    if (language === 'ru') {
      const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        // hour: 'numeric',
        // minute: 'numeric',
        // timeZone: 'UTC',
      };
      currentDate = date.toLocaleDateString('ru-RU', options);
    } else if (language === 'en') {
      const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      };
      currentDate = date.toLocaleDateString('en-US', options);
    }

    dateDiv.textContent = currentDate;
  }

  //   greetings
  function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    let dateArr = ['night', 'morning', 'afternoon', 'evening'];
    let timeOfDay = dateArr[Math.floor(hours / 6)];

    return timeOfDay;
  }

  function showGreeting() {
    const timeOfDay = getTimeOfDay();
    let greetingText;
    const greeting = {
      en: ['Good night,', 'Good morning,', 'Good afternoon,', 'Good evening,'],
      ru: ['Спокойной ночи,', 'Доброе утро,', 'Добрый день,', 'Добрый вечер,'],
      ua: ['Дабраніч,', 'Добрий ранок,', 'Добрий день,', 'Добрий вечір,'],
    };
    if (timeOfDay === 'night') {
      greetingText = greeting[language][0];
    } else if (timeOfDay === 'morning') {
      greetingText = greeting[language][1];
    } else if (timeOfDay === 'afternoon') {
      greetingText = greeting[language][2];
    } else if (timeOfDay === 'evening') {
      greetingText = greeting[language][3];
    }

    if (language === 'ru') {
      namegDiv.placeholder = '[Введите имя]';
    } else if (language === 'en') {
      namegDiv.placeholder = '[Enter name]';
    }

    greetingDiv.textContent = greetingText;
  }

  //   local Storage
  function setLocalStorage() {
    localStorage.setItem('name', namegDiv.value);
  }
  window.addEventListener('beforeunload', setLocalStorage);

  function getLocalStorage() {
    if (localStorage.getItem('name')) {
      namegDiv.value = localStorage.getItem('name');
    }
  }
  window.addEventListener('load', getLocalStorage);

  //  todo github photos
  //   slider
  let randomSlideNum = getRandomNum(1, 20);

  function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }

  function setBg() {
    // timeOfDay - текущее время суток;
    let timeOfDay;
    timeOfDay = getTimeOfDay();

    // bgNum - порядковый номер фонового изображения.
    let bgNum = randomSlideNum;
    bgNum = bgNum.toString();
    if (bgNum.length === 1) {
      bgNum = bgNum.padStart(2, '0'); // "01"
    }

    const img = new Image();
    img.src = `https://raw.githubusercontent.com/DmytroZozuliak/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.webp`;
    img.onload = () => {
      body.style.backgroundImage = `url(${img.src})`;
    };
  }
  //   setBg();

  // todo  Unsplash API
  const tegKey = document.querySelector('.teg__key');
  const githubImgInput = document.querySelector('#githubImg');
  const unsplashInput = document.querySelector('#unsplash');
  const flickrInput = document.querySelector('#flickr');

  async function UnsplashgetLinkToImage() {
    let token = '19m5dDrHeFfaCo6oGDTI4vO1nAuJPkWTbDTDSbrcLNM';
    let searchKey;
    if (localStorage.getItem('changeTegApi')) {
      tegKey.value = localStorage.getItem('changeTegApi');
      searchKey = localStorage.getItem('changeTegApi');
    } else if (tegKey.value) {
      searchKey = tegKey.value;
    } else {
      searchKey = getTimeOfDay();
    }
    try {
      const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${searchKey}&client_id=${token}`;
      const res = await fetch(url);
      const data = await res.json();

      const img = new Image();
      img.src = data.urls.regular;
      img.onload = () => {
        body.style.backgroundImage = `url(${img.src})`;
      };
    } catch (error) {
      console.log('unable load image-API Unsplash ', error);
    }
  }
  // todo  flickr API
  let arr100;
  async function flickrgetLinkToImage() {
    let token = '13520bd7ba9046e27291ff69c6e42c4d'; //my token
    //  let token = '0f15ff623f1198a1f7f52550f8c36057'; //srcschool
    let searchKey;
    let url;

    try {
      if (localStorage.getItem('changeTegApi')) {
        tegKey.value = localStorage.getItem('changeTegApi');
        searchKey = `&tags=${tegKey.value}`;
        url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${token}${searchKey}&extras=url_l&format=json&nojsoncallback=1`;
      } else if (tegKey.value) {
        searchKey = `&tags=${tegKey.value}`;
        url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${token}${searchKey}&extras=url_l&format=json&nojsoncallback=1`;
      } else {
        if (getTimeOfDay() === 'night') {
          searchKey = `&gallery_id=72157720062587146`;
        } else if (getTimeOfDay() === 'morning') {
          searchKey = `&gallery_id=72157720069530982`;
        } else if (getTimeOfDay() === 'afternoon') {
          searchKey = `&gallery_id=72157720111881805`;
        } else if (getTimeOfDay() === 'evening') {
          searchKey = `&gallery_id=72157720111880160`;
        }

        url = `https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=${token}${searchKey}&extras=url_h&format=json&nojsoncallback=1`;
      }

      const res = await fetch(url);
      const data = await res.json();
      const img = new Image();
      arr100 = data.photos.photo;
      let randNum = getRandomNum(0, arr100.length - 1);
      if (tegKey.value) {
        img.src = arr100[randNum].url_l;
      } else {
        arr100 = arr100.filter(el => el.url_h);
        randNum = getRandomNum(0, arr100.length - 1);
        img.src = arr100[randNum].url_h;
      }
      img.onload = () => {
        body.style.backgroundImage = `url(${img.src})`;
      };
    } catch (error) {
      console.log('unable load image-API flickr', error);
    }
  }
  // todo  change teg-key of Unsplash and flickr API
  function changeTegApi() {
    localStorage.setItem('changeTegApi', tegKey.value);

    if (unsplashInput.checked) {
      UnsplashgetLinkToImage();
    } else if (flickrInput.checked) {
      flickrgetLinkToImage();
    } else if (githubImgInput.checked) {
      setBg();
    }

    //  localStorage.setItem('changeTegApi', tegKey.value);
  }

  tegKey.addEventListener('change', changeTegApi);

  //   кнопки перелистования слайдов
  function getSlideNext() {
    if (unsplashInput.checked) {
      UnsplashgetLinkToImage();
      return;
    } else if (flickrInput.checked) {
      if (arr100.length) {
        const img = new Image();
        let randNum = getRandomNum(0, arr100.length - 1);
        if (tegKey.value) {
          img.src = arr100[randNum].url_l;
        } else {
          img.src = arr100[randNum].url_h;
        }
        img.onload = () => {
          body.style.backgroundImage = `url(${img.src})`;
        };
      } else {
        flickrgetLinkToImage();
      }
      return;
    } else if (githubImgInput.checked) {
      randomSlideNum = randomSlideNum + 1;
      if (randomSlideNum === 21) {
        randomSlideNum = 1;
      }
      setBg();
      return;
    }
  }
  function getSlidePrev() {
    if (unsplashInput.checked) {
      UnsplashgetLinkToImage();
      return;
    } else if (flickrInput.checked) {
      if (arr100.length) {
        const img = new Image();
        let randNum = getRandomNum(0, arr100.length - 1);
        if (tegKey.value) {
          img.src = arr100[randNum].url_l;
        } else {
          img.src = arr100[randNum].url_h;
        }
        img.onload = () => {
          body.style.backgroundImage = `url(${img.src})`;
        };
      } else {
        flickrgetLinkToImage();
      }
      return;
    } else if (githubImgInput.checked) {
      randomSlideNum = randomSlideNum - 1;
      if (randomSlideNum === 0) {
        randomSlideNum = 20;
      }
      setBg();
      return;
    }
  }

  prevSliderBtn.addEventListener('click', getSlidePrev);
  nextSliderBtn.addEventListener('click', getSlideNext);

  //   todo works
  const inputRadios = document.querySelectorAll('.input-radio');

  function toogleApiImg() {
    inputRadios.forEach(el => {
      if (el.checked && el.value === 'github') {
        localStorage.setItem('idAPI', el.id);

        setBg();
      } else if (el.checked && el.value === 'unsplash') {
        localStorage.setItem('idAPI', el.id);

        UnsplashgetLinkToImage();
      } else if (el.checked && el.value === 'flickr') {
        localStorage.setItem('idAPI', el.id);

        flickrgetLinkToImage();
      }
    });
  }

  inputRadios.forEach(el => {
    el.addEventListener('change', toogleApiImg);
  });

  // todo get from Local

  window.addEventListener('load', function () {
    let apiValue;
    if (localStorage.getItem('idAPI')) {
      apiValue = localStorage.getItem('idAPI');
      if (apiValue === 'githubImg') {
        githubImgInput.checked = 'true';
        setBg();
      } else if (apiValue === 'unsplash') {
        unsplashInput.checked = 'true';
        UnsplashgetLinkToImage();
      } else if (apiValue === 'flickr') {
        flickrInput.checked = 'true';
        flickrgetLinkToImage();
      }
    } else {
      // загружаем сразу нужный АПИ если в локале нет данных
      toogleApiImg();
    }
  });

  // todo  menu
  const menuArrows = document.querySelectorAll('.icon-down');
  const menuBtn = document.querySelector('.main-menu__btn');
  const popup = document.querySelector('.main-menu__wrapper');
  const menu = document.querySelectorAll('.main-menu');

  function toogleMenu(event) {
    if (event.target.closest('.main-menu__btn')) {
      if (popup.classList.contains('active')) {
        popup.classList.remove('active');
        menuArrows.forEach(el => {
          el.classList.remove('active');
        });
      } else {
        popup.classList.add('active');
        menuArrows.forEach(el => {
          el.classList.add('active');
        });
      }
    }

    if (!event.target.closest('.main-menu')) {
      popup.classList.remove('active');
      menuArrows.forEach(el => {
        el.classList.remove('active');
      });
    }
  }
  document.addEventListener('click', toogleMenu);

  //   change language menu
  let enLanguageSpan = document.querySelector('.en');
  let ruLanguageSpan = document.querySelector('.ru');
  let menuTitleDiv = document.querySelector('.main-menu__title');
  let popupЕitle = document.querySelector('.popup__title');
  let titleLanguage = document.querySelector('.title-language');
  let titleImg = document.querySelector('.title-img');
  let tegTitle = document.querySelector('.teg__title');
  let weatherCheckboxLabel = document.querySelector('#weatherCheckboxLabel');
  let musicCheckboxLabel = document.querySelector('#musicCheckboxLabel');
  let clockCheckboxLabel = document.querySelector('#clockCheckboxLabel');
  let dateCheckboxLabel = document.querySelector('#dateCheckboxLabel');
  let greetingCheckboxLabel = document.querySelector('#greetingCheckboxLabel');
  let quotesCheckboxLabel = document.querySelector('#quotesCheckboxLabel');
  let todoCheckboxLabel = document.querySelector('#todoCheckboxLabel');
  let subTextToTegInput = document.querySelector(
    '.popup__content-menu-name-span'
  );
  let todoBtn = document.querySelector('.todo__btn .main-menu__title');
  let todoHeader = document.querySelector('.popup-todo-header');
  let todoInput = document.querySelector('.inputField input'); //(placeholder)
  let todoPending = document.querySelector('.pendingText');
  let todoClearBtn = document.querySelector('.popup-todo-footer button');

  function changeLanguageDocument() {
    if (language === 'en') {
      ruLanguageSpan.classList.remove('_active');
      enLanguageSpan.classList.add('_active');
    } else if (language === 'ru') {
      enLanguageSpan.classList.remove('_active');
      ruLanguageSpan.classList.add('_active');
    }
    translateMenu();

    localStorage.setItem('language', language);
  }

  function setLanguageLocalStorage() {
    localStorage.setItem('language', language);
  }
  window.addEventListener('beforeunload', setLanguageLocalStorage);

  function translateMenu() {
    const menuTranslationObj = {
      en: [
        'settings',
        'menu',
        'Change language',
        'Wallpapers from:',
        'Search-teg:',
        'En',
        'Ru',
        'Weather',
        'Audioplayer',
        'Time',
        'Date',
        'Greeting',
        'Quotes',
        'Todo',
        '(available only for Unsplash and Flickr)',
        'todo',
        'Todo list',
        'Add your new todo',
        'pending tasks:',
        'Clear All',
      ],
      ru: [
        'настройки',
        'меню',
        'Изменить язык',
        'Обои из:',
        'Тег-поиска:',
        'Англ',
        'Рус',
        'Погода',
        'Аудиоплеер',
        'Время',
        'Дата',
        'Приветствие',
        'Цитаты',
        'Список задач',
        '(доступно только для Unsplash и Flickr)',
        'задачи',
        'Список задач',
        'Добавить новую задачу',
        'незавершенные задачи:',
        'Очистить все',
      ],
    };
    menuTitleDiv.textContent = menuTranslationObj[language][0];
    popupЕitle.textContent = menuTranslationObj[language][1];
    titleLanguage.textContent = menuTranslationObj[language][2];
    titleImg.textContent = menuTranslationObj[language][3];
    tegTitle.textContent = menuTranslationObj[language][4];
    enLanguageSpan.textContent = menuTranslationObj[language][5];
    ruLanguageSpan.textContent = menuTranslationObj[language][6];
    weatherCheckboxLabel.textContent = menuTranslationObj[language][7];
    musicCheckboxLabel.textContent = menuTranslationObj[language][8];
    clockCheckboxLabel.textContent = menuTranslationObj[language][9];
    dateCheckboxLabel.textContent = menuTranslationObj[language][10];
    greetingCheckboxLabel.textContent = menuTranslationObj[language][11];
    quotesCheckboxLabel.textContent = menuTranslationObj[language][12];
    todoCheckboxLabel.textContent = menuTranslationObj[language][13];
    subTextToTegInput.textContent = menuTranslationObj[language][14];
    todoBtn.textContent = menuTranslationObj[language][15];
    todoHeader.textContent = menuTranslationObj[language][16];
    todoInput.placeholder = menuTranslationObj[language][17];
    todoPending.textContent = menuTranslationObj[language][18];
    todoClearBtn.textContent = menuTranslationObj[language][19];
  }

  changeLanguageDocument();
  changeLanguage.addEventListener('click', changeLanguageDocument);
}
