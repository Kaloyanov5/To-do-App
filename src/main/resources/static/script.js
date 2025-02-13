const API_BASE_URL = "http://localhost:8080/api";

const textInput = document.getElementById("text-input");
const addBtn = document.getElementById("add-btn");
const tasksNumberDiv = document.getElementById("task-number");
const tasksDiv = document.getElementById("tasks-div");

const loadTasks = async () => {
    try {
        fetch(`${API_BASE_URL}/load`)
            .then(response => response.json())
            .then(tasksDb => {
                tasksDiv.innerHTML = tasksDb.map(task => `
                    <div class="task" id="task-${task.id}">
                        <input class="checkbox-task" type="checkbox" data-task-id="checkbox-${task.id}" ${task.done ? "checked" : ""}>
                        <p class="task-text ${task.done ? 'task-done' : ''}">${task.text}</p>
                        <button class="delete-task-btn" type="button" data-task-id="delete-${task.id}">X</button>
                    </div>
                `).join("");
            });
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}
loadTasks();

const updateTaskCount = () => {
    try {
        fetch(`${API_BASE_URL}/count`)
            .then(response => response.json())
            .then(count => tasksNumberDiv.textContent = count);
    } catch (error) {
        console.error("Error fetching task count:", error);
    }
}
updateTaskCount();

addBtn.addEventListener("click", async () => {
    const curText = textInput.value.trim();
    if(!curText){
        alert("Input field is empty!");
        textInput.value = "";
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({text: curText})
        });

        if(response.ok){
            textInput.value = "";
            loadTasks();
            updateTaskCount();
        } else {
            console.error("Error adding task:", response.status);
        }
    } catch (error) {
        console.error("Error adding task:", error);
    }
});

const handleCheckboxChange = async (event) => {
    const checkbox = event.target;
    const taskId = parseInt((checkbox.dataset.taskId).split("-")[1]);

    try {
        const response = await fetch(`${API_BASE_URL}/update/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({done: checkbox.checked})
        });

        if (response.body === "Task checked done!") {
            const taskElement = tasksDiv.querySelector(`#task-${taskId} .task-text`);
            taskElement.classList.toggle("task-done", checkbox.checked);
        } else if(response.body === "Task checked undone!") {
            const taskElement = tasksDiv.querySelector(`#task-${taskId} .task-text`);
            taskElement.classList.toggle("task-done", checkbox.checked);
        }

        loadTasks();
        updateTaskCount();
    } catch (error) {
        console.error("Error updating task:", error);
    }
}

const handleDeleteBtn = async (event) => {
    const button = event.target;
    const taskId = parseInt((button.dataset.taskId).split("-")[1]);

    try {
        const response = await fetch(`${API_BASE_URL}/delete/${taskId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: taskId})
        });

        if (response.ok) {
            loadTasks();
            updateTaskCount();
        }
    } catch (error) {
        console.error("Error deleting task:", error);
    }
}

tasksDiv.addEventListener("click", (event) => {
    if (event.target.type === "checkbox") {
        handleCheckboxChange(event);
    } else if(event.target.classList.contains("delete-task-btn")) {
        handleDeleteBtn(event);
    }
});