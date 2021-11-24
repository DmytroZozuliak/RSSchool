import { app } from './app.js';
import { burgermenu } from './burger.js';
import { welcomSlider } from './welcome_slider.js';
import { initComparisons } from './explore.js';
import { calculationTickets } from './calculationTickets.js';
import { galleryCreate } from './gallery.js';
import { popupTickets } from './popups.js';
import { videoFrameAndSlider } from './videoFrame.js';
import { validationForm } from './validation_form.js';
import { changeTheme } from './selectOption.js';
import { mapBox } from './map.js';

app();
burgermenu();
welcomSlider();
initComparisons();
videoFrameAndSlider();
galleryCreate();
calculationTickets();
popupTickets();
validationForm();
changeTheme();
mapBox();

console.log(`
155 баллов из 160
Слайдер в велкам секции листайте резво, четко уверенно=), без какой-нибудь плавности
НАдеюсь я со всем справился. Удачи вам!

1. Добавил пролистование слайдера в секции велком, на тач скрине (слайдер не библиотечный)
2. Бургер и Окно продажи билетов закрываются клавишей Esc
3. Добавлены попапы на карте на маркеры(при клике)
4. Слева снизу добавлена фиксированная кнопка смены темы + смена стиля карты.
5. Фиксирование (запрет прокрутки) экрана при фулскрине видео
`);
