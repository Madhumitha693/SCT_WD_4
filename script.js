// script.js
document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const taskDateTime = document.getElementById("task-datetime");
    const taskList = document.getElementById("task-list");

    taskForm.addEventListener("submit", (event) => {
        event.preventDefault();
        addTask(taskInput.value, taskDateTime.value);
        taskInput.value = "";
        taskDateTime.value = "";
    });

    function addTask(task, datetime) {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span>${task} (Due: ${new Date(datetime).toLocaleString()})</span>
            <div class="task-actions">
                <button class="edit">Edit</button>
                <button class="complete">Complete</button>
                <button class="delete">Delete</button>
            </div>
        `;

        const editButton = taskItem.querySelector(".edit");
        const completeButton = taskItem.querySelector(".complete");
        const deleteButton = taskItem.querySelector(".delete");

        editButton.addEventListener("click", () => editTask(taskItem));
        completeButton.addEventListener("click", () => completeTask(taskItem));
        deleteButton.addEventListener("click", () => deleteTask(taskItem));

        taskList.appendChild(taskItem);
    }

    function editTask(taskItem) {
        const taskText = taskItem.querySelector("span").innerText.split(" (Due: ")[0];
        const datetimeText = taskItem.querySelector("span").innerText.split(" (Due: ")[1].slice(0, -1);
        const newTask = prompt("Edit task:", taskText);
        const newDatetime = prompt("Edit due date (YYYY-MM-DDTHH:MM):", datetimeText);
        if (newTask && newDatetime) {
            taskItem.querySelector("span").innerText = `${newTask} (Due: ${new Date(newDatetime).toLocaleString()})`;
        }
    }

    function completeTask(taskItem) {
        taskItem.classList.toggle("completed");
    }

    function deleteTask(taskItem) {
        taskItem.remove();
    }
});
