/** @format */
import FabEntry from '@/modules/daybook/components/fab-entry.vue';
import { shallowMount } from '@vue/test-utils';

describe('fab-entry component', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallowMount(FabEntry);
	});

	it('Should render the default icon', () => {
		expect(wrapper.props('icon')).toEqual('fa-plus');
		const iTag = wrapper.find('i');
		expect(iTag.classes('fa-plus')).toBeTruthy();
	});

	it('Should render the given icon', () => {
		const wrapper = shallowMount(FabEntry, {
			props: {
				icon: 'fa-circle',
			},
		});

		const iTag = wrapper.find('i');
		expect(iTag.classes('fa-circle')).toBeTruthy();
		expect(wrapper.props('icon')).toEqual('fa-circle');
	});

	it('Should emit the event on:click', () => {
		wrapper.find('button').trigger('click');
		expect(wrapper.emitted('on:click')).toHaveLength(1);
	});
});
