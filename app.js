//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const newTaskInput = document.getElementById('new-task'); //Add a new task.
const addButton = document.querySelector('.add-task__button');
const todoList = document.getElementById('todo-list'); //ul of #todo-list
const completedList = document.getElementById('completed-list'); //completed-list

const createElement = function (tagName, className, properties = {}) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  return Object.assign(element, properties);
};

//New task list item
const createTaskItem = function (taskText) {
  const deleteButton = createElement('button', 'task-item__delete-button');
  deleteButton.appendChild(createElement('img', '', { src: './remove.svg' }));

  const taskItem = createElement('li', 'task-item');
  taskItem.append(
    createElement('input', 'task-item__checkbox', { type: 'checkbox' }),
    //innerText encodes special characters, HTML does not.
    createElement('label', 'task-item__label', { innerText: taskText }),
    createElement('input', 'task-item__edit-input', { type: 'text' }),
    createElement('button', 'task-item__edit-button', { innerText: 'Edit' }),
    deleteButton,
  );
  return taskItem;
};

//Edit an existing task.
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

//Delete task.
const deleteTask = function () {
  this.parentNode.remove();
};

//Move the task to #completed-list when the checkbox is checked,
//and back to #todo-list when it is unchecked.
const toggleTaskCompletion = function () {
  const targetList = this.checked ? completedList : todoList;
  targetList.appendChild(this.parentNode);
};

const bindTaskEvents = function (taskItem) {
  const checkbox = taskItem.querySelector('.task-item__checkbox');
  const editButton = taskItem.querySelector('.task-item__edit-button');
  const deleteButton = taskItem.querySelector('.task-item__delete-button');

  checkbox.onchange = toggleTaskCompletion;
  editButton.onclick = toggleEditMode;
  deleteButton.onclick = deleteTask;
};

const addTask = function () {
  if (!newTaskInput.value) return;

  const taskItem = createTaskItem(newTaskInput.value);
  bindTaskEvents(taskItem);
  todoList.appendChild(taskItem);
  newTaskInput.value = '';
};

//The glue to hold it all together.
addButton.onclick = addTask;
[...todoList.children, ...completedList.children].forEach(bindTaskEvents);
