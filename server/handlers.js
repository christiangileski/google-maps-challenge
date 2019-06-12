'use strict';

const axios = require('axios');
require('dotenv').config();

let baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

let getApiKey = function () {
	return process.env.API_KEY;
};

let geocode = async function (request) {
	return axios.get(baseUrl + '?address=' + request.params.address + '&key=' + process.env.API_KEY)
		.then(response => {
			if (response.data && response.data.results && response.data.results.length > 0) {
				return response.data.results[0];
			}
			return {
				results: [],
				status: "ZERO_RESULTS",
			};
		})
		.catch(function (error) {
			console.error(error);
			throw error;
		});
};

let reverseGeocode = async function (request) {
	return axios.get(baseUrl + '?latlng=' + request.params.latlng + '&key=' + process.env.API_KEY)
		.then(response => {
			if (response.data && response.data.results && response.data.results.length > 0) {
				return response.data.results[0];
			}

			return {
				results: [],
				status: "ZERO_RESULTS",
			};
		})
		.catch(function (error) {
			console.error(error);
			throw error;
		});
};

module.exports = exports = {
	getApiKey: getApiKey,
	geocode: geocode,
	reverseGeocode: reverseGeocode,
};