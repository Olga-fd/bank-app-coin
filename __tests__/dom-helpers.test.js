import { createForm } from '../src/dom-helpers.js';

test('Функция createForm должна создать форму с 2 полями', () => {
  const expected = `<form class="form"><fieldset class="form__fieldset"><legend class="form__legend">Вход в аккаунт</legend><div class="form__container"><div class="form__label-box"><label class="form__label">Логин</label><input class="form__input" type="text" placeholder="Placeholder"></div><div class="form__label-box"><label class="form__label">Пароль</label><input class="form__input" type="password" placeholder="Placeholder"></div></div><button class="btn" type="submit" disabled="">Войти</button></fieldset></form>`;
  const form = createForm();
  expect(form).toBeInstanceOf(HTMLFormElement);
  expect(form.outerHTML).toBe(expected);
});
