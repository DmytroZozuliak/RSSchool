export function displayElementsMenu() {
  const weatherInput = document.querySelector('#weatherCheckbox');
  const musicInput = document.querySelector('#musicCheckbox');
  const clockInput = document.querySelector('#clockCheckbox');
  const dateInput = document.querySelector('#dateCheckbox');
  const greetingInput = document.querySelector('#greetingCheckbox');
  const quotesInput = document.querySelector('#quotesCheckbox');
  const todoInput = document.querySelector('#todoCheckbox');

  //   all inputs
  let inputsCheck = document.querySelectorAll('.popup__checkboks input');
  // выбираем родительские классы, которые будем скрывать/отображать
  const weatherDiv = document.querySelector('.weather');
  const playerDiv = document.querySelector('.player');
  const timeDiv = document.querySelector('.time');
  const dateDiv = document.querySelector('.date');
  const greetingDiv = document.querySelector('.greeting-container');
  const quoteDiv = document.querySelector('.quote-wrapper');
  const todoDiv = document.querySelector('.todo');

  let divs = [
    weatherDiv,
    playerDiv,
    timeDiv,
    dateDiv,
    greetingDiv,
    quoteDiv,
    todoDiv,
  ];

  inputsCheck.forEach((el, index) => {
    el.addEventListener('change', function () {
      showHideElement(divs[index], el);
    });
  });

  function showHideElement(div, checkbox) {
    if (checkbox.checked) {
      div.classList.remove('_hide');
    } else {
      div.classList.add('_hide');
    }

    localStorage.setItem(checkbox.id, checkbox.checked);
  }

  window.addEventListener('load', function () {
    let inputsCheck = document.querySelectorAll('.popup__checkboks input');

    inputsCheck.forEach((el, index) => {
      if (localStorage.getItem(el.id)) {
        //   console.log(el, 'есть такой');
        let checked = JSON.parse(localStorage.getItem(el.id));
        document.getElementById(el.id).checked = checked;
        showHideElement(divs[index], el);
      } else {
        document.getElementById(el.id).checked = 'checked';
      }
    });
  });
}
