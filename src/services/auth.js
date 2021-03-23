export const TOKEN_KEY = "@nodePortifolio-Token";
export const USER_KEY = "@nodePortifolio-User";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUser = () => JSON.parse(localStorage.getItem(USER_KEY));

export const updateUser = (username, email) => {
	const user = getUser();
	user.username = username;
	user.email = email;
	localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export const login = (token, user) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};