export function burgermenu() {
  // Меню бургер
  const iconMenu = document.querySelector('.menu__icon');
  const menuBody = document.querySelector('.menu__body');
  const menyBodyActive = document.querySelector('.menu__body _active');

  let container = document.querySelector('.container');
  let welcomeInfo = document.querySelector('.welcome__information');

  //   toggleMenu function
  function toggleMenu(e) {
    //  запрещаем прокрутку для бади в режиме меню
    //  document.body.classList.toggle('_lock');

    //  включаем/выключаем класс _active иконки, чтобы она трансформировалась в клестик
    iconMenu.classList.toggle('_active');

    //  включаем/выключаем класс _active для появления меню
    menuBody.classList.toggle('_active');

    // скрыть тайтл, аттон на размере контейнера [1024;768)
    welcomeInfo.classList.remove('hidden');

    if (
      container.offsetWidth <= 1024 &&
      container.offsetWidth > 768 &&
      iconMenu.classList.contains('_active')
    ) {
      welcomeInfo.classList.add('hidden');
    }
  }

  iconMenu.addEventListener('click', e => {
    e.stopPropagation();

    // todo close burger on NOT burger click
    closeBurgerOnOtherClick();

    toggleMenu();
  });

  //  close burger on NOT burger click
  function closeBurgerOnOtherClick() {
    document.addEventListener('click', e => {
      disableMenu(e);
    });

    function disableMenu(e) {
      let target = e.target;
      let its_menu = target == menuBody || menuBody.contains(target);
      let its_hamburger = target == iconMenu;
      let menu_is_active = menuBody.classList.contains('_active');

      if (!its_menu && !its_hamburger && menu_is_active) {
        toggleMenu();
      }
    }
  }

  //   close burger if container >1024
  function closeBurger() {
    if (
      container.offsetWidth > 1024 &&
      iconMenu.classList.contains('_active')
    ) {
      menuBody.classList.remove('_active');
      iconMenu.classList.remove('_active');
      welcomeInfo.classList.remove('hidden');
    }
  }
  window.addEventListener('resize', closeBurger);

  document.addEventListener('keydown', function (e) {
    if (e.which === 27 && menuBody.classList.contains('_active')) {
      menuBody.classList.remove('_active');
      iconMenu.classList.remove('_active');
    }
  });

  // Прокрутка при клике на ссылки в нав (data-goto="")
  const menuLink = document.querySelectorAll('.list__item[data-goto]');

  if (menuLink.length > 0) {
    menuLink.forEach(link => {
      link.addEventListener('click', onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
      const menuLink = e.target;
      if (
        menuLink.dataset.goto &&
        document.querySelector(menuLink.dataset.goto)
      ) {
        const gotoBlock = document.querySelector(menuLink.dataset.goto);
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY;
        //   - document.querySelector('header').offsetHeight - 20;
        // 20 зазор в плюсе + высота зедера, если она фиксированая

        if (iconMenu.classList.contains('_active')) {
          document.body.classList.remove('_lock');
          iconMenu.classList.remove('_active');
          menuBody.classList.remove('_active');
          welcomeInfo.classList.remove('hidden');
        }

        window.scrollTo({
          top: gotoBlockValue,
          behavior: 'smooth',
        });
        e.preventDefault();
      }
    }
  }
}
