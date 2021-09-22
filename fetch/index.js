const userAvatarElem = document.querySelector(".user__avatar");
const userNameElem = document.querySelector(".user__name");
const userLocationElem = document.querySelector(".user__location");

const defaultAvatarUrl = "https://avatars3.githubusercontent.com/b10001";
userAvatarElem.src = defaultAvatarUrl;

const fetchUserData = (userName) => {
	const apiUrl = "https://api.github.com/users/";
	return fetch(apiUrl + userName).then((response) =>
		response.ok ? response.json() : { avatar_url: defaultAvatarUrl }
	);
};

const renderUserData = (userData) => {
	const { avatar_url, login, location } = userData;
	userAvatarElem.src = avatar_url;
	userNameElem.textContent = login || "";
	userLocationElem.textContent = location ? `from ${location}` : "";
};

const onSearchUser = () => {
	const userNameInputElem = document.querySelector(".name-form__input");
	fetchUserData(userNameInputElem.value).then((userData) =>
		renderUserData(userData)
	);
};

document.querySelector(".btn").addEventListener("click", onSearchUser);
