const taskList = document.getElementById("task-list");
const taskInput = document.getElementById("task-input");
const addbtn = document.getElementById("add-task-button");

//Function to add a task
function addTask() {
    const task = taskInput.value.trim();
    if (!task) {
      alert("Please write down a task");
      console.log("hello");
      return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
      <label>
        <input type="checkbox">
        <span>${task}</span>
      </label>
      <span class="edit-btn" onclick="editTask(this)">Edit</span>
      <span class="delete-btn" onclick="deleteTask(this)">Delete</span>
    `;
    taskList.appendChild(li);
    taskInput.value = "";

  
    li.querySelector(".delete-btn").addEventListener("click", function() {
      deleteTask(this);
  });

  li.querySelector(".edit-btn").addEventListener("click", function() {
      editTask(this);
  });

}

//Function to delete a task
function deleteTask(element) {
  element.parentElement.remove();
}

// Function to edit a task
function editTask(element) {
  const span = element.previousElementSibling.querySelector("span");
  const newTask = prompt("Edit your task:", span.textContent);
  if (newTask) {
      span.textContent = newTask;
  }
}

addbtn.addEventListener("click", addTask);