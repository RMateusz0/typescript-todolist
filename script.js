const addButton = document.querySelector(".submit-button");
const taskListSection = document.querySelector(".task-list-section");
const textInputElement = document.querySelector("#text-input");
const clearValueButton = document.querySelector(".clear-value-button");
clearValueButton.addEventListener("click", (event) => {
    event.preventDefault();
    textInputElement.value = "";
});
let currentTasks;
if (localStorage.getItem('currentTasks')) {
    let currentTasksString = localStorage.getItem('currentTasks');
    currentTasks = JSON.parse(currentTasksString);
}
else {
    currentTasks = [
        { title: "Test activity 1", priority: "medium", done: true },
        { title: "Test activity 2", priority: "high", done: false }
    ];
    localStorage.setItem('currentTasks', JSON.stringify(currentTasks));
}
const addTask = (textInputValueString, radioCheckedValueString) => {
    if (textInputValueString) {
        currentTasks.push({
            title: textInputValueString,
            priority: radioCheckedValueString,
            done: false
        });
        localStorage.setItem('currentTasks', JSON.stringify(currentTasks));
        renderTasks();
        textInputElement.value = "";
    }
};
addButton.addEventListener("click", (event) => {
    event.preventDefault();
    const textInputValueString = document.querySelector("#text-input").value;
    const radioCheckedValueString = document.querySelector("input[type=radio]:checked").value;
    addTask(textInputValueString, radioCheckedValueString);
});
const deleteItem = (event) => {
    const chosenToDeleteIndex = Number(event.target.getAttribute("index"));
    currentTasks.splice(chosenToDeleteIndex, 1);
    localStorage.setItem('currentTasks', JSON.stringify(currentTasks));
    renderTasks();
};
const changeDoneStatus = (event) => {
    const chosenToChangeIndex = Number(event.target.getAttribute("index"));
    currentTasks[chosenToChangeIndex].done = !currentTasks[chosenToChangeIndex].done;
    localStorage.setItem('currentTasks', JSON.stringify(currentTasks));
    renderTasks();
};
const renderTasksAction = (singleTask, index) => {
    let newTaskToShow = document.createElement("li");
    let newTaskToShowInfo = document.createElement("div");
    newTaskToShowInfo.innerText = `${singleTask.title}`;
    newTaskToShowInfo.classList.add(singleTask.done ? "completed" : "in-progress");
    newTaskToShowInfo.setAttribute("index", String(index));
    let newTaskToShowDiv = document.createElement("div");
    newTaskToShowDiv.style.display = "flex";
    let newTaskToShowChangeStatusButton = document.createElement("button");
    newTaskToShowChangeStatusButton.innerText = "𝌡";
    newTaskToShowChangeStatusButton.setAttribute("index", String(index));
    newTaskToShowChangeStatusButton.addEventListener("click", changeDoneStatus);
    let newTaskToShowDeleteButton = document.createElement("button");
    newTaskToShowDeleteButton.innerText = "✕";
    newTaskToShowDeleteButton.setAttribute("index", String(index));
    newTaskToShowDeleteButton.addEventListener("click", deleteItem);
    newTaskToShowDiv.appendChild(newTaskToShowChangeStatusButton);
    newTaskToShowDiv.appendChild(newTaskToShowDeleteButton);
    newTaskToShow.appendChild(newTaskToShowInfo);
    newTaskToShow.appendChild(newTaskToShowDiv);
    newTaskToShow.style.display = "flex";
    taskListSection.appendChild(newTaskToShow);
};
const renderTasks = () => {
    taskListSection.innerHTML = "";
    currentTasks.forEach((singleTask, index) => {
        if (singleTask.priority == "high") {
            renderTasksAction(singleTask, index);
        }
    });
    currentTasks.forEach((singleTask, index) => {
        if (singleTask.priority == "medium") {
            renderTasksAction(singleTask, index);
        }
    });
    currentTasks.forEach((singleTask, index) => {
        if (singleTask.priority == "low") {
            renderTasksAction(singleTask, index);
        }
    });
};
renderTasks();
