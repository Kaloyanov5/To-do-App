const textInput = document.getElementById("text-input");
const addBtn = document.getElementById("add-btn");
const tasksNumberDiv = document.getElementById("task-number");
const tasksDiv = document.getElementById("tasks-div");

let tasks;

const loadTasksFromLocalStorage = () => {
    const tasksJSON = localStorage.getItem("tasks");
    if (tasksJSON){
        tasks = JSON.parse(tasksJSON);
    } else{
        tasks = [];
    }
}
loadTasksFromLocalStorage();

const saveTasksToLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const updateTaskCount = () => {
    const doneTasksCount = tasks.filter((obj) => obj.done === false).length;
    tasksNumberDiv.textContent = doneTasksCount;
}
updateTaskCount();

const updateTasks = () => {
    tasksDiv.innerHTML = "";

    if (tasks.length === 0) return;

    for(let obj of tasks){
        const doneClass = obj.done ? "task-done" : "";
        tasksDiv.innerHTML += `
        <div class="task" id="task-${obj.id}">
            <input class="checkbox-task" type="checkbox" data-task-id="checkbox-${obj.id}" ${obj.done ? "checked" : ""}>
            <p class="task-text ${doneClass}">${obj.text}</p>
            <button class="delete-task-btn" type="button" data-task-id="delete-${obj.id}">X</button>
        </div>
        `;
    }
}
updateTasks();

const checkTaskTextAvailable = (tasksArray, curText) => {
    if (tasksArray.length === 0) return true;

    for (let task of tasksArray){
        if (task.text === curText) return false;
    }
}

addBtn.addEventListener("click", () => {
    const curText = textInput.value.trim();
    if(!curText){
        alert("Input field is empty!");
        textInput.value = "";
        return;
    }


    if (checkTaskTextAvailable(tasks, curText) === false){
        alert("Task already exists!");
        textInput.value = "";
        return;
    }

    tasks.push({
        text: curText,
        id: tasks.length + 1,
        done: false
    });
    textInput.value = "";
    saveTasksToLocalStorage();
    updateTasks();
    updateTaskCount();
});

const handleCheckboxChange = (event) => {
    const checkbox = event.target;
    const taskId = parseInt((checkbox.dataset.taskId).split("-")[1]);
  
    const updatedTaskIndex = tasks.findIndex((task) => task.id === taskId);
    const taskElement = tasksDiv.querySelector(`#task-${taskId} .task-text`);
    if (updatedTaskIndex !== -1) {
        tasks[updatedTaskIndex].done = checkbox.checked;
        taskElement.classList.toggle("task-done", checkbox.checked);
        saveTasksToLocalStorage();
        updateTaskCount();
    } else {
        console.error("Task with ID", taskId, "not found");
    }

    return;
}

const handleDeleteBtn = (event) => {
    const button = event.target;
    const taskId = parseInt((button.dataset.taskId).split("-")[1]);

    const updatedTaskIndex = tasks.findIndex((task) => task.id === taskId);
    if (updatedTaskIndex !== -1) {
        tasks.splice(updatedTaskIndex, 1);

        const taskElement = tasksDiv.querySelector(`#task-${taskId}`);
        if (taskElement) {
            taskElement.remove();
        } else {
            console.error("Task element with ID", taskId, "not found");
        }
        saveTasksToLocalStorage();
        updateTaskCount();
        updateTasks();
    } else {
        console.error("Task with ID", taskId, "not found");
    }
}

tasksDiv.addEventListener("click", (event) => {
    if (event.target.type === "checkbox") {
        handleCheckboxChange(event);
    } else if(event.target.classList.contains("delete-task-btn")) {
        handleDeleteBtn(event);
    } else return;
});