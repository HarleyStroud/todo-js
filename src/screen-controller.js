import userRepository from "./user-repository";
import Project from "./Project"

// Elements used for creating a new project
const dialogCreateProject = document.querySelector("#create_project_dialog");
const buttonAddNewProject = document.querySelector("#button_add_new_project");
const buttonCancelProject = document.querySelector("#button_cancel_new_project");

// Elements for creating a new task
const newTodoDialog = document.querySelector("#new_todo_dialog");
const buttonAddNewTodo = document.querySelector("#button_add_new_todo");
const buttonCancelNewTodo = document.querySelector("#button_cancel_new_todo");

// Elements used for editing a task
const editTaskDialog = document.querySelector("#edit_task_dialog");
const editTitleInput = document.querySelector("#edit_todo_title_input");
const editDescriptionInput = document.querySelector("#edit_todo_description_input");
const editDueDateInput = document.querySelector("#edit_todo_due_date_input");
const editPriorityDropDown = document.querySelector("#edit_priority_drop_down");

const projectList = userRepository.getProjects();
let selectedProject = "";
let selectedTask = "";

buttonAddNewProject.addEventListener("click", () => {
    const projectTitleInput = document.querySelector("#project_title_input").value;
    const projectDescriptionInput = document.querySelector("#project_description_input").value;
    const newProject = Project(projectTitleInput, projectDescriptionInput);
    userRepository.createNewProject(newProject);
    updateDisplay();
    dialogCreateProject.close();
});

buttonCancelProject.addEventListener("click", () => {
    dialogCreateProject.close();
});

export default function updateDisplay() {
    const projectDisplay = document.querySelector("#main_project_container");
    projectDisplay.textContent = "";

    for(let i = 0; i < projectList.length; i++) {
        const currentProject = projectList[i];
        const projectContainer = document.createElement("div");
        projectContainer.classList.add("project_layout");

        const projectHeader = document.createElement("div");
        projectHeader.classList.add("project_header");

        const currentProjectTitleDisplay = document.createElement("h3");
        currentProjectTitleDisplay.textContent = `${currentProject.title}`;
        currentProjectTitleDisplay.classList.add("project_title");
        projectHeader.appendChild(currentProjectTitleDisplay);

        const currentProjectAddTaskButton = document.createElement("button");
        currentProjectAddTaskButton.classList.add("project_new_task_button");
        currentProjectAddTaskButton.textContent = "Add task";
    
        currentProjectAddTaskButton.addEventListener("click", () => {
            selectedProject = currentProject.title;
            newTodoDialog.show();
        });

        projectHeader.appendChild(currentProjectAddTaskButton);
        projectContainer.appendChild(projectHeader);

        const todoList = currentProject.getTodoList();
        displayTasks(todoList, projectContainer);
        projectDisplay.appendChild(projectContainer);
    }
}


function displayTasks(todoList, projectContainer) {
    for(let todoCount = 0; todoCount < todoList.length; todoCount++) {
        const currentTodoItem = todoList[todoCount];

        const todoContainer = document.createElement("div");
        todoContainer.classList.add("todo_container");
        todoContainer.addEventListener("click", () => {
            selectedTask = currentTodoItem;
            handleTaskClicked(currentTodoItem);
        });

        const todoCheckbox = document.createElement("input");
        todoCheckbox.type = "checkbox";
        todoCheckbox.classList.add("todo_property");
        todoCheckbox.id = `todo_${todoCount}`;
        todoCheckbox.textContent = currentTodoItem.title;
        todoCheckbox.checked = currentTodoItem.status;

        todoCheckbox.addEventListener("change", () => {
            currentTodoItem.toggleStatus();
        });

        todoContainer.appendChild(todoCheckbox);

        const checkboxLabel = document.createElement("label");
        checkboxLabel.setAttribute("for", `${todoCheckbox.id}`);
        checkboxLabel.textContent = currentTodoItem.getTitle();
        checkboxLabel.classList.add("todo_property");
        todoContainer.appendChild(checkboxLabel);

        const dueDateParagraph = document.createElement("p");
        dueDateParagraph.textContent = currentTodoItem.getDueDate();
        dueDateParagraph.id = "task_due_date";
        dueDateParagraph.classList.add("todo_property");
        todoContainer.appendChild(dueDateParagraph);

        projectContainer.appendChild(todoContainer);
    }
}
    
buttonAddNewTodo.addEventListener("click", () => {
    const todoTitle = document.querySelector("#todo_title_input").value;
    const todoDescription = document.querySelector("#todo_description_input").value;
    const todoDueDate = document.querySelector("#todo_due_date_input").value;
    const priority = document.querySelector("#priority_drop_down").value;
    userRepository.createNewTask(todoTitle, todoDescription, todoDueDate, priority, selectedProject);

    updateDisplay();
    newTodoDialog.close();
});


buttonCancelNewTodo.addEventListener("click", () => {
    newTodoDialog.close(); 
});

function handleTaskClicked(task) {
    editTitleInput.value = task.getTitle();
    editDescriptionInput.value = task.getDescription();
    editDueDateInput.value = task.getDueDate();
    editPriorityDropDown.value = task.getPriority();
    editTaskDialog.show();
}

const buttonSaveTask = document.querySelector("#button_save_task");
buttonSaveTask.addEventListener("click", () => {
    selectedTask.update(editTitleInput.value, editDescriptionInput.value, editDueDateInput.value, editPriorityDropDown.value);
    updateDisplay();
});

const buttonCancelEditTask = document.querySelector("#button_cancel_edit_task");
buttonCancelEditTask.addEventListener("click", () => {
    
});

const buttonCreateProject = document.querySelector("#button_create_project");
buttonCreateProject.addEventListener("click", () => {
    dialogCreateProject.show();
});

const newTodoButton = document.querySelector("#new_todo_button");
newTodoButton.addEventListener("click", () => {
    selectedProject = "Default Project"
    newTodoDialog.show();
});