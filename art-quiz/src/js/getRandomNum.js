export function getRandomNum(min, max) {
    let minN = Math.ceil(min);
    let maxN = Math.floor(max);
    return Math.floor(Math.random() * (maxN - minN + 1)) + minN;
}
