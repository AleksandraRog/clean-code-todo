const newTaskInput = document.getElementById('new-task');
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
  taskItem.append(checkBox, label, editInput, editButton, deleteButton);
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
  checkBox.onchange = checkBoxEventHandler;
};

const addTask = () => {
  console.log('Add Task...');

  if (!newTaskInput.value) return;
  const taskItem = createNewTask(newTaskInput.value);
  incompleteTasksList.appendChild(taskItem);
  bindTaskEvents(taskItem, taskToggleComplete);

  newTaskInput.value = '';
};

const editTask = (event) => {
  console.log('Edit Task...');
  console.log("Change 'edit' to 'save'");

  const taskItem = event.target.parentNode;

  const editInput = taskItem.querySelector('input[type=text]');
  const label = taskItem.querySelector('label');
  const editBtn = taskItem.querySelector('.edit');

  const containsClass = taskItem.classList.contains('edit-mode');
  //If class of the parent is .editmode
  if (containsClass) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
  } else {
    editInput.value = label.textContent;
  }
  editBtn.textContent = containsClass ? 'Edit' : 'Save';
  taskItem.classList.toggle('edit-mode');
};

const deleteTask = (event) => {
  console.log('Delete Task...');
  const taskItem = event.target.parentNode;
  const tasksList = taskItem.parentNode;
  tasksList.removeChild(taskItem);
};

const taskToggleComplete = (event) => {
  const taskItem = event.target.parentNode;
  const completeNextState = taskItem.parentNode.id === 'completed-tasks' ? 'Incomplete' : 'Completed';
  console.log(`${completeNextState} Task...`);
  const nextTasksList = completeNextState === 'Completed' ? completedTasksList : incompleteTasksList;
  nextTasksList.appendChild(taskItem);
};

//The glue to hold it all together.

addTaskButton.addEventListener('click', addTask);

const allTaskItems = [...incompleteTasksList.children, ...completedTasksList.children];

allTaskItems.forEach((task) => {
  bindTaskEvents(task, taskToggleComplete);
});
