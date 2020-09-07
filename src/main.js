import SiteMenuView from './components/main-menu.js';
import {generateTask} from './mock/task.js';
import {generateFilter} from './mock/filters.js';
import FilterView from "./components/filter.js";
import BoardPresenter from "./presenter/board.js";
import {render, RenderPosition} from "./utils/render.js";

const TASK_COUNT = 25;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const boardPresenter = new BoardPresenter(siteMainElement);

render(siteHeaderElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterView(filters), RenderPosition.BEFOREEND);

boardPresenter.init(tasks);
