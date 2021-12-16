/* eslint-disable jest/expect-expect */
/// <reference types="cypress" />

// login just once using API
let user;

before(function fetchUser() {
  cy.request('POST', 'http://127.0.0.1:3000/login', {
    login: Cypress.env('developer'),
    password: Cypress.env('skillbox'),
  })
    .its('body')
    .then((res) => {
      user = res;
    });
});

// but set the user before visiting the page
// so the app thinks it is already authenticated
beforeEach(function setUser() {
  cy.visit('http://localhost:8080', {
    onBeforeLoad(win) {
      // and before the page finishes loading
      // set the user object in local storage
      win.localStorage.setItem('user', JSON.stringify(user));
    },
  });
  // the page should be opened and the user should be logged in
});

describe('JWT', () => {
  it('makes authenticated request', () => {
    // we can make authenticated request ourselves
    // since we know the token
    cy.request({
      method: 'POST',
      url: 'http://127.0.0.1:3000/login',
      auth: {
        bearer: user.token,
      },
    })
      .its('body')
      .should('deep.equal', [
        {
          payload: { token: 'ZGV2ZWxvcGVyOnNraWxsYm94' },
          error: '',
        },
      ]);
  });

  it('is logged in', () => {
    cy.get('#login').type('developer{enter}');
    cy.get('#password').type('skillbox{enter}');
    cy.get('body').click();
    cy.contains('button', 'Войти').click();
    cy.location('pathname').should('equal', '/index.html/accounts');

    it('shows loaded user', () => {
      // this user information came from authenticated XHR call
    });

    cy.contains('Ваши счета').should('be.visible');
  });
});
