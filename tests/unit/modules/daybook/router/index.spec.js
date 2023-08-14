/** @format */
import daybookRouter from '@/modules/daybook/router';

describe('Daybook router', () => {
	it('Router should have a configuration', async () => {
		expect(daybookRouter).toMatchObject({
			name: 'daybook',
			component: expect.any(Function),
			children: [
				{ path: '', name: 'no-entry', component: expect.any(Function) },
				{
					path: ':id',
					name: 'entry',
					component: expect.any(Function),
					props: expect.any(Function),
				},
			],
		});
	});

	it('Should contain routes', async () => {
		expect((await daybookRouter.children[0].component()).default.name).toEqual('no-entry');
		expect((await daybookRouter.children[1].component()).default.name).toBe('entry-view');
	});

	it('Should contain routes', async () => {
		const promiseRoutes = [];
		daybookRouter.children.forEach((child) => promiseRoutes.push(child.component()));

		const routes = (await Promise.all(promiseRoutes)).map((route) => route.default.name);
		expect(routes).toContain('no-entry', 'entry-view');
	});

	it('Should return the id of the route', () => {
		const route = {
			params: {
				id: 'ABC-123',
			},
		};

		expect(daybookRouter.children[1].props(route)).toEqual({ id: 'ABC-123' });

		// Better
		const entryRoute = daybookRouter.children.find((r) => r.name === 'entry');
		expect(entryRoute.props(route)).toEqual({ id: 'ABC-123' });
	});
});
