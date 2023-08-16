/** @format */
import journal from '@/modules/daybook/store/journal';
import { createStore } from 'vuex';

import { journalState } from '../../../../mock-data/test-journal-state';

const createVuexStore = (initialState) =>
	createStore({
		modules: {
			journal: {
				...journal,
				state: { ...initialState },
			},
		},
	});

describe('Vuex - Journal Module', () => {
	// Basic
	it('should have a initial state', () => {
		const store = createVuexStore(journalState);
		const { isLoading, entries } = store.state.journal;
		expect(isLoading).toBeFalsy();
		expect(entries).toEqual(journalState.entries);
	});

	// Mutations
	it('mutations: setEntries', () => {
		const store = createVuexStore({
			isLoading: true,
			entries: [],
		});

		store.commit('journal/setEntries', journalState.entries);
		expect(store.state.journal.entries.length).toBe(4);
		expect(store.state.journal.isLoading).toBeFalsy();
	});

	it('mutations: updateEntry', () => {
		const store = createVuexStore({
			isLoading: true,
			entries: [
				{
					id: '-NbnHbDAWZvXdrl1ZZei',
					date: 1692003877006,
					picture:
						'https://res.cloudinary.com/dfhtj8isz/image/upload/v1692006702/rlktggh4wrlllibwta2l.jpg',
					text: 'Es un día bonito!',
				},
			],
		});

		store.commit('journal/updateEntry', {
			id: '-NbnHbDAWZvXdrl1ZZei',
			date: 1692003877006,
			picture:
				'https://res.cloudinary.com/dfhtj8isz/image/upload/v1692006702/rlktggh4wrlllibwta2l.jpg',
			text: 'test!',
		});

		expect(store.state.journal.entries[0].text).toBe('test!');
	});

	it('mutations: addEntry', () => {
		const store = createVuexStore({
			isLoading: true,
			entries: [],
		});

		const entry = {
			id: '-NbnHbDAWZvXdrl1ZZei',
			date: 1692003877006,
			picture:
				'https://res.cloudinary.com/dfhtj8isz/image/upload/v1692006702/rlktggh4wrlllibwta2l.jpg',
			text: 'test!',
		};
		store.commit('journal/addEntry', entry);

		expect(store.state.journal.entries[0]).toEqual(entry);
	});

	it('mutations: deleteEntry', () => {
		const store = createVuexStore({
			isLoading: true,
			entries: [
				{
					id: '-NbnHbDAWZvXdrl1ZZei',
					date: 1692003877006,
					picture:
						'https://res.cloudinary.com/dfhtj8isz/image/upload/v1692006702/rlktggh4wrlllibwta2l.jpg',
					text: 'test!',
				},
			],
		});

		store.commit('journal/deleteEntry', '-NbnHbDAWZvXdrl1ZZei');
		expect(store.state.journal.entries[0].length).toEqual(0);
	});

	// Getters
});
