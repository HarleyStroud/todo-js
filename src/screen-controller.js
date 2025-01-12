import userRepository from "./user-repository";
import showProjectDialog from "./project-dialog";
import showTaskDialog from "./task-dialog";

const projectList = userRepository.getProjects();
let selectedTask = "";

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
            showTaskDialog(currentProject.title);
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


function handleTaskClicked(task) {
    const editTaskDialog = document.querySelector("#edit_task_dialog");
    const editTitleInput = document.querySelector("#edit_todo_title_input");
    const editDescriptionInput = document.querySelector("#edit_todo_description_input");
    const editDueDateInput = document.querySelector("#edit_todo_due_date_input");
    const editPriorityDropDown = document.querySelector("#edit_priority_drop_down");

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
    showProjectDialog();
});

const newTodoButton = document.querySelector("#new_todo_button");
newTodoButton.addEventListener("click", () => {
    showTaskDialog();
});