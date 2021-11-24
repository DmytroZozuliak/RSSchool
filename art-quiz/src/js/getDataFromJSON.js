// imoprt JSON
import postResult from './postResult.json';
export async function createArt() {
    let data = await fetch(postResult);
    let objArt = await data.json();
    /* {
        "author": "Павел Федотов",
        "name": "Сватовство майора",
        "subject": "Жанровая сцена",
        "style": "Реализм",
        "year": "1852",
        "id": "0"
    }, */
    return objArt;
}
