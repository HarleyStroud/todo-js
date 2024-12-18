import Project from "./Project";
import TodoItem from "./TodoItem";

const projects = [];

const defaultProject = Project();
projects.push(defaultProject);

const newTodoItem = TodoItem("TODO Title", "This is a test todo item", "12/8/2024", 0, true);
defaultProject.addTodoItem(newTodoItem);

const getProjects = () => {
    return projects;
};

const getTasks = () => {
    return projects[0].getTodoList();
};

const createNewProject = (newProject) => {
    projects.push(newProject);
};


const createNewTask = (todoTitle, todoDescription, todoDueDate, priority, projectTitle = "Default Project") => {
    // Todo: add new task item to the correct project.
    const newTodoItem = TodoItem(todoTitle, todoDescription, todoDueDate, priority);
    const selectedProject = projects.filter((project) => project.title === projectTitle);
    selectedProject[0].addTodoItem(newTodoItem);
};


export default {getProjects, getTasks, createNewProject, createNewTask};
