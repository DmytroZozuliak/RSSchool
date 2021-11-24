import { openPage } from './settings-page';
import { checkRightAnswersAmount } from './arrayMethods';
import { showModalResult } from './showModalResult';
import { showScoreResults } from './showScorePage';
import { createCategories } from './createCategories';
import { getArrOfAuthorAnswers } from './getArrOfAnswers';
import { generateQuestion } from './generateQuestion';
import { soundPlay } from './sounds';
import {
    mainPage,
    artistsQuestionPage,
    backBtnToArtistPage,
    modalAnswerWrapper,
    parentQuestionsArtists,
    modalScoreWrapper,
    artistsPage,
    artistsBtn,
    artistsCards,
} from './DOMelements';

let intervalTime;
// массив для правильных ответов
let ansArr = [];
// номер картинки, с начала категории (от 0 до 9) (всего 10)
let num = 0;
// список категорий в массиве
let arrArtists = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110];

let ansobj;
if (localStorage.getItem('artistsAnsw')) {
    ansobj = JSON.parse(localStorage.getItem('artistsAnsw'));
} else {
    ansobj = {};
}

artistsBtn.addEventListener('click', () => {
    soundPlay('click');
    openPage(artistsPage);

    // кнопка назад к странице категориям
    backBtnToArtistPage.addEventListener('click', () => {
        if (intervalTime) {
            clearInterval(intervalTime);
        }
        soundPlay('click');
        openPage(artistsPage);
    });
});

// показывать модальное окно после ответа пользователя
function showModalAnswer(result, answerDiv, arr, ...argsOfNextQuestion) {
    // result - true/false правильный или не праильный ответ выбран
    // answerDiv - блок из 4-х ответов, по которому кликнули
    // arr - объект задаваемого вопроса
    if (!arr) {
        return;
    }

    let modalNested = document.querySelector('.modal-answer__nested-info');

    let src = `./assets/img/img/${arr.id}.webp`;
    modalNested.innerHTML = `
	<div class="modal-answer__img" style="background-image: url(${src})">
	<div class="modal-answer__result"></div>
	</div>
	<div class="modal-answer__name">${arr.name}</div>
	<div class="modal-answer__author">${arr.author}, <span class="modal-answer__year">${arr.year}</span></div>
`;

    const modalNextBtn = document.querySelector('.modal-answer__nextbtn');
    const modalAnswerIcon = document.querySelector('.modal-answer__result');
    //  чтобы не дублировать ивент листенеры при каждом запуске функции меняю на онклик
    modalNextBtn.onclick = () => {
        modalAnswerIcon.classList.remove('wrong');
        modalAnswerIcon.classList.remove('right');

        soundPlay('click');

        if (num < 10) {
            parentQuestionsArtists.style.transform = 'translate(-200%,0)';
            parentQuestionsArtists.style.transition = 'transform 0.3s ease 0s';
        }
        modalAnswerWrapper.classList.add('hide');
        setTimeout(() => {
            // eslint-disable-next-line no-use-before-define
            nextArtistQuestion(...argsOfNextQuestion);
            // todo translate
            parentQuestionsArtists.style.transform = 'translate(0,0)';
        }, 300);
    };

    if (result === true) {
        ansArr.push(true);
        // при правильном ответе кнопка ответа изменяет цвет
        answerDiv.classList.add('true');
        modalAnswerIcon.classList.add('right');
    } else {
        ansArr.push(false);

        if (answerDiv) {
            // при неправильном ответе кнопка ответа изменяет цвет
            answerDiv.classList.add('false');
        }
        modalAnswerIcon.classList.add('wrong');
    }
    // появление модального окна
    modalAnswerWrapper.classList.remove('hide');
}

// создаем следующий вопрос из нашего десятка
function nextArtistQuestion(objArt, stage, parentDiv, index) {
    // objArt - исходный массив ВСЕХ авторов
    // stage - массив из 10ти картинок, в зависимости от каталога, по которому кликнули.
    // parent - родитель Див, куда вставляем содержимое вопросов и вариантов ответов, в нашем случае artists-questions__cards

    let parent = parentDiv;
    if (num >= 10) {
        ansobj[index] = ansArr;
        let rightAnswrs = checkRightAnswersAmount(ansArr);
        // показываем окно с результатами
        showModalResult(rightAnswrs, artistsPage);
        soundPlay('endRound');

        //   записываем объект ответов в локал
        if (localStorage.getItem('artistsAnsw')) {
            let answersFromLocal = JSON.parse(
                localStorage.getItem('artistsAnsw')
            );
            answersFromLocal[index] = ansArr;
            localStorage.setItem(
                `artistsAnsw`,
                JSON.stringify(answersFromLocal)
            );
        } else {
            localStorage.setItem(`artistsAnsw`, JSON.stringify(ansobj));
        }

        //   переделываем страницу с категориями, в зависимости от правильных результатов
        createCategories(arrArtists, artistsCards);
        return;
    }
    let currentAuthor = stage[num].author;
    //  массив из 4-х ответов
    let answers = getArrOfAuthorAnswers(objArt, currentAuthor);

    parent.innerHTML = `
		<div class="artists-questions__card questions-card">

			<div class="questions-card__top-info">
						<div class="questions-card__position">${num + 1}/10
				</div>
				<div class="questions-card__timer"></div>
			</div>
			<div class="questions-card__title">
			Кто написал картину "${stage[num].name}"?</div>

			<div class="questions-card__img">
			</div>
			<div class="questions-card__answers question-answers">
				<div class="common-btn question-answers__answer">${answers[0]}</div>
				<div class="common-btn question-answers__answer">${answers[1]}</div>
				<div class="common-btn question-answers__answer">${answers[2]}</div>
				<div class="common-btn question-answers__answer">${answers[3]}</div>
			</div>
		</div>
  `;

    let imgDiv = document.querySelector('.questions-card__img');
    const img = new Image();
    img.src = `./assets/img/img/${stage[num].id}.webp`;

    img.onload = () => {
        imgDiv.style.backgroundImage = `url(${img.src})`;
        imgDiv.classList.add('show');
    };

    if (localStorage.getItem('gameWithTime')) {
        let str = localStorage.getItem('gameWithTime');
        let booleanValue = str !== 'false';
        let timerEl = document.querySelector('.questions-card__timer');
        if (booleanValue === true) {
            let time = +localStorage.getItem(`gameTimeSeconds`);
            if (num === 0) {
                time += 1;
            }
            time = time < 10 ? '0' + time : time;
            timerEl.textContent = `00:${time}`;

            intervalTime = setInterval(() => {
                time -= 1;
                if (time === 0) {
                    clearInterval(intervalTime);
                    soundPlay('wrong');
                    showModalAnswer(
                        false,
                        null,
                        stage[num],
                        objArt,
                        stage,
                        parentDiv,
                        index
                    );
                    num += 1;
                }
                time = time < 10 ? '0' + time : time;
                timerEl.textContent = `00:${time}`;
            }, 1000);
        }
    }

    let allAnswers = document.querySelectorAll('.question-answers__answer');

    allAnswers.forEach(answerDiv => {
        answerDiv.addEventListener('click', () => {
            if (answerDiv.textContent === currentAuthor) {
                clearInterval(intervalTime);

                soundPlay('correct');
                showModalAnswer(
                    true,
                    answerDiv,
                    stage[num],
                    objArt,
                    stage,
                    parentDiv,
                    index
                );
            } else {
                clearInterval(intervalTime);

                soundPlay('wrong');
                showModalAnswer(
                    false,
                    answerDiv,
                    stage[num],
                    objArt,
                    stage,
                    parentDiv,
                    index
                );
            }
            num += 1;
        });
    });
}

// cards click
artistsCards.addEventListener('click', e => {
    if (
        !e.target.closest('.artists-card__show-score') &&
        !e.target.classList.contains('artists-page__cards')
    ) {
        for (let i = 0; i < arrArtists.length; i += 1) {
            let index = arrArtists[i];

            if (
                e.target
                    .closest('.artists-card')
                    .classList.contains(`card-${index}`)
            ) {
                openPage(artistsQuestionPage);

                soundPlay('click');

                //  обнуляем список вопросов, когда переходим на новую категорию
                num = 0;
                ansArr = [];
                generateQuestion(
                    arrArtists[i],
                    parentQuestionsArtists,
                    nextArtistQuestion
                );
            }
        }
    }
});

// создаем 12 категорий в зависимости отмассива
createCategories(arrArtists, artistsCards);

// Score results! ===============================
showScoreResults(artistsCards, arrArtists);

// all home btns
document.body.addEventListener('click', e => {
    if (e.target.closest('.home-btn')) {
        if (intervalTime) {
            clearInterval(intervalTime);
        }
        modalScoreWrapper.classList.add('hide');
        soundPlay('click');
        openPage(mainPage);
    }
});
