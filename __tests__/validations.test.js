import {
  isValidLength,
  isContainedSpaces,
  isValidAccount,
} from '../src/validations.js';

test('Проверка логина должна пропускать значения больше 6 символов', () => {
  expect(isValidLength('1234567')).toBe(true);
});

test('Проверка логина не должна пропускать значение с пробелами', () => {
  expect(isContainedSpaces('4333 6161')).toBe(true);
});

test('Проверка логина не должна пропускать значения меньше 6 символов', () => {
  expect(isValidLength('12345')).toBe(false);
});

test('Проверка номера счета не пропускает пустую строку, с пробелами, не состоящую только из цифр или равную нулю', () => {
  expect(isValidAccount('433 611 8659 099')).toBe(false);
  expect(isValidAccount('0')).toBe(false);
  expect(isValidAccount('fghhhhhhhhh')).toBe(false);
  expect(isValidAccount('')).toBe(false);
});
