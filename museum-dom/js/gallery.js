export function galleryCreate() {
  const pictureInnerContainer = document.querySelector(
    '.gallery__picture-inner-container'
  );

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  let src = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  let shuffleSrc = shuffle(src);

  for (const el of shuffleSrc) {
    const img = document.createElement('img');
    img.classList.add('gallery-img');
    //  img.classList.add('_anim-no-hide');
    img.src = `assets/img/galery/galery${el}.webp`;
    img.alt = `galery${el}`;
    img.loading = 'lazy';
    pictureInnerContainer.append(img);
  }

  function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function () {
      let context = this,
        args = arguments;
      let later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  let sliderImages = document.querySelectorAll('.gallery-img');

  if (sliderImages.length > 0) {
    animOnScroll();

    window.addEventListener('scroll', debounce(animOnScroll));
    function animOnScroll() {
      sliderImages.forEach(animItem => {
        //   высота объекта
        const animItemHeight = animItem.offsetHeight;
        //  позиция объекта отностительно верха
        const animItemOffset = offset(animItem).top;
        const animStart = 4;

        let animItemPoint = window.innerHeight - animItemHeight / animStart;

        if (animItemHeight > window.innerHeight) {
          animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }

        if (pageYOffset > animItemOffset - animItemPoint) {
          animItem.classList.add('active');
        } else {
          //   удаляем анимацию, после прокрутки (анимация только 1 раз) + добавить класс _anim-no-hide тем єлементам(разкомментировать)
          //  if (!animItem.classList.contains('_anim-no-hide')) {
          animItem.classList.remove('active');
          //  }
        }
      });
    }

    function offset(el) {
      const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    }
  }
}
