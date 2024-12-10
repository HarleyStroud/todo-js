import Project from "./Project";
import TodoItem from "./TodoItem";

const projectList = [];
const defaultProject = Project();
projectList.push(defaultProject);

const newTodoItem = TodoItem("TODO Title", "This is a test todo item", "12/8/2024");
defaultProject.addTodoItem(newTodoItem);

updateDisplay();


function getUserTodoList() {
    const title = prompt("Enter todo title");
    const description = prompt("Enter description");
    const dueDate = prompt("Enter due date");

    const todoItem = TodoItem(title, description, dueDate);
    project.addTodoItem(todoItem);
    
    console.log("New todo item added");
    console.log(project.getTodoList[0]);
}


// Display each project and it's todo items.
function updateDisplay() {
    const projectDisplay = document.querySelector("#project_display");

    for(let i = 0; i < projectList.length; i++) {
        const newProjectDisplay = document.createElement("p");
        const currentProject = projectList[i];
        newProjectDisplay.textContent = `Project Title: ${currentProject.title}`;

        const todoList = currentProject.getTodoList();
        for(let todoCount = 0; todoCount < todoList.length; todoCount++) {
            const newTodoDisplay = document.createElement("p");
            newTodoDisplay.textContent = todoList[todoCount].title;
            newProjectDisplay.appendChild(newTodoDisplay);
        }

        projectDisplay.appendChild(newProjectDisplay);
    }
}