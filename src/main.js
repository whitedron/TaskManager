import {createMainMenuTemplate} from './components/main-menu.js';
import {createMainFilterTemplate} from './components/filter.js';
import {createBoardTemplate} from './components/board.js';
import {createEditTaskTemplate} from './components/edit-task.js';
import {createTaskTemplate} from './components/task.js';
import {createLoadMoreButtonTemplate} from './components/load-more-button.js';
import {generateTask} from './mock/task.js';
import {generateFilter} from './mock/filters.js';

const TASK_COUNT = 23;
const TASK_COUNT_PER_STEP = 8;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteMainHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteMainHeaderElement, createMainMenuTemplate());
render(siteMainElement, createMainFilterTemplate(filters));
render(siteMainElement, createBoardTemplate());

const taskListElement = siteMainElement.querySelector(`.board__tasks`);

render(taskListElement, createEditTaskTemplate(tasks[0]));
for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  render(taskListElement, createTaskTemplate(tasks[i]));
}

const boardContainerElement = siteMainElement.querySelector(`.board`);

if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;
  render(boardContainerElement, createLoadMoreButtonTemplate(), `beforeend`);

  const loadMoreButton = boardContainerElement.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}
