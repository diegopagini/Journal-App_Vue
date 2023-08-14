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

		expect((await daybookRouter.children[0].component()).default.name).toEqual('no-entry');
		expect((await daybookRouter.children[1].component()).default.name).toBe('entry-view');

		const promiseRoutes = [];
		daybookRouter.children.forEach((child) => promiseRoutes.push(child.component()));

		const routes = (await Promise.all(promiseRoutes)).map((route) => route.default.name);
		expect(routes).toContain('no-entry', 'entry-view');
	});
});
