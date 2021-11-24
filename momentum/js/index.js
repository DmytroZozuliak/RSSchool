import { ibg } from './ibg.js';
import { timeFunc } from './time.js';
import { weather } from './weather.js';
import { quotes } from './quotes.js';
import playList from './playList.js';
import { audioPlayer } from './audioPlayer.js';
import { todoMenu } from './todo-menu.js';
import { todo } from './todo.js';
import { displayElementsMenu } from './displayElementsMenu.js';

let language;

ibg();

displayElementsMenu();

timeFunc();
weather(language);
quotes();
audioPlayer(playList);
todoMenu();
todo();

// displayElementsMenu();

console.log(`
160 баллов из 160
Кажется все сделал

1. сверху главное меню выпадающее,
2. слева снизу экрана список дел TODO
	задачи сохраняються в локал сторейдж
3. Верстка адаптивная до 320px
`);
