/** @format */

export const authState = (state) => {
	return state.status;
};

export const username = (state) => ({ name: state.user?.name || '' }.name);
