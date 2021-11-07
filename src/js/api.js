import {
  createListOfCards,
  createCardOfAccount,
  checkAccount,
  getBalance,
} from '../index.js';
export let tokenId;

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
    console.log(tokenId);
    getDataWithAccounts();
  } catch (err) {
    alert(err.message);
  }
}

//'Authorization': 'Basic ZGV2ZWxvcGVyOnNraWxsYm94',

// async function createAccount() {
//   let response = await fetch('http://localhost:3000/login', {
//     headers: {
//       Authorization: `Basic token ${tokenId}`,
//     },
//   })
//     .then((res) => res.json())
//     .then((json) => console.log(json));

//   let data = await response.json();
//   console.log(data);
//   createCardOfAccount(data);
// }

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
  console.log(data);
  data.payload.forEach(() => createCardOfAccount(data));
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
  console.log(data.payload.transactions);
  getBalance(data);
  //checkAccount(data);
}
