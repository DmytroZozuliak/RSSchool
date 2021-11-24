export function todoMenu() {
  // todo language

  // todo  menu
  const popup = document.querySelector('.todo-menu__wrapper');

  function toogleMenu(event) {
    if (event.target.closest('.todo__btn')) {
      if (popup.classList.contains('active')) {
        popup.classList.remove('active');
      } else {
        popup.classList.add('active');
      }
    }

    if (!event.target.closest('.todo')) {
      if (!event.target.classList.contains('icon')) {
        popup.classList.remove('active');
      }
    }
  }
  document.addEventListener('click', toogleMenu);
}
