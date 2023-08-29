/** @format */
import axios from 'axios';

const authApi = axios.create({
	baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
	params: {
		key: 'AIzaSyCUS-N5kzyoIcP6LlMzSFKLLOQQ0kvyi4Q',
	},
});

export default authApi;
