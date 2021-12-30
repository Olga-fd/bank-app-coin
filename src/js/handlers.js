/* eslint-disable prettier/prettier */
import validator from 'validator';
import { el, setChildren } from 'redom';
import { createListOfAccounts, createPanel } from '../index.js';
import { showSpecificTemplate } from './skeleton.js';
const checkWithMoonAlg = require('./moon.js');

function delAttr() {
  const submit = document.querySelector('[type="submit"]');
  const successBorder = document.getElementsByClassName('success--border');
  const accNum = document.getElementById('accNum');

  if (submit.innerText === 'Войти' || submit.innerText === 'Отправить') {
    if (successBorder.length === 2) {
      submit.removeAttribute('disabled', 'disabled');
      if (accNum) {
        accNum.classList.remove('js-visa', 'js-mir', 'js-mc');
      }
    }
  } else if(submit.innerText === 'Обменять') {
    if (successBorder.length === 1) {
      submit.removeAttribute('disabled', 'disabled');
    }
  } else {return}
}

export async function createNewAccount() {
  let { createAccount } = await import('./api.js');
  const btn = document.querySelector('.main__btn');
  btn.addEventListener('click', () => {
    createAccount();
    createListOfAccounts();
  });
}

export async function showAccounts() {
  let accounts = document.querySelector('.accounts');
  accounts.addEventListener('click', (e) => {
    e.preventDefault();
    history.pushState(null, '', './accounts');
    createPanel();
    createListOfAccounts();
  });
}

export async function returnList() {
  let btn = document.querySelector('.main__btn');
  btn.addEventListener('click', async () => {
    document.querySelector('main .container').innerHTML = '';
    history.pushState(null, '', './accounts');
    document.querySelector('.accounts').classList.add('active');;
    createPanel();
    createListOfAccounts();
  });
}

export async function returnFromHistory() {
  let { modifyPanel, checkAccount } = await import('../index.js');
  let btn = document.querySelector('.main__btn');
  const mainBlock = document.querySelector('.main__block-data');

  btn.addEventListener('click', async () => {
    btn.remove();
    mainBlock.innerHTML = '';
    mainBlock.classList.remove('main__block-data--new');
    history.pushState(null, '', window.location.search.replace('&history=true',''));
    modifyPanel();
    checkAccount(5, 6);
  });
}

export async function openAccount(blockOfAccounts) {
  let { modifyPanel, checkAccount } = await import('../index.js');
  document.querySelectorAll('.main__btn-open').forEach((open) =>
    open.addEventListener('click', (e) => {
      e.preventDefault();
      history.pushState(null, '', open.href);
      blockOfAccounts.classList.remove('grid');
      blockOfAccounts.innerHTML = '';
      modifyPanel();
      checkAccount(5, 6);
    })
  );
}

export async function submitForm() {
  let { authorize } = await import('./api.js');
  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const myLogin = document.getElementById('login').value.trim();
    const myPassword = document.getElementById('password').value.trim();
    authorize(myLogin, myPassword);
  });
}

export function validate() {
  const formInputs = document.querySelectorAll('.form__input');

  formInputs.forEach((input) => {
    input.addEventListener('blur', () => {
      const lengthInput = validator.isLength(input.value, { min: 6 });
      const space = validator.contains(input.value, ' ');

      if (lengthInput == false || space == true) {
        input.classList.add('error--border');
      } else {
        input.classList.add('success--border');
      }
      delAttr();
    });
  });
}

export function validateFormTrans() {
  const formInputs = document.querySelectorAll('.form__input');
  formInputs.forEach((input) => {
    input.addEventListener('blur', () => {
      const lengthInput = validator.isLength(input.value);
      const space = validator.contains(input.value, ' ');
      const isNumeric = validator.isNumeric(input.value);

      if (lengthInput == false || space == true || isNumeric == false || input.value <= 0 ) {
        input.classList.add('error--border');
      } else {
        input.classList.add('success--border');
      }
      delAttr();
    });

    input.addEventListener('focus', () => {
      const submit = document.querySelector('[type="submit"]');
      input.value = '';
      input.classList.remove('error--border');
      input.classList.remove('success--border');
      submit.setAttribute('disabled', 'disabled');
    });
  })
}

export async function sendMoney() {
  let { transfer } = await import('../index.js');
  const formTrans = document.querySelector('.form_trans');
  formTrans.addEventListener('submit', (e) => {
    e.preventDefault();
    transfer();
  });
}

export async function showDynamics() {
  let { changePanel, createBlocks } = await import('../index.js');
  const dynamics = document.querySelector('.main__dynamics');
  const table = document.querySelector('table');
  const array = [dynamics, table];
  array.forEach(elem => {
    elem.addEventListener('click', async () => {
      history.pushState(null, '', `${window.location.search}&history=true`);
      const blockOfAccounts = document.querySelector('.main__block-data');
      blockOfAccounts.classList.add('main__block-data--new');
      blockOfAccounts.innerHTML = '';
      changePanel();
      setTimeout(() => {
        createBlocks(blockOfAccounts);
      }, 100)
    });
  })

}

export function showCurrencyExchange() {
  let currency = document.querySelector('.currency');
  currency.addEventListener('click', async (e) => {
    e.preventDefault();
    history.pushState(null, '', './currency');
    //document.querySelector('main .container').innerHTML = '';
    let { createCurrencyTemplate } = await import('./skeleton.js');
    let { getCurrencyExchange } = await import('../index.js');
    createCurrencyTemplate();
    showSpecificTemplate('template3', 'main .container');
    setTimeout(() => {
      getCurrencyExchange();
    }, 100);
  });
}

export async function stopScroll() {
  let { disableScroll } = await import('./scroll.js');
  document
    .querySelector('.main__section_ul')
    .addEventListener('mouseover', () => {
      disableScroll();
    });
}

export async function allowScroll() {
  let { enableScroll } = await import('./scroll.js');
  document
    .querySelector('.main__section_ul')
    .addEventListener('mouseout', () => {
      enableScroll();
    });
}

export function setActiveStay() {
  const btnsMenu = document.querySelectorAll('.header__link');
  btnsMenu.forEach((btn) =>
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (document.querySelector('.active')) {
        document.querySelector('.active').classList.remove('active');
      }
      btn.classList.add('active');
    })
  );
}

export async function exchangeCurrency() {
  let { buyCurrency } = await import('./api.js');
  let {createRows} = await import('../index.js');
  const list = document.querySelector('.main__section_ul');
  const formExchange = document.querySelector('.main__form-currency');
  const input = document.querySelector('.form__input');
  const btn = document.querySelector('.btn');
  const rows = [];

  formExchange.addEventListener('submit', async (e) => {
    e.preventDefault();

    let currencyFrom = document.querySelector('.first .select-selected').innerText;
    let currencyTo = document.querySelector('.second .select-selected').innerText;
    let amountToTransfer = input.value.trim();
    amountToTransfer = parseInt(amountToTransfer);

    let data = await buyCurrency(currencyFrom, currencyTo, amountToTransfer);
    input.value = '';
    input.classList.remove('success--border');
    btn.setAttribute('disabled', 'disabled');
    list.innerHTML = '';

    createRows(data, rows);
    setChildren(list, rows);
  });
}

export async function showATM() {
  const atm = document.querySelector('.atm');
  const main = document.querySelector('main .container');
  let {createBankTemplate} = await import('./skeleton.js');
  let {getCoordinates} = await import('./api.js');
  const data = await getCoordinates();
  const coordinates = data.payload;
  const script = el('script', {
      src: 'https://api-maps.yandex.ru/2.1/?apikey=0c61dc80-6967-49f4-b0be-8b4ff68d5dda&load=package.standard&lang=ru-RU',
    });

  document.querySelector('main').append(script);

  atm.addEventListener('click', async (e) => {
    e.preventDefault();
    //main.innerHTML = '';
    history.pushState(null, '', '../index.html/ATM');
    createBankTemplate();
    showSpecificTemplate('template4', 'main .container');

    setChildren(main, [
      el('h2.main__title', {style: 'margin-bottom: 56px'}, 'Карта банкоматов'),
      el('#map'),
    ]);

    ymaps.ready(function () {
      let myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 10,
        behaviors: ['default', 'scrollZoom']
      });

      for (let i = 0; i < coordinates.length; i++) {
        let myGeoObject = new ymaps.GeoObject({
          geometry: {
            type: "Point", // тип геометрии - точка
            coordinates: [coordinates[i].lat, coordinates[i].lon] // координаты точки
          },
          properties: {
            hintContent: 'Coin',
          },
        });

        // Размещение геообъекта на карте.
        myMap.geoObjects.add(myGeoObject);
      }
    });
  });
}

export async function logout() {
  let {createLoginScreen} = await import('../index.js');
  const btn = document.querySelector('[href="?logout"]');
  btn.addEventListener('click', () => {
    createLoginScreen();
  })
}


export function sortByKey() {
  const main = document.querySelector('.main__block');
  const options = document.querySelectorAll('.select-items div');

  options.forEach(option => option.addEventListener('click', () => {
    createListOfAccounts();
  })
  )
}

export function writeInputValues(arr) {
  let input = document.getElementById('accNum');

  input.addEventListener('change', () => {
    let record = input.value;
    if (record.length > 16) {
      arr.push(record);
      localStorage.setItem('records', JSON.stringify(arr));
    }
    if (arr.length > 10) {
      arr = [];
    }
  });
}

export function pushBtn(burger) {
  burger.addEventListener('click', (e) => {
    burger.classList.toggle('--modified');
    const nav = document.querySelector('.header__menu');
    if (e.currentTarget.id == 'burger') {
      nav.style.display = (nav.style.display != 'block') ? 'block' : 'none';
    };
  });
}

window.addEventListener('popstate', async function () {
  if (window.location.pathname.includes('index.html/')) {
    history.pushState(null, '', './accounts');
    document.querySelector('.active').classList.remove('active');
    document.querySelector('.accounts').classList.add('active');
    createPanel();
    createListOfAccounts();
  } else {
    let {createLoginScreen} = await import('../index.js');
    createLoginScreen();
  }
});

export function closeMenu() {
  document.body.addEventListener('click', (e) => {
    const nav = document.querySelector('.header__menu');
    const target = e.target;
    if (!target.closest('nav') && !target.closest('.header__burger-menu')) { // если этот элемент или его родительские элементы не окно навигации и не кнопка
      nav.style.display = 'none';
    }
  })
}

export function determinePaySys() {
  let numberOfCard = document.getElementById('accNum');
  numberOfCard.addEventListener('blur', (e) => {
    let str = numberOfCard.value.replace(/\s+/g, '');
    if (numberOfCard.value[0] == 2 && checkWithMoonAlg(str) == true) {
      numberOfCard.classList.add('js-mir');
    } else if (validator.isCreditCard(`${numberOfCard.value}`) === true) {
      if (numberOfCard.value[0] == 4) {
        numberOfCard.classList.add('js-visa');
      } else {
        numberOfCard.classList.add('js-mc');
      }
    }
  })
}
