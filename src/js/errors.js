// /* eslint-disable prettier/prettier */
// export default сlass ErrorComponent {
//   constructor (data, selector) {
//     this.error = data.error;
//     this.selector = selector;
//   }

//   showErrorForAuthorization(this.error) {
//     if (this.error == `Invalid password`) {
//       //let err = el('span.error', 'Неверный пароль');
//       this.selector.textContent = 'Неверный пароль';
//       throw new Error(`Попытка войти с неверным паролем`);
//     }
//     else if (this.error == `No such user`) {
//       //let err = el('span.error', 'Логин не найден');
//       this.selector.textContent = 'Логин не найден';
//       throw new Error(`Пользователя с таким логином не существует.`);
//     }
//   }

//   showErrorForTransfer(this.error) {
//     if (this.error == `Invalid account from`) {
//       //let err = el('span.error', 'Счет списания не указан/Вам не принадлежит');
//       this.selector.textContent = 'Счет списания не указан/Вам не принадлежит';
//       throw new Error(`Не указан счёт списания, или этот счёт не принадлежит Вам`);
//     }
//     else if (this.error == `Invalid account to`) {
//       //let err = el('span.error', 'Счёт зачисления не указан/не существует');
//       this.selector.textContent = 'Счёт зачисления не указан/не существует';
//       throw new Error(`Не указан счёт зачисления, или этого счёта не существует`);
//     }
//     else if (this.error == `Invalid amount`) {
//       let err = el('span.error', 'Сумма перевода не указана/отрицательная');
//       this.selector.textContent = 'Сумма перевода не указана/отрицательная';
//       throw new Error(`Не указана сумма перевода, или она отрицательная`);
//     }
//     else if (this.error == `Overdraft prevented`) {
//       //let err = el('span.error', 'Недостаточно средств на счете');
//       this.selector.textContent = 'Недостаточно средств на счете';
//       throw new Error(`Попытка перевести больше денег, чем доступно на счёте списания`);
//     }
// }

//   showErrorForCurrency(this.error) {
//     if (this.error == `Unknown currency code`) {
//       //let err = el('span.error', 'Неверный валютный код/код не поддерживается системой');
//       this.selector.textContent = 'Неверный валютный код/код не поддерживается системой';
//       throw new Error(`Передан неверный валютный код, код не поддерживается системой (валютный код списания или валютный код зачисления)`);
//     }
//     else if (this.error == `Invalid amount`) {
//       //let err = el('span.error', 'Сумма перевода не указана/отрицательная');
//       this.selector.textContent = 'Сумма перевода не указана/отрицательная';
//       throw new Error(`Не указана сумма перевода, или она отрицательная`);
//     }
//     else if (this.error == `Not enough currency`) {
//       //let err = el('span.error', 'На счете нет средств');
//       this.selector.textContent = 'На счете нет средств';
//       throw new Error(`Не указана сумма перевода, или она отрицательная`);
//     }
//     else if (this.error == `Overdraft prevented`) {
//       //let err = el('span.error', 'Недостаточно средств на счете');
//       this.selector.textContent = 'Недостаточно средств на счете';
//       throw new Error(`Попытка перевести больше средств, чем доступно на счёте списания`);
//     }
//   }

// }

// const errorComponent = new ErrorComponent(
//   data,
//   document.querySelector('.error')
// );
// errorComponent.showErrorForAuthorization();

export function showErrorForAuthorization(error) {
  const inputs = document.querySelectorAll('.form__input');
  const selectors = document.querySelectorAll('.js-notification');
  const icons = document.querySelectorAll('.js-icon');
  if (error == `Invalid password`) {
    setOptions(inputs[1], selectors[1], icons[1]);
    icons[0].style.display = 'inline-block';
    icons[0].classList.add('icon-success');
    selectors[1].classList.add('--length');
    selectors[1].textContent = 'Неверный пароль';
    throw new Error(`Попытка войти с неверным паролем`);
  } else if (error == `No such user`) {
    setOptions(inputs[0], selectors[0], icons[0]);
    selectors[0].textContent = 'Логин не найден';
    throw new Error(`Пользователя с таким логином не существует.`);
  }
}

export async function showErrorForTransfer(error) {
  const inputs = document.querySelectorAll('.form__input');
  const selectors = document.querySelectorAll('.js-notification');
  const icons = document.querySelectorAll('.js-icon');
  if (error == `Invalid account from`) {
    setOptions(inputs[0], selectors[0], icons[0]);
    selectors[0].classList.add('--length1');
    selectors[0].textContent = 'Счет списания не указан/Вам не принадлежит';
    throw new Error(
      `Не указан счёт списания, или этот счёт не принадлежит Вам`
    );
  } else if (error == `Invalid account to`) {
    setOptions(inputs[0], selectors[0], icons[0]);
    selectors[0].classList.add('--length1');
    selectors[0].textContent = 'Счёт зачисления не указан/не существует';
    throw new Error(`Не указан счёт зачисления, или этого счёта не существует`);
  } else if (error == `Invalid amount`) {
    setOptions(inputs[1], selectors[1], icons[1]);
    selectors[1].classList.add('--length2');
    selectors[1].textContent = 'Сумма перевода не указана/отрицательная';
    throw new Error(`Не указана сумма перевода, или она отрицательная`);
  } else if (error == `Overdraft prevented`) {
    setOptions(inputs[1], selectors[1], icons[1]);
    selectors[1].classList.add('--length2');
    selectors[1].textContent = 'Недостаточно средств на счете';
    throw new Error(
      `Попытка перевести больше денег, чем доступно на счёте списания`
    );
  }
}

export function showErrorForCurrency(error) {
  const input = document.querySelector('.form__input');
  const selector = document.querySelector('.js-notification');
  const icon = document.querySelector('.js-icon');
  if (error == `Unknown currency code`) {
    selector.textContent =
      'Неверный валютный код/код не поддерживается системой';
    selector.classList.add('--length3');
    icon.classList.add('--length4');
    throw new Error(
      `Передан неверный валютный код, код не поддерживается системой (валютный код списания или валютный код зачисления)`
    );
  } else if (error == `Invalid amount`) {
    setOptions(input, selector, icon);
    selector.classList.add('--length3');
    icon.classList.add('--length4');
    selector.textContent = 'Сумма перевода не указана/отрицательная';
    throw new Error(`Не указана сумма перевода, или она отрицательная`);
  } else if (error == `Not enough currency`) {
    setOptions(input, selector, icon);
    selector.classList.add('--length3');
    icon.classList.add('--length4');
    selector.textContent = 'На счете нет средств';
    throw new Error(`Не указана сумма перевода, или она отрицательная`);
  } else if (error == `Overdraft prevented`) {
    setOptions(input, selector, icon);
    selector.classList.add('--length3');
    icon.classList.add('--length4');
    selector.textContent = 'Недостаточно средств на счете';
    throw new Error(
      `Попытка перевести больше средств, чем доступно на счёте списания`
    );
  }
}

function setOptions(input, selector, icon) {
  const btn = document.querySelector('[type="submit"]');
  btn.setAttribute('disabled', 'disabled');
  icon.style.display = 'inline-block';
  icon.classList.add('icon-error');
  input.classList.remove('success--border');
  input.classList.add('error--border');
  selector.style.display = 'block';
  selector.classList.add('--error');

  input.addEventListener('focus', () => {
    input.value = '';
    input.classList.remove('error--border');
    selector.style.display = 'none';
    icon.style.display = 'none';
  });
}
