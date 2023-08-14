/** @format */
import HomeView from '@/views/HomeView.vue';
import { shallowMount } from '@vue/test-utils';

describe('HomeView', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallowMount(HomeView);
	});

	it('Should render the component', () => {
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('Click a button should redirect to daybook', () => {
		const mockRouter = {
			push: jest.fn(),
		};

		const wrapper = shallowMount(HomeView, {
			global: {
				mocks: {
					$router: mockRouter,
				},
			},
		});

		wrapper.find('button').trigger('click');
		expect(mockRouter.push).toHaveBeenCalled();
		expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry' });
	});
});
