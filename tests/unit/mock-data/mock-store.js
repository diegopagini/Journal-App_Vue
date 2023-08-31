/** @format */
import auth from '@/modules/auth/store/auth';
import journal from '@/modules/daybook/store/journal';
import { createStore } from 'vuex';

import { journalState } from './test-journal-state';

const createVuexStore = (authInitState, journalInitState = journalState) =>
	createStore({
		modules: {
			auth: {
				...auth,
				state: { ...authInitState },
			},
			journal: {
				...journal,
				state: { ...journalInitState },
			},
		},
	});

export default createVuexStore;
