import validator from 'validator';

export function isValidLength(str) {
  return validator.isLength(str, { min: 6 });
}

export function isContainedSpaces(str) {
  return validator.contains(str, ' ');
}

export function isValidAccount(str) {
  const lengthInput = validator.isLength(str);
  const space = validator.contains(str, ' ');
  const isNumeric = validator.isNumeric(str);

  if (lengthInput == false || space == true || isNumeric == false || str <= 0) {
    return false;
  } else {
    return true;
  }
}
