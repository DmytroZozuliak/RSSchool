export function audioPlayer(playList) {
  const playBtn = document.querySelector('.play');
  const playNextBtn = document.querySelector('.play-next');
  const playPrevtBtn = document.querySelector('.play-prev');
  const progressBar = document.querySelector('.progress-bar');
  const progressVolume = document.querySelector('.progress-volume');
  const volumeBtn = document.querySelector('.volume');
  const playListContainer = document.querySelector('.play-list');
  const currentTimeDiv = document.querySelector('.player__time-current');
  const totalTimeDiv = document.querySelector('.player__time-total');
  const titleDiv = document.querySelector('.player__title');
  //   menu
  const musicInput = document.querySelector('#musicCheckbox');
  const playerDiv = document.querySelector('.player');

  const audio = new Audio();
  let playNum = 0;

  audio.src = playList[playNum].src;

  playList.forEach(el => {
    const li = document.createElement('li');
    const songName = document.createElement('div');
    const songTotalTime = document.createElement('div');

    li.classList.add('play-item');

    songName.textContent = el.title;
    songTotalTime.textContent = el.duration;
    playListContainer.append(li);
    li.append(songName);
    li.append(songTotalTime);
  });

  function togglePlay() {
    if (audio.paused) {
      audio.play();
      addActiveSong();
    } else {
      audio.pause();
    }
  }

  function updateButton() {
    if (audio.paused) {
      playBtn.classList.remove('pause');
    } else {
      playBtn.classList.add('pause');
    }
  }

  function playNext() {
    playNum++;
    if (playNum >= playList.length) {
      playNum = 0;
    }
    audio.src = playList[playNum].src;
    togglePlay();
  }
  function playPrev() {
    playNum--;
    if (playNum < 0) {
      playNum = playList.length - 1;
    }
    audio.src = playList[playNum].src;
    togglePlay();
  }
  function addActiveSong() {
    let songs = document.querySelectorAll('.play-item');
    songs.forEach(elem => {
      elem.classList.remove('item-active');
      elem.classList.remove('play-item-pause');
    });
    songs[playNum].classList.add('item-active');
    songs[playNum].classList.add('play-item-pause');

    titleDiv.textContent = playList[playNum].title;
  }

  function addPauseSong() {
    let songs = document.querySelectorAll('.play-item');

    songs.forEach(elem => {
      if (elem.classList.contains('item-active')) {
        if (audio.paused) {
          elem.classList.remove('play-item-pause');
        } else {
          elem.classList.add('play-item-pause');
        }
      }
    });
  }

  //   проигрывание выбраной песни из списка
  function playSelectedSong(event) {
    let songs = document.querySelectorAll('.play-item');
    songs.forEach((elem, index) => {
      if (elem.classList.contains('item-active')) {
        togglePlay();
        if (elem.classList.contains('play-item-pause')) {
          elem.classList.remove('play-item-pause');
        } else {
          elem.classList.add('play-item-pause');
        }
      } else if (event.target.parentElement === elem || event.target === elem) {
        playNum = index;
        audio.src = playList[playNum].src;
        togglePlay();
      }
    });
  }

  //   Смена громкости инпутапри
  function handleRangeUpdate() {
    audio.volume = this.value / 100;
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
    audio.volume = progressVolume.value / 100;
    changeProgressCollor(progressVolume);
  }

  //   Смена прогресс бара при обновлении времени
  function liveSearchProgress() {
    if (audio.currentTime) {
      const value = this.value;
      audio.currentTime = (value * audio.duration) / 100;

      currentTimeDiv.textContent = getTimeCodeFromNum(audio.currentTime);

      changeProgressCollor(progressBar);
    }
  }
  function updateProgressBar() {
    if (audio.currentTime) {
      const position = (audio.currentTime / audio.duration) * 100;
      progressBar.value = position;

      if (currentTimeDiv.textContent === 'NaN:NaN') {
        currentTimeDiv.textContent = '0:00';
      } else {
        currentTimeDiv.textContent = getTimeCodeFromNum(audio.currentTime);
      }

      changeProgressCollor(progressBar);
    }
  }
  //   Смена цвета инпута громкости
  function changeProgressCollor(item) {
    const value = item.value;
    item.style.background = `linear-gradient(to right,
		rgb(121, 120, 120) 0%,
		rgb(121, 120, 120) ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
  }

  playBtn.addEventListener('click', togglePlay);
  audio.addEventListener('play', updateButton);
  audio.addEventListener('pause', updateButton);

  audio.addEventListener('play', addPauseSong);
  audio.addEventListener('pause', addPauseSong);

  playNextBtn.addEventListener('click', playNext);
  playPrevtBtn.addEventListener('click', playPrev);
  volumeBtn.addEventListener('click', toggleVolume);
  audio.addEventListener('timeupdate', updateProgressBar);
  progressBar.addEventListener('input', liveSearchProgress);

  progressVolume.addEventListener('change', handleRangeUpdate);
  progressVolume.addEventListener('input', handleRangeUpdate);
  progressVolume.addEventListener('input', () => {
    changeProgressCollor(progressVolume);
  });

  progressBar.addEventListener('input', () => {
    changeProgressCollor(progressBar);
  });
  // автоматическое воспроизвидение след песни после окончании текущей
  audio.addEventListener('ended', playNext);

  playListContainer.addEventListener('click', playSelectedSong);

  // возврат к первоначальному положеню
  function changeAudioToDefault() {
    if (audio.pause()) {
      audio.pause();
    }
    if (playBtn.classList.contains('pause')) {
      playBtn.classList.remove('pause');
    }
    audio.currentTime = 0;
    progressBar.value = 0;
    changeProgressCollor(progressBar);
    mainPlayBtn.classList.remove('hidden');
  }

  // прогресс в секундах
  //turn 128 seconds into 2:08
  function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
      seconds % 60
    ).padStart(2, 0)}`;
  }

  audio.addEventListener(
    'loadeddata',
    () => {
      totalTimeDiv.textContent = getTimeCodeFromNum(audio.duration);
    },
    false
  );

  //   stop playing music, while disable div in menu
  musicInput.addEventListener('change', function () {
    disableMusic(musicInput);
  });
  function disableMusic(checkbox) {
    if (!checkbox.checked) {
      audio.pause();
    }
  }
}
