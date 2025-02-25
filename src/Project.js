// Structure of a Project, which is a collection of todo items.
export default function Project(title = "Default Project", description = "") {
    const todoList = [];

    const addTodoItem = (todoItem) => {
        todoList.push(todoItem);
    };

    const setTodoList = (newTodoList) => {
        todoList = newTodoList;
    };

    const getTodoList = () => {
        return todoList;
    };


    return {title, description, addTodoItem, getTodoList};
}