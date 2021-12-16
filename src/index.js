import { el, setChildren, setAttr, setStyle } from 'redom';
import './css/style.scss';
//const checkWithMoonAlg = require('./moon.js');
import { createSelect } from './js/select.js';
import { format } from 'd3-format';
import { showSpecificTemplate } from './js/skeleton.js';
import { returnFromHistory } from './js/handlers.js';

export async function createLoginScreen() {
  history.pushState(null, '', '../index.html');
  let { validate, submitForm } = await import('./js/handlers.js');
  const header = el('header.header');
  const container = el('.container', { class: 'flex-container' });
  const fixContainer = el('.container', { class: 'centered' });
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
    el('fieldset.form__fieldset', [
      el('legend.form__legend', 'Вход в аккаунт'),
      el('.form__container', [
        el('.form__label-box', [
          el('label.form__label', { for: 'login' }, 'Логин'),
          el('input.form__input', {
            type: 'text',
            id: 'login',
            //value: 'developer',
            placeholder: 'Placeholder',
          }),
          el('span', {
            class: 'js-icon',
          }),
          el('span', {
            class: 'js-notification',
          }),
        ]),
        el('.form__label-box', [
          el('label.form__label', { for: 'password' }, 'Пароль'),
          el('input.form__input', {
            type: 'password',
            id: 'password',
            //value: 'skillbox',
            placeholder: 'Placeholder',
          }),
          el('span', {
            class: 'js-icon',
          }),
          el('span', {
            class: 'js-notification',
          }),
        ]),
      ]),
      el('button.btn', { type: 'submit', disabled: 'disabled' }, 'Войти'),
    ]),
  ]);
  validate();
  submitForm();
}

createLoginScreen();

export async function createHeader() {
  history.pushState(null, '', '../index.html/accounts');
  let { showATM, logout, setActiveStay, showCurrencyExchange, showAccounts } =
    await import('./js/handlers.js');
  const header = document.querySelector('.header');
  const container = document.querySelector('main .container');
  const form = document.querySelector('form');
  const menu = document.querySelector('nav');
  const list = el('ul.header__list');

  form.remove();
  setAttr(header, { style: 'margin-bottom: 2.75rem;' });
  container.classList.remove('centered');
  setChildren(menu, list);
  setChildren(list, [
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
  logout();

  if (window.matchMedia('(min-width: 320px) and (max-width: 767px)').matches) {
    createBurgerMenu();
  }
}

async function createBurgerMenu() {
  let { pushBtn, closeMenu } = await import('./js/handlers.js');
  const header = document.querySelector('.header .container');
  const burger = el('.header__burger-menu', { id: 'burger' }, [
    el('div'),
    el('div'),
    el('div'),
  ]);
  header.append(burger);

  pushBtn(burger);
  closeMenu();
}

export async function createPanel() {
  let { createNewAccount, sortByKey } = await import('./js/handlers.js');
  let { createTemplate, showTemplate } = await import('./js/skeleton.js');
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
  sortByKey();
  createNewAccount();
  createTemplate(blockOfAccounts);
  showTemplate();
}

export async function modifyPanel() {
  let { returnList } = await import('./js/handlers.js');
  let { createChartTemplate, createChartReturnTemplate } = await import(
    './js/skeleton.js'
  );
  const title = document.querySelector('.main__title');
  const select = document.querySelector('.custom-select');
  const mainWrap = document.querySelector('.main__wrap');
  const btnCreate = document.querySelector('.main__btn');
  const btn = el('button.btn', { class: 'main__btn' }, [
    el('p', [el('span.arrow'), el('span.main__btn_title', 'Вернуться назад')]),
  ]);

  title.textContent = 'Просмотр счета';

  if (select) {
    select.remove();
    btnCreate.remove();
  }

  setStyle(mainWrap, { 'margin-bottom': '19px' });
  mainWrap.append(btn);
  returnList();
  if (document.querySelector('.main__account')) {
    createChartReturnTemplate();
    showSpecificTemplate('template5', '.main__block-data');
  } else {
    createChartTemplate();
    showSpecificTemplate('template1');
  }
}

export async function createListOfAccounts() {
  // let { openAccount } = await import('./js/handlers.js');
  let { getInfoAboutAccounts } = await import('./js/api.js');
  let data = await getInfoAboutAccounts();
  let newData = data.payload.filter((x) => x['transactions'].length > 0);
  console.log(newData);
  let exception = data.payload.find((y) => y['transactions'].length == 0);
  const blockOfAccounts = document.querySelector('.main__block');
  const selected = document.querySelector('.select-selected');
  const cards = [];

  if (selected.innerHTML == 'По номеру') {
    byKey(data, 'account');
  } else if (selected.innerHTML == 'По балансу') {
    byKey(data, 'balance');
  } else if (selected.innerHTML == 'По последней транзакции') {
    byTrans(newData, exception);
  }

  if (selected.innerHTML == 'По последней транзакции') {
    createCardBlock(newData, cards, blockOfAccounts);
  } else {
    createCardBlock(data.payload, cards, blockOfAccounts);
  }

  // for (let i = 0; i < data.payload.length; i++) {
  //   let cardBlock = el('.main__card_block');
  //   let date, ms;
  //   let length = data.payload[i].transactions.length;
  //   if (length !== 0) {
  //     ms = new Date(data.payload[i].transactions[length - 1].date);
  //     date = new Date(data.payload[i].transactions[length - 1].date)
  //       .toLocaleString('ru', {
  //         day: 'numeric',
  //         month: 'long',
  //         year: 'numeric',
  //       })
  //       .slice(0, -2);
  //   } else {
  //     date = 'Данные отсутствуют';
  //   }

  //   let card = el('.main__card');
  //   let number = el('h3.main__card_number', data.payload[i].account);
  //   let amount = el(
  //     'p.main__card_balance',
  //     `${data.payload[i].balance.toLocaleString('ru')} ₽`
  //   );
  //   let btnOpen = el(
  //     'a.btn',
  //     { class: 'main__btn-open', href: `?id=${data.payload[i].account}` },
  //     'Открыть'
  //   );

  //   let dateOfTransaction = el('div.main__trans-block', [
  //     el('h4.main__transaction', 'Последняя транзакция:'),
  //     el(
  //       'time.main__trans-date',
  //       { 'data-date': `${new Date(ms).getTime()}` },
  //       `${date}`
  //     ),
  //   ]);
  //   setChildren(cardBlock, [dateOfTransaction, btnOpen]);
  //   setChildren(card, [number, amount, cardBlock]);
  //   setChildren(blockOfAccounts, card);
  //   cards.push(card);
  // }
  // setChildren(blockOfAccounts, cards);
  // openAccount(blockOfAccounts);
}

async function createCardBlock(array, cards, blockOfAccounts) {
  let { openAccount } = await import('./js/handlers.js');
  for (let i = 0; i < array.length; i++) {
    let cardBlock = el('.main__card_block');
    let date, ms;
    let length = array[i].transactions.length;
    if (length !== 0) {
      ms = new Date(array[i].transactions[length - 1].date);
      date = new Date(array[i].transactions[length - 1].date)
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
    let number = el('h3.main__card_number', array[i].account);
    let amount = el(
      'p.main__card_balance',
      `${array[i].balance.toLocaleString('ru')} ₽`
    );
    let btnOpen = el(
      'a.btn',
      { class: 'main__btn-open', href: `?id=${array[i].account}` },
      'Открыть'
    );

    let dateOfTransaction = el('div.main__trans-block', [
      el('h4.main__transaction', 'Последняя транзакция:'),
      el(
        'time.main__trans-date',
        { 'data-date': `${new Date(ms).getTime()}` },
        `${date}`
      ),
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
    el('span.max', `${f(Math.max.apply(null, newArr))}`),
    el('span.subMax'),
    el('span.min', `${f(Math.min.apply(null, newArr))}`),
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
export function createTableOfHistory(data, historyOfTransactions) {
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

//===Создаем форму транзакций==={ width: 300 },
async function createForm(form) {
  setChildren(form, [
    el('fieldset.form__fieldset', [
      el('legend.form__legend', 'Новый перевод'),
      el('.form__container', [
        el('.form__label-box', [
          el('label.form__label', { for: 'accNum' }, 'Номер счёта получателя'),

          el('.autocomplete', [
            el('input.form__input', {
              type: 'text',
              id: 'accNum',
              list: 'list',
              placeholder: 'Placeholder',
            }),
          ]),
          el('span', {
            class: 'js-icon',
          }),
          el('span', {
            class: 'js-notification',
          }),
        ]),
        el('.form__label-box', [
          el('label.form__label', { for: 'amountTrans' }, 'Сумма перевода'),
          el('input.form__input', {
            type: 'number',
            id: 'amountTrans',
            placeholder: 'Placeholder',
          }),
          el('span', {
            class: 'js-icon',
          }),
          el('span', {
            class: 'js-notification',
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
  let { autocomplete } = await import('./js/autocomplete.js');
  let { getDataOfAccount } = await import('./js/api.js');
  let { writeInputValues } = await import('./js/handlers.js');
  let data = await getDataOfAccount();
  let dataForChart = await getBalance(data, n, m);
  let { sendMoney, showDynamics, validateFormTrans } = await import(
    './js/handlers.js'
  );
  let { createChart } = await import('./js/charts.js');

  const block = document.querySelector('.main__block');
  const active = document.querySelector('.active');
  let blockOfData;
  if (document.querySelector('.main__block-data')) {
    blockOfData = document.querySelector('.main__block-data');
  } else {
    blockOfData = el('.main__block-data');
  }

  const form = el('form.form_trans', { class: 'options', autocomplete: 'off' });
  const dynamics = el('section.main__dynamics');
  const historyOfTransactions = el('.main__history', { class: 'options' });

  createChartDynamics(dataForChart.newArr, dataForChart.months, dynamics, 510);
  createForm(form);
  createTableOfHistory(data, historyOfTransactions);
  setChildren(blockOfData, [form, dynamics, historyOfTransactions]);

  if (active) {
    active.classList.remove('active');
    const wrap = el('.wrap', [
      el('p.main__account', `№ ${data.payload.account}`),
      el('p.main__balance', 'Баланс', [
        el(
          'span.main__balance_amount',
          `${data.payload.balance.toLocaleString('ru')} ₽`
        ),
      ]),
    ]);
    setChildren(block, [wrap, blockOfData]);
  }

  let arrGlobal = [];
  let storage = localStorage.getItem('records');
  if (storage) {
    writeInputValues(JSON.parse(storage));
  } else {
    writeInputValues(arrGlobal);
  }
  let records = JSON.parse(localStorage.getItem('records'));
  autocomplete(document.getElementById('accNum'), records);
  let canvas = document.querySelector('.main__dynamics canvas');

  createChart(dataForChart.newArr, canvas);
  showTransactions(data);
  validateFormTrans();
  sendMoney();
  showDynamics();
  setLabelsForY('.yAxis span');

  if (data.payload.transactions.length == 0) {
    dynamics.style.display = 'none';
    historyOfTransactions.style.display = 'none';
  }

  let observer = new IntersectionObserver(showRow, options);
  let visual = document.querySelectorAll('.js-visual');
  let target = visual[visual.length - 1];

  observer.observe(target);
}

function setLabelsForY(selector) {
  const spans = document.querySelectorAll(selector);

  if (window.matchMedia('(min-width: 320px) and (max-width: 480px)').matches) {
    spans[0].style.paddingLeft = '37.5px';
    spans[0].style.paddingRight = '32.5px';

    for (let i = 1; i < spans.length; i++) {
      spans[i].style.paddingLeft = '12.5px';
      spans[i].style.paddingRight = '32.5px';
    }
  } else {
    let widSpan = spans[0].getBoundingClientRect().width;
    spans[0].style.paddingLeft = `${35 + (50 - widSpan) / 2}px`;
    spans[0].style.paddingRight = `${(50 - widSpan) / 2 + 28}px`;

    for (let i = 1; i < spans.length; i++) {
      let wid = spans[i].getBoundingClientRect().width;
      spans[i].style.paddingLeft = `${(50 - wid) / 2}px`;
      spans[i].style.paddingRight = `${(50 - wid) / 2 + 28}px`;
    }
  }
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

export function showTransactions(data) {
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
  btnSend.setAttribute('disabled', 'disabled');
}

export async function changePanel() {
  let { createHistoryTemplate } = await import('./js/skeleton.js');
  const title = document.querySelector('.main__title');
  const btn = document.querySelector('.main__btn');
  const wrap = document.querySelector('.main__wrap');
  const btnNew = el('button.btn', { class: 'main__btn' }, [
    el('p', [el('span.arrow'), el('span.main__btn_title', 'Вернуться назад')]),
  ]);
  title.textContent = 'История баланса';
  btn.remove();
  wrap.append(btnNew);
  returnFromHistory();

  createHistoryTemplate();
  showSpecificTemplate('template2', '.main__block-data--new');
}

export async function showHistoryOfBalance(data, dynamics) {
  let { createChart } = await import('./js/charts.js');
  const dataForChart = await getBalance(data, 11, 12);
  createChartDynamics(dataForChart.newArr, dataForChart.months, dynamics, 1000);
  const canvas = document.querySelector('.main__dynamics canvas');
  createChart(dataForChart.newArr, canvas);
  setLabelsForY('.main__dynamics .yAxis span');
}

export async function showRatio(data, dynamics) {
  let { createStackedChart } = await import('./js/charts.js');
  let dataForChart = await getBalance(data, 11, 12);
  createChartDynamics(dataForChart.objRec, dataForChart.months, dynamics, 1000);
  const title = document.querySelector('.main__ratio h4');
  title.textContent = 'Соотношение входящих и исходящих транзакций';
  let canvas = document.querySelector('.main__ratio canvas');
  createStackedChart(dataForChart.objRec, dataForChart.objExp, canvas);
  setLabelsForY('.main__ratio .yAxis span');
}

function getDates(dates, m) {
  let date = new Date();
  for (let j = 0; j < m; j++) {
    date.setMonth(date.getMonth() - 1);
    dates.unshift(date.getMonth() + 2);
  }
}

export function createRows(data, rows) {
  for (let value of Object.values(data.payload)) {
    if (value.amount !== 0) {
      let row = el('li', [
        el('span.code', value.code),
        el('span.dash'),
        el('span.amount-currency', `${value.amount.toLocaleString('ru')}`),
      ]);
      rows.push(row);
    }
  }
}

export async function getCurrencyExchange() {
  let { stopScroll, allowScroll } = await import('./js/scroll.js');
  let { validateFormTrans, exchangeCurrency } = await import(
    './js/handlers.js'
  );
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
  const form = el('form.main__form-currency');
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

  //let arr = [];
  let list = document.querySelector('.js-change');
  let customSelect1 = document.getElementsByClassName('first');
  let customSelect2 = document.getElementsByClassName('second');
  let dataChange = sessionStorage.getItem('changes');
  createSelect(customSelect1);
  createSelect(customSelect2);

  if (dataChange) {
    createRowsWithRates(dataChange, list);
  }

  connectSocket(list);

  validateFormTrans();
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

  const fieldset = el('fieldset.form__fieldset');
  const legend = el('legend.form__legend', 'Обмен валюты');
  const container = el('.form__grid-container');
  const labelBox1 = el('.form__label-box');
  const label1 = el('label.form__label', { for: 'select1' }, 'Из');
  let customSelect1 = el('.custom-select', { class: 'first', id: 'select1' });
  const select1 = el('select.main__select', codes1);
  const label2 = el('label.form__label', { for: 'select2' }, 'в');
  let customSelect2 = el('.custom-select', { class: 'second', id: 'select2' });
  const select2 = el('select.main__select', codes2);
  const labelBox2 = el('.form__label-box', [
    el('label.form__label', 'Сумма'),
    el('input.form__input', {
      type: 'text',
      placeholder: 'Placeholder',
    }),
    el('span', {
      class: 'js-icon',
    }),
    el('span', {
      class: 'js-notification',
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

function connectSocket(list) {
  let socket = new WebSocket('ws://localhost:3000/currency-feed');
  // Соединение открыто
  socket.addEventListener('open', function () {
    socket.send('Are there changes?');
  });

  // Наблюдает за сообщениями
  socket.addEventListener('message', async function (event) {
    //arr.push(event.data);
    sessionStorage.setItem('changes', event.data);
    createRowsWithRates(event.data, list);
  });

  // setTimeout(() =>
  //   socket.addEventListener(
  //     'close',
  //     (event) => {
  //       event.code === 1000, event.reason === 'работа закончена';
  //     },
  //     6500
  //   )
  // );
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

export function byKey(data, key) {
  data.payload.sort((a, b) => {
    if (a[key] > b[key]) {
      return 1;
    }
    if (a[key] < b[key]) {
      return -1;
    }
    return 0;
  });
}

export function byTrans(newData, exception) {
  newData.sort((a, b) => {
    // eslint-disable-next-line prettier/prettier
    if (new Date(a['transactions'][0].date).getTime() > new Date(b['transactions'][0].date).getTime()) {
      return 1;
    }
    // eslint-disable-next-line prettier/prettier
    if (new Date(a['transactions'][0].date).getTime() < new Date(b['transactions'][0].date).getTime()) {
      return -1;
    }
    return 0;
  });
  newData.push(exception);
  return newData;
}
