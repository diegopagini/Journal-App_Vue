/** @format */

export const loginUser = (state, { user, idToken, refreshToken }) => {
	if (idToken) {
		state.idToken = idToken;
		localStorage.setItem('idToken', idToken);
	}

	if (refreshToken) {
		state.refreshToken = refreshToken;
		localStorage.setItem('refreshToken', refreshToken);
	}

	state.user = user;
	state.status = 'authenticated';
};

export const logout = (state) => {
	localStorage.removeItem('idToken');
	localStorage.removeItem('refreshToken');
	state.idToken = null;
	state.refreshToken = null;
	state.status = 'not-authenticated';
	state.user = null;
};
