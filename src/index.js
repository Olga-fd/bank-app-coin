import { el, setChildren, setAttr, setStyle } from 'redom';
import './css/style.scss';
//import { showTemplate, createSkeleton } from './js/skeleton.js';
//const checkWithMoonAlg = require('./moon.js');
import { createSelect } from './js/select.js';
import { createChart } from './js/charts';
import { format } from 'd3-format';
import { validate } from './js/handlers.js';
//import WebSocket from 'ws';

//?episode_id=${object.results[num].episode_id}

async function createLoginScreen() {
  history.pushState(null, '', '../index.html');
  let { validate, submitForm } = await import('./js/handlers.js');
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
  validate();
  submitForm();
}

createLoginScreen();

export async function createHeader() {
  history.pushState(null, '', '../index.html/accounts');
  let { showATM } = await import('./js/handlers.js');
  let { setActiveStay, showCurrencyExchange, showAccounts } = await import(
    './js/handlers.js'
  );
  const form = document.querySelector('form');
  const menu = document.querySelector('nav');
  //const template = el('template#template');
  const list = el('ul.header__list');

  form.remove();
  setChildren(menu, list);
  setChildren(list, { class: '' }, [
    el('li.header__item', { class: 'list-reset' }, [
      el('a.header__link', { class: 'atm', href: '?ATM' }, 'Банкоматы'),
    ]),
    el('li.header__item', { class: 'list-reset' }, [
      el(
        'a.header__link',
        {
          href: 'http://localhost:8080/index.html/accounts',
          class: 'accounts active',
        },
        'Счета'
      ),
    ]),
    el('li.header__item', { class: 'list-reset' }, [
      el('a.header__link', { class: 'currency', href: '?currency' }, 'Валюта'),
    ]),
    el('li.header__item', { class: 'list-reset' }, [
      el('a.header__link', { href: '?logout' }, 'Выйти'),
    ]),
  ]);
  createPanel();
  setActiveStay();
  showATM();
  showAccounts();
  showCurrencyExchange();
  // createSkeleton(template, mainBlock, mainWrap, blockOfAccounts);
  // showTemplate();
}

export async function createPanel() {
  let { createNewAccount } = await import('./js/handlers.js');
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

  setChildren(mainBlock, [mainWrap, blockOfAccounts]);
  setChildren(mainWrap, [title, customSelect, btnCreate]);
  setChildren(customSelect, selectSort);
  setChildren(selectSort, [
    el('option', 'Сортировка'),
    el('option', 'По номеру'),
    el('option', 'По балансу'),
    el('option', 'По последней транзакции'),
  ]);
  let block = document.getElementsByClassName('custom-select');
  createSelect(block);
  createNewAccount();
}

export async function createListOfAccounts() {
  let { openAccount } = await import('./js/handlers.js');
  let { getInfoAboutAccounts } = await import('./js/api.js');
  let data = await getInfoAboutAccounts();
  const blockOfAccounts = document.querySelector('.main__block');
  const cards = [];

  for (let i = 0; i < data.payload.length; i++) {
    let cardBlock = el('.main__card_block');
    let date;
    let length = data.payload[i].transactions.length;
    if (length !== 0) {
      date = new Date(data.payload[i].transactions[length - 1].date)
        .toLocaleString('ru', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
        .slice(0, -2);
    } else {
      date = 'Данные отсутствуют';
    }

    let card = el('.main__card');
    let number = el('h3.main__card_number', data.payload[i].account);
    let amount = el(
      'p.main__card_balance',
      `${data.payload[i].balance.toLocaleString('ru')} ₽`
    );
    let btnOpen = el(
      'a.btn',
      { class: 'main__btn-open', href: `?id=${data.payload[i].account}` },
      'Открыть'
    );

    let dateOfTransaction = el('div.main__trans-block', [
      el('h4.main__transaction', 'Последняя транзакция:'),
      el('time.main__trans-date', `${date}`),
    ]);
    setChildren(cardBlock, [dateOfTransaction, btnOpen]);
    setChildren(card, [number, amount, cardBlock]);
    setChildren(blockOfAccounts, card);
    cards.push(card);
  }
  setChildren(blockOfAccounts, cards);
  openAccount(blockOfAccounts);
}

//===Создаем блок с графиком===
function createChartDynamics(newArr, months, dynamics, wid) {
  let f = format('.4s');
  const titleChart = el('h4', 'Динамика баланса');
  const chartBlock = el('.chart-block');
  const chartWithLabels = el('.chartWithLabels');
  const canvas = el(
    'canvas',
    { width: wid, height: 165 },
    'Браузер не поддерживает Canvas'
  );
  const xAxis = el('.xAxis', {}, [
    el('p.max', `${f(Math.max.apply(null, newArr))}`),
    el('p.subMax'),
    el('p.min', `${f(Math.min.apply(null, newArr))}`),
  ]);
  const yAxis = el('.yAxis');
  setChildren(
    yAxis,
    months.map((month) => el('span', month))
  );
  setChildren(chartWithLabels, [canvas, xAxis]);
  setChildren(chartBlock, [chartWithLabels, yAxis]);
  setChildren(dynamics, [titleChart, chartBlock]);

  return dynamics;
}

//===Создаем таблицу с историей транзакций===
function createTableOfHistory(data, historyOfTransactions) {
  const transactions = data.payload.transactions.reverse();
  const titleOfTable = el('h4', 'История переводов');
  const table = el('table');
  const tbody = el('tbody');
  const thead = el('thead', [
    el('tr', [
      el('td', 'Счет отправителя'),
      el('td', 'Счет получателя'),
      el('td', 'Сумма'),
      el('td', 'Дата'),
    ]),
  ]);
  setChildren(
    tbody,
    transactions.map((item) =>
      el('tr', [
        el('td', { class: 'js-transFrom' }, item.from),
        el('td', item.to),
        el('td', { class: 'js-amountTrans' }, item.amount),
        el(
          'td',
          new Date(`${item.date}`).toLocaleString('ru', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
          })
        ),
      ])
    )
  );
  setChildren(table, [thead, tbody]);
  setChildren(historyOfTransactions, [titleOfTable, table]);
  return historyOfTransactions;
}

//===Создаем форму транзакций===
async function createForm(form) {
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
  return form;
}

export async function checkAccount(n, m) {
  let { getDataOfAccount } = await import('./js/api.js');
  let data = await getDataOfAccount();
  let dataForChart = await getBalance(data, n, m);
  let { returnList, sendMoney, showDynamics } = await import(
    './js/handlers.js'
  );
  const title = document.querySelector('.main__title');
  const block = document.querySelector('.main__block');
  const btnTitle = document.querySelector('.main__btn_title');
  const btn = document.querySelector('.main__btn');
  const active = document.querySelector('.active');
  const select = document.querySelector('.custom-select');
  const mainWrap = document.querySelector('.main__wrap');
  const plus = document.querySelector('.plus');
  const blockOfData = el('.main__block-data');
  const form = el('form.form_trans', { class: 'options' });
  const dynamics = el('section.main__dynamics');
  const historyOfTransactions = el('.main__history', { class: 'options' });
  const wrap = el('.wrap', [
    el('p.main__account', `№ ${data.payload.account}`),
    el('p.main__balance', 'Баланс', [
      el(
        'span.main__balance_amount',
        `${data.payload.balance.toLocaleString('ru')} ₽`
      ),
    ]),
  ]);

  title.textContent = 'Просмотр счета';
  btnTitle.textContent = 'Вернуться назад';
  btn.classList.remove('js-new');
  btn.classList.add('return');
  returnList();
  setAttr(plus, { class: 'arrow' });
  setStyle(mainWrap, { 'margin-bottom': '19px' });
  active.classList.remove('active');
  select.remove();

  createChartDynamics(dataForChart.newArr, dataForChart.months, dynamics, 510);
  createForm(form);
  createTableOfHistory(data, historyOfTransactions);

  setChildren(blockOfData, [form, dynamics, historyOfTransactions]);
  setChildren(block, [wrap, blockOfData]);

  let canvas = document.querySelector('.main__dynamics canvas');

  createChart(dataForChart.newArr, canvas);
  showTransactions(data);
  validate();
  sendMoney();
  showDynamics();
  let observer = new IntersectionObserver(showRow, options);
  let visual = document.querySelectorAll('.js-visual');
  let target = visual[visual.length - 1];

  observer.observe(target);
}

export async function getBalance(data, n, m) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const firstMonth = currentDate.setMonth(currentMonth - n);
  const arr = [];
  const base = data.payload.transactions;
  let currentBalance = data.payload.balance;
  let newArr = [currentBalance];
  let months = [];
  let objRec = [];
  let objExp = [];
  let dates = [];
  getDates(dates, m);
  //console.log(dates);
  for (let i = 0; i < dates.length; i++) {
    let receipts = base
      .filter(
        (obj) =>
          dates[i] == new Date(obj.date).getMonth() + 1 &&
          new Date(obj.date).getTime() > firstMonth
      )
      .filter((acc) => acc.to == data.payload.account)
      .map((item) => item.amount)
      .reduce((sum, current) => sum + current, 0);

    let expenses = base
      .filter(
        (obj) =>
          dates[i] == new Date(obj.date).getMonth() + 1 &&
          new Date(obj.date).getTime() > firstMonth
      )
      .filter((acc) => acc.from == data.payload.account)
      .map((item) => item.amount)
      .reduce((sum, current) => sum + current, 0);

    let result = receipts - expenses;
    objRec.push(+receipts.toFixed(2));
    objExp.push(+expenses.toFixed(2));
    arr.push(+result.toFixed(2));
  }
  arr.reverse();

  for (let j = 0; j < arr.length - 1; j++) {
    currentBalance = currentBalance - arr[j];
    newArr.push(+currentBalance.toFixed(2));
  }
  newArr.reverse();
  getMonths(currentDate, currentMonth, months, n);

  return {
    newArr,
    months,
    objRec,
    objExp,
  };
}

function getMonths(currentDate, currentMonth, months, n) {
  let options = {
    month: 'long',
  };
  for (let i = 0; i < n + 1; i++) {
    let month = currentDate.setMonth(currentMonth - i);
    let name = new Date(month).toLocaleString('ru', options).substr(0, 3);
    months.unshift(name);
  }
  return months;
}

function showTransactions(data) {
  const accountFrom = document.querySelectorAll('.js-transFrom');
  const amount = document.querySelectorAll('.js-amountTrans');

  for (let i = 0; i < accountFrom.length; i++) {
    if (accountFrom[i].innerText == data.payload.account) {
      amount[i].classList.add('expenses');
      amount[i].textContent = `- ${Number(amount[i].innerText).toLocaleString(
        'ru-RU'
      )} ₽`;
    } else {
      amount[i].classList.add('receipts');
      amount[i].textContent = `+ ${Number(amount[i].innerText).toLocaleString(
        'ru-RU'
      )} ₽`;
    }
  }
  if (accountFrom.length > 25) {
    for (let j = 0; j < accountFrom.length; j++) {
      if (j < 25) {
        accountFrom[j].parentNode.classList.add('js-visual');
      } else {
        accountFrom[j].parentNode.classList.add('visually-hidden');
      }
    }
  }
}

// OBSERVER

let options = {
  root: document.querySelector('table'),
  rootMargin: '0px',
  threshold: 0,
};

function showRow(entries, observer) {
  entries.forEach((entry) => {
    const hidden = document.querySelectorAll('.visually-hidden');
    if (entry.isIntersecting) {
      for (let j = 0; j < 25; j++) {
        hidden[j].classList.remove('visually-hidden');
        hidden[j].classList.add('js-visual');
      }
    }
    observer.unobserve(entry.target);
    observer.observe(hidden[hidden.length - 1]);
  });
}

export async function transfer() {
  const pageParams = new URLSearchParams(window.location.search);
  let inputs = document.querySelectorAll('.form__input');
  let accFrom = pageParams.get('id');
  let accTo = document.getElementById('accNum').value;
  let amount = document.getElementById('amountTrans').value;
  let btnSend = document.querySelector('.send');
  let { transferFunds } = await import('./js/api.js');
  transferFunds(accFrom, accTo, amount);
  inputs.forEach((input) => {
    input.value = '';
    input.classList.remove('success--border');
  });
  btnSend.setAttribute('disabled');
}

export async function showHistoryOfBalance() {
  let { getDataOfAccount } = await import('./js/api.js');
  let data = await getDataOfAccount();
  let { createChart } = await import('./js/charts.js');
  const blockOfAccounts = document.querySelector('.main__block-data');
  const dynamics = document.querySelector('.main__dynamics');
  let canvas = document.querySelector('canvas');
  const formTrans = document.querySelector('.form_trans');
  const title = document.querySelector('.main__title');
  blockOfAccounts.classList.add('main__block-data--new');
  dynamics.style.width = '100%';
  dynamics.style.padding = '25px 98px';
  title.textContent = 'История баланса';
  formTrans.remove();
  canvas.remove();

  let dataForChart = await getBalance(data, 11, 12);
  createChartDynamics(dataForChart.newArr, dataForChart.months, dynamics, 1000);
  canvas = document.querySelector('.main__dynamics canvas');
  createChart(dataForChart.newArr, canvas);
}

export async function showRatio() {
  let { getDataOfAccount } = await import('./js/api.js');
  let { createStackedChart } = await import('./js/charts.js');
  let data = await getDataOfAccount();
  let dataForChart = await getBalance(data, 11, 12);
  let blockOfAccounts = document.querySelector('.main__block-data--new');
  let chart = document.querySelector('.main__dynamics');
  let table = document.querySelector('.main__history');
  let dynamics = el('section.main__ratio');
  dynamics.style.padding = '25px 98px';
  setChildren(blockOfAccounts, [chart, dynamics, table]);

  createChartDynamics(dataForChart.objRec, dataForChart.months, dynamics, 1000);
  const title = document.querySelector('.main__ratio h4');
  title.textContent = 'Соотношение входящих исходящих транзакций';
  let canvas = document.querySelector('.main__ratio canvas');
  createStackedChart(dataForChart.objRec, dataForChart.objExp, canvas);
}

function getDates(dates, m) {
  let date = new Date();
  for (let j = 0; j < m; j++) {
    date.setMonth(date.getMonth() - 1);
    dates.unshift(date.getMonth() + 2);
  }
}

window.addEventListener('popstate', async function () {
  // console.log("location: " + location.href + ", state: " + JSON.stringify(event.state));
  //history.pushState({page: 1}, "title 1", `${window.location.search}`);
  //let { checkAccount } = await import('../index.js');
  const pageParams = new URLSearchParams(window.location.search);
  if (pageParams.get('accounts')) {
    document.querySelector('body').innerHTML = '';
    createListOfAccounts();
  } else if (pageParams.get('id')) {
    document.querySelector('main container').innerHTML = '';
    checkAccount();
  }
});

export function createRows(data, rows) {
  for (let value of Object.values(data.payload)) {
    let row = el('li', [
      el('span.code', value.code),
      el('span.dash'),
      el('span.amount-currency', `${value.amount.toLocaleString('ru')}`),
    ]);
    rows.push(row);
  }
  console.log(rows);
}

export async function getCurrencyExchange() {
  let { stopScroll, allowScroll } = await import('./js/scroll.js');
  let { validateSum, exchangeCurrency } = await import('./js/handlers.js');
  let { getExchangeRates, getDataOfPrivateCurrencyAccounts } = await import(
    './js/api.js'
  );
  let data1 = await getDataOfPrivateCurrencyAccounts();
  let data2 = await getExchangeRates();
  const exchangeRate = el('section.main__section-rate');
  const container = document.querySelector('main .container');
  const title = el('h2.main__title', 'Валютный обмен');
  setStyle(title, { 'margin-bottom': '56px' });
  const block = el('.main__block', {
    class: 'main__block-data main__block-data--currency',
  });
  const form = el('form.main__form-currency', { class: '' });
  const rows = [];
  createRows(data1, rows);

  const currencies = el('section.main__section-private', [
    el('h4.main__section_title', 'Ваши валюты'),
    el('.wrap_ul', [el('ul.main__section_ul', { class: 'list-reset' }, rows)]),
  ]);

  createBlockOfExchangeRates(exchangeRate);
  createFormForCurrencyExchange(form, data2);

  setChildren(block, [currencies, exchangeRate, form]);
  setChildren(container, [title, block]);

  let arr = [];
  let list = document.querySelector('.js-change');
  let customSelect1 = document.getElementsByClassName('first');
  let customSelect2 = document.getElementsByClassName('second');
  //createRowsWithRates(sessionStorage.getItem('changes'), list);
  connectSocket(list, arr);
  createSelect(customSelect1);
  createSelect(customSelect2);

  validateSum();
  exchangeCurrency();

  stopScroll();
  allowScroll();
}

export function createBlockOfExchangeRates(exchangeRate) {
  setChildren(exchangeRate, [
    el('h4.main__section_title', 'Изменение курсов в реальном времени'),
    el('.wrap_ul', [
      el('ul.main__section_ul', { class: 'list-reset js-change' }),
    ]),
  ]);
}

export function createFormForCurrencyExchange(form, data2) {
  let codes1 = [];
  for (let value of data2.payload) {
    let code = el('option.option', value);
    codes1.push(code);
  }
  let codes2 = [];
  for (let value of data2.payload) {
    let code = el('option.option', value);
    codes2.push(code);
  }

  const fieldset = el('fieldset.form__fieldset', { class: '' });
  const legend = el('legend.form__legend', { class: '' }, 'Обмен валюты');
  const container = el('.form__grid-container', { class: '' });
  const labelBox1 = el('.form__label-box');
  const label1 = el('label.form__label', { for: 'select1' }, 'Из');
  let customSelect1 = el('.custom-select', { class: 'first', id: 'select1' });
  const select1 = el('select.main__select', codes1);
  const label2 = el('label.form__label', { for: 'select2' }, 'в');
  let customSelect2 = el('.custom-select', { class: 'second', id: 'select2' });
  const select2 = el('select.main__select', codes2);
  const labelBox2 = el('.form__label-box', [
    el('label.form__label', { for: '' }, 'Сумма'),
    el('input.form__input', {
      type: 'text',
      placeholder: 'Placeholder',
    }),
    el('span', {
      class: 'error success',
      type: 'text',
    }),
  ]);
  const btn = el(
    'button.btn',
    { class: 'send', type: 'submit', disabled: 'disabled' },
    'Обменять'
  );

  setChildren(form, fieldset);
  setChildren(fieldset, [legend, container]);
  setChildren(container, [labelBox1, labelBox2, btn]);
  setChildren(labelBox1, [label1, customSelect1, label2, customSelect2]);
  setChildren(customSelect1, select1);
  setChildren(customSelect2, select2);
  return form;
}

function connectSocket(list, arr) {
  let socket = new WebSocket('ws://localhost:3000/currency-feed');

  // Соединение открыто
  socket.addEventListener('open', function (event) {
    socket.send('Are there changes?');
  });

  // Наблюдает за сообщениями
  socket.addEventListener('message', async function (event) {
    arr.push(event.data);
    sessionStorage.setItem('changes', arr);
    createRowsWithRates(event.data, list);
  });
}

function createRowsWithRates(data, list) {
  let rates = JSON.parse(data);
  if (rates.type == 'EXCHANGE_RATE_CHANGE') {
    let row = el('li', [
      el('span.code', `${rates.from}/${rates.to}`),
      el('span.dash', { class: 'js-dash' }),
      el('span.amount-currency', rates.rate),
      el('span.js-amount'),
    ]);
    list.prepend(row);
  } else {
    return;
  }

  let amount = document.querySelector('.js-amount');
  let dash = document.querySelector('.js-dash');
  if (rates.change == 1) {
    setAttr(amount, { class: 'arrow-up' });
    setStyle(dash, { 'border-color': '#76ca66' });
  } else if (rates.change == -1) {
    setAttr(amount, { class: 'arrow-down' });
    setStyle(dash, { 'border-color': '#fd4e5d' });
  }
}
