'use strict';

/** @type {HTMLInputElement} Field with the text of a new task. */
const newTaskInput = document.getElementById('new-task');

/** @type {HTMLButtonElement} Button that adds the typed task to the todo list. */
const addButton = document.querySelector('.add-task__button');

/** @type {HTMLUListElement} Tasks that are not done yet. */
const todoList = document.getElementById('todo-list');

/** @type {HTMLUListElement} Tasks that are done. */
const completedList = document.getElementById('completed-list');

/** Caption of the edit button while the task is shown as text. */
const editCaption = 'Edit';

/** Caption of the edit button while the task text is being edited. */
const saveCaption = 'Save';

/**
 * @typedef {Object} Task
 * @property {string} text
 * @property {boolean} [isCompleted] Starts in the completed list.
 * @property {boolean} [isEditing] Starts in edit mode.
 */

/** @type {Task[]} Tasks shown on page load. */
const initialTasks = [
  { text: 'Pay Bills' },
  { text: 'Go Shopping', isEditing: true },
  { text: 'See the Doctor', isCompleted: true },
];

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
 * Builds a task item.
 * The text goes through textContent, so special characters are not parsed as HTML.
 * @param {string} taskText
 * @returns {HTMLLIElement}
 */
const createTaskItem = function (taskText) {
  const deleteButton = createElement('button', 'task-item__delete-button', {
    type: 'button',
    ariaLabel: 'Delete task',
  });
  deleteButton.appendChild(
    createElement('img', '', { src: './remove.svg', alt: '' }),
  );

  const taskItem = createElement('li', 'task-item');
  taskItem.append(
    createElement('input', 'task-item__checkbox', {
      type: 'checkbox',
      ariaLabel: 'Completed',
    }),
    createElement('label', 'task-item__label', { textContent: taskText }),
    createElement('input', 'task-item__edit-input', {
      type: 'text',
      ariaLabel: 'Task text',
    }),
    createElement('button', 'task-item__edit-button', {
      type: 'button',
      textContent: editCaption,
    }),
    deleteButton,
  );
  return taskItem;
};

/**
 * Switches a task between viewing and editing: the text is copied between the
 * label and the edit field, and the button caption between "Edit" and "Save".
 * @param {HTMLLIElement} taskItem
 */
const toggleEditMode = function (taskItem) {
  const label = taskItem.querySelector('.task-item__label');
  const editInput = taskItem.querySelector('.task-item__edit-input');
  const editButton = taskItem.querySelector('.task-item__edit-button');
  const isEditing = taskItem.classList.contains('task-item--editing');

  if (isEditing) {
    label.textContent = editInput.value;
  } else {
    editInput.value = label.textContent;
  }
  editButton.textContent = isEditing ? editCaption : saveCaption;
  taskItem.classList.toggle('task-item--editing');
};

/**
 * Puts the task into the completed list when its checkbox is checked and into
 * the todo list otherwise.
 * @param {HTMLLIElement} taskItem
 */
const placeTask = function (taskItem) {
  const checkbox = taskItem.querySelector('.task-item__checkbox');
  const targetList = checkbox.checked ? completedList : todoList;
  targetList.appendChild(taskItem);
};

/**
 * Handles clicks on the edit and delete buttons of any task in a list.
 * @param {MouseEvent} event
 */
const handleListClick = function (event) {
  const taskItem = event.target.closest('.task-item');
  if (event.target.closest('.task-item__edit-button')) {
    toggleEditMode(taskItem);
  } else if (event.target.closest('.task-item__delete-button')) {
    taskItem.remove();
  }
};

/**
 * Moves a task to the matching list when its checkbox is toggled.
 * @param {Event} event
 */
const handleListChange = function (event) {
  if (event.target.matches('.task-item__checkbox')) {
    placeTask(event.target.closest('.task-item'));
  }
};

/**
 * Creates a task and shows it in the matching list and state.
 * @param {Task} task
 */
const renderTask = function ({ text, isCompleted = false, isEditing = false }) {
  const taskItem = createTaskItem(text);
  taskItem.querySelector('.task-item__checkbox').checked = isCompleted;
  placeTask(taskItem);
  if (isEditing) toggleEditMode(taskItem);
};

/**
 * Adds a task with the typed text to the todo list. Empty text is ignored.
 */
const addTask = function () {
  if (!newTaskInput.value) return;

  renderTask({ text: newTaskInput.value });
  newTaskInput.value = '';
};

addButton.addEventListener('click', addTask);
[todoList, completedList].forEach((list) => {
  list.addEventListener('click', handleListClick);
  list.addEventListener('change', handleListChange);
});
initialTasks.forEach(renderTask);
