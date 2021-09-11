import { renderTasks } from "./common/renderer.js";
import "./tasks/createTask.js";
import { getItem } from "./common/storage.js";

const renderCurrentTasks = () => {
	renderTasks(getItem("tasksList"));
};

document.addEventListener("DOMContentLoaded", renderCurrentTasks);
window.addEventListener("storage", renderCurrentTasks);
