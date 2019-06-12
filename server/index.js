const Hapi = require('hapi');
require('dotenv').config();
const handlers = require('./handlers');

(async () => {
	const server = new Hapi.Server({
		port: 8333,
		routes: {
			cors: true,
		},
	});

	server.route(
		{
			method: 'GET',
			path: '/api/apiKey',
			handler: handlers.getApiKey,
		});

	server.route(
		{
			method: 'GET',
			path: '/api/address/{address}',
			handler: handlers.geocode,
		});

	server.route(
		{
			method: 'GET',
			path: '/api/latlng/{latlng}',
			handler: handlers.reverseGeocode,
		});

	await server.start();

	console.log('Server running at:', server.info.uri);
})();
