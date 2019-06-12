import React from 'react';
import { server } from './server';

const Context = React.createContext();

async function getApiKey() {
	try {
		let response = await server.getApiKey();
		return response.data;
	} catch (err) {
		console.error('No API_KEY defined!');
	}
}

class Provider extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			apiKey: '',
			loading: true,
		};
	}

	async componentDidMount() {
		let apiKey = await getApiKey();
		this.setState({ apiKey, loading: false });
	}

	render() {
		return (
			<Context.Provider value={{
				...this.state,
			}}>
				{this.props.children}
			</Context.Provider>
		);
	}
}

const Consumer = Context.Consumer;

export {
	Provider,
	Consumer,
};