import { el, setChildren, setAttr, setStyle } from 'redom';
import validator from 'validator';
import './css/style.scss';
import { authorize, getDataOfAccount } from './js/api.js';
//const checkWithMoonAlg = require('./moon.js');
import { createSelect } from './js/select.js';
import { createChart } from './js/charts';
import { format } from 'd3-format';
//?episode_id=${object.results[num].episode_id}
//const pageParams = new URLSearchParams(window.location.search);
let f = format('.4s');
function createLoginScreen() {
  history.pushState(null, '', '../index.html');
  const header = el('header.header');
  const container = el('.container', { class: 'flex-container' });
  const fixContainer = el('.container');
  const main = el('main.main');
  const title = el('h1', 'Coin.');
  const menu = el('nav.header__menu');
  const form = el('form.form', { class: 'options' });

  setChildren(window.document.body, [header, main]);
  setChildren(header, container);
  setChildren(container, [title, menu]);
  setChildren(main, fixContainer);
  setChildren(fixContainer, form);
  setChildren(form, [
    el('fieldset.form__fieldset', { class: '' }, [
      el('legend.form__legend', { class: '' }, 'Вход в аккаунт'),
      el('.form__container', { class: '' }, [
        el('.form__label-box', [
          el('label.form__label', { for: 'login' }, 'Логин'),
          el('input.form__input', {
            class: '',
            type: 'text',
            id: 'login',
            value: 'developer',
            placeholder: 'Placeholder',
          }),
        ]),
        el('.form__label-box', [
          el('label.form__label', { for: 'password' }, 'Пароль'),
          el('input.form__input', {
            class: '',
            type: 'password',
            id: 'password',
            value: 'skillbox',
            placeholder: 'Placeholder',
          }),
          el('span', {
            class: 'error success',
            type: 'text',
          }),
        ]),
      ]),
      el(
        'button.btn',
        { class: '', type: 'submit', disabled: 'disabled' },
        'Войти'
      ),
    ]),
  ]);
}

createLoginScreen();

function delAttr() {
  if (document.getElementsByClassName('success--border').length === 2) {
    submit.removeAttribute('disabled', 'disabled');
  }
}

const formInputs = document.querySelectorAll('.form__input');
const submit = document.querySelector('[type="submit"]');

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

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const myLogin = document.getElementById('login').value.trim();
  const myPassword = document.getElementById('password').value.trim();
  authorize(myLogin, myPassword);
});

export function createListOfCards() {
  history.pushState(null, '', '../index.html/accounts');
  const form = document.querySelector('form');
  const menu = document.querySelector('nav');
  const list = el('ul.header__list');
  const mainBlock = document.querySelector('.main .container');
  const mainWrap = el('.main__wrap');
  const title = el('h2.main__title', 'Ваши счета');
  const customSelect = el('.custom-select');
  const selectSort = el('select.main__select');
  const btnCreate = el('button.btn', { class: 'main__btn' }, [
    el('p', [
      el('span.plus'),
      el('span.main__btn_title', 'Создать новый счёт'),
    ]),
  ]);
  const blockOfAccounts = el('.main__block');

  form.remove();

  setChildren(menu, list);
  setChildren(list, { class: '' }, [
    el('li.header__item', { class: 'list-reset' }, [
      el('a.header__link', { href: '?ATM' }, 'Банкоматы'),
    ]),
    el('li.header__item', { class: 'list-reset' }, [
      el(
        'a.header__link',
        { href: 'http://localhost:8080/index.html/accounts', class: 'active' },
        'Счета'
      ),
    ]),
    el('li.header__item', { class: 'list-reset' }, [
      el('a.header__link', { href: '?currency' }, 'Валюта'),
    ]),
    el('li.header__item', { class: 'list-reset' }, [
      el('a.header__link', { href: '?logout' }, 'Выйти'),
    ]),
  ]);
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

  // document.querySelector('.main__btn').addEventListener('click', () => {
  //   createAccount();
  // });
}

export function createCardOfAccount(data) {
  const blockOfAccounts = document.querySelector('.main__block');
  const cardBlock = el('.main__card_block');
  const date = new Date(data.payload[0].transactions[0].date)
    .toLocaleString('ru', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    .slice(0, -2);
  const card = el('.main__card');
  const number = el('h3.main__card_number', data.payload[0].account);
  const amount = el(
    'p.main__card_balance',
    `${data.payload[0].balance.toLocaleString('ru')} ₽`
  );
  const btnOpen = el(
    'a.btn',
    { class: 'main__btn-open', href: `?id=${data.payload[0].account}` },
    'Открыть'
  );

  const dateOfTransaction = el('div.main__trans-block', [
    el('h4.main__transaction', 'Последняя транзакция:'),
    el('time.main__trans-date', `${date}`),
  ]);

  setChildren(blockOfAccounts, card);
  setChildren(cardBlock, [dateOfTransaction, btnOpen]);
  setChildren(card, [number, amount, cardBlock]);

  document.querySelector('.main__btn-open').addEventListener('click', (e) => {
    e.preventDefault();
    history.pushState(
      null,
      '',
      `../index.html/accounts?id=${data.payload[0].account}`
    );
    getDataOfAccount();
  });
}

export async function checkAccount(data, newArr, months) {
  const title = document.querySelector('.main__title');
  const block = document.querySelector('.main__block');
  const btnTitle = document.querySelector('.main__btn_title');
  const active = document.querySelector('.active');
  const select = document.querySelector('.custom-select');
  const mainWrap = document.querySelector('.main__wrap');
  const plus = document.querySelector('.plus');
  const blockOfData = el('.main__block-data');
  const wrap = el('.wrap', [
    el('p.main__account', `№ ${data.payload.account}`),
    el('p.main__balance', 'Баланс', [
      el(
        'span.main__balance_amount',
        `${data.payload.balance.toLocaleString('ru')} ₽`
      ),
    ]),
  ]);

  const dynamics = el('section.main__dynamics', [
    el('h4', 'Динамика баланса'),
    el('.chart-block', [
      el('.labels-x', [
        el(
          'canvas#myChart',
          { width: 510, height: 165 },
          'Браузер не поддерживает Canvas'
        ),
        el('.xAxis', {}, [
          el('p.max', `${f(Math.max.apply(null, newArr))}`),
          el('p', `${f(Math.min.apply(null, newArr))}`),
        ]),
      ]),

      el('.yAxis', {}, [
        el('span', months[0]),
        el('span', months[1]),
        el('span', months[2]),
        el('span', months[3]),
        el('span', months[4]),
        el('span', months[5]),
      ]),
    ]),
  ]);
  const transactions = data.payload.transactions;

  const form = el('form.form_trans', { class: 'options' });
  const historyOfTransactions = el('.main__history', { class: 'options' });
  const h4 = el('h4', 'История переводов');
  const table = el('table');
  const thead = el('thead', [
    el('tr', [
      el('td', 'Счет отправителя'),
      el('td', 'Счет получателя'),
      el('td', 'Сумма'),
      el('td', 'Дата'),
      el('td'),
      el('td'),
      el('td'),
      el('td'),
    ]),
  ]);
  setChildren(table, [
    thead,
    transactions.map((item) =>
      el('tr', [
        el('td', item.from),
        el('td', item.to),
        el('td', item.amount),
        el(
          'td',
          new Date(`${item.date}`).toLocaleString('ru', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
          })
        ),
      ])
    ),
  ]);

  setChildren(historyOfTransactions, table);

  title.textContent = 'Просмотр счета';
  btnTitle.textContent = 'Вернуться назад';
  setAttr(plus, { class: 'arrow' });
  setStyle(mainWrap, { 'margin-bottom': '19px' });
  active.classList.remove('active');
  select.remove();

  setChildren(form, [
    el('fieldset.form__fieldset', { class: '' }, [
      el('legend.form__legend', { class: '' }, 'Новый перевод'),
      el('.form__container', { class: '' }, [
        el('.form__label-box', [
          el('label.form__label', { for: 'accNum' }, 'Номер счёта получателя'),
          el('input.form__input', {
            class: '',
            type: 'text',
            id: 'accNum',
            placeholder: 'Placeholder',
          }),
        ]),
        el('.form__label-box', [
          el('label.form__label', { for: 'amountTrans' }, 'Сумма перевода'),
          el('input.form__input', {
            class: '',
            type: 'number',
            id: 'amountTrans',
            placeholder: 'Placeholder',
          }),
          el('span', {
            class: 'error success',
            type: 'text',
          }),
        ]),
      ]),
      el(
        'button.btn',
        { class: 'send', type: 'submit', disabled: 'disabled' },
        [el('p', [el('span.mail'), el('span', 'Отправить')])]
      ),
    ]),
  ]);
  setChildren(blockOfData, [form, dynamics, historyOfTransactions]);
  setChildren(block, [wrap, blockOfData]);
  createChart(newArr);
}

export async function getBalance(data) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const firstMonth = currentDate.setMonth(currentMonth - 5);
  const init = new Date(firstMonth).getMonth() + 1;
  const arr = [];
  const base = data.payload.transactions;
  let currentBalance = data.payload.balance;
  let newArr = [currentBalance];
  let months = [];
  for (let i = 0; i < 6; i++) {
    let receipts = base
      .filter(
        (obj) =>
          init + i == new Date(obj.date).getMonth() + 1 &&
          new Date(obj.date).getTime() > firstMonth
      )
      .filter((acc) => acc.to == data.payload.account)
      .map((item) => item.amount)
      .reduce((sum, current) => sum + current, 0);

    let expenses = base
      .filter(
        (obj) =>
          init + i == new Date(obj.date).getMonth() + 1 &&
          new Date(obj.date).getTime() > firstMonth
      )
      .filter((acc) => acc.from == data.payload.account)
      .map((item) => item.amount)
      .reduce((sum, current) => sum + current, 0);

    let result = receipts - expenses;

    arr.push(+result.toFixed(2));
  }
  arr.reverse();

  for (let j = 0; j < arr.length - 1; j++) {
    currentBalance = currentBalance - arr[j];
    newArr.push(+currentBalance.toFixed(2));
  }
  newArr.reverse();
  console.log(newArr);
  getMonths(currentDate, currentMonth, months);
  checkAccount(data, newArr, months);
}

function getMonths(currentDate, currentMonth, months) {
  let options = {
    month: 'long',
  };
  for (let i = 0; i < 6; i++) {
    let month = currentDate.setMonth(currentMonth - i);
    let name = new Date(month).toLocaleString('ru', options).substr(0, 3);
    months.unshift(name);
  }
  return months;
}
