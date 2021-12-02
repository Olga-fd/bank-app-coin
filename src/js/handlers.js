/* eslint-disable prettier/prettier */
import validator from 'validator';
import { el, setChildren } from 'redom';
import { createListOfAccounts } from '../index.js';
import { showSpecificTemplate } from './skeleton.js';
// import { init } from './map.js';
// import { getMap } from './api.js';

function delAttr() {
  const submit = document.querySelector('[type="submit"]');
  const successBorder = document.getElementsByClassName('success--border');

  if (submit.innerText === 'Войти' || submit.innerText === 'Отправить') {
    if (successBorder.length === 2) {
      submit.removeAttribute('disabled', 'disabled');
    }
  } else if(submit.innerText === 'Обменять') {
    if (successBorder.length === 1) {
      submit.removeAttribute('disabled', 'disabled');
    }
  } else {return}
}

export async function createNewAccount() {
  let { createAccount } = await import('./api.js');
  //let { createListOfAccounts } = await import('../index.js');
  const btn = document.querySelector('.main__btn');
  btn.addEventListener('click', () => {
    const blockOfAccounts = document.querySelector('.main__block');
    blockOfAccounts.innerHTML = '';
    createAccount();
    createListOfAccounts();
  });
}

export async function showAccounts() {
  let accounts = document.querySelector('.accounts');
  let { createPanel } = await import('../index.js');
  accounts.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('main .container').innerHTML = '';
    createPanel();
    createListOfAccounts();
  });
}

export async function returnList() {
  let { createPanel } = await import('../index.js');
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
// export function changeURL() {
//   window.addEventListener('popstate', async function () {
//     // console.log("location: " + location.href + ", state: " + JSON.stringify(event.state));
//     //history.pushState({page: 1}, "title 1", `${window.location.search}`);
//     let { checkAccount } = await import('../index.js');
//     let { getDataWithAccounts } = await import('./api.js');
//     const pageParams = new URLSearchParams(window.location.search);
//     if (pageParams.get('accounts')) {
//       document.querySelector('body').innerHTML = '';
//       getDataWithAccounts();
//     } else if (pageParams.get('id')) {
//       document.querySelector('main container').innerHTML = '';
//       checkAccount();
//     }
//   });
// }

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
  //const accNum = document.getElementById('accNum').value.length;|| accNum < 16
  formInputs.forEach((input) => {
    input.addEventListener('blur', () => {
      const lengthInput = validator.isLength(input.value);
      const space = validator.contains(input.value, ' ');
      const isNumeric = validator.isNumeric(input.value);

      if (lengthInput == false || space == true || isNumeric == false || input.value <= 0 ) {
        input.classList.add('error--border');
      // console.log(lengthInput == false);
      // console.log(space == true);
      // console.log(isNumeric == false);
      // console.log(input.value <= 0);
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

// export function validateSum() {
//   const formInput = document.querySelector('.form__input');
//   const btn = document.querySelector('[type="submit"]');
//   formInput.addEventListener('blur', () => {
//     if (parseInt(formInput.value.trim()) > 0 && typeof parseInt(formInput.value.trim()) == 'number'
//     ) {
//       formInput.classList.remove('error--border');
//       formInput.classList.add('success--border');

//       btn.removeAttribute('disabled', 'disabled');
//     } else {
//       formInput.classList.remove('success--border');
//       formInput.classList.add('error--border');
//       return;
//     }
//   });
  // formInput.addEventListener('focus', () => {
  //   let elem = document.activeElement;
  //   if (elem !== btn) cleanError(elem);
  // }, true);
//}

export async function sendMoney() {
  let { transfer } = await import('../index.js');
  const formTrans = document.querySelector('.form_trans');
  formTrans.addEventListener('submit', (e) => {
    e.preventDefault();
    transfer();
  });
}

export async function showDynamics() {
  let { changePanel } = await import('../index.js');
  const dynamics = document.querySelector('.main__dynamics');
  dynamics.addEventListener('click', async () => {
    history.pushState(null, '', `${window.location.search}&history=true`);
    const blockOfAccounts = document.querySelector('.main__block-data');
    blockOfAccounts.classList.add('main__block-data--new');
    blockOfAccounts.innerHTML = '';
    changePanel();
    setTimeout(() => {
      createBlocks(blockOfAccounts);
    }, 100)
  });
}

async function createBlocks(blockOfAccounts) {
  let {createTableOfHistory} = await import('../index.js');
  let { showHistoryOfBalance, showRatio, showTransactions } = await import('../index.js');
  let { getDataOfAccount } = await import('./api.js');
  const data = await getDataOfAccount();
  const chart = el('section.main__dynamics', { class: 'dynamics--annual' });
  const dynamicsRatio = el('section.main__ratio');
  const historyOfTransactions = el('.main__history', { class: 'options' });

  setChildren(blockOfAccounts, [chart, dynamicsRatio, historyOfTransactions]);
  dynamicsRatio.style.padding = '25px 98px';

  showHistoryOfBalance(data, chart);
  showRatio(data, dynamicsRatio);
  createTableOfHistory(data, historyOfTransactions);
  showTransactions(data)
}

export function showCurrencyExchange() {
  let currency = document.querySelector('.currency');
  currency.addEventListener('click', async (e) => {
    e.preventDefault();
    document.querySelector('main .container').innerHTML = '';
    let { showSpecificTemplate, createCurrencyTemplate } = await import('./skeleton.js');
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

    let currencyFrom = document.querySelector('.first .select-selected').innerHTML;
    let currencyTo = document.querySelector('.second .select-selected').innerHTML;
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
  //const body = document.querySelector('body');
  let {createBankTemplate, showSpecificTemplate} = await import('./skeleton.js');
//let {getCoordinates} = await import('./api.js');
  atm.addEventListener('click', async (e) => {
    e.preventDefault();
    //let {init} = await import('./map.js');
    main.innerHTML = '';
    createBankTemplate();
    showSpecificTemplate('template4', 'main .container')
    // setChildren(main, [
    //   el('h2.main__title', 'Банкоматы'),
    //   el('#map'),
    // ]);
    // getCoordinates();
    //let script1 = el('script', {type: "text/javascript"}, `
      //let myMap;
      //function init() {
        //let myMap;
       // init(ymaps);
      //}
    //`);
    // let script2 = el('script', {
    //   src: 'https://api-maps.yandex.ru/2.1/?apikey=0c61dc80-6967-49f4-b0be-8b4ff68d5dda&lang=ru_RU',
    //   type: 'text/javascript'
    // })

    //body.append(script1);

  })
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
    main.innerHTML = '';
    createListOfAccounts();
  })
  )
}
