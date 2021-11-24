export function weather() {
  const cityInput = document.querySelector('.city');
  const weatherIcon = document.querySelector('.weather-icon');
  const temperature = document.querySelector('.temperature');
  const wind = document.querySelector('.wind');
  const humidity = document.querySelector('.humidity');
  const weatherDescription = document.querySelector('.weather-description');
  const errorDiv = document.querySelector('.weather-error');
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

    getLocalStorage();
  }
  changeLanguage.addEventListener('click', languageFunction);

  const token = '77530262de4e49c046b39a1b7240ef74';
  let errorMsg;

  async function getWeather() {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&lang=${language}&appid=${token}&units=metric`;
      const res = await fetch(url);
      const data = await res.json();

      errorDiv.textContent = '';
      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      // temperature
      temperature.textContent = `${Math.round(data.main.temp)}°C`;
      // description
      weatherDescription.textContent = data.weather[0].description;

      if (language === 'ru') {
        // wind
        wind.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} м/с`;
        // humidity
        humidity.textContent = `Влажность: ${Math.round(data.main.humidity)}%`;
      } else if (language === 'en') {
        // wind
        wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
        // humidity
        humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
      }

      setLocalStorage();
    } catch (error) {
      weatherIcon.className = 'weather-icon owf';
      temperature.textContent = '';
      weatherDescription.textContent = '';
      wind.textContent = '';
      humidity.textContent = '';

      if (language === 'ru') {
        if (cityInput.value.length > 0) {
          errorMsg = `Ошибка! город не найден '${cityInput.value}'!`;
        } else {
          errorMsg = `Ошибка! Введите геолокацию!`;
        }
      } else if (language === 'en') {
        if (cityInput.value.length > 0) {
          errorMsg = `Error! city not found for '${cityInput.value}'!`;
        } else {
          errorMsg = `Error! Enter geolocation`;
        }
      }
      errorDiv.textContent = errorMsg;
    }
    if (language === 'ru') {
      //   placeholder City
      cityInput.placeholder = '[Введите город]';
    } else if (language === 'en') {
      //   placeholder City
      cityInput.placeholder = '[Enter city]';
    }
  }

  cityInput.addEventListener('change', getWeather);

  //   сохраняем в локал сторейдж, после ввода ПРАВИЛЬНОГО города
  function setLocalStorage() {
    localStorage.setItem('city', cityInput.value);
  }

  //   при загрузки проверяем локал сторейдж, если город есть, то отображаем погоду, запускаем getWeather(), если города нет, выводим Минск
  function getLocalStorage() {
    if (
      localStorage.getItem('city') &&
      localStorage.getItem('city').toLowerCase() === 'minsk' &&
      language === 'ru'
    ) {
      cityInput.value = 'Минск';
    } else if (
      localStorage.getItem('city') &&
      localStorage.getItem('city').toLowerCase() === 'минск' &&
      language === 'en'
    ) {
      cityInput.value = 'Minsk';
    } else if (localStorage.getItem('city')) {
      cityInput.value = localStorage.getItem('city');
    } else {
      cityInput.value = 'Minsk';
    }
    getWeather();
  }
  window.addEventListener('load', getLocalStorage);
}
