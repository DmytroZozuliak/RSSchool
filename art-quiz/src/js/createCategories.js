import { checkRightAnswersAmount } from './arrayMethods';

// Создаем 12 карт категорий из массива
//  12 категорий по 10 элементов
export function createCategories(arr, divWrapper) {
    // объект для правильных ответов из локал сторейдж, если его нет, то создаем новый
    let ansobj;
    if (localStorage.getItem('artistsAnsw')) {
        ansobj = JSON.parse(localStorage.getItem('artistsAnsw'));
    } else {
        ansobj = {};
    }

    // arr = arrArtists - массив из каталогов arrArtists = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110];
    // cardsWrapper = artistsCards обвертка, куда складываем вопросы
    let cardsWrapper = divWrapper;
    cardsWrapper.innerHTML = '';
    arr.forEach((element, index) => {
        let src = `./assets/img/img/${element}.webp`;

        let rightAnsw;
        let filter;
        let display;
        //   объект с локал сторейджа ansobj
        if (element in ansobj) {
            rightAnsw = checkRightAnswersAmount(ansobj[element]) + '/10';
            display = 'display: block';
        } else {
            rightAnsw = '';
            filter = 'filter: grayscale(100%)';
            display = 'display: none';
        }

        cardsWrapper.innerHTML += `
				<div class="artists-page__card artists-card card-${element}">
				<div class="artists-card__text">
					<div class="artists-card__text-title">Уровень ${index + 1}</div>
					<div class="artists-card__text-total">${rightAnsw}</div>
				</div>
				<div class="artists-card__img"
				style="background-image: url(${src}); ${filter}">
				<div class="artists-card__show-score categorie-${element}" style="${display}">результат</div>
				</div>

				</div>
				`;
    });
}
