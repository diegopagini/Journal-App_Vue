/** @format */
import EntryItem from '@/modules/daybook/components/entry-item.vue';
import { shallowMount } from '@vue/test-utils';

import { journalState } from '../../../mock-data/test-journal-state';

describe('Entry item component', () => {
	let wrapper;
	const mockRouter = {
		push: jest.fn(),
	};

	beforeEach(() => {
		wrapper = shallowMount(EntryItem, {
			props: {
				entry: journalState.entries[0],
			},
			global: {
				mocks: {
					$router: mockRouter,
				},
			},
		});
	});

	it('should match with the snapshot', () => {
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('shoul redirect after click in the entry-container', () => {
		const entryContainer = wrapper.find('.entry-container');
		entryContainer.trigger('click');
		expect(mockRouter.push).toHaveBeenCalled();
		expect(mockRouter.push).toHaveBeenCalledWith({
			name: 'entry',
			params: {
				id: journalState.entries[0].id,
			},
		});
	});

	it('should have the computed properties', () => {
		expect(wrapper.vm.day).toBe(14);
		expect(wrapper.vm.month).toBe('Agosto');
		expect(wrapper.vm.yearDay).toBe('2023, Lunes');
	});
});
