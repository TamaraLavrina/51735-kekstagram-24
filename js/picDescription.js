import { getRandomInteger } from './utils.js';

const DESCRIPTION = [
  'моя лучшая фотография с лейкой - на даче',
  'а мама сказала, что я классный фотограф',
  'посмотрите на  котика и забудьте о ваших проблемах',
  'лучше фотографии котика только сам котик ',
  'вы частно спрашиваете как мне удается так круто выглядеть. Секрет прост - деньги',
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Варвара',
  'Антон',
  'Дмитрий',
  'Лев',
  'Иван',
  'Марья',
  'Тимур',
  'Чук',
  'Гек',
];

const getRandomElement = (elements) => elements[getRandomInteger(1, elements.length - 1)];

const createDiscript = () => {
  const picDescription = {
    id: getRandomInteger(0, 25),
    url:`photos/${getRandomInteger(0,25)} .jpg`,
    description: getRandomElement(DESCRIPTION),
    likes: getRandomInteger(15, 200),
  };

  const comment = {
    id: getRandomInteger(0, 200),
    avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
    message: getRandomElement(MESSAGE),
    name: getRandomElement(NAMES),
  };

  return {picDescription, comment};
};

const picDescriptions = new Array(25).fill(null).map(() => createDiscript());

picDescriptions;
