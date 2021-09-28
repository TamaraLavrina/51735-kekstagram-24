const getRandomInteger = (min, max) => {
  if (min <= 0 && max < min) {
    throw new SyntaxError('Неверный интервал, минимальное значение должно быть больше или равно 0 и меньше максимального значения');
  }
  else {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
};
// источник - learn.js

const checkMaxLength = (comment, maxLength = 140) => comment.toString().length <= maxLength;

export {getRandomInteger, checkMaxLength};