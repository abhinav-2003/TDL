let taskList = [];

document.getElementById('add-task-btn').addEventListener('click', addTask);

function addTask() {
  let taskInput = document.getElementById('task-input');
  let task = taskInput.value.trim();
  if (task !== '') {
    taskList.push({ text: task, completed: false });
    taskInput.value = '';
    renderTaskList();
  }
}

function renderTaskList() {
  let taskListHTML = '';
  taskList.forEach((task, index) => {
    taskListHTML += `
      <li>
        <input type="checkbox" id="task-${index}" ${task.completed ? 'checked' : ''}>
        <label for="task-${index}">${task.text}</label>
        <button class="delete-btn" data-index="${index}">X</button>
      </li>
    `;
  });
  document.getElementById('task-list').innerHTML = taskListHTML;
  addEventListenersToTasks();
}

function addEventListenersToTasks() {
  let taskListItems = document.getElementById('task-list').children;
  Array.prototype.forEach.call(taskListItems, (taskListItem) => {
    let checkbox = taskListItem.children[0];
    let deleteBtn = taskListItem.children[2];
    checkbox.addEventListener('click', toggleCompleted);
    deleteBtn.addEventListener('click', deleteTask);
  });
}

function toggleCompleted(event) {
  let taskIndex = event.target.id.split('-')[1];
  taskList[taskIndex].completed = !taskList[taskIndex].completed;
  renderTaskList();
}

function deleteTask(event) {
  let taskIndex = event.target.dataset.index;
  taskList.splice(taskIndex, 1);
  renderTaskList();
}

renderTaskList();