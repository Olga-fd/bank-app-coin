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
    cy.get('body').click();
    cy.contains('button', 'Войти').click();

    // confirm we have logged in successfully
    cy.location('pathname').should('equal', '/index.html/accounts');
    cy.contains('Ваши счета').should('be.visible');
  });

  it('Отсортировать счета по номеру', () => {
    cy.get('.select-selected').click();
    cy.get('.select-items div').first().click();
    cy.get('h3').then(($els) => {
      const arr = Array.from($els, (el) => el.innerText);
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] < arr[i + 1] && arr[i] < arr[arr.length - 1]) {
          return;
        } else {
          throw new Error('Сортировка выполнена неверно');
        }
      }
    });
  });

  it('Отсортировать счета по балансу', () => {
    cy.get('.select-selected').click();
    cy.get('.select-items div').eq(1).click();
    cy.get('.main__card_balance').then(($els) => {
      const arr = Array.from($els, (el) => el.innerText.slice(0, -1));
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] < arr[i + 1]) {
          return;
        } else {
          throw new Error('Сортировка выполнена неверно');
        }
      }
    });
  });

  it('Отсортировать счета по последней транзакции', () => {
    cy.get('.select-selected').click();
    cy.get('.select-items div').eq(2).click();
    cy.get('.main__trans-date').then(($els) => {
      const arr = Array.from($els, (el) => el.dataset.date);
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] < arr[i + 1]) {
          return;
        } else {
          throw new Error('Сортировка выполнена неверно');
        }
      }
    });
  });

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
    cy.get('.main__card').should('have.length', 7);
    cy.get('.main__btn').click();
    cy.wait(3500);
    cy.get('.main__card').should('have.length', 8);
  });
});
