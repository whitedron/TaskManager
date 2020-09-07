import SiteMenuView from './components/main-menu.js';

import TaskEditView from './components/edit-task.js';
import TaskView from './components/task.js';
import {generateTask} from './mock/task.js';
import {generateFilter} from './mock/filters.js';
import {render, RenderPosition, replace, remove} from "./utils/render.js";
import LoadMoreButtonView from "./components/load-more-button.js";
import BoardView from "./components/board.js";
import SortView from "./components/sort.js";
import TaskListView from "./components/task-list.js";
import FilterView from "./components/filter.js";
import NoTaskView from "./components/no-task.js";

const TASK_COUNT = 25;
const TASK_COUNT_PER_STEP = 8;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const renderTask = (taskListElement, task) => {
  const taskComponent = new TaskView(task);
  const taskEditComponent = new TaskEditView(task);
  const replaceCardToForm = () => {
    replace(taskEditComponent, taskComponent);
  };

  const replaceFormToCard = () => {
    replace(taskComponent, taskEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  taskComponent.setEditClickHandler(() => {
    document.addEventListener(`keydown`, onEscKeyDown);
    replaceCardToForm();
  });

  taskEditComponent.setFormSubmitHandler(() => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
  render(taskListElement, taskComponent, RenderPosition.BEFOREEND);
};

const renderBoard = (boardContainer, boardTasks) => {
  const boardComponent = new BoardView();

  const taskListComponent = new TaskListView();

  render(boardContainer, boardComponent, RenderPosition.BEFOREEND);

  render(boardComponent, taskListComponent, RenderPosition.BEFOREEND);

  if (boardTasks.every((task) => task.isArchive)) {
    render(boardComponent, new NoTaskView(), RenderPosition.AFTERBEGIN);
    return;
  }

  render(boardComponent, new SortView(), RenderPosition.AFTERBEGIN);

  boardTasks
    .slice(0, Math.min(tasks.length, TASK_COUNT_PER_STEP))
    .forEach((boardTask) => renderTask(taskListComponent, boardTask));

  if (boardTasks.length > TASK_COUNT_PER_STEP) {

    let renderedTaskCount = TASK_COUNT_PER_STEP;
    const loadMoreButtonComponent = new LoadMoreButtonView();
    render(boardComponent, loadMoreButtonComponent, RenderPosition.BEFOREEND);
    loadMoreButtonComponent.setClickHandler(() => {
      boardTasks
        .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
        .forEach((boardTask) => renderTask(taskListComponent, boardTask));

      renderedTaskCount += TASK_COUNT_PER_STEP;

      if (renderedTaskCount >= boardTasks.length) {
        remove(loadMoreButtonComponent);
      }
    });
  }
};

render(siteHeaderElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterView(filters), RenderPosition.BEFOREEND);

renderBoard(siteMainElement, tasks);
