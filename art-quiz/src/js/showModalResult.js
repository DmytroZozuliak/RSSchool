import { openPage } from './settings-page';
import { soundPlay } from './sounds';
import { rippleFunc } from './ripple-effect';

// показывать модальное окно после раунда ответов
export function showModalResult(rightAnswrs, parentDiv) {
    // rightAnswrs - к-во правильных ответов
    // parentDiv - вернутся назад нв выбор категории
    const modalScoreWrapper = document.querySelector('.modal-wrapper-score');
    const modalScore = document.querySelector('.modal-score');

    let categorieDiv = parentDiv;
    let message;
    let iconStyle;
    if (rightAnswrs === 10) {
        message = `Невероятный результат!
				Поздравляем!`;
        iconStyle = 'top-score';
    } else if (rightAnswrs === 0) {
        message = `В следующий раз повезет!`;
        iconStyle = 'low-score';
    } else {
        message = `Ваш результат:`;
        iconStyle = 'common-score';
    }

    modalScore.innerHTML = `
	  <div class="modal-score__icon ${iconStyle}"></div>
	  <div class="modal-score__text">${message}</div>

	  <div class="modal-score__nested-info">
		  <div class="modal-score__current">${rightAnswrs}</div>
		  <div class="modal-score__divide">/</div>
		  <div class="modal-score__total">10</div>
	  </div>

	  <div class="modal-score__btns">
		  <div class="home-btn common-btn white ripple"><span>На главную</span></div>
		  <div class="next-quiz-categorie common-btn white ripple"><span>Следующий уровень</span></div>
	  </div>
 `;
    // появление модального окна
    modalScoreWrapper.classList.remove('hide');

    let categorieUpBtn = document.querySelector(`.next-quiz-categorie`);
    categorieUpBtn.onclick = e => {
        // ripple effect
        rippleFunc(e, categorieUpBtn);

        modalScoreWrapper.classList.add('hide');

        soundPlay('click');
        openPage(categorieDiv);
    };
}
