/** @format */
import AboutView from '@/views/AboutView.vue';
import { shallowMount } from '@vue/test-utils';

describe('AboutView', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallowMount(AboutView);
	});

	it('Should render the component', () => {
		expect(wrapper.html()).toMatchSnapshot();
	});
});
