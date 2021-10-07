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

const getRandomElement = (elements) => elements[getRandomInteger(1, elements.length - 1)];

const createArray = (index) => {
  const array = [];
  for (let ik = 1; ik <= index; ik++) {
    array.push(ik);
  }
  return array;
};


export {
  getRandomInteger,
  checkMaxLength,
  getRandomElement,
  createArray
};
