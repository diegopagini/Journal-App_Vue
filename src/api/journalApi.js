/** @format */

import axios from 'axios';

const journalApi = axios.create({
	baseURL: 'https://vue-demo-835ba-default-rtdb.europe-west1.firebasedatabase.app',
});

export default journalApi;
