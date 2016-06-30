import qs from 'querystring';
import * as API from '../constant/api';

const request = (url, data, method = 'post') => {
	var promise = new Promise((resolve, reject) => {
		let request = new XMLHttpRequest();
		request.open(method, url, true);

		if (method == 'get') {
			request.onload = function () {
				if (this.status >= 200 && this.status < 400) {
					// Success!
					resolve(JSON.parse(this.response));
				} else {
					reject(new Error(this.statusText));
				}
			};
			request.onerror = function () {
				reject(new Error('There was a connection error of some sort'));
			};
		}
		if (method == 'post') {
			request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		}
		request.send(data);
	});
	return promise;
};
export default {
	getCategories: (params) => request(API.GET_CATEGORY, params, 'get'),
	getBrands: (params) => request(API.GET_BRAND, params, 'get')
};

