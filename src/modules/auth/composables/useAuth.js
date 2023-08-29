/** @format */
import { useStore } from 'vuex';

const useAuth = () => {
	const store = useStore();

	const createUser = async (user) => {
		return await store.dispatch('auth/createUser', user);
	};

	const loginUser = async (user) => {
		return await store.dispatch('auth/signInUser', user);
	};

	return {
		createUser,
		loginUser,
	};
};

export default useAuth;
