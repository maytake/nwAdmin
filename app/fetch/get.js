import 'whatwg-fetch'
import 'es6-promise'


export function get(url) {
	var result = fetch(url, {
		credentials: 'include',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Accept': 'application/json, text/plain, */*'
		}
	}).then(res => {
		return res.json()
	});

	return result;
}