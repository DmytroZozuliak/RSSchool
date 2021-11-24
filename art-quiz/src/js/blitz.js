import { createArt } from './getDataFromJSON';
import { getRandomNum } from './getRandomNum';
import { openPage } from './settings-page';
import { soundPlay } from './sounds';
import { getArrOfAuthorAnswers } from './getArrOfAnswers';
import {
    blitzPage,
    blitzBtn,
    blitzQuestionWrapper,
    modalScore,
    modalScoreWrapper,
} from './DOMelements';

// номер вопроса
let num = 0;
// к-во правильных ответов
let correctNum = 0;
let setGameTime;
let blitzTimeOut;
let currentBlitzTime;

function showTimeInDiv(time, parentDiv) {
    let currentTime = time;
    let parent = parentDiv;
    if (currentTime <= 0) {
        parent.innerHTML = `0:00`;
        return;
    }
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    parent.innerHTML = `${minutes}:${seconds}`;
}

function timer(setTimer) {
    let timerDiv = document.querySelector('.timer-blitz');
    let time = setTimer;
    time -= 1;
    currentBlitzTime = time;
    showTimeInDiv(currentBlitzTime, timerDiv);

    if (time > 0) {
        blitzTimeOut = setTimeout(() => {
            timer(time);
        }, 1000);
    } else {
        clearTimeout(blitzTimeOut);
        // eslint-disable-next-line no-use-before-define
        showModalBlitzResult(correctNum);
    }
}

function checkTopResultFromBlitz(rightAnswrs) {
    let topResultScore;
    // записываем результат если он топовый в хтмл, нет, то оставляем как есть
    if (localStorage.getItem('BlitzResult')) {
        topResultScore = localStorage.getItem('BlitzResult');
        if (rightAnswrs >= topResultScore) {
            localStorage.setItem(`BlitzResult`, rightAnswrs);
            topResultScore = rightAnswrs;
        } else {
            topResultScore = localStorage.getItem('BlitzResult');
        }
    } else {
        localStorage.setItem(`BlitzResult`, rightAnswrs);
        topResultScore = rightAnswrs;
    }
    return topResultScore;
}

function showModalBlitzResult(rightAnswrs) {
    // rightAnswrs - к-во правильных ответов
    soundPlay('endRound');

    let topResultScore = checkTopResultFromBlitz(rightAnswrs);

    let message = `Ваш результат:`;
    let iconStyle = 'common-score';

    modalScore.innerHTML = `
		<div class="modal-score__icon ${iconStyle}"></div>
		<div class="modal-score__text">${message}</div>

		<div class="modal-score__nested-info blitz-modal__nested-info">
			<div class="modal-score__current">${rightAnswrs}</div>
			<div class="blitz-modal__nested-info-topscore">
			Лучший результат: ${topResultScore}</div>
		</div>

		<div class="modal-score__btns">
			<div class="home-btn common-btn white ripple modal-blitz-home"><span>На главную</span></div>
		</div>
	`;
    // появление модального окна
    modalScoreWrapper.classList.remove('hide');
    let modalBlitzHomeBtn = document.querySelector('.modal-blitz-home');

    modalBlitzHomeBtn.addEventListener('click', () => {
        modalScoreWrapper.classList.add('hide');
    });
}

function NextblitzQuestion(objArt) {
    // objArt - исходный массив ВСЕХ авторов
    if (currentBlitzTime < 0) {
        clearTimeout(blitzTimeOut);
        showModalBlitzResult(correctNum);
        return;
    }

    let currentQuestionNum = getRandomNum(0, objArt.length - 1);
    let currentQuestion = objArt[currentQuestionNum];
    let currentName = currentQuestion.name;
    let currentAuthor = currentQuestion.author;
    let currentSrc = `./assets/img/img/${currentQuestion.id}.webp`;
    let topResultScore;
    if (localStorage.getItem('BlitzResult')) {
        topResultScore = localStorage.getItem('BlitzResult');
    } else {
        topResultScore = correctNum;
    }

    let answers = getArrOfAuthorAnswers(objArt, currentAuthor, 'blitz');

    blitzQuestionWrapper.innerHTML = `
				<div class="blitz-question__card">

						<div class="questions-card__top-info blitz-top-info">
							<div class="questions-card__position blitz-position">
								<div class="questions-card__position-number">
								Вопрос номер: <span>${num}</span>
								</div>
								<div class="questions-card__position-current">
								Текущий результат: <span>${correctNum}</span>
								</div>
								<div class="questions-card__position-top">
								Лучший результат: <span>${topResultScore}</span>
								</div>
							</div>
							<div class="questions-card__timer timer-blitz">
							00:${currentBlitzTime}</div>
						</div>

						<div class="questions-card__title">
							Картину "${currentName}"<br>
							написал
							${answers[0]}?</div>
						<div class="blitz-question__img">
							<div class="blitz-question__img-result"></div>
						</div>

						<div class="blitz-question__answers">
							<div class="blitz-question__answer-yes common-btn">Да</div>
							<div class="blitz-question__answer-no common-btn">Нет</div>
						</div>

					</div>
				</div>
		 `;

    let imgDiv = document.querySelector('.blitz-question__img');
    let logoResult = document.querySelector('.blitz-question__img-result');
    const img = new Image();
    img.src = currentSrc;

    img.onload = () => {
        imgDiv.style.backgroundImage = `url(${img.src})`;
        imgDiv.classList.add('show');
    };

    let answerYes = document.querySelector('.blitz-question__answer-yes');
    let answerNo = document.querySelector('.blitz-question__answer-no');
    let timerDiv = document.querySelector('.timer-blitz');

    // при нажатии на ответ может быть 00:7, потом меняется норм
    showTimeInDiv(currentBlitzTime, timerDiv);

    answerYes.addEventListener('click', () => {
        if (currentAuthor === answers[0]) {
            logoResult.classList.add('right');
            soundPlay('correct');

            clearTimeout(blitzTimeOut);
            currentBlitzTime += 5;
            timer(currentBlitzTime);
            correctNum += 1;
        } else {
            logoResult.classList.add('wrong');
            soundPlay('wrong');

            clearTimeout(blitzTimeOut);
            currentBlitzTime -= 5;
            timer(currentBlitzTime);
        }
        num += 1;
        setTimeout(() => {
            NextblitzQuestion(objArt);
        }, 400);
    });
    answerNo.addEventListener('click', () => {
        if (currentAuthor !== answers[0]) {
            logoResult.classList.add('right');
            soundPlay('correct');

            clearTimeout(blitzTimeOut);
            currentBlitzTime += 5;
            timer(currentBlitzTime);
            correctNum += 1;
        } else {
            logoResult.classList.add('wrong');
            soundPlay('wrong');

            clearTimeout(blitzTimeOut);
            currentBlitzTime -= 5;
            timer(currentBlitzTime);
        }
        num += 1;
        setTimeout(() => {
            NextblitzQuestion(objArt);
        }, 400);
    });
}

// функция при нажатии на кнопку БЛИЦ, запускаем генерацию nextQuestion и открываем нужый page
async function generateblitzQuestion() {
    let objArt = await createArt();

    clearTimeout(blitzTimeOut);
    num = 0;
    correctNum = 0;
    setGameTime = 61;
    currentBlitzTime = setGameTime;
    NextblitzQuestion(objArt);
    timer(setGameTime);
}

// ккнопка включения блица
blitzBtn.addEventListener('click', () => {
    soundPlay('click');
    openPage(blitzPage);
    generateblitzQuestion();
});

let homeBtns = document.querySelectorAll('.blitz__home-btn');
homeBtns.forEach(el => {
    el.addEventListener('click', () => {
        clearTimeout(blitzTimeOut);
    });
});
