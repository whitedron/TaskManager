import {createMainMenuTemplate} from './components/main-menu.js';
import {createMainFilterTemplate} from './components/filter.js';
import {createBoardTemplate} from './components/board.js';
import {createEditTaskTemplate} from './components/edit-task.js';
import {createTaskTemplate} from './components/task.js';
import {createLoadMoreButtonTemplate} from './components/load-more-button.js';
import {generateTask} from './mock/task.js';

const TASK_COUNT = 5;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
for (const ctask of tasks) {
  console.log(ctask);
}
const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteMainHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteMainHeaderElement, createMainMenuTemplate());
render(siteMainElement, createMainFilterTemplate());
render(siteMainElement, createBoardTemplate());

const taskListElement = siteMainElement.querySelector(`.board__tasks`);

render(taskListElement, createEditTaskTemplate());
for (let i = 0; i < TASK_COUNT; i++) {
  render(taskListElement, createTaskTemplate());
}

render(taskListElement, createLoadMoreButtonTemplate());
