import axios from 'axios';

//Routes client-side API calls back to the server
class Server{
	getApiKey(){
		return axios({
			method: 'get',
			url: 'http://localhost:8333/api/apiKey'
		});
	}
    
	geocode(address){
		return axios({
			method: 'get',
			url: 'http://localhost:8333/api/address/' + address
		});
	}
    
	reverseGeocode(latlng){
		return axios({
			method: 'get',
			url: 'http://localhost:8333/api/latlng/' + latlng
		});
	}
}

export let server = new Server();