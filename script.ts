const addButton: HTMLButtonElement = document.querySelector(".submit-button")
const taskListSection: HTMLUListElement = document.querySelector(".task-list-section");

const textInputElement: HTMLInputElement = document.querySelector("#text-input")
const clearValueButton: HTMLButtonElement = document.querySelector(".clear-value-button");
clearValueButton.addEventListener("click", (event) => {
    event.preventDefault()
    textInputElement.value = ""
})




type Task = {
    title:string;
    priority:string;
    done:boolean;
}[]


interface singleTask {
    title:string;
    priority:string;
    done:boolean;
}




let currentTasks: Task;

if (localStorage.getItem('currentTasks')) {
    let currentTasksString = localStorage.getItem('currentTasks');
    currentTasks = JSON.parse(currentTasksString);
} else {
    currentTasks = [
    {title:"Test activity 1", priority: "medium", done: true},
    {title:"Test activity 2", priority: "high", done: false} ] 
    localStorage.setItem('currentTasks', JSON.stringify(currentTasks));
}





const addTask = (textInputValueString: string, radioCheckedValueString: string) => {
    
    if (textInputValueString) {
    
        currentTasks.push({
            title: textInputValueString,
            priority: radioCheckedValueString,
            done: false
        })
        localStorage.setItem('currentTasks', JSON.stringify(currentTasks));
        renderTasks()
        textInputElement.value = ""

    }

}


addButton.addEventListener("click", (event: Event) => {
    event.preventDefault();
    const textInputValueString: string = (document.querySelector("#text-input") as HTMLInputElement).value
    const radioCheckedValueString: string = (document.querySelector("input[type=radio]:checked") as HTMLInputElement).value
    addTask(textInputValueString, radioCheckedValueString)
})

const deleteItem = (event: Event) => {
    const chosenToDeleteIndex: number = Number((event.target as HTMLInputElement).getAttribute("index"))
    currentTasks.splice(chosenToDeleteIndex,1)
    localStorage.setItem('currentTasks', JSON.stringify(currentTasks));
    renderTasks()
}

const changeDoneStatus = (event: Event) => {
    const chosenToChangeIndex: number = Number((event.target as HTMLInputElement).getAttribute("index"))
    currentTasks[chosenToChangeIndex].done = !currentTasks[chosenToChangeIndex].done
    localStorage.setItem('currentTasks', JSON.stringify(currentTasks));
    renderTasks()
}

const renderTasksAction = (singleTask: singleTask, index: number) => {

    let newTaskToShow: HTMLElement = document.createElement("li");

                let newTaskToShowInfo: HTMLElement = document.createElement("div");
                newTaskToShowInfo.innerText = `${singleTask.title}`
                newTaskToShowInfo.classList.add(singleTask.done ? "completed" : "in-progress")
                newTaskToShowInfo.setAttribute("index", String(index))
                
                let newTaskToShowDiv: HTMLElement = document.createElement("div");
                newTaskToShowDiv.style.display = "flex"
                
                    let newTaskToShowChangeStatusButton: HTMLElement = document.createElement("button");
                    newTaskToShowChangeStatusButton.innerText = "𝌡"
                    newTaskToShowChangeStatusButton.setAttribute("index", String(index))
                    newTaskToShowChangeStatusButton.addEventListener("click", changeDoneStatus)

                    let newTaskToShowDeleteButton: HTMLElement = document.createElement("button");
                    newTaskToShowDeleteButton.innerText = "✕"
                    newTaskToShowDeleteButton.setAttribute("index", String(index))
                    newTaskToShowDeleteButton.addEventListener("click", deleteItem)



                newTaskToShowDiv.appendChild(newTaskToShowChangeStatusButton)
                newTaskToShowDiv.appendChild(newTaskToShowDeleteButton)

            newTaskToShow.appendChild(newTaskToShowInfo)
            newTaskToShow.appendChild(newTaskToShowDiv)

            newTaskToShow.style.display = "flex"
        
    taskListSection.appendChild(newTaskToShow)

}

const renderTasks = () => {
    taskListSection.innerHTML = ""

    currentTasks.forEach((singleTask:singleTask, index) => {
        if (singleTask.priority == "high") { renderTasksAction(singleTask, index) } 
    })
    currentTasks.forEach((singleTask, index) => {
        if (singleTask.priority == "medium") { renderTasksAction(singleTask, index) } 
    })
    currentTasks.forEach((singleTask, index) => {
        if (singleTask.priority == "low") { renderTasksAction(singleTask, index) } 
    })

}

renderTasks()
