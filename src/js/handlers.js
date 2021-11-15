import validator from 'validator';

function delAttr() {
  const submit = document.querySelector('[type="submit"]');
  if (document.getElementsByClassName('success--border').length === 2) {
    submit.removeAttribute('disabled', 'disabled');
  }
}

export async function createNewAccount() {
  let { createAccount } = await import('./api.js');
  document.querySelector('.js-new').addEventListener('click', () => {
    const blockOfAccounts = document.querySelector('.main__block');
    blockOfAccounts.innerHTML = '';
    createAccount();
  });
}

export async function returnList() {
  let btn = document.querySelector('.return');
  let { createListOfCards } = await import('../index.js');
  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    //history.pushState(null, '', './index.html/accounts');
    document.querySelector('body').innerHTML = '';
    createListOfCards();
  });
}

export async function openAccount(blockOfAccounts) {
  let { getDataOfAccount } = await import('./api.js');
  document.querySelectorAll('.main__btn-open').forEach((open) =>
    open.addEventListener('click', (e) => {
      e.preventDefault();
      history.pushState(null, '', open.href);
      blockOfAccounts.classList.remove('grid');
      getDataOfAccount();
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
