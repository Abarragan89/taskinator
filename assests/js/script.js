const buttonEl = document.querySelector("#save-task");
const tasksToDoEl = document.querySelector("#tasks-to-do");
const formEl = document.querySelector("#task-form");
let taskIdCounter = 0;
const pageContentEl = document.querySelector("#page-content");
const tasksInProgressEl = document.querySelector("#task-in-progress");
const tasksCompletedEl = document.querySelector("#tasks-completed");

// Local storage
let tasks = [];

const taskFormHandler = function(event) {
    event.preventDefault();
    const taskNameInput = document.querySelector("input[name='task-name']").value;
    const taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!")
        return false;
    }
    formEl.reset();

    const isEdit = formEl.hasAttribute("data-task-id");
    if (isEdit) {
        const taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };

    createTaskEl(taskDataObj);
    }
    
} 
const createTaskEl = function(taskDataObj) {
    // Create list item
    const listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    //add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    // Create div to hold task info and add to list item
    const taskInfoEl = document.createElement("div");
    // Give it a class name
    taskInfoEl.className = "task-info";
    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);
    
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);
    //create buttons in each task item
    const taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
    taskIdCounter++;

    saveTasks();
}

const createTaskActions = function(taskId) {
    const actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
    //create edit button
    const editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);
    // Create delete button
    const deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    const statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status"
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(statusSelectEl);

    const statusChoices = ["To Do", "In Progress", "Completed"];
    for (let i = 0; i < statusChoices.length; i++) {
        //create option element
        const statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }
    return actionContainerEl;
};

const taskButtonHandler = function(event) {
    // get target element from event
    const targetEl = event.target;

    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        const taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    // delete button was clicked
    else if (targetEl.matches(".delete-btn")) {
        // get the element's task id
        const taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
}

const deleteTask = function(taskId) {
    const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    // create new array to hold updated list of task
    const updatedTaskArr = [];
    // loop through current tasks
    for (let i = 0; i < tasks.length; i++){
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }
    // reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;
    saveTasks();
};
const editTask = function(taskId) {
    // get task list item element
    const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // get content from task name and type
    const taskName = taskSelected.querySelector("h3.task-name").textContent;
    const taskType = taskSelected.querySelector("span.task-type").textContent;
    // place task and type into form 
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    
    formEl.setAttribute("data-task-id", taskId);

};

const completeEditTask = function(taskName, taskType, taskId) {
    //  find the matching task list item
    const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };
    saveTasks();

    alert("Task Updated!");
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};

const taskStatusChangeHandler = function(event) {
    // get the task item's id 
    const taskId = event.target.getAttribute("data-task-id");
    // get the currently selected option's value and convert to lowercase
    const statusValue = event.target.value.toLowerCase();
    // find the parent task item element based on the id
    const taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    } else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }
    
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }
    saveTasks();
}

const saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const loadTasks = function() {
    let savedTasks = localStorage.getItem("tasks");
    if (savedTasks === null) {
        return false
    }
    savedTasks = JSON.parse(savedTasks);

    for (let i = 0; i < savedTasks.length; i++) { 
        createTaskEl(savedTasks[i]);
    }
}

formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
loadTasks();