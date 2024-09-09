// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

if (taskList === null) {
  taskList = [];
  localStorage.setItem("tasks", JSON.stringify(taskList));
}

// Todo: create a function to generate a unique task id
function generateTaskId() {
  if (nextId === null) {
    nextId = 0;
    let taskId = nextId + 1;
    localStorage.setItem("nextId", `${taskId}`);
    return taskId;
  } else {
    nextId = JSON.parse(localStorage.getItem("nextId"));
    let taskId = nextId + 1;
    localStorage.setItem("nextId", `${taskId}`);
    return taskId;
  }
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  let cardDescription = $('<p class="card-text">');
  let cardDate = $('<p class="card-text">');
  let deleteButton = $('<a href="#" class="btn btn-danger">');
  deleteButton.text("Delete");
  let cardBody = $('<div class="card-body">');
  let todoCards = $("#todo-cards");

  let cardHeader = $('<h5 class="card-header">');
  let card = $('<div class="card mb-3">');

  todoCards.append(card);
  card.append([cardHeader, cardBody]);
  cardBody.append([cardDescription, cardDate, deleteButton]);

  cardHeader.text(`${task.title}`);
  cardDescription.text(`${task.taskDescription}`);
  cardDate.text(`${task.date}`);

  card.attr('id',`card-${generateTaskId()}`);
  deleteButton.attr('data-card', `${card.attr('id')}`);
  deleteButton.on('click', handleDeleteTask);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  for(task of taskList){
    createTaskCard(task);
  }
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  const title = $("#input-title").val();
  const date = $("#due-date").val();
  const taskDescription = $("#description").val();

  const task = {
    title: title,
    date: date,
    taskDescription: taskDescription,
  };

  taskList.push(task);
  localStorage.setItem("tasks", JSON.stringify(taskList));

  createTaskCard(task);
  $("#input-title").val("");
  $("#due-date").val("");
  $("#description").val("");
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  event.target;
  let idValue= $(event.target).attr('data-card');
  let removeEl= document.getElementById(idValue);
  removeEl.remove();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  const addTaskButton = $("#add-task");
  addTaskButton.on("click", handleAddTask);
  renderTaskList();
});
