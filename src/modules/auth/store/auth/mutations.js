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
