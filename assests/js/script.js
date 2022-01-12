const buttonEl = document.querySelector("#save-task");
const tasksToDoEl = document.querySelector("#tasks-to-do");
const formEl = document.querySelector("#task-form");


const createTaskHandler = function(event) {
    event.preventDefault();
    const taskNameInput = document.querySelector("input[name='task-name']").value;
    const taskTypeInput = document.querySelector("select[name='task-type']").value;

    // Create list item
    const listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // Create div to hold task info and add to list item
    const taskInfoEl = document.createElement("div");
    // Give it a class name
    taskInfoEl.className = "task-info";
    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";

    listItemEl.appendChild(taskInfoEl);

    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
    console.dir(listItemEl);

} 

formEl.addEventListener("submit", createTaskHandler);


//////// Steps to add to DOM using JS///////////
// 1. create element (create element);
// 2. style the element
// 3. add text to the element
// 4. append element to the DOM


// "We we right tags in our HTML  in order to create elements in the DOM"