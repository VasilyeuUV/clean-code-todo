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

//New task list item
const createTaskItem = function (taskText) {
  const taskItem = document.createElement('li');

  //input (checkbox)
  const checkbox = document.createElement('input'); //checkbx
  //label
  const label = document.createElement('label'); //label
  //input (text)
  const editInput = document.createElement('input'); //text
  //button.task-item__edit-button
  const editButton = document.createElement('button'); //edit button

  //button.task-item__delete-button
  const deleteButton = document.createElement('button'); //delete button
  const deleteIcon = document.createElement('img'); //delete button image

  taskItem.className = 'task-item';

  label.innerText = taskText;
  label.className = 'task-item__label';

  //Each elements, needs appending
  checkbox.type = 'checkbox';
  checkbox.className = 'task-item__checkbox';
  editInput.type = 'text';
  editInput.className = 'task-item__edit-input';

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'task-item__edit-button';

  deleteButton.className = 'task-item__delete-button';
  deleteIcon.src = './remove.svg';
  deleteButton.appendChild(deleteIcon);

  //and appending.
  taskItem.appendChild(checkbox);
  taskItem.appendChild(label);
  taskItem.appendChild(editInput);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);
  return taskItem;
};

const addTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!newTaskInput.value) return;
  const taskItem = createTaskItem(newTaskInput.value);

  //Append taskItem to todoList
  todoList.appendChild(taskItem);
  bindTaskEvents(taskItem);

  newTaskInput.value = '';
};

//Edit an existing task.

const toggleEditMode = function () {
  const taskItem = this.parentNode;

  const editInput = taskItem.querySelector('.task-item__edit-input');
  const label = taskItem.querySelector('.task-item__label');
  const editButton = taskItem.querySelector('.task-item__edit-button');
  const isEditing = taskItem.classList.contains('task-item--editing');
  //If class of the parent is .task-item--editing
  if (isEditing) {
    //switch to .task-item--editing
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  //toggle .task-item--editing on the parent.
  taskItem.classList.toggle('task-item--editing');
};

//Delete task.
const deleteTask = function () {
  const taskItem = this.parentNode;
  const taskList = taskItem.parentNode;
  //Remove the parent list item from the ul.
  taskList.removeChild(taskItem);
};

//Move the task to #completed-list when the checkbox is checked,
//and back to #todo-list when it is unchecked.
const toggleTaskCompletion = function () {
  const taskItem = this.parentNode;
  const targetList = this.checked ? completedList : todoList;
  targetList.appendChild(taskItem);
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.onclick = addTask;

const bindTaskEvents = function (taskItem) {
  //select taskItem children
  const checkbox = taskItem.querySelector('.task-item__checkbox');
  const editButton = taskItem.querySelector('.task-item__edit-button');
  const deleteButton = taskItem.querySelector('.task-item__delete-button');

  //Bind toggleEditMode to edit button.
  editButton.onclick = toggleEditMode;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind toggleTaskCompletion to the checkbox.
  checkbox.onchange = toggleTaskCompletion;
};

//bind events to the list items of both lists
[...todoList.children, ...completedList.children].forEach(bindTaskEvents);
