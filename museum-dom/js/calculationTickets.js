export function calculationTickets() {
  // todo const

  // Btns up and Dwn (Basic, Senior)
  const amountBtnsUpBasic = document.querySelectorAll('.amountBtnUpBasic');
  const amountBtnsDwnBasic = document.querySelectorAll('.amountBtnDwnBasic');
  const amountBtnsUpSenior = document.querySelectorAll('.amountBtnUpSenior');
  const amountBtnsDwnSenior = document.querySelectorAll('.amountBtnDwnSenior');

  //   Basic inputs
  const amountBasic1 = document.querySelector('#amount_basic-1');
  const amountBasic2 = document.querySelector('#amount_basic-2');

  //   Senior inputs
  const amountSenior1 = document.querySelector('#amount_senior-1');
  const amountSenior2 = document.querySelector('#amount_senior-2');

  //   TextAmount
  const amountBasicText = document.querySelector(
    '.calculation__amount.basic-amount'
  );
  const amountSeniorText = document.querySelector(
    '.calculation__amount.senior-amount'
  );

  // radio input in Ticket section
  const radiosTicketSection = document.querySelectorAll(
    '.tickets__ticket-type input[type="radio"]'
  );
  const ticketPrice = document.querySelector('#ticketPrice');
  const ticketPricePopup = document.querySelector(
    '.calculation__total-price span'
  );
  const basicAmountPopup = document.querySelector('.basic-amount__total span');
  const seniorAmountPopup = document.querySelector(
    '.senior-amount__total span'
  );
  const ticketTypeText = document.querySelector('.overview__ticket');
  const ticketTimeText = document.querySelector('.overview__time');

  const basicSinglePrices = document.querySelectorAll('.basicSinglePrice');
  const seniorSinglePrices = document.querySelectorAll('.seniorSinglePrice');

  let radioValue;

  for (let radio of radiosTicketSection) {
    radio.addEventListener('change', () => {
      changeRadiosInPopup();
      calculateTickets();
    });
  }

  //   todo select tickets
  const selected = document.querySelector('.selected');
  const optionsContainer = document.querySelector('.options-container');
  const optionsList = optionsContainer.querySelectorAll('.option');

  //   all inputs
  const radiosTicketPopup = optionsContainer.querySelectorAll(
    'input[type="radio"]'
  );

  //   todo console

  selected.addEventListener('click', e => {
    optionsContainer.classList.toggle('active');
  });

  for (let selectPopUp of optionsList) {
    selectPopUp.addEventListener('click', () => {
      selected.innerHTML = selectPopUp.querySelector(' label').innerHTML;
      optionsContainer.classList.remove('active');

      changeRadiosInTicketSection();
      calculateTickets();
    });
  }

  //   todo select Time

  const selectedTime = document.querySelector('.selected-time');
  const optionsContainerTime = document.querySelector(
    '.options-container-time'
  );
  const optionsListTime = optionsContainerTime.querySelectorAll('.option-time');

  selectedTime.addEventListener('click', e => {
    optionsContainerTime.classList.toggle('active');
  });

  optionsListTime.forEach(optionTime => {
    optionTime.addEventListener('click', event => {
      selectedTime.innerHTML = optionTime.querySelector('label').innerHTML;
      optionsContainerTime.classList.remove('active');

      ticketTimeText.textContent = optionTime.querySelector('label').innerHTML;
      changeRadiosInPopup();
      calculateTickets();
    });
  });

  //   todo Btns + -
  //   клавиши класса бтн вверх Бейсик
  amountBtnsUpBasic.forEach(amountBtnUpBasic => {
    amountBtnUpBasic.addEventListener('click', () => {
      amountBasic1.stepUp();
      amountBasic2.stepUp();

      changeRadiosInPopup();
      calculateTickets();
    });
  });
  //   клавиши класса бтн вниз Бейсик
  amountBtnsDwnBasic.forEach(amountBtnDwnBasic => {
    amountBtnDwnBasic.addEventListener('click', () => {
      amountBasic1.stepDown();
      amountBasic2.stepDown();

      changeRadiosInPopup();
      calculateTickets();
    });
  });

  //   Senior Btns
  //   клавиши класса бтн вверх Senior
  amountBtnsUpSenior.forEach(amountBtnUpSenior => {
    amountBtnUpSenior.addEventListener('click', () => {
      amountSenior1.stepUp();
      amountSenior2.stepUp();

      changeRadiosInPopup();
      calculateTickets();
    });
  });
  //   клавиши класса бтн вниз Senior
  amountBtnsDwnSenior.forEach(amountBtnDwnSenior => {
    amountBtnDwnSenior.addEventListener('click', () => {
      amountSenior1.stepDown();
      amountSenior2.stepDown();

      changeRadiosInPopup();
      calculateTickets();
    });
  });

  // todo calculate function

  function calculateTickets() {
    if (!radioValue) {
      radioValue = 20;
    }
    let basicPrice = amountBasic1.value * radioValue;
    let seniorPrice = amountSenior1.value * (radioValue / 2);

    let totalPrice = basicPrice + seniorPrice;
    ticketPrice.textContent = totalPrice;
    ticketPricePopup.textContent = totalPrice;

    basicSinglePrices.forEach(basicSinglePrice => {
      basicSinglePrice.textContent = radioValue;
    });
    seniorSinglePrices.forEach(seniorSinglePrice => {
      seniorSinglePrice.textContent = radioValue / 2;
    });

    basicAmountPopup.textContent = basicPrice;
    seniorAmountPopup.textContent = seniorPrice;

    amountBasicText.textContent = +amountBasic1.value;
    amountSeniorText.textContent = +amountSenior1.value;

    if (radioValue == 20) {
      ticketTypeText.textContent = 'Permanent exhibition';
    } else if (radioValue == 25) {
      ticketTypeText.textContent = 'Temporary exhibition';
    } else if (radioValue == 40) {
      ticketTypeText.textContent = 'Combined Admission';
    }

    saveInLocalStorage();
  }

  //  set info ticket prices TO Local storage
  function saveInLocalStorage() {
    let basictTotal = amountBasic1.value;
    let seniorTotal = amountSenior1.value;
    let localAmounts = {
      radio: radioValue,
      basicAmount: basictTotal,
      seniorAmount: seniorTotal,
    };
    localStorage.setItem('tickets', JSON.stringify(localAmounts));
  }

  //   get info ticket prices from Local storage
  function getFromLocalStorage() {
    if (localStorage.getItem('tickets')) {
      let amountsFromLocal = localStorage.getItem('tickets');
      amountsFromLocal = JSON.parse(amountsFromLocal);

      radioValue = amountsFromLocal.radio;
      amountBasic1.value = +amountsFromLocal.basicAmount;
      amountSenior1.value = +amountsFromLocal.seniorAmount;
      amountBasic2.value = amountBasic1.value;
      amountSenior2.value = amountSenior1.value;
      amountBasicText.textContent = +amountBasic1.value;
      amountSeniorText.textContent = +amountSenior1.value;

      calculateTickets();
      for (let radioTickt of radiosTicketSection) {
        if (radioValue == radioTickt.value) {
          radioTickt.checked = true;
        }
      }
      changeRadiosInPopup();
    }
  }
  getFromLocalStorage();

  function changeRadiosInPopup() {
    for (let radio of radiosTicketSection) {
      if (radio.checked) {
        radioValue = radio.value;
      }
    }

    for (let radioTicktPopup of radiosTicketPopup) {
      if (radioValue == radioTicktPopup.value) {
        radioTicktPopup.checked = true;
      }
    }

    if (radioValue == 20) {
      selected.innerHTML = 'Permanent exhibition';
    } else if (radioValue == 25) {
      selected.innerHTML = 'Temporary exhibition';
    } else if (radioValue == 40) {
      selected.innerHTML = 'Combined Admission';
    }
    //  optionsContainer.classList.remove('active');
  }

  function changeRadiosInTicketSection() {
    for (let radio of radiosTicketPopup) {
      if (radio.checked) {
        radioValue = radio.value;
        // todo сравниваем с Радио тикетс и меняем радиотТикетс
        for (let radioTickt of radiosTicketSection) {
          if (radioValue == radioTickt.value) {
            radioTickt.checked = true;
          }
        }
      }
    }
  }

  //   todo установка даты
  //   пример Friday, August 19
  const inputDate = document.querySelector('#date');
  const ticketDateText = document.querySelector('.overview__date');

  inputDate.addEventListener('change', getDate);

  function getDate() {
    let setDate = new Date(this.value);
    let setMonth = setDate.getMonth();
    let setDay = setDate.getDate();
    let setDayOfWeek = setDate.getDay();

    let nameOfDays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    let nameOfMonths = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    ticketDateText.textContent =
      nameOfDays[setDayOfWeek] + ', ' + nameOfMonths[setMonth] + ' ' + setDay;

    changeRadiosInPopup();
    calculateTickets();
  }

  setMinDateOnLoad();
  function setMinDateOnLoad() {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();
    let currentDay = currentDate.getDate();
    if (currentDay.toString().length === 1) {
      currentDay = '0' + currentDay;
    }
    inputDate.setAttribute(
      'min',
      `${currentYear}-${currentMonth + 1}-${currentDay}`
    );
  }
}
