// Slider in Section Welcome
export function welcomSlider() {
  const images = document.querySelectorAll('.slider__img');
  const sliderLine = document.querySelector('.wrapper-slides .slider-line');
  const prev = document.querySelector('#prev');
  const next = document.querySelector('#next');

  const currentSliders = document.querySelector('.slider__current-number');
  const totalSliders = document.querySelector('.slider__total-number');
  const pointsNodes = document.querySelectorAll('.slider__point-point');
  let pointsArray = Array.from(pointsNodes);

  let count = 0;
  let width;

  let imagesLength = images.length,
    firstSlide = images[0],
    lastSlide = images[imagesLength - 1],
    cloneFirst = firstSlide.cloneNode(true),
    cloneLast = lastSlide.cloneNode(true),
    isEnabled = true;

  // clone first and last slide
  sliderLine.appendChild(cloneFirst);
  sliderLine.insertBefore(cloneLast, firstSlide);

  function init() {
    width = document.querySelector('.wrapper-slides').offsetWidth;
    sliderLine.style.width = width * (images.length + 2) + 'px';
    images.forEach(item => {
      item.style.width = width + 'px';
    });
    cloneFirst.style.width = width + 'px';
    cloneLast.style.width = width + 'px';

    sliderLine.style.left = -width + 'px';

    rollSlider();
  }

  init();
  window.addEventListener('resize', init);

  //   click event next
  next.addEventListener('click', nextItem);

  function nextItem() {
    if (isEnabled) {
      sliderLine.classList.add('shifting');

      count++;
      if (count === imagesLength) {
        isEnabled = false;
        sliderLine.style.transform = 'translate(-' + count * width + 'px)';
        sliderLine.addEventListener('transitionend', checkIndex);
        sliderLine.addEventListener('transitionend', becomeEnable);
        return;
      }

      rollSlider();
    }
  }

  //   click event prev
  prev.addEventListener('click', previousItem);

  function previousItem() {
    if (isEnabled) {
      sliderLine.classList.add('shifting');

      count--;
      if (count === -1) {
        isEnabled = false;
        sliderLine.style.transform = 'translate(' + width + 'px)';
        sliderLine.addEventListener('transitionend', checkIndex);
        sliderLine.addEventListener('transitionend', becomeEnable);
        return;
      }

      rollSlider();
    }
  }

  // перемотка в зависимости от count
  function rollSlider() {
    isEnabled = false;
    sliderLine.style.transform = 'translate(-' + count * width + 'px)';
    sliderLine.addEventListener('transitionend', becomeEnable);
    isEnabled = true;
  }

  sliderLine.addEventListener('transitionend', checkIndex);

  function becomeEnable() {
    isEnabled = true;
  }

  function checkIndex() {
    sliderLine.classList.remove('shifting');

    if (count == -1) {
      count = images.length - 1;
    }

    if (count == imagesLength) {
      count = 0;
    }
    sliderLine.style.transform = 'translate(-' + count * width + 'px)';

    // Изменение к-ва слайдеров в нумерациях и поинтер
    changeNumbersDots();
  }

  for (let i = 0; i < pointsArray.length; i++) {
    let point = pointsArray[i];
    point.addEventListener('click', function () {
      shiftSlidePoint(i);
    });
  }

  //  points change
  function shiftSlidePoint(iPoints) {
    for (const point of pointsArray) {
      point.classList.remove('active-point');
    }

    pointsArray[iPoints].classList.add('active-point');
    count = iPoints;

    sliderLine.style.transform = 'translate(-' + count * width + 'px)';
    changeNumbersDots();
  }

  function changeNumbersDots() {
    //   Изменение текущего к-ва слайдеров в нумерации
    if (count >= 0 && count < 9) {
      currentSliders.textContent = `0${count + 1}`;
    } else {
      currentSliders.textContent = count + 1;
    }
    // Изменение общего к-ва слайдеров в нумерации
    if (images.length > 0 && images.length < 10) {
      totalSliders.textContent = '0' + images.length;
    } else {
      totalSliders.textContent = images.length;
    }
    // Цвет указателей меняется в зависимости какой слайдер
    for (let i = 0; i < pointsArray.length; i++) {
      if (count === i) {
        pointsArray[i].classList.add('active-point');
      } else {
        pointsArray[i].classList.remove('active-point');
      }
    }
  }
  changeNumbersDots();

  //   mouse, touch events drag
  const touchArea = document.querySelector('.wrapper-slides');
  function swipeDetect(el) {
    let surface = el;
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;

    let startTime = 0;
    let elapsedTime = 0;

    let threshold = 100;
    let restrain = 100;
    let allowedTime = 300;

    surface.addEventListener('mousedown', function (e) {
      startX = e.pageX;
      startY = e.pageY;
      startTime = new Date().getTime();
      e.preventDefault();
      touchArea.classList.add('grabbing');
    });

    surface.addEventListener('mouseup', function (e) {
      distX = e.pageX - startX;
      distY = e.pageY - startY;
      elapsedTime = new Date().getTime() - startTime;

      if (elapsedTime <= allowedTime) {
        if (Math.abs(distX) > threshold && Math.abs(distY) <= restrain) {
          if (distX > 0) {
            if (isEnabled) {
              // swipe prev function
              previousItem();
            }
          } else {
            if (isEnabled) {
              // swipe next function
              nextItem();
            }
          }
        }
      }

      touchArea.classList.remove('grabbing');

      e.preventDefault();
    });

    //  touch events

    surface.addEventListener('touchstart', function (e) {
      let touchObj = e.changedTouches[0];
      startX = touchObj.pageX;
      startY = touchObj.pageY;
      startTime = new Date().getTime();

      // e.preventDefault();
    });

    //  surface.addEventListener('touchmove', function (e) {
    // e.preventDefault();
    //  });

    surface.addEventListener('touchend', function (e) {
      let touchObj = e.changedTouches[0];
      distX = touchObj.pageX - startX;
      distY = touchObj.pageY - startY;
      elapsedTime = new Date().getTime() - startTime;

      if (elapsedTime <= allowedTime) {
        if (Math.abs(distX) > threshold && Math.abs(distY) <= restrain) {
          if (distX > 0) {
            if (isEnabled) {
              // swipe prev function
              previousItem();
            }
          } else {
            if (isEnabled) {
              // swipe next function
              nextItem();
            }
          }
        }
      }

      // e.preventDefault();
    });
  }
  swipeDetect(touchArea);
}
