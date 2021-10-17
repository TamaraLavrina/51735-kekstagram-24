import { getRandomInteger,  getRandomElement } from './utils.js';

const DESCRIPTION = [
  'моя лучшая фотография с лейкой - на даче',
  'а мама сказала, что я классный фотограф',
  'посмотрите на  котика и забудьте о ваших проблемах',
  'лучше фотографии котика только сам котик ',
  'вы частно спрашиваете как мне удается так круто выглядеть. Секрет прост - деньги',
  'Это ж кто до такого додумался...',
  'Давайте сделаем наши дома этой осенью ещё уютнее - Специально для вас мы подготовили много интересных мастер классов, которые можно будет посмотреть в аккаунте',
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

const USERS_NUMBER = 250;
const usersIds = new Array(USERS_NUMBER).fill(null).map((_, index) => index);

const createComment = () => {
  const picAvatar = `img/avatar-${getRandomInteger(1, 6)}.svg`;
  const picMessage = getRandomElement(MESSAGE);
  const picName = getRandomElement(NAMES);

  return {
    id: usersIds.pop(),
    avatar: picAvatar,
    message: picMessage,
    name: picName,
  };
};

const getComments = (amount) => Array.from( { length: amount }, createComment);

const createDescription = (index) => {
  const picDescription = getRandomElement(DESCRIPTION);
  const likes = getRandomInteger(15, 200);
  const commentsCount = getRandomInteger(1, 6);
  const comments = getComments(commentsCount);

  return {
    id: index,
    url:`photos/${index}.jpg`,
    description: picDescription,
    likes,
    comments,
  };
};

const generatePics = (amount) => Array.from( { length: amount }).map((_, index) => createDescription(index+1));

export { generatePics };

