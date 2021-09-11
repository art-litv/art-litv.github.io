export const setItem = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key) => JSON.parse(localStorage.getItem(key));

//const tasks = [
//	{ id: 1, text: "Buy milk", isDone: false },
//	{ id: 2, text: "Pick up Tom from airport", isDone: false },
//	{ id: 3, text: "Visit party", isDone: false },
//	{ id: 4, text: "Visit doctor", isDone: true },
//	{ id: 5, text: "Buy meat", isDone: true },
//];
