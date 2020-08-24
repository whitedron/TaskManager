const isExpired = (dueDate) => {
  if (dueDate === null) {
    return false;
  }

  let currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);
  currentDate = new Date(currentDate);

  return currentDate.getTime() > dueDate.getTime();
};

const isRepeating = (repeating) => {
  return Object.values(repeating).some(Boolean);
};

const renderHashTags = (hashTags) => {
  let hashTagsNode = ``;
  for (let item of hashTags) {
    hashTagsNode += `<span class="card__hashtag-inner">
    <span class="card__hashtag-name">
      #${item}
    </span>
   </span>`
  }
  return hashTagsNode;
}

export const createTaskTemplate = (task) => {
  const {color, description, dueDate, repeating, isArchive, isFavorite, hashTags} = task;

  const date = dueDate !== null
    ? dueDate.toLocaleString(`en-US`, {day: `numeric`, month: `long`})
    : ``;

  const deadlineClassName = isExpired(dueDate)
    ? `card--deadline`
    : ``;

  const repeatClassName = isRepeating(repeating)
    ? `card--repeat`
    : ``;

  const archiveClassName = isArchive
    ? `card__btn--archive card__btn--disabled`
    : `card__btn--archive`;

  const favoriteClassName = isFavorite
    ? `card__btn--favorites card__btn--disabled`
    : `card__btn--favorites`;

  const hashTagsNode = renderHashTags(hashTags);

  return (`<article class="card card--${color} ${deadlineClassName} ${repeatClassName}">
    <div class="card__form">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">
            edit
          </button>
          <button type="button" class="card__btn ${archiveClassName}">
            archive
          </button>
          <button
            type="button" class="card__btn ${favoriteClassName}">
            favorites
          </button>
        </div>

        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <p class="card__text">${description}</p>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <div class="card__date-deadline">
                <p class="card__input-deadline-wrap">
                  <span class="card__date">${date}</span>
                  <span class="card__time">11:15 PM</span>
                </p>
              </div>
            </div>

            <div class="card__hashtag">
              <div class="card__hashtag-list">
                ${hashTagsNode}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>`
  );
};
