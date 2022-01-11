const buttonEl = document.querySelector("#save-task");
const tasksToDoEl = document.querySelector("#tasks-to-do");
const formEl = document.querySelector("#task-form");

const createTaskHandler = function(event) {
    event.preventDefault();
    
    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
}

formEl.addEventListener("submit", createTaskHandler);


//////// Steps to add to DOM using JS///////////
// 1. create element (create element);
// 2. style the element
// 3. add text to the element
// 4. append element to the DOM

//Questions 
//When to use () after function name and when not to