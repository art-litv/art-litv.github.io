import { renderDecorator } from "../common/renderer.js";
import { getItem, setItem } from "../common/storage.js";

const createTaskBtnElem = document.querySelector(".create-task-btn");

function createTask(id, text, isDone = false) {
	return { id, text, isDone };
}

const onCreateBtnClick = renderDecorator(() => {
	const tasks = getItem("tasksList") || [];
	const newTaskElement = document.querySelector(".task-input");
	if (!newTaskElement.value) return;

	const id = tasks.length ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;

	tasks.push(createTask(id, newTaskElement.value));
	setItem("tasksList", tasks);

	newTaskElement.value = "";
});

createTaskBtnElem.addEventListener("click", onCreateBtnClick);
