document.addEventListener("DOMContentLoaded", function() {
    var taskForm = document.getElementById("task-form");
    var taskInput = document.getElementById("task-input");
    var taskList = document.getElementById("task-list");
    var deleteBtn = document.getElementById("delete-btn");
    var filterSelect = document.getElementById("filter-select");
  
    taskForm.addEventListener("submit", function(event) {
      event.preventDefault();
      var taskText = taskInput.value.trim();
      if (taskText !== "") {
        var taskId = Date.now();
        var taskItem = createTaskItem(taskId, taskText);
        taskList.appendChild(taskItem);
        taskInput.value = "";
        applyFilter();
      }
    });
  
    taskList.addEventListener("click", function(event) {
      if (event.target.classList.contains("task-item")) {
        var taskItem = event.target;
        var taskId = taskItem.dataset.taskId;
        var taskCheckbox = taskItem.querySelector(".task-checkbox");
        if (!taskCheckbox.checked) {
          taskCheckbox.checked = true;
          taskItem.classList.add("completed");
          taskItem.classList.add("animate");
          updateTaskStatus(taskId, true);
        }
      }
    });
  
    taskList.addEventListener("change", function(event) {
      if (event.target.classList.contains("task-checkbox")) {
        var taskItem = event.target.parentNode;
        var taskId = taskItem.dataset.taskId;
        var taskTextSpan = taskItem.querySelector(".task-text");
        if (event.target.checked) {
          taskItem.classList.add("completed");
          taskTextSpan.style.textDecoration = "line-through";
          updateTaskStatus(taskId, true);
        } else {
          taskItem.classList.remove("completed");
          taskTextSpan.style.textDecoration = "none";
          updateTaskStatus(taskId, false);
        }
        applyFilter();
      }
    });
  
    deleteBtn.addEventListener("click", function() {
      var completedTasks = taskList.querySelectorAll(".task-item.completed");
      completedTasks.forEach(function(taskItem) {
        var taskId = taskItem.dataset.taskId;
        taskItem.remove();
        deleteTask(taskId);
      });
    });
  
    filterSelect.addEventListener("change", function() {
      applyFilter();
    });
  
    // Function to create a new task item
    function createTaskItem(taskId, taskText) {
      var taskItem = document.createElement("li");
      taskItem.className = "task-item";
      taskItem.dataset.taskId = taskId;
  
      var taskCheckbox = document.createElement("input");
      taskCheckbox.type = "checkbox";
      taskCheckbox.className = "task-checkbox";
  
      var taskTextSpan = document.createElement("span");
      taskTextSpan.className = "task-text";
      taskTextSpan.textContent = taskText;
  
      taskItem.appendChild(taskCheckbox);
      taskItem.appendChild(taskTextSpan);
  
      return taskItem;
    }
  
    // Function to update task status in the backend (simulated here)
    function updateTaskStatus(taskId, completed) {
      console.log("Updating task status:", taskId, completed);
      // Simulated update in the backend
    }
  
    // Function to delete a task from the backend (simulated here)
    function deleteTask(taskId) {
      console.log("Deleting task:", taskId);
      // Simulated delete from the backend
    }
  
    // Function to apply the selected filter
    function applyFilter() {
      var filterValue = filterSelect.value;
      var taskItems = taskList.querySelectorAll(".task-item");
  
      taskItems.forEach(function(taskItem) {
        if (filterValue === "completed") {
          if (taskItem.classList.contains("completed")) {
            taskItem.style.display = "flex";
          } else {
            taskItem.style.display = "none";
          }
        } else if (filterValue === "active") {
          if (!taskItem.classList.contains("completed")) {
            taskItem.style.display = "flex";
          } else {
            taskItem.style.display = "none";
          }
        } else {
          taskItem.style.display = "flex";
        }
      });
    }
  });
  
      
  