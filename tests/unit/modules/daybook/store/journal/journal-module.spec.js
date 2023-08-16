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
		expect(store.state.journal.entries.length).toEqual(0);
	});

	// Getters
	it('getters: getEntriesByTerm getEntryById', () => {
		const store = createVuexStore(journalState);

		expect(store.getters['journal/getEntriesByTerm']('').length).toBe(4);
		expect(store.getters['journal/getEntriesByTerm']('bonito').length).toBe(1);

		// By Id
		const [entry1] = journalState.entries;
		expect(store.getters['journal/getEntryById']('-NbnHbDAWZvXdrl1ZZei')).toEqual(entry1);
	});

	// Actions
	it('actions: loadEntries', async () => {
		const store = createVuexStore({
			isLoading: true,
			entries: [],
		});

		await store.dispatch('journal/loadEntries');
		expect(store.state.journal.entries.length).toBeGreaterThan(0);
	});

	it('actions: updateEntry', async () => {
		const store = createVuexStore(journalState);
		const entry = { ...journalState.entries[0], text: 'this is a test' };
		await store.dispatch('journal/updateEntry', entry);
		expect(store.state.journal.entries[0]).toEqual(entry);
	});

	it('actions: createEntry deleteEntry', async () => {
		const store = createVuexStore(journalState);
		const newEntry = { date: 1627077227978, text: 'Nueva entrada de prueba' };
		const id = await store.dispatch('journal/createEntry', newEntry);
		expect(typeof id).toBe('string');

		expect(store.state.journal.entries.find((el) => el.id === id)).toBeTruthy();

		await store.dispatch('journal/deleteEntry', id);
		expect(store.state.journal.entries.find((el) => el.id === id)).toBeFalsy();
	});
});
