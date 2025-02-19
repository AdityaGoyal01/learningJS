const taskList = document.getElementById("task-list");
const taskInput = document.getElementById("task-input");
const addbtn = document.getElementById("add-task-button");

// Load tasks when page loads
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const task = taskInput.value.trim();
    if (!task) {
        alert("Please write down a task");
        return;
    }

    const taskObj = {
        id: Date.now(), // Unique ID for the task
        text: task,
        completed: false
    };

    saveTaskToLocalStorage(taskObj);
    renderTask(taskObj);
    taskInput.value = "";
}

function renderTask(taskObj) {
    const li = document.createElement("li");
    li.setAttribute("data-id", taskObj.id);
    li.innerHTML = `
      <label>
        <input type="checkbox" ${taskObj.completed ? "checked" : ""}>
        <span>${taskObj.text}</span>
      </label>
      <span class="edit-btn">Edit</span>
      <span class="delete-btn">Delete</span>
    `;

    // Event listeners for delete and edit
    li.querySelector(".delete-btn").addEventListener("click", function() {
        deleteTask(taskObj.id);
    });

    li.querySelector(".edit-btn").addEventListener("click", function() {
        editTask(taskObj.id);
    });

    li.querySelector("input[type='checkbox']").addEventListener("change", function() {
        toggleComplete(taskObj.id, this.checked);
    });

    taskList.appendChild(li);
}

// Save task to LocalStorage
function saveTaskToLocalStorage(taskObj) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from LocalStorage
function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(renderTask);
}

// Get tasks from LocalStorage
function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Delete a task
function deleteTask(taskId) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Remove from UI
    document.querySelector(`[data-id="${taskId}"]`).remove();
}

// Edit a task
function editTask(taskId) {
    let tasks = getTasksFromLocalStorage();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex !== -1) {
        const newTask = prompt("Edit your task:", tasks[taskIndex].text);
        if (newTask) {
            tasks[taskIndex].text = newTask;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            
            // Update UI
            document.querySelector(`[data-id="${taskId}"] span`).textContent = newTask;
        }
    }
}

// Toggle task completion
function toggleComplete(taskId, isCompleted) {
    let tasks = getTasksFromLocalStorage();
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.completed = isCompleted;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

addbtn.addEventListener("click", addTask);
