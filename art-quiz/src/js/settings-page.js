import { soundPlay } from './sounds';
import { settingsBtn, settingsPage, saveBtn, defaultBtn } from './DOMelements';

export function openPage(thisPage) {
    let currentPage = thisPage;
    let container = document.querySelector('.container');
    let pages = Array.from(container.children);

    for (const page of pages) {
        page.classList.add('hidden-page');
        setTimeout(() => {
            page.style.display = 'none';
            currentPage.style.display = 'block';
        }, 800);
    }
    setTimeout(() => {
        currentPage.classList.remove('hidden-page');
    }, 900);
}

settingsBtn.addEventListener('click', () => {
    soundPlay('click');
    openPage(settingsPage);
});

let timeCheckbox = document.querySelector('#time-checkbox');
let labelCheckbox = document.querySelector('#label-name');
let inputTime = document.querySelector('.time-value__wrapper input');

timeCheckbox.addEventListener('change', () => {
    if (timeCheckbox.checked) {
        labelCheckbox.textContent = 'Вкл.';
    } else {
        labelCheckbox.textContent = 'Выкл.';
    }
});

saveBtn.addEventListener('click', () => {
    localStorage.setItem(`gameWithTime`, timeCheckbox.checked);
    localStorage.setItem(`gameTimeSeconds`, inputTime.value);
});

defaultBtn.addEventListener('click', () => {
    timeCheckbox.checked = true;
    labelCheckbox.textContent = 'Вкл.';
    inputTime.value = 15;
});

window.addEventListener('load', () => {
    if (localStorage.getItem('gameWithTime')) {
        let str = localStorage.getItem('gameWithTime');
        let booleanValue = str !== 'false';
        timeCheckbox.checked = booleanValue;
        if (timeCheckbox.checked) {
            labelCheckbox.textContent = 'Вкл.';
        } else {
            labelCheckbox.textContent = 'Выкл.';
        }
        inputTime.value = localStorage.getItem(`gameTimeSeconds`);
    }
});
