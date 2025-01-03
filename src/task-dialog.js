import userRepository from "./user-repository";
import ScreenController from "./screen-controller";

export default function showTaskDialog(project = "Default Project") {
    const screenController = ScreenController();
    const newTodoDialog = document.querySelector("#new_todo_dialog");
    const buttonAddNewTodo = document.querySelector("#button_add_new_todo");
    const buttonCancelNewTodo = document.querySelector("#button_cancel_new_todo");

    newTodoDialog.show();
    
    buttonAddNewTodo.addEventListener("click", () => {
        const todoTitle = document.querySelector("#todo_title_input").value;
        const todoDescription = document.querySelector("#todo_description_input").value;
        const todoDueDate = document.querySelector("#todo_due_date_input").value;
        const priority = document.querySelector("#priority_drop_down").value;
        userRepository.createNewTask(todoTitle, todoDescription, todoDueDate, priority, project);

        screenController.updateDisplay();
        newTodoDialog.close();
    });

    
    buttonCancelNewTodo.addEventListener("click", () => {
        newTodoDialog.close(); 
    });
}