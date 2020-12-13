import axios from 'axios';
import * as links from './links';

const instance = axios.create({
	baseURL: links.apiUrl,
});

// const tokenFromStorage = localStorage.getItem('token');

// if (tokenFromStorage) {
// 	instance.defaults.headers.common[
// 		'Authorization'
// 	] = `Bearer ${tokenFromStorage}`;
// }

instance.defaults.headers.common['Content-Type'] = 'application/json';

export default instance;
