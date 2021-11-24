import { openPage } from './settings-page';
import {
    clickSound,
    correctSound,
    endRoundSound,
    wrongSound,
    mainPage,
    saveBtn,
    defaultBtn,
    progressVolume,
    volumeBtn,
} from './DOMelements';

let audio = new Audio();

//   Смена цвета инпута громкости
function changeProgressCollor(progress) {
    let item = progress;
    const value = item.value;
    item.style.background = `linear-gradient(to right,
			#ffbca2 0%,
			#ffbca2 ${value}%, #A4A4A4 ${value}%, #A4A4A4 100%)`;
}

function getVolumeFromLocal() {
    if (localStorage.getItem('audioVolume')) {
        progressVolume.value = +localStorage.getItem('audioVolume');
        changeProgressCollor(progressVolume);

        if (progressVolume.value === '0') {
            volumeBtn.classList.add('mute');
        } else {
            volumeBtn.classList.remove('mute');
        }
    }
}

export function soundPlay(index) {
    switch (index) {
        case 'click':
            audio = clickSound;
            break;
        case 'correct':
            audio = correctSound;
            break;
        case 'wrong':
            audio = wrongSound;
            break;
        case 'endRound':
            audio = endRoundSound;
            break;
        default:
            console.log('default audio');
    }

    audio.volume = progressVolume.value / 100;
    audio.currentTime = 0;
    audio.play();
}

// громкость
//   Смена громкости инпутапри
function handleRangeUpdate() {
    setTimeout(() => {
        soundPlay('click');
    }, 500);

    audio.volume = this.value / 100;
    if (+this.value === 0) {
        volumeBtn.classList.add('mute');
    } else {
        volumeBtn.classList.remove('mute');
    }
}

//   Смена иконки звука при клике на громкость
function toggleVolume() {
    if (volumeBtn.classList.contains('mute')) {
        volumeBtn.classList.remove('mute');
        progressVolume.value = 20;
    } else {
        volumeBtn.classList.add('mute');
        progressVolume.value = 0;
    }

    changeProgressCollor(progressVolume);
}

volumeBtn.addEventListener('click', toggleVolume);
progressVolume.addEventListener('change', handleRangeUpdate);
progressVolume.addEventListener('input', () => {
    changeProgressCollor(progressVolume);
});

// кнопки настроек и сохранение
saveBtn.addEventListener('click', () => {
    localStorage.setItem(`audioVolume`, progressVolume.value);

    soundPlay('click');
    openPage(mainPage);
});

defaultBtn.addEventListener('click', () => {
    soundPlay('click');
    volumeBtn.classList.add('mute');
    progressVolume.value = 0;
    changeProgressCollor(progressVolume);
});

window.addEventListener('load', () => {
    getVolumeFromLocal();
});
