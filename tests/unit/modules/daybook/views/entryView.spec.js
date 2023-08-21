/** @format */
import journal from '@/modules/daybook/store/journal';
import EntryView from '@/modules/daybook/views/EntryView.vue';
import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';

import { journalState } from '../../../mock-data/test-journal-state';

const createVuexStore = (initialState) =>
	createStore({
		modules: {
			journal: {
				...journal,
				state: { ...initialState },
			},
		},
	});

describe('EntryView Component', () => {
	let wrapper;

	const mockRouter = {
		push: jest.fn(),
	};

	const store = createVuexStore(journalState);

	beforeEach(() => {
		jest.clearAllMocks();

		wrapper = shallowMount(EntryView, {
			props: {
				id: '-NbnHbDAWZvXdrl1ZZei',
			},
			global: {
				mocks: {
					$router: mockRouter,
				},
				plugins: [store],
			},
		});
	});

	it('Should kick out the user if the user not exist', () => {
		shallowMount(EntryView, {
			global: {
				mocks: {
					$router: mockRouter,
				},
				plugins: [store],
			},
			props: {
				id: 'This ID not exist',
			},
		});

		expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry' });
	});

	it('Should show the entry correctly', () => {
		expect(wrapper.html()).toMatchSnapshot();
		expect(mockRouter.push).not.toHaveBeenCalled();
	});
});
