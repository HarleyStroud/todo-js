import Project from "./Project";
import TodoItem from "./TodoItem";
import "./styles.css";

const newTodoButton = document.querySelector("#new_todo_button");
const newTodoDialog = document.querySelector("#new_todo_dialog");
const newTodoForm = document.querySelector("#new_todo_form");

const projectList = [];
const defaultProject = Project();
projectList.push(defaultProject);

const newTodoItem = TodoItem("TODO Title", "This is a test todo item", "12/8/2024", 0, true);
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


newTodoButton.addEventListener("click", () => {
    newTodoDialog.show();
});


newTodoForm.addEventListener("submit", (event) => {
    event.preventDefault
});



// Display each project and it's todo items.
function updateDisplay() {
    const projectDisplay = document.querySelector("#main_project_container");

    for(let i = 0; i < projectList.length; i++) {
        const currentProject = projectList[i];
        const projectContainer = document.createElement("div");
        projectContainer.classList.add("project_layout");

        const currentProjectTitleDisplay = document.createElement("p");
        currentProjectTitleDisplay.textContent = `Project Title: ${currentProject.title}`;
        currentProjectTitleDisplay.classList.add("project_title");
        projectContainer.appendChild(currentProjectTitleDisplay);

        const todoList = currentProject.getTodoList();
        for(let todoCount = 0; todoCount < todoList.length; todoCount++) {
            const todoContainer = document.createElement("div");
            todoContainer.classList.add("todo_container");

            const currentTodoItem = todoList[todoCount];
            const todoCheckbox = document.createElement("input");
            todoCheckbox.type = "checkbox";
            todoCheckbox.classList.add("todo_property");
            todoCheckbox.id = `#todo_${todoCount}`;
            todoCheckbox.textContent = currentTodoItem.title;
            todoCheckbox.checked = currentTodoItem.status;
            todoContainer.appendChild(todoCheckbox);

            const checkboxLabel = document.createElement("label");
            checkboxLabel.setAttribute("for", `${todoCheckbox.id}`);
            checkboxLabel.textContent = currentTodoItem.title;
            checkboxLabel.classList.add("todo_property");
            todoContainer.appendChild(checkboxLabel);

            const descriptionParagraph = document.createElement("p");
            descriptionParagraph.textContent = currentTodoItem.description;
            descriptionParagraph.classList.add("todo_property");
            todoContainer.appendChild(descriptionParagraph);

            const dueDateParaGraph = document.createElement("p");
            dueDateParaGraph.textContent = currentTodoItem.dueDate;
            dueDateParaGraph.classList.add("todo_property");
            todoContainer.appendChild(dueDateParaGraph);

            const priorityParagraph = document.createElement("p");
            priorityParagraph.textContent = currentTodoItem.priority;
            priorityParagraph.classList.add("todo_property");
            todoContainer.appendChild(priorityParagraph);

            projectContainer.appendChild(todoContainer);
        }

        projectDisplay.appendChild(projectContainer);
    }
}