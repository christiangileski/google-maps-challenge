import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from './components/Loading';
import MapContainer from './components/MapContainer';
import NotFound from './components/NotFound';
import { createMuiTheme, MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { Consumer } from './Context';

class App extends Component {
	render() {
		return (
			<Consumer>
				{(context) => {
					const theme = createMuiTheme({
						palette: {
							type: 'light',
							primary: {
								main: '#4a89f3',
								secondary: '#e6e6e6',
								textMain: '#083178',
							},
						},
						typography: {
							useNextVariants: true,
						},
					});

					return (
						<MuiThemeProvider theme={theme}>
							<CssBaseline />
							<Router>
								<Switch>
									<Route exact path='/' render={() => (context.loading ? <Loading /> : <MapContainer apiKey={context.apiKey} />)} />
									<Route status={404} component={NotFound} />
								</Switch>
							</Router>
						</MuiThemeProvider>
					);
				}}
			</Consumer>
		);
	}
}

export default App;
