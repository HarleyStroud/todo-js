// Structure of a todo item
export default function TodoItem(title, description, dueDate, priority = 0, status = false) {
    const toggleStatus = () => {
        status = !status;
    };

    return {title, description, dueDate, priority, status, toggleStatus};
}
