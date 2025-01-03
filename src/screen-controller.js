import userRepository from "./user-repository";
import showProjectDialog from "./project-dialog";
import showTaskDialog from "./task-dialog";

export default function ScreenController() {

    const buttonCreateProject = document.querySelector("#button_create_project");
    const newTodoButton = document.querySelector("#new_todo_button");    
   
    const projectList = userRepository.getProjects();
    const updateDisplay = () => {
        const projectDisplay = document.querySelector("#main_project_container");
        projectDisplay.textContent = "";

        for(let i = 0; i < projectList.length; i++) {
            const currentProject = projectList[i];
            const projectContainer = document.createElement("div");
            projectContainer.classList.add("project_layout");

            const projectHeader = document.createElement("div");
            projectHeader.classList.add("project_header");
    
            const currentProjectTitleDisplay = document.createElement("h5");
            currentProjectTitleDisplay.textContent = `${currentProject.title}`;
            currentProjectTitleDisplay.classList.add("project_title");
            projectHeader.appendChild(currentProjectTitleDisplay);

            const currentProjectAddTaskButton = document.createElement("button");
            currentProjectAddTaskButton.classList.add("project_new_task_button");
            currentProjectAddTaskButton.textContent = "+";
        
            currentProjectAddTaskButton.addEventListener("click", () => {
                showTaskDialog(currentProject.title);
            });

            projectHeader.appendChild(currentProjectAddTaskButton);
            projectContainer.appendChild(projectHeader);
    
            const todoList = currentProject.getTodoList();
            displayTasks(todoList, projectContainer);
            projectDisplay.appendChild(projectContainer);
        }
    };


    function displayTasks(todoList, projectContainer) {
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
    
            todoCheckbox.addEventListener("change", () => {
                currentTodoItem.toggleStatus();
            });
    
            todoContainer.appendChild(todoCheckbox);
    
            const checkboxLabel = document.createElement("label");
            checkboxLabel.setAttribute("for", `${todoCheckbox.id}`);
            checkboxLabel.textContent = currentTodoItem.title;
            checkboxLabel.classList.add("todo_property");
            todoContainer.appendChild(checkboxLabel);
    
            const dueDateParaGraph = document.createElement("p");
            dueDateParaGraph.textContent = currentTodoItem.dueDate;
            dueDateParaGraph.classList.add("todo_property");
            todoContainer.appendChild(dueDateParaGraph);
    
            projectContainer.appendChild(todoContainer);
        }
    }


    buttonCreateProject.addEventListener("click", () => {
        showProjectDialog();
    });

    newTodoButton.addEventListener("click", () => {
        showTaskDialog();
    });

    return {updateDisplay};
}