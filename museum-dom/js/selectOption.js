export function changeTheme() {
  const changeBtn = document.querySelector('.dark-theme');

  const whites = document.querySelectorAll('.white');
  const blacks = document.querySelectorAll('.black');
  const whiteBgs = document.querySelectorAll('.white-bg');
  const redBgs = document.querySelectorAll('.red-bg');
  const greyBgs = document.querySelectorAll('.grey-bg');

  const sections = document.querySelectorAll('.section');

  function changeBackGround() {
    for (const section of sections) {
      if (section.classList.contains('white')) {
        section.classList.toggle('white-section');
      }
      section.classList.toggle('section-line');
    }
    for (const text of whites) {
      text.classList.toggle('white-text');
    }
    for (const text of blacks) {
      text.classList.toggle('black-text');
    }
    for (const bgw of whiteBgs) {
      bgw.classList.toggle('white-text');
      bgw.classList.toggle('white-background');
    }
    for (const bgr of redBgs) {
      bgr.classList.toggle('red-background');
    }
    for (const bgg of greyBgs) {
      bgg.classList.toggle('grey-background');
    }

    this.classList.toggle('toggle-theme');
  }

  changeBtn.addEventListener('click', changeBackGround);
}
