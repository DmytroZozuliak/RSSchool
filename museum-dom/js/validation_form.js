export function validationForm() {
  let inputName = document.querySelector('.form__name input');
  let alertName = document.querySelector('.form__name-alert');
  let inputEmail = document.querySelector('.form__mail input');
  let alertEmail = document.querySelector('.form__mail-alert');
  let inputPhone = document.querySelector('.form__phone input');
  let alertPhone = document.querySelector('.form__phone-alert');
  let submitBtn = document.querySelector('.form__right-side-btn');

  //   валидация имени пользователя. Имя пользователя должно содержать от 3 до 15 символов, в качестве символов могут быть использованы буквы английского или русского алфавита в нижнем или верхнем регистре и пробелы
  inputName.addEventListener('change', () => {
    checkChange(inputName, alertName);
  });
  inputName.addEventListener('input', () => {
    checkInput(inputName, alertName);
  });

  function checkInput(input, alert) {
    if (input.validity.patternMismatch) {
      alert.classList.add(`active`);
    } else {
      input.classList.remove(`active`);
      alert.classList.remove(`active`);
    }
  }
  function checkChange(input, alert) {
    if (input.validity.patternMismatch) {
      input.classList.add(`active`);
      alert.classList.add(`active`);
    } else {
      input.classList.remove(`active`);
      alert.classList.remove(`active`);
    }
  }

  //валидация e-mail должна пропукать только адреса вида username@example.com, где: username - имя пользователя, должно содержать от 3 до 15 символов (буквы, цифры, знак подчёркивания, дефис), не должно содержать пробелов; @ - символ собачки; example - домен первого уровня состоит минимум из 4 латинских букв; com - домен верхнего уровня, отделяется от домена первого уровня точкой и состоит минимум из 2 латинских букв
  inputEmail.addEventListener('change', () => {
    checkChange(inputEmail, alertEmail);
  });
  inputEmail.addEventListener('input', () => {
    checkInput(inputEmail, alertEmail);
  });

  //валидация номера телефона: номер содержит только цифры; без разделения или с разделением на две или три цифры; разделение цифр может быть через дефис или пробел; с ограничением по количеству цифр не больше 10 цифр
  /* 			pattern="^(\d{1,10}|(\d{2}[- ]?){2,5}|(\d{3}[- ]?){3})$" required> */
  function checkNumberChange() {
    let regExp = new RegExp(/^(\d{1,10}|(\d{2,3}(-|\s)){1,4}\d{2,3})$/gm);
    let onlyDigits = parseInt(inputPhone.value.replace(/\D+/g, ''));
    if (!regExp.test(inputPhone.value)) {
      inputPhone.classList.add(`active`);
      alertPhone.classList.add(`active`);
    } else if (onlyDigits.toString().length > 10) {
      inputPhone.classList.add(`active`);
      alertPhone.classList.add(`active`);
    } else {
      inputPhone.classList.remove(`active`);
      alertPhone.classList.remove(`active`);
    }
  }

  function checkNumberInput() {
    let regExp = new RegExp(/^(\d{1,10}|(\d{2,3}(-|\s)){1,4}\d{2,3})$/gm);
    let onlyDigits = parseInt(inputPhone.value.replace(/\D+/g, ''));
    if (!regExp.test(inputPhone.value)) {
      alertPhone.classList.add(`active`);
    } else if (onlyDigits.toString().length > 10) {
      alertPhone.classList.add(`active`);
    } else {
      inputPhone.classList.remove(`active`);
      alertPhone.classList.remove(`active`);
    }
  }

  inputPhone.addEventListener('change', () => {
    checkNumberChange();
  });
  inputPhone.addEventListener('input', () => {
    checkNumberInput();
  });
}
