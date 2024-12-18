import Project from "./Project";
import userRepository from "./user-repository";
import ScreenController from "./screen-controller";

export default function showProjectDialog() {
    const dialogCreateProject = document.querySelector("#create_project_dialog");
    const buttonCreateProject = document.querySelector("#button_add_new_project");
    const buttonCancelProject = document.querySelector("#button_cancel_new_project");
    const screenController = ScreenController();

    dialogCreateProject.show();

    buttonCreateProject.addEventListener("click", () => {
        const projectTitleInput = document.querySelector("#project_title_input").value;
        const projectDescriptionInput = document.querySelector("#project_description_input").value;

        const newProject = Project(projectTitleInput, projectDescriptionInput);
        userRepository.createNewProject(newProject);
        screenController.updateDisplay();
        dialogCreateProject.close();
    });

    buttonCancelProject.addEventListener("click", () => {
        dialogCreateProject.close();
    });
}