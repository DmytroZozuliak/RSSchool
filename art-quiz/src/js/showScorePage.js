import { openPage } from './settings-page';
import { createArt } from './getDataFromJSON';
import { soundPlay } from './sounds';
import {
    resultPage,
    resultPageCards,
    artistsPage,
    artsPage,
} from './DOMelements';

// todo РАБОТАЕТ с индексами, теперь можно сделать проверку из локал сторейджа и отрисовать все

resultPageCards.addEventListener('click', event => {
    if (event.target.closest('.result-page__card')) {
        soundPlay('click');
        event.target.closest('.result-page__card').classList.toggle('show');
    }
});

async function openAndShowScore(e, arrCategories) {
    if (e.target.closest('.artists-card__show-score')) {
        soundPlay('click');

        let objArt = await createArt();
        let local;
        if (localStorage.getItem('artistsAnsw')) {
            local = JSON.parse(localStorage.getItem('artistsAnsw'));
        } else {
            local = {};
        }

        for (let i = 0; i < arrCategories.length; i += 1) {
            let index = arrCategories[i];

            if (e.target.classList.contains(`categorie-${index}`)) {
                resultPageCards.innerHTML = '';

                let stage = [...objArt.slice(index, index + 10)];

                for (let k = 0; k < local[index].length; k += 1) {
                    let author = stage[k].author;
                    let name = stage[k].name;
                    let year = stage[k].year;
                    let filter;
                    if (!local[index][k]) {
                        filter = 'filter: grayscale(100%)';
                    }

                    let img = new Image();
                    img.src = `./assets/img/img/${index + k}.webp`;

                    img.onload = () => {
                        resultPageCards.innerHTML += `
					<div class="result-page__card result-card">

						  <div class="result-card__img" style="background-image: url(${img.src}); ${filter}">
							  <div class="result-card__show-info">
								  <div class="result-card__name">${name}</div>
								  <div class="result-card__author">${author}, <span class="result-card__year">${year}</span></div>
							  </div>
						  </div>
					  
					</div>
                      	 `;
                    };
                }
            }
        }

        openPage(resultPage);
    }
}

export function showScoreResults(parentDivCards, arrCategories) {
    // parentDivCards = artistsCards, див, куда складываем 12 карточек категорий const artistsCards = document.querySelector('.artists-page__cards');
    // arrCategories = arrArtists массив категорий [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110]
    let backToPrevPage = document.querySelector('.result-page__back');

    parentDivCards.addEventListener('click', e => {
        openAndShowScore(e, arrCategories);

        // вешаем событие на кнопку "назад к уровню", в зависимости от категорий
        if (parentDivCards.classList.contains('artists-page__cards')) {
            backToPrevPage.onclick = () => {
                soundPlay('click');
                openPage(artistsPage);
            };
        } else if (parentDivCards.classList.contains('arts-page__cards')) {
            backToPrevPage.onclick = () => {
                soundPlay('click');
                openPage(artsPage);
            };
        }
    });
}
