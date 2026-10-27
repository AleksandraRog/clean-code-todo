const taskInput = document.getElementById('new-task');
const addTaskButton = document.getElementsByTagName('button')[0];
const incompleteTasksList = document.getElementById('incomplete-tasks');
const completedTasksList = document.getElementById('completed-tasks');

const createNewTask = function (taskString) {
  const taskItem = document.createElement('li');
  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteIcon = document.createElement('img');

  label.innerText = taskString;
  label.className = 'task';

  //Each elements, needs appending
  checkBox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteIcon.src = './remove.svg';
  deleteButton.appendChild(deleteIcon);

  taskItem.appendChild(checkBox);
  taskItem.appendChild(label);
  taskItem.appendChild(editInput);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);
  return taskItem;
};

const bindTaskEvents = (taskItem, checkBoxEventHandler) => {
  console.log('bind list item events');
  //select ListItems children
  const checkBox = taskItem.querySelector('input[type=checkbox]');
  const editButton = taskItem.querySelector('button.edit');
  const deleteButton = taskItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
};

const addTask = () => {
  console.log('Add Task...');
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  const taskItem = createNewTask(taskInput.value);
  incompleteTasksList.appendChild(taskItem);
  bindTaskEvents(taskItem, taskCompleted);

  taskInput.value = '';
};

const editTask = (event) => {
  console.log('Edit Task...');
  console.log("Change 'edit' to 'save'");

  const taskItem = event.target.parentNode;

  const editInput = taskItem.querySelector('input[type=text]');
  const label = taskItem.querySelector('label');
  const editBtn = taskItem.querySelector('.edit');
  const containsClass = taskItem.classList.contains('editMode');
  //If class of the parent is .editmode
  if (containsClass) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }
  taskItem.classList.toggle('editMode');
};

const deleteTask = (event) => {
  console.log('Delete Task...');
  const taskItem = event.target.parentNode;
  const tasksList = taskItem.parentNode;
  tasksList.removeChild(taskItem);
};

const taskIncomplete = (event) => {
  console.log('Incomplete Task...');
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  const taskItem = event.target.parentNode;
  incompleteTasksList.appendChild(taskItem);
  bindTaskEvents(taskItem, taskCompleted);
};

//Mark task completed
function taskCompleted() {
  console.log('Complete Task...');

  //Append the task list item to the #completed-tasks
  const taskItem = this.parentNode;
  completedTasksList.appendChild(taskItem);
  bindTaskEvents(taskItem, taskIncomplete);
}

//The glue to hold it all together.

addTaskButton.addEventListener('click', addTask);

for (let i = 0; i < incompleteTasksList.children.length; i++) {
  bindTaskEvents(incompleteTasksList.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksList.children.length; i++) {
  bindTaskEvents(completedTasksList.children[i], taskIncomplete);
}
