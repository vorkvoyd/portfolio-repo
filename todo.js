document.addEventListener("DOMContentLoaded", function () {
    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task");
    const todoList = document.getElementById("todo-list");
    const completedList = document.getElementById("completed-list"); // Completed tasks section

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

    function renderTasks() {
        todoList.innerHTML = "";
        tasks.forEach((task, index) => {
            let li = document.createElement("li");
            li.innerHTML = `
                <span>${task}</span>
                <button class="complete" data-index="${index}">✅</button>
            `;
            todoList.appendChild(li);
        });

        // Add event listeners to complete buttons
        document.querySelectorAll(".complete").forEach(button => {
            button.addEventListener("click", function () {
                let completedTask = tasks.splice(this.dataset.index, 1)[0];
                completedTasks.push(completedTask);
                saveTasks();
                renderTasks();
                renderCompletedTasks();
            });
        });
    }

    function renderCompletedTasks() {
        completedList.innerHTML = "";
        completedTasks.forEach((task, index) => {
            let li = document.createElement("li");
            li.innerHTML = `
                <span>${task}</span>
                <button class="restore" data-index="${index}">↩️</button>
                <button class="delete" data-index="${index}">❌</button>
            `;
            completedList.appendChild(li);
        });

        // Add event listeners for restore and delete buttons
        document.querySelectorAll(".restore").forEach(button => {
            button.addEventListener("click", function () {
                let restoredTask = completedTasks.splice(this.dataset.index, 1)[0];
                tasks.push(restoredTask);
                saveTasks();
                renderTasks();
                renderCompletedTasks();
            });
        });

        document.querySelectorAll(".delete").forEach(button => {
            button.addEventListener("click", function () {
                completedTasks.splice(this.dataset.index, 1);
                saveTasks();
                renderCompletedTasks();
            });
        });
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    }

    addTaskButton.addEventListener("click", function () {
        if (todoInput.value.trim() !== "") {
            tasks.push(todoInput.value.trim());
            saveTasks();
            renderTasks();
            todoInput.value = "";
        }
    });

    renderTasks();
    renderCompletedTasks(); // Load completed tasks on page load
});
