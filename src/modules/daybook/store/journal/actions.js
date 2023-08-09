/** @format */
import journalApi from '@/api/journalApi';

export const loadEntries = async (/*{ commit }*/) => {
	const { data } = await journalApi.get('/entries.json');
	console.log(data);
};

export const updateEntry = async (/* { commit }*/) => {};

export const createEntry = async (/* { commit }*/) => {};
