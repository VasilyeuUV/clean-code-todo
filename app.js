/** @type {HTMLInputElement} Field with the text of a new task. */
const newTaskInput = document.getElementById('new-task');

/** @type {HTMLButtonElement} Button that adds the typed task to the todo list. */
const addButton = document.querySelector('.add-task__button');

/** @type {HTMLUListElement} Tasks that are not done yet. */
const todoList = document.getElementById('todo-list');

/** @type {HTMLUListElement} Tasks that are done. */
const completedList = document.getElementById('completed-list');

/**
 * Creates an element with the given class and extra properties.
 * @param {string} tagName
 * @param {string} [className] Not set when empty.
 * @param {Object} [properties] Assigned to the element as is.
 * @returns {HTMLElement}
 */
const createElement = function (tagName, className, properties = {}) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  return Object.assign(element, properties);
};

/**
 * Builds a task item without event handlers (see bindTaskEvents).
 * The text goes through innerText, so special characters are not parsed as HTML.
 * @param {string} taskText
 * @returns {HTMLLIElement}
 */
const createTaskItem = function (taskText) {
  const deleteButton = createElement('button', 'task-item__delete-button');
  deleteButton.appendChild(createElement('img', '', { src: './remove.svg' }));

  const taskItem = createElement('li', 'task-item');
  taskItem.append(
    createElement('input', 'task-item__checkbox', { type: 'checkbox' }),
    createElement('label', 'task-item__label', { innerText: taskText }),
    createElement('input', 'task-item__edit-input', { type: 'text' }),
    createElement('button', 'task-item__edit-button', { innerText: 'Edit' }),
    deleteButton,
  );
  return taskItem;
};

/**
 * Switches a task between viewing and editing: the text is copied between the
 * label and the edit field, and the button caption between "Edit" and "Save".
 * @this {HTMLButtonElement} Edit button of the task.
 */
const toggleEditMode = function () {
  const taskItem = this.parentNode;
  const label = taskItem.querySelector('.task-item__label');
  const editInput = taskItem.querySelector('.task-item__edit-input');
  const isEditing = taskItem.classList.contains('task-item--editing');

  if (isEditing) {
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }
  this.innerText = isEditing ? 'Edit' : 'Save';
  taskItem.classList.toggle('task-item--editing');
};

/**
 * Removes the task from its list.
 * @this {HTMLButtonElement} Delete button of the task.
 */
const deleteTask = function () {
  this.parentNode.remove();
};

/**
 * Moves the task to the completed list when its checkbox is checked and back
 * to the todo list when it is unchecked.
 * @this {HTMLInputElement} Checkbox of the task.
 */
const toggleTaskCompletion = function () {
  const targetList = this.checked ? completedList : todoList;
  targetList.appendChild(this.parentNode);
};

/**
 * Attaches the checkbox, edit and delete handlers to a task item.
 * @param {HTMLLIElement} taskItem
 */
const bindTaskEvents = function (taskItem) {
  const checkbox = taskItem.querySelector('.task-item__checkbox');
  const editButton = taskItem.querySelector('.task-item__edit-button');
  const deleteButton = taskItem.querySelector('.task-item__delete-button');

  checkbox.onchange = toggleTaskCompletion;
  editButton.onclick = toggleEditMode;
  deleteButton.onclick = deleteTask;
};

/**
 * Adds a task with the typed text to the todo list. Empty text is ignored.
 */
const addTask = function () {
  if (!newTaskInput.value) return;

  const taskItem = createTaskItem(newTaskInput.value);
  bindTaskEvents(taskItem);
  todoList.appendChild(taskItem);
  newTaskInput.value = '';
};

addButton.onclick = addTask;
[...todoList.children, ...completedList.children].forEach(bindTaskEvents);
