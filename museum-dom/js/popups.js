export function popupTickets() {
  let btnPop = document.querySelector('.tickets__buy');
  let popUp = document.querySelector('#popup-tickets');
  let closepopUp = document.querySelector('.close-popup');

  btnPop.addEventListener('click', function () {
    popupOpen(popUp);
  });

  closepopUp.addEventListener('click', function () {
    popupClose(popUp);
  });

  function popupOpen(elem) {
    elem.classList.add('open');
    elem.addEventListener('click', function (e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }

  function popupClose(elem) {
    elem.classList.remove('open');
  }

  document.addEventListener('keydown', function (e) {
    if (e.which === 27 && popUp.classList.contains('open')) {
      let popupActive = document.querySelector('.popup.open');
      popupClose(popupActive);
    }
  });

  //  input Date change
  let date = document.querySelector('#date');
  date.addEventListener('change', () => {
    date.classList.add('date');
  });

  //   отмена отправки формы
  const buttonForm = document.querySelector('.form__right-side-btn');
  buttonForm.addEventListener('click', event => {
    event.preventDefault();
  });

  //   ripple
  const buttons = document.querySelectorAll('.ripple');

  buttons.forEach(button => {
    button.addEventListener('click', function (e) {
      const x = e.clientX;
      const y = e.clientY;
      const buttonRipple = e.target.getBoundingClientRect();

      const buttonTop = buttonRipple.top;
      const buttonLeft = buttonRipple.left;

      const xInside = x - buttonLeft;
      const yInside = y - buttonTop;

      const circle = document.createElement('span');
      circle.classList.add('circle');
      circle.style.top = yInside + 'px';
      circle.style.left = xInside + 'px';

      this.appendChild(circle);

      setTimeout(() => circle.remove(), 500);
    });
  });
}
