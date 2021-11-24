export function videoFrameAndSlider() {
  // todo main Video
  const videoSection = document.querySelector('#video');
  const player = document.querySelector('.video__bottom-section');
  const mainVideo = player.querySelector('video');
  const mainPlayBtn = player.querySelector('.circle-play');
  const playBtn = player.querySelector('.play');
  const progressBar = player.querySelector('.progress-bar');
  const progressVolume = player.querySelector('.progress-volume');
  const volumeBtn = player.querySelector('.volume');
  const fullScrnBtn = player.querySelector('.full-scrn');
  const videoPopup = document.querySelector('.video-popup');
  const videoContent = document.querySelector('.video__bottom-section');
  let textSpeed = document.querySelector('.video__bottom-section-speed');

  function togglePlay() {
    if (mainVideo.paused) {
      mainVideo.play();
      mainPlayBtn.classList.add('hidden');
    } else {
      mainVideo.pause();
      mainPlayBtn.classList.remove('hidden');
      return;
    }
  }
  function updateButton() {
    if (mainVideo.paused) {
      playBtn.classList.remove('pause');
    } else {
      playBtn.classList.add('pause');
    }
  }

  //   Смена громкости инпутапри
  function handleRangeUpdate() {
    mainVideo.volume = this.value / 100;
    if (this.value == 0) {
      volumeBtn.classList.add('mute');
    } else {
      volumeBtn.classList.remove('mute');
    }
  }
  //   Смена иконки звука при клике на громкость
  function toggleVolume() {
    if (volumeBtn.classList.contains('mute')) {
      volumeBtn.classList.remove('mute');
      progressVolume.value = 40;
    } else {
      volumeBtn.classList.add('mute');
      progressVolume.value = 0;
    }
    mainVideo.volume = progressVolume.value / 100;
    changeProgressCollor(progressVolume);
  }

  //   Смена прогресс бара при обновлении времени
  function liveSearchProgress() {
    if (mainVideo.currentTime) {
      const value = this.value;
      mainVideo.currentTime = (value * mainVideo.duration) / 100;

      changeProgressCollor(progressBar);
    }
  }

  function updateProgressBar() {
    if (mainVideo.currentTime) {
      const position = (mainVideo.currentTime / mainVideo.duration) * 100;
      progressBar.value = position;

      changeProgressCollor(progressBar);
    }
  }

  //   Смена цвета инпута громкости
  function changeProgressCollor(item) {
    const value = item.value;
    item.style.background = `linear-gradient(to right,
	#710707 0%,
	#710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
  }

  //   full-scrn.small-scrn
  function toggleFullScrn() {
    fullScrnBtn.classList.toggle('small-scrn');
    videoPopup.classList.toggle('fullscreen');
    videoContent.classList.toggle('fullscreen');
    document.body.classList.toggle('_lock');
  }

  mainPlayBtn.addEventListener('click', togglePlay);
  mainVideo.addEventListener('click', togglePlay);
  mainVideo.addEventListener('play', updateButton);
  mainVideo.addEventListener('pause', updateButton);
  playBtn.addEventListener('click', togglePlay);
  volumeBtn.addEventListener('click', toggleVolume);
  fullScrnBtn.addEventListener('click', toggleFullScrn);

  mainVideo.addEventListener('timeupdate', updateProgressBar);
  progressBar.addEventListener('input', liveSearchProgress);

  progressVolume.addEventListener('change', handleRangeUpdate);
  progressVolume.addEventListener('input', handleRangeUpdate);
  progressVolume.addEventListener('input', () => {
    changeProgressCollor(progressVolume);
  });

  progressBar.addEventListener('input', () => {
    changeProgressCollor(progressBar);
  });

  // todo   Ивенты клавиш
  let focused = false;

  window.addEventListener('pointerdown', e => {
    if (e.target.closest('#video')) {
      focused = true;
    } else {
      focused = false;
    }
  });
  window.addEventListener('keydown', e => {
    if (focused) {
      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      }
      if (e.code === 'KeyF') {
        e.preventDefault();
        toggleFullScrn();
      }
      if (e.code === 'KeyM') {
        e.preventDefault();
        toggleVolume();
      }

      if (e.code === 'Period' && e.shiftKey) {
        e.preventDefault();
        speedPlay('up');
      }
      if (e.code === 'Comma' && e.shiftKey) {
        e.preventDefault();
        speedPlay('down');
      }

      if (e.which === 27 && videoPopup.classList.contains('fullscreen')) {
        toggleFullScrn();
      }
    }
  });

  function speedPlay(arg) {
    if (arg === 'up') {
      if (mainVideo.playbackRate < 2.5) {
        mainVideo.playbackRate += 0.25;
      }
    }
    if (arg === 'down') {
      if (mainVideo.playbackRate > 0.25) {
        mainVideo.playbackRate -= 0.25;
      }
    }
    textSpeed.classList.add('active');
    textSpeed.innerText = `${mainVideo.playbackRate}x`;

    setTimeout(() => {
      textSpeed.classList.remove('active');
    }, 1000);
  }

  // возврат к первоначальному положеню
  function changeVideoToDefault() {
    if (mainVideo.pause()) {
      mainVideo.pause();
    }
    if (playBtn.classList.contains('pause')) {
      playBtn.classList.remove('pause');
    }
    mainVideo.currentTime = 0;
    progressBar.value = 0;
    changeProgressCollor(progressBar);
    mainPlayBtn.classList.remove('hidden');
  }

  //   todo VIdeo slider
  const video = document.querySelectorAll('.video-slider__video');
  const sliderLine = document.querySelector('.video-slides');
  const prev = document.querySelector('#prev_video');
  const next = document.querySelector('#next_video');

  const pointsNodes = document.querySelectorAll('.video-nav__point-point');
  let pointsArray = Array.from(pointsNodes);

  let count = 0;
  let width, height;

  let videoLength = video.length,
    firstSlide = video[0],
    lastSlide = video[videoLength - 1],
    cloneFirst = firstSlide.cloneNode(true),
    cloneLast = lastSlide.cloneNode(true),
    isEnabled = true;

  // clone first and last slide
  sliderLine.appendChild(cloneFirst);
  sliderLine.insertBefore(cloneLast, firstSlide);

  // cloning 2 more
  let secondSlide, cloneSecond, thirdSlide, cloneThird;

  if (video[1]) {
    secondSlide = video[1];
    (cloneSecond = secondSlide.cloneNode(true)),
      sliderLine.appendChild(cloneSecond);
  }
  if (video[2]) {
    thirdSlide = video[2];
    (cloneThird = thirdSlide.cloneNode(true)),
      sliderLine.appendChild(cloneThird);
  }
  //   end of cloning

  // calculation of gap
  let gap;
  function calcGap() {
    let containerWidth = document.querySelector('.container').offsetWidth;
    if (containerWidth > 1024) {
      gap = 42;
    } else if (containerWidth <= 1024 && containerWidth > 768) {
      gap = 41;
    } else {
      gap = 20;
    }
    sliderLine.style.columnGap = gap + 'px';
  }
  calcGap();
  window.addEventListener('resize', calcGap);

  function init() {
    calcGap();

    width = document.querySelector('.video-slider__wrapper').offsetWidth;

    //  3 or 2 slides on screen wrapper with gaps
    if (width > 769) {
      width = (width - gap * 2) / 3;
    } else {
      width = (width - gap) / 2;
    }

    //  5 + 4 aditional slides with gaps 9 slides, 8 gaps
    sliderLine.style.width = width * (video.length + 4) + gap * 8 + 'px';
    video.forEach(item => {
      item.style.width = width + 'px';
    });
    //  clones
    cloneFirst.style.width = width + 'px';
    cloneLast.style.width = width + 'px';
    cloneSecond.style.width = width + 'px';
    cloneThird.style.width = width + 'px';

    //  position of first/current slider
    sliderLine.style.left = `${-width - gap}px`;

    //  change height via width to wrapper
    document.querySelector('.video-slider__wrapper').style.height =
      width * 0.562 + 'px';

    rollSlider();
  }

  init();
  window.addEventListener('resize', init);

  //   click NEXT
  next.addEventListener('click', function () {
    if (isEnabled) {
      sliderLine.classList.add('shifting');

      count++;
      if (count === videoLength) {
        isEnabled = false;
        sliderLine.style.transform = `translate(-${
          count * width + count * gap
        }px)`;
        sliderLine.addEventListener('transitionend', checkIndex);
        sliderLine.addEventListener('transitionend', becomeEnable);
      } else {
        rollSlider();
      }

      changeMainVideo(count);
      stopIframePlaying();
      changeVideoToDefault();
    }
  });

  //   click PREV
  prev.addEventListener('click', function () {
    if (isEnabled) {
      sliderLine.classList.add('shifting');

      count--;
      if (count === -1) {
        isEnabled = false;
        sliderLine.style.transform = `translate(${width + gap}px)`;
        sliderLine.addEventListener('transitionend', checkIndex);
        sliderLine.addEventListener('transitionend', becomeEnable);
      } else {
        rollSlider();
      }

      changeMainVideo(count);
      stopIframePlaying();
      changeVideoToDefault();
    }
  });

  // change main Video
  function changeMainVideo(index) {
    if (index === -1) {
      mainVideo.src = `./assets/video/video${videoLength - 1}.webm`;
      mainVideo.poster = `./assets/video/poster${videoLength - 1}.jpg`;
      return;
    } else if (index === videoLength) {
      mainVideo.src = `./assets/video/video0.webm`;
      mainVideo.poster = `./assets/video/poster0.jpg`;
      return;
    }
    mainVideo.src = `./assets/video/video${index}.webm`;
    mainVideo.poster = `./assets/video/poster${index}.jpg`;
  }
  // end of change main Video

  // перемотка в зависимости от count
  function rollSlider() {
    isEnabled = false;
    sliderLine.style.transform = `translate(-${count * width + count * gap}px)`;
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
      count = video.length - 1;
    }

    if (count == videoLength) {
      count = 0;
    }
    sliderLine.style.transform = `translate(-${count * width + count * gap}px)`;

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

    sliderLine.style.transform = `translate(-${count * width + count * gap}px)`;

    changeNumbersDots();
    changeMainVideo(count);

    stopIframePlaying();
    changeVideoToDefault();
  }

  function changeNumbersDots() {
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

  //   todo iframes
  function findVideos() {
    let videos = document.querySelectorAll('.video-frame');

    for (let i = 0; i < videos.length; i++) {
      setupVideo(videos[i]);
    }
  }
  //   останавливаем;

  // заменяем все дивы на айфреймы, меняя свойства
  function setupVideo(video) {
    let link = video.querySelector('.video__link');
    let media = video.querySelector('.video__media');
    let button = video.querySelector('.video__button');
    let id = parseMediaURL(media);

    video.addEventListener('click', () => {
      let iframe = createIframe(id);

      link.remove();
      button.remove();
      video.appendChild(iframe);

      stopIframePlaying();
    });

    link.removeAttribute('href');
    video.classList.add('video--enabled');
  }

  function parseMediaURL(media) {
    let regexp =
      /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
    let url = media.src;
    let match = url.match(regexp);

    return match[1];
  }

  function createIframe(id) {
    let iframe = document.createElement('iframe');

    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay');
    iframe.setAttribute('src', generateURL(id));
    iframe.classList.add('video__media');

    return iframe;
  }

  function generateURL(id) {
    let query = '?rel=0&showinfo=0&autoplay=1&enablejsapi=1';

    return 'https://www.youtube.com/embed/' + id + query;
  }

  findVideos();

  // todo  остановка при смене слайда всех видеофрейсрв

  function stopIframePlaying() {
    let currentIframes = sliderLine.querySelectorAll('iframe');
    currentIframes.forEach(iFrame => {
      let func = 'stopVideo';
      iFrame.contentWindow.postMessage(
        '{"event":"command","func":"' + func + '","args":""}',
        '*'
      );
    });
  }

  // todo  stop playing iframe, while started playing other
  // todo click 1 time to iframe
  window.addEventListener('blur', function () {
    if (document.activeElement.className == 'video__media') {
      stopIframePlaying();
    }
  });
  // todo end of click 1 time to iframe
}
