import { showErrorForCurrency } from './errors.js';

export let tokenId;
//import ErrorComponent from './errors.js';

//'Authorization': 'Basic ZGV2ZWxvcGVyOnNraWxsYm94'

export async function authorize(myLogin, myPassword) {
  let { createHeader, createListOfAccounts } = await import('../index.js');
  let data;
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
    data = await response.json();
    console.log(data);
    tokenId = data.payload.token;
    createHeader();
    createListOfAccounts();
  } catch (err) {
    let { showErrorForAuthorization } = await import('./errors.js');
    showErrorForAuthorization(data.error);
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
  return data;
}

export async function getInfoAboutAccounts() {
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
  return data;
}

export async function getDataOfAccount() {
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

export async function transferFunds(accFrom, accTo, amount) {
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

  if (data.payload !== null) {
    console.log(data.payload !== null);
    return data;
  } else {
    let { showErrorForTransfer } = await import('./errors.js');
    console.log(data);
    showErrorForTransfer(data.error);
  }
}

export async function getDataOfPrivateCurrencyAccounts() {
  let response = await fetch('http://127.0.0.1:3000/currencies', {
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
  return data;
}

export async function getExchangeRates() {
  let response = await fetch('http://127.0.0.1:3000/all-currencies', {
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
  return data;
}

// function connectSocket(param, subject, method) {
//   let socket = new WebSocket('ws://127.0.0.1:3000/currency-feed');
//   socket.onopen = function (e) {
//     alert('[open] Соединение установлено');
//     alert('Отправляем данные на сервер');
//     socket.send('Меня зовут Джон');
//   };

//   socket.onmessage = function (event) {
//     console.log(event.data);
//     alert(`[message] Данные получены с сервера: ${event.data}`);
//   };

//   socket.onclose = function (event) {
//     if (event.wasClean) {
//       alert(
//         `[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`
//       );
//     } else {
//       // например, сервер убил процесс или сеть недоступна
//       // обычно в этом случае event.code 1006
//       alert('[close] Соединение прервано');
//     }
//   };

//   socket.onerror = function (error) {
//     alert(`[error] ${error.message}`);
//   };
// }

export async function buyCurrency(currencyFrom, currencyTo, amountToTransfer) {
  let response = await fetch('http://127.0.0.1:3000/currency-buy', {
    method: 'POST',
    body: JSON.stringify({
      from: `${currencyFrom}`, // счёт с которого списываются средства
      to: `${currencyTo}`, // счёт, на который зачисляются средства
      amount: `${amountToTransfer}`, // сумма для перевода
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
  if (data.payload !== null) {
    console.log(data.payload !== null);
    return data;
  } else {
    let { showErrorForCurrency } = await import('./errors.js');
    console.log(data);
    showErrorForCurrency(data.error);
  }
}

export async function getCoordinates() {
  try {
    let response = await fetch('http://127.0.0.1:3000/banks', {
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
    console.log(data);
    return data;
  } catch (err) {
    alert(err.message);
  }
}
