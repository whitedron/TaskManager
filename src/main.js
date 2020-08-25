import {createMainMenuTemplate} from './components/main-menu.js';
import {createMainFilterTemplate} from './components/filter.js';
import {createBoardTemplate} from './components/board.js';
import {createEditTaskTemplate} from './components/edit-task.js';
import {createTaskTemplate} from './components/task.js';
import {createLoadMoreButtonTemplate} from './components/load-more-button.js';
import {generateTask} from './mock/task.js';
import {generateFilter} from './mock/filters.js';

const TASK_COUNT = 7;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

console.log(filters);
const siteMainElement = document.querySelector(`.main`);
const siteMainHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteMainHeaderElement, createMainMenuTemplate());
render(siteMainElement, createMainFilterTemplate(filters));
render(siteMainElement, createBoardTemplate());

const taskListElement = siteMainElement.querySelector(`.board__tasks`);

render(taskListElement, createEditTaskTemplate(tasks[0]));
for (let i = 1; i < TASK_COUNT; i++) {
  render(taskListElement, createTaskTemplate(tasks[i]));
}


render(taskListElement, createLoadMoreButtonTemplate());
