import { el, setChildren } from 'redom';

export function createForm() {
  const form = el('form.form');

  setChildren(form, [
    el('fieldset.form__fieldset', [
      el('legend.form__legend', 'Вход в аккаунт'),
      el('.form__container', [
        el('.form__label-box', [
          el('label.form__label', 'Логин'),
          el('input.form__input', {
            type: 'text',
            placeholder: 'Placeholder',
          }),
        ]),
        el('.form__label-box', [
          el('label.form__label', 'Пароль'),
          el('input.form__input', {
            type: 'password',
            placeholder: 'Placeholder',
          }),
        ]),
      ]),
      el('button.btn', { type: 'submit', disabled: 'disabled' }, 'Войти'),
    ]),
  ]);
  return form;
}
