// ibg class for img

export function ibg() {
    let ibgImgs = document.querySelectorAll('.ibg');
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < ibgImgs.length; i++) {
        if (ibgImgs[i].querySelector('img')) {
            ibgImgs[i].style.backgroundImage =
                'url(' +
                ibgImgs[i].querySelector('img').getAttribute('src') +
                ')';
        }
    }
}
