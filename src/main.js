import SiteMenuView from './components/main-menu.js';

import TaskEditView  from './components/edit-task.js';
import TaskView  from './components/task.js';
import {generateTask} from './mock/task.js';
import {generateFilter} from './mock/filters.js';
import {renderTemplate, render, RenderPosition} from "./utils.js";
import LoadMoreButtonView from "./components/load-more-button.js";
import BoardView from "./components/board.js";
import SortView from "./components/sort.js";
import TaskListView from "./components/task-list.js";
import FilterView from "./components/filter.js";
import NoTaskView from "./components/no-task.js";

const TASK_COUNT = 23;
const TASK_COUNT_PER_STEP = 8;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const renderTask = (taskListElement, task) => {
  const taskComponent = new TaskView(task);
  const taskEditComponent = new TaskEditView(task);
  const replaceCardToForm = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const replaceFormToCard = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  taskComponent.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    document.addEventListener(`keydown`, onEscKeyDown);
    replaceCardToForm();
  });

  taskEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};


render(siteHeaderElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);

const boardComponent = new BoardView();
render(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);
render(boardComponent.getElement(), new SortView().getElement(), RenderPosition.AFTERBEGIN);
const taskListComponent = new TaskListView();
render(boardComponent.getElement(), taskListComponent.getElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  renderTask(taskListComponent.getElement(), tasks[i])
};

if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderTemplateedTaskCount = TASK_COUNT_PER_STEP;
  const loadMoreButtonComponent = new LoadMoreButtonView();

  render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);
  loadMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();

    tasks
      .slice(renderTemplateedTaskCount, renderTemplateedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => renderTask(taskListComponent.getElement(), task));

    renderTemplateedTaskCount += TASK_COUNT_PER_STEP;

    if (renderTemplateedTaskCount >= tasks.length) {
     loadMoreButtonComponent.getElement().remove();
     loadMoreButtonComponent.removeElement();
    }
  });
}
