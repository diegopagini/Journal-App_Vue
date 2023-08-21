/** @format */
import journal from '@/modules/daybook/store/journal';
import EntryView from '@/modules/daybook/views/EntryView.vue';
import { shallowMount } from '@vue/test-utils';
import Swal from 'sweetalert2';
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

jest.mock('sweetalert2', () => ({
	fire: jest.fn(),
	showLoading: jest.fn(),
	close: jest.fn(),
}));

describe('EntryView Component', () => {
	let wrapper;

	const mockRouter = {
		push: jest.fn(),
	};

	const store = createVuexStore(journalState);
	store.dispatch = jest.fn();

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

	it('should delete the entry and go out', (done) => {
		Swal.fire.mockReturnValueOnce(
			Promise.resolve({
				isConfirmed: true,
			})
		);
		wrapper.find('.btn-danger').trigger('click');

		expect(Swal.fire).toHaveBeenCalledWith({
			confirmButtonText: 'Si, estoy seguro',
			icon: 'question',
			showDenyButton: true,
			text: 'Una vez borrado, no se puede recuperar',
			title: '¿Está seguro?',
		});

		setTimeout(() => {
			expect(store.dispatch).toHaveBeenCalledWith('journal/deleteEntry', '-NbnHbDAWZvXdrl1ZZei');
			expect(mockRouter.push).toHaveBeenCalled();
			done();
		}, 1);
	});
});
