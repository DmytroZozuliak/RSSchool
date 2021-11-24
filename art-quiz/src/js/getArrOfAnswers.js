import { shuffleArray } from './arrayMethods';

// получаем перемешенный массив из 4-х ответов включая правильный
export function getArrOfAuthorAnswers(objArt, currentAuthor, blitz) {
    // objArt - исходный массив ВСЕХ авторов
    // currentAuthor - текущий задаваемый автор
    // console.log(currentAuthor);
    let otherAuthors = objArt
        .map(el => el.author)
        .filter(authors => {
            if (currentAuthor !== authors) {
                return true;
            }
            return false;
        });
    let uniqueOtherAuthors = Array.from(new Set(otherAuthors));

    shuffleArray(uniqueOtherAuthors);

    let answers = [];
    if (blitz) {
        answers.push(currentAuthor);
        answers.push(uniqueOtherAuthors[0]);
    } else {
        answers.push(currentAuthor);
        answers.push(uniqueOtherAuthors[0]);
        answers.push(uniqueOtherAuthors[1]);
        answers.push(uniqueOtherAuthors[2]);
    }

    // shufling 2\4 answers
    shuffleArray(answers);

    return answers;
}

// получаем перемешенный массив из 4-х ответов включая правильный
export function getArrOfSrcAnswers(objArt, currentSrc) {
    // objArt - исходный массив ВСЕХ авторов
    // currentSrc - текущий номер правильной картинки
    let otherUrls = objArt
        .map(el => el.id)
        .filter(url => {
            if (currentSrc !== url) {
                return true;
            }
            return false;
        });

    shuffleArray(otherUrls);

    let answers = [];
    answers.push(currentSrc);
    answers.push(otherUrls[0]);
    answers.push(otherUrls[1]);
    answers.push(otherUrls[2]);

    // shufling 4 answers
    shuffleArray(answers);

    return answers;
}
