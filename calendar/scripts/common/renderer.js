import { getItem, setItem } from "./storage.js";

const listElem = document.querySelector(".list");

function createElement(elementType, class_, attrs, dataset) {
	const element = document.createElement(elementType);

	if (class_) element.classList.add(class_);

	if (attrs)
		Object.keys(attrs).forEach((attr) => {
			element.setAttribute(attr, attrs[attr]);
		});

	if (dataset)
		Object.keys(dataset).forEach((dataKey) => {
			element.dataset[dataKey] = dataset[dataKey];
		});

	return element;
}

const onCheckboxClick = renderDecorator(({ target }) => {
	const tasks = getItem("tasksList");
	const taskId = +target.closest(".list__item").dataset.taskId;
	const task = tasks.find((task) => task.id === taskId);
	task.isDone = !task.isDone;
	setItem("tasksList", tasks);
	getItem(tasks);
});

export const renderTasks = (tasksList) => {
	tasksList = tasksList || [];
	listElem.innerHTML = "";

	const tasksElems = tasksList
		.sort((a, b) => a.isDone - b.isDone)
		.map(({ id, text, isDone }) => {
			const listItemElem = createElement("li", "list__item", null, {
				taskId: id,
			});

			const checkbox = createElement("input", "list__item-checkbox", {
				type: "checkbox",
			});
			checkbox.checked = isDone;
			checkbox.addEventListener("click", onCheckboxClick);

			if (isDone) listItemElem.classList.add("list__item_done");

			listItemElem.append(checkbox, text);
			return listItemElem;
		});

	listElem.append(...tasksElems);
};

export function renderDecorator(callbackFn) {
	return function () {
		const fnResult = callbackFn.apply(this, arguments);

		renderTasks(getItem("tasksList"));
		return fnResult;
	};
}
