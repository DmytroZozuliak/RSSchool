export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
        let j = Math.floor(Math.random() * (i + 1));
        // eslint-disable-next-line no-param-reassign
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function checkRightAnswersAmount(arr) {
    return arr.filter(el => {
        if (el === true) return true;
        return false;
    }).length;
}
