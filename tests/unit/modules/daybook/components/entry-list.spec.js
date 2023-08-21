/** @format */
import EntryList from '@/modules/daybook/components/entry-list.vue';
import journal from '@/modules/daybook/store/journal';
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

describe('Entry List component', () => {
	let wrapper;

	const router = {
		push: jest.fn(),
	};

	const store = createVuexStore(journalState);

	beforeEach(() => {
		jest.clearAllMocks();

		wrapper = shallowMount(EntryList, {
			global: {
				mocks: {
					$router: router,
				},
				plugins: [store],
			},
		});
	});

	it('Should call getEntriesByTermn and show all the entries', () => {
		expect(wrapper.findAll('entry-stub').length).toEqual(4);
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should call the getEntriesByTermn and filter the entries', async () => {
		const input = wrapper.find('input');
		await input.setValue('Prueba');
		expect(wrapper.findAll('entry-stub').length).toEqual(1);
	});

	it('the "new" button should redirect to /new', () => {
		wrapper.find('button').trigger('click');
		expect(router.push).toHaveBeenCalledWith({ name: 'entry', params: { id: 'new' } });
	});
});
