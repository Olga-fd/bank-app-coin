/* eslint-disable no-undef */
/* eslint-disable jest/expect-expect */
/// <reference types="cypress" />

describe('Онлайн-банк Coin', () => {
  before(() => {
    cy.visit('http://localhost:8080');
  });

  it('Войти в онлайн-банк по логину developer и паролю skillbox', () => {
    cy.location('pathname').should('equal', '/index.html');

    // enter valid login and password
    cy.get('#login').type('developer{enter}');
    cy.get('#password').type('skillbox{enter}');

    // cy.get('#login').click();
    // cy.get('#password').click();
    cy.get('body').click();
    cy.contains('button', 'Войти').click();

    // confirm we have logged in successfully
    cy.location('pathname').should('equal', '/index.html/accounts');
    cy.contains('Ваши счета').should('be.visible');
  });

  // it('Отсортировать счета по номеру', () => {
  //   cy.get('.select-selected').click();
  //   cy.get('.select-items div').first().click();
  //   cy.get('h3').then(($els) => {
  //     const arr = Array.from($els, (el) => el.innerText);
  //     for (let i = 0; i < arr.length; i++) {
  //       if (arr[i] <= arr[i + 1] && arr[i] < arr[arr.length - 1]) {
  //         return;
  //       } else {
  //         throw new Error('Сортировка выполнена неверно');
  //       }
  //     }
  //   });
  // });

  // it('Отсортировать счета по балансу', () => {
  //   cy.get('.select-selected').click();
  //   cy.get('.select-items div').eq(1).click();
  //   cy.get('.main__card_balance').then(($els) => {
  //     const arr = Array.from($els, (el) => el.innerText.slice(0, -1));
  //     for (let i = 0; i < arr.length - 1; i++) {
  //       if (arr[i] < arr[i + 1]) {
  //         //expect(10).to.be.lessThan(12);
  //         //alert(arr[i] < arr[i + 1]);
  //         return;
  //       } else {
  //         throw new Error('Сортировка выполнена неверно');
  //       }
  //     }
  //   });
  // });

  // it('Отсортировать счета по последней транзакции', () => {
  //   cy.get('.select-selected').click();
  //   cy.get('.select-items div').eq(2).click();
  //   cy.get('.main__trans-date').then(($els) => {
  //     const arr = Array.from($els, (el) => el.dataset.date);
  //     for (let i = 0; i < arr.length; i++) {
  //       if (arr[i] < arr[i + 1]) {
  //         return;
  //       } else {
  //         throw new Error('Сортировка выполнена неверно');
  //       }
  //     }
  //   });
  // });

  it('Открыть подробности счета и вернуться на страницу со всеми счетами', () => {
    cy.get('.main__block .main__card:first-child .main__card_number').then(
      ($num) => {
        const number = $num.text();
        cy.contains('Открыть').click();
        cy.get('.main__account').then(($account) => {
          const account = $account.text().substring(2);
          expect(account).to.equal(number);
        });
      }
    );
    cy.contains('Просмотр счета').should('be.visible');

    cy.contains('Вернуться назад').click();
    cy.contains('Ваши счета').should('be.visible');
  });

  it('Добавить счет', () => {
    cy.get('.main__card')
      .its('length')
      .then((lengthFirst) => {
        cy.get('.main__btn').click();
        cy.get('.main__card')
          .its('length')
          .then((lengthSecond) => {
            expect(lengthFirst).to.be.lessThan(lengthSecond);
          });
      });
  });

  it('Сделать перевод с нового счета', () => {
    cy.get('.main__block .main__card:last-child .main__card_number').then(
      ($num) => {
        const number = $num.text();
        cy.get('.main__block .main__card:first-child .main__btn-open').click();
        cy.get('#accNum').type(`${number}{enter}`);
        cy.get('#amountTrans').type(`100{enter}`);
        cy.get('form').click();
        cy.contains('button', 'Отправить').click();
        cy.contains('button', 'Вернуться назад').click();
        cy.clock().then((clock) => {
          clock.tick(1000);
          cy.contains('div', `${number}`).contains('p', '100 ₽');
          cy.get('.main__block .main__card:last-child')
            .contains('Открыть')
            .click();

          cy.get('#accNum').type(`5555341244441115{enter}`);
          cy.get('#amountTrans').type(`50{enter}`);
          cy.get('form').click();
          cy.contains('button', 'Отправить').click();
          cy.contains('button', 'Вернуться назад').click();
          cy.contains('div', `${number}`).contains('p', '50 ₽');
        });
      }
    );
  });

  it('Открыть историю баланса', () => {
    cy.contains('Открыть').click();
    cy.get('canvas').click();
    cy.contains('История баланса').should('be.visible');
  });

  it('Вернуться из истории баланса', () => {
    cy.get('.main__btn').click();
    cy.contains('Просмотр счета').should('be.visible');
  });

  it('Перевести деньги со счета', () => {
    cy.get('#accNum')
      .type('76026742637317620200610516{enter}')
      .blur()
      .should('have.class', 'success--border');
    cy.get('#amountTrans')
      .type('100{enter}')
      .blur()
      .should('have.class', 'success--border');
    cy.get('.send').click();
    cy.get('#accNum').should('not.have.class', 'success--border');
  });

  it('Показать ошибку при переводе средств на несуществующий счет', () => {
    cy.get('#accNum').type('76026{enter}');
    cy.get('#amountTrans').type('100{enter}');
    cy.get('form').click();
    cy.get('.send').click();
    cy.get('#accNum').should('have.class', 'error--border');
    cy.get('.js-notification').should('be.visible');
    cy.get('.js-icon').should('be.visible');
  });

  it('Открыть карту с банкоматами', () => {
    cy.get('.atm').click();
    cy.contains('Карта банкоматов').should('be.visible');
    cy.get('ymaps').should('be.visible');
    cy.location('pathname').should('equal', '/index.html/ATM');
  });

  it('Открыть страницу с валютным обменом', () => {
    cy.get('.currency').click();
    cy.contains('Валютный обмен').should('be.visible');
    cy.location('pathname').should('equal', '/index.html/currency');
  });

  it('Обменять валюту', () => {
    cy.get('.first').click();
    cy.get('.select-items div').contains('BTC').click();
    cy.get('.first .same-as-selected').should('have.text', 'BTC');
    cy.get('.second').click();
    cy.get('.second .select-items').find(':contains("RUB")').click();
    cy.get('.second .same-as-selected').should('have.text', 'RUB');
    cy.get('.form__input').type('5{enter}');
    cy.get('.form__legend').click();
    cy.get('.send').click();
  });
});
