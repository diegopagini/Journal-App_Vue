/** @format */
import { useStore } from 'vuex';

const useAuth = () => {
	const store = useStore();

	const createUser = async (user) => {
		return await store.dispatch('auth/createUser', user);
	};

	return {
		createUser,
	};
};

export default useAuth;
