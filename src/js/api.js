import { createListOfCards, createCardOfAccount } from '../index.js';
//import { el } from 'redom';
export let tokenId;
//'Authorization': 'Basic ZGV2ZWxvcGVyOnNraWxsYm94'

export async function authorize(myLogin, myPassword) {
  try {
    let response = await fetch('http://127.0.0.1:3000/login', {
      method: 'POST',
      body: JSON.stringify({
        //eslint-disable-next-line prettier/prettier
        'login': myLogin,
        //eslint-disable-next-line prettier/prettier
        'password': myPassword,
      }),

      headers: new Headers({
        //eslint-disable-next-line prettier/prettier
        'Accept': 'application/json',
        //eslint-disable-next-line prettier/prettier
        'Content-Type': 'application/json',
      }),
    });
    let data = await response.json();
    tokenId = data.payload.token;
    createListOfCards();
    getDataWithAccounts();
  } catch (err) {
    alert(err.message);
  }
}

export async function createAccount() {
  let response = await fetch('http://localhost:3000/create-account', {
    method: 'POST',
    headers: new Headers({
      //eslint-disable-next-line prettier/prettier
      'Accept': 'application/json',
      //eslint-disable-next-line prettier/prettier
      'Content-Type': 'application/json',
      //eslint-disable-next-line prettier/prettier
      'Authorization': `Basic ${tokenId}`,
    }),
  });
  let data = await response.json();
  getDataWithAccounts(data);
}

export async function getDataWithAccounts() {
  let response = await fetch('http://127.0.0.1:3000/accounts', {
    method: 'GET',
    headers: new Headers({
      //eslint-disable-next-line prettier/prettier
      'Accept': 'application/json',
      //eslint-disable-next-line prettier/prettier
      'Content-Type': 'application/json',
      //eslint-disable-next-line prettier/prettier
      'Authorization': `Basic ${tokenId}`,
    }),
  });
  let data = await response.json();
  createCardOfAccount(data);
}

export async function getDataOfAccount() {
  const pageParams = new URLSearchParams(window.location.search);
  //const account = document.querySelector('.main__account').innerText;
  let response = await fetch(
    `http://127.0.0.1:3000/account/${pageParams.get('id')}`,
    {
      method: 'GET',
      headers: new Headers({
        //eslint-disable-next-line prettier/prettier
      'Accept': 'application/json',
        //eslint-disable-next-line prettier/prettier
      'Content-Type': 'application/json',
        //eslint-disable-next-line prettier/prettier
      'Authorization': `Basic ${tokenId}`,
      }),
    }
  );
  let data = await response.json();
  let { checkAccount } = await import('../index.js');
  checkAccount(data, 5, 6);
}

export async function transferFunds(accFrom, accTo, amount) {
  try {
    let response = await fetch('http://127.0.0.1:3000/transfer-funds', {
      method: 'POST',
      body: JSON.stringify({
        from: `${accFrom}`, // счёт с которого списываются средства
        to: `${accTo}`, // счёт, на который зачисляются средства
        amount: `${amount}`, // сумма для перевода
      }),

      headers: new Headers({
        //eslint-disable-next-line prettier/prettier
        'Accept': 'application/json',
        //eslint-disable-next-line prettier/prettier
        'Content-Type': 'application/json',
        //eslint-disable-next-line prettier/prettier
        'Authorization': `Basic ${tokenId}`,
      }),
    });
    let data = await response.json();
    console.log(data);
  } catch (err) {
    alert(err.message);
  }
}

export async function getDatas() {
  const pageParams = new URLSearchParams(window.location.search);
  let response = await fetch(
    `http://127.0.0.1:3000/account/${pageParams.get('id')}`,
    {
      method: 'GET',
      headers: new Headers({
        //eslint-disable-next-line prettier/prettier
      'Accept': 'application/json',
        //eslint-disable-next-line prettier/prettier
      'Content-Type': 'application/json',
        //eslint-disable-next-line prettier/prettier
      'Authorization': `Basic ${tokenId}`,
      }),
    }
  );
  let data = await response.json();
  return data;
}
