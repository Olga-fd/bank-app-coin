import validator from 'validator';
import { el, setChildren } from 'redom';

function delAttr() {
  const submit = document.querySelector('[type="submit"]');
  if (document.getElementsByClassName('success--border').length === 2) {
    submit.removeAttribute('disabled', 'disabled');
  }
}

export async function createNewAccount() {
  let { createAccount } = await import('./api.js');
  let { createListOfAccounts } = await import('../index.js');
  document.querySelector('.js-new').addEventListener('click', () => {
    const blockOfAccounts = document.querySelector('.main__block');
    blockOfAccounts.innerHTML = '';
    createAccount();
    createListOfAccounts();
  });
}

export async function showAccounts() {
  let accounts = document.querySelector('.accounts');
  let { createPanel, createListOfAccounts } = await import('../index.js');
  accounts.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.main').innerHtml = '';
    createPanel();
    createListOfAccounts();
  });
}

export async function returnList() {
  let btn = document.querySelector('.return');
  let { createListOfAccounts } = await import('../index.js');
  btn.addEventListener('click', async () => {
    document.querySelector('main .container').innerHTML = '';
    history.pushState(null, '', './accounts');

    const mainBlock = document.querySelector('.main .container');
    const mainWrap = el('.main__wrap');
    const title = el('h2.main__title', 'Ваши счета');
    const customSelect = el('.custom-select');
    const selectSort = el('select.main__select');
    const btnCreate = el('button.btn', { class: 'main__btn js-new' }, [
      el('p', [
        el('span.plus'),
        el('span.main__btn_title', 'Создать новый счёт'),
      ]),
    ]);
    const blockOfAccounts = el('.main__block', { class: 'grid' });
    let { createSelect } = await import('./select.js');
    setChildren(mainBlock, [mainWrap, blockOfAccounts]);
    setChildren(mainWrap, [title, customSelect, btnCreate]);
    setChildren(customSelect, selectSort);
    setChildren(selectSort, [
      el('option', 'Сортировка'),
      el('option', 'По номеру'),
      el('option', 'По балансу'),
      el('option', 'По последней транзакции'),
    ]);
    createSelect();
    createListOfAccounts();
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
  let { checkAccount } = await import('../index.js');
  document.querySelectorAll('.main__btn-open').forEach((open) =>
    open.addEventListener('click', (e) => {
      e.preventDefault();
      history.pushState(null, '', open.href);
      blockOfAccounts.classList.remove('grid');
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

export async function sendMoney() {
  let { transfer } = await import('../index.js');
  const formTrans = document.querySelector('.form_trans');
  formTrans.addEventListener('submit', (e) => {
    e.preventDefault();
    transfer();
  });
}

export async function showDynamics() {
  const dynamics = document.querySelector('.main__dynamics');
  let { showHistoryOfBalance, showRatio } = await import('../index.js');
  dynamics.addEventListener('click', () => {
    showHistoryOfBalance();
    showRatio();
  });
}

export function showCurrencyExchange() {
  let currency = document.querySelector('.currency');
  currency.addEventListener('click', async (e) => {
    e.preventDefault();
    document.querySelector('main .container').innerHtml = '';
    let { getCurrencyExchange } = await import('../index.js');
    getCurrencyExchange();
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
