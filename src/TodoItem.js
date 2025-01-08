// Structure of a todo item
export default function TodoItem(title, description, dueDate, priority = 0, status = false) {
    const getTitle = () => title;
    const getDescription = () => description;
    const getDueDate = () => dueDate;
    const getPriority = () => priority;
    const getStatus = () => status;

    const toggleStatus = () => {
        status = !status;
    };

    const update = (newTitle, newDescription, newDueDate, newPriority) => {
        title = newTitle;
        description = newDescription;
        dueDate = newDueDate;
        priority = newPriority;
    };

    return {getTitle, getDescription, getDueDate, getPriority, getStatus, toggleStatus, update};
}
