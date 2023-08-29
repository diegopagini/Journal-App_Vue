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

	const logout = () => {
		store.commit('auth/logout');
		store.commit('journal/clearEntries');
	};

	return {
		checkAuthStatus,
		createUser,
		loginUser,
		logout,
		authState: computed(() => store.getters['auth/authState']),
		username: computed(() => store.getters['auth/username']),
	};
};

export default useAuth;
