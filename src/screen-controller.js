import userRepository from "./user-repository";

export default function ScreenController() {

    const newTodoButton = document.querySelector("#new_todo_button");
    const newTodoDialog = document.querySelector("#new_todo_dialog");
    const newTodoForm = document.querySelector("#new_todo_form");
    
    const buttonAddNewTodo = document.querySelector("#button_add_new_todo");
    const buttonCancelNewTodo = document.querySelector("#button_cancel_new_todo");
    

    const projectList = userRepository.getProjects();
    const updateDisplay = () => {
        const projectDisplay = document.querySelector("#main_project_container");
        projectDisplay.textContent = "";

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

    newTodoButton.addEventListener("click", () => {
        newTodoDialog.show();
    });
    
    
    newTodoForm.addEventListener("submit", (event) => {
        event.preventDefault();
    });


    buttonAddNewTodo.addEventListener("click", (event) => {
        const todoTitle = document.querySelector("#todo_title_input").value;
        const todoDescription = document.querySelector("#todo_description_input").value;
        const todoDueDate = document.querySelector("#todo_due_date_input").value;
        const priority = document.querySelector("#todo_priority_input").value;
        userRepository.createNewTask(todoTitle, todoDescription, todoDueDate, priority);
    
        //const newTodo = TodoItem(todoTitle, todoDescription, todoDueDate, priority);

        updateDisplay();
        newTodoDialog.close();
    });
    
    buttonCancelNewTodo.addEventListener("click", (event) => {
        newTodoDialog.close(); 
    });

    return {updateDisplay};
}