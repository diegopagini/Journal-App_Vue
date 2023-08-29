/** @format */
import { computed } from 'vue';
import { useStore } from 'vuex';

const useAuth = () => {
	const store = useStore();

	const createUser = async (user) => {
		return await store.dispatch('auth/createUser', user);
	};

	const loginUser = async (user) => {
		return await store.dispatch('auth/signInUser', user);
	};

	const checkAuthStatus = async () => {
		return await store.dispatch('auth/checkAuthentication');
	};

	return {
		checkAuthStatus,
		createUser,
		loginUser,
		authState: computed(() => store.getters['auth/authState']),
	};
};

export default useAuth;
