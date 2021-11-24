import { createArt } from './getDataFromJSON';

function sliceArrToCategorie(objArt, index) {
    let stage;
    switch (index) {
        case 0:
            stage = [...objArt.slice(0, 10)];
            break;
        case 10:
            stage = [...objArt.slice(10, 20)];
            break;
        case 20:
            stage = [...objArt.slice(20, 30)];
            break;
        case 30:
            stage = [...objArt.slice(30, 40)];
            break;
        case 40:
            stage = [...objArt.slice(40, 50)];
            break;
        case 50:
            stage = [...objArt.slice(50, 60)];
            break;
        case 60:
            stage = [...objArt.slice(60, 70)];
            break;
        case 70:
            stage = [...objArt.slice(70, 80)];
            break;
        case 80:
            stage = [...objArt.slice(80, 90)];
            break;
        case 90:
            stage = [...objArt.slice(90, 100)];
            break;
        case 100:
            stage = [...objArt.slice(100, 110)];
            break;
        case 110:
            stage = [...objArt.slice(110, 120)];
            break;
        case 120:
            stage = [...objArt.slice(120, 130)];
            break;
        case 130:
            stage = [...objArt.slice(130, 140)];
            break;
        case 140:
            stage = [...objArt.slice(140, 150)];
            break;
        case 150:
            stage = [...objArt.slice(150, 160)];
            break;
        case 160:
            stage = [...objArt.slice(160, 170)];
            break;
        case 170:
            stage = [...objArt.slice(170, 180)];
            break;
        case 180:
            stage = [...objArt.slice(180, 190)];
            break;
        case 190:
            stage = [...objArt.slice(190, 200)];
            break;
        case 200:
            stage = [...objArt.slice(200, 210)];
            break;
        case 210:
            stage = [...objArt.slice(210, 220)];
            break;
        case 220:
            stage = [...objArt.slice(220, 230)];
            break;
        case 230:
            stage = [...objArt.slice(230, 240)];
            break;
        default:
            console.log('default');
    }
    return stage;
}

// генерация Вопросов для каждой категории
export async function generateQuestion(index, parent, nextQuestionFunc) {
    let objArt = await createArt();
    let stage = sliceArrToCategorie(objArt, index);

    nextQuestionFunc(objArt, stage, parent, index);
}
