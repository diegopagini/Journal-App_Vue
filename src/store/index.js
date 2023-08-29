/** @format */
import authModule from '@/modules/auth/store/auth';
import journalModule from '@/modules/daybook/store/journal';
import { createStore } from 'vuex';

const store = createStore({
	modules: {
		auth: authModule,
		journal: journalModule,
	},
});

export default store;
