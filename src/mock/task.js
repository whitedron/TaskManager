import {COLORS} from "../const.js";
import {getRandomInteger} from "../utils.js";

const generateDescription = () => {
  const descriptions = [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const generateDate = () => {

  const isDate = Boolean(getRandomInteger(0, 1));

  if (!isDate) {
    return null;
  }

  const MAX_DAY_GAP = 7;
  const daysGap = getRandomInteger(-MAX_DAY_GAP, MAX_DAY_GAP);
  const currentDate = new Date();

  // По заданию дедлайн у задачи устанавливается без учёта времеми,
  // но объект даты без времени завести нельзя,
  // поэтому будем считать срок у всех задач -
  // это 23:59:59 установленной даты
  currentDate.setHours(23, 59, 59, 999);

  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};

const generateRepeating = () => {
  return {
    mo: false,
    tu: false,
    we: Boolean(getRandomInteger(0, 1)),
    th: false,
    fr: Boolean(getRandomInteger(0, 1)),
    sa: false,
    su: false
  };
};

const getRandomColor = () => {
  const randomIndex = getRandomInteger(0, COLORS.length - 1);
  return COLORS[randomIndex];
};

const generateHashTags = () => {
  const MAX_HASHTAG_COUNT = 3;
  const tags = [`homework`, `theory`, `practice`, `intensive`, `keks`];
  let hashTags = new Set();
  for (let i = 0; i < getRandomInteger(0, MAX_HASHTAG_COUNT); i++) {
    hashTags.add(tags[getRandomInteger(0, tags.length - 1)]);
  }
  return hashTags;
};

export const generateTask = () => {
  const dueDate = generateDate();
  const repeating = dueDate === null ? generateRepeating() :
    {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false
    };
  const task = {
    description: generateDescription(),
    dueDate,
    repeating,
    color: getRandomColor(),
    hashTags: generateHashTags(),
    isArchive: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
  // console.log(task);
  return task;
};
