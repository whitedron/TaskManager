import SiteMenuView from './components/main-menu.js';

import TaskEditView from './components/edit-task.js';
import TaskView from './components/task.js';
import {generateTask} from './mock/task.js';
import {generateFilter} from './mock/filters.js';
import {render, RenderPosition} from "./utils.js";
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

  taskComponent.setEditClickHandler(() => {
    document.addEventListener(`keydown`, onEscKeyDown);
    replaceCardToForm();
  });

  taskEditComponent.setFormSubmitHandler(() => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderBoard = (boardContainer, boardTasks) => {
  const boardComponent = new BoardView();

  const taskListComponent = new TaskListView();

  render(boardContainer, boardComponent.getElement(), RenderPosition.BEFOREEND);

  render(boardComponent.getElement(), taskListComponent.getElement(), RenderPosition.BEFOREEND);

  if (boardTasks.every((task) => task.isArchive)) {
    render(boardComponent.getElement(), new NoTaskView().getElement(), RenderPosition.AFTERBEGIN);
    return;
  }

  render(boardComponent.getElement(), new SortView().getElement(), RenderPosition.AFTERBEGIN);

  boardTasks
    .slice(0, Math.min(tasks.length, TASK_COUNT_PER_STEP))
    .forEach((boardTask) => renderTask(taskListComponent.getElement(), boardTask));

  if (boardTasks.length > TASK_COUNT_PER_STEP) {

    let renderedTaskCount = TASK_COUNT_PER_STEP;
    const loadMoreButtonComponent = new LoadMoreButtonView();
    render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);
    loadMoreButtonComponent.setClickHandler(() => {
      boardTasks
        .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
        .forEach((boardTask) => renderTask(taskListComponent.getElement(), boardTask));

      renderedTaskCount += TASK_COUNT_PER_STEP;

      if (renderedTaskCount >= boardTasks.length) {
        loadMoreButtonComponent.getElement().remove();
        loadMoreButtonComponent.removeElement();
      }
    });
  }
};

render(siteHeaderElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);

renderBoard(siteMainElement, tasks);
