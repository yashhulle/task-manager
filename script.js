let currentFilter = "all";
let tasks = [];
let taskList = document.getElementById("taskList");

function setFilter(filter) {
  currentFilter = filter;
  renderTasks();
}

function addTask() {
  let input = document.getElementById("taskInput");
  let taskText = input.value.trim();

  if (taskText === "") return;

  tasks.push({
    text: taskText,
    completed: false
  });

  saveTasks();
  renderTasks();
  input.value = "";
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {

    if (
      (currentFilter === "completed" && !task.completed) ||
      (currentFilter === "pending" && task.completed)
    ) return;

    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = task.text;

    if (task.completed) {
      span.classList.add("completed");
    }

    li.appendChild(span);

    // COMPLETE
    let tickBtn = document.createElement("button");

    tickBtn.textContent = task.completed ? "↩️" : "✔";

    tickBtn.onclick = function (e) {
    e.stopPropagation();

    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}; 

    li.appendChild(tickBtn);

    // DELETE
    let delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.onclick = function (e) {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    li.appendChild(delBtn);

    // EDIT
    let editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.onclick = function (e) {
      e.stopPropagation();

      let newText = prompt("Edit your task:", task.text);

      if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
      }
    };

    li.appendChild(editBtn);

    taskList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let data = localStorage.getItem("tasks");
  if (data) {
    tasks = JSON.parse(data);
  }
  renderTasks();
}

loadTasks();  

let input = document.getElementById("taskInput");

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
  if (input.value.trim() !== "") {
    addTask();
  }
}
});