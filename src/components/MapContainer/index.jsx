import React, { Component } from 'react';
import { Marker, Map, GoogleApiWrapper } from 'google-maps-react';
import { Button, Grid, TextField, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { EditLocation } from '@material-ui/icons';
import { server } from '../../server';
import { getDistance } from 'geolib';
import numeral from 'numeral';

const styles = theme => ({
	map: {
		width: '100vw',
		height: '100vh',
		overflowX: 'hidden',
	},
	addressFields: {
		margin: '1rem',
	},
	textfield: {
		width: '85%',
	},
	iconButton: {
		marginTop: '1.25rem',
	},
	button: {
		margin: '0 0 1rem 1rem',
		width: '85%',
	},
	response: {
		width: '90%',
		marginLeft: '1rem',
		color: theme.palette.primary.textMain,
		overflow: 'auto',
		maxHeight: '52vh'
	},
	responseText: {
		overflow: 'auto',
		whiteSpace: 'pre-wrap',
		wordWrap: 'break-word',
	},
	left: {
		opacity: '0.5',
	},
});

class MapContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			addressOneValue: '',
			addressTwoValue: '',
			currentField: 0,
			mapReady: false,
			jsonResponse: {},
			center: {
				lat: 34.020608,
				lng: -118.493223
			},
			marker: null
		};

		this.addressChange = this.addressChange.bind(this);
		this.readyMapSelect = this.readyMapSelect.bind(this);
		this.mapClicked = this.mapClicked.bind(this);
		this.calculateDistance = this.calculateDistance.bind(this);
		this.getDistance = this.getDistance.bind(this);
		this.getAddressInformation = this.getAddressInformation.bind(this);
		this.callGoogle = this.callGoogle.bind(this);
	}

	addressChange(event, field) {
		if (field === 0) {
			this.setState({ addressOneValue: event.target.value, });
		} else {
			this.setState({ addressTwoValue: event.target.value, });
		}
	}

	readyMapSelect(field) {
		this.setState({ currentField: field, mapReady: true });
	}

	mapClicked(mapProps, map, clickEvent) {
		// Only want users clicking on the map to update an address if one of the icon buttons was selected
		if (this.state.mapReady) {
			let addressOneValue = this.state.addressOneValue;
			let addressTwoValue = this.state.addressTwoValue;

			// The API calls work with six decimal places. Without adding toFixed(), the event returns to 15 decimal places which makes for awful readability
			if (this.state.currentField === 0) addressOneValue = clickEvent.latLng.lat().toFixed(6) + ',' + clickEvent.latLng.lng().toFixed(6);
			if (this.state.currentField === 1) addressTwoValue = clickEvent.latLng.lat().toFixed(6) + ',' + clickEvent.latLng.lng().toFixed(6);

			this.setState({ mapReady: false, addressOneValue, addressTwoValue, });
		}
	}

	async calculateDistance() {
		let addressOne = {};
		let addressTwo = {};
		let response = await this.callGoogle(this.state.addressOneValue);

		if (response.geometry && response.geometry.location) {
			addressOne = {
				lat: response.geometry.location.lat,
				lng: response.geometry.location.lng,
				name: response.formatted_address
			};
		}

		response = await this.callGoogle(this.state.addressTwoValue);

		if (response.geometry && response.geometry.location) {
			addressTwo = {
				lat: response.geometry.location.lat,
				lng: response.geometry.location.lng,
				name: response.formatted_address
			};
		}

		let jsonResponse;

		if (addressOne.lat && addressOne.lng && addressTwo.lat && addressTwo.lng) {
			let metersApart = getDistance(addressOne, addressTwo);
			jsonResponse = {
				'From': addressOne.name,
				'To': addressTwo.name,
				'Meters': metersApart.toLocaleString() + ' meters',
				'Kilometers': numeral((metersApart / 1000)).format('0,0.00') + ' kilometers',
				'Miles': numeral((metersApart / 1609)).format('0,0.00') + ' miles',
				'Feet': numeral(metersApart * 3.28).format('0,0.00') + ' feet',
				'Football Fields': numeral(metersApart * .0109).format('0,0.00') + ' football fields',
				'Bananas': numeral(metersApart * 5.618).format('0,0.00') + ' bananas' // Banana conversion courtesy of http://bananaforscale.info/#!/
			};
		} else {
			jsonResponse = {
				message: 'Invalid Address Entered! Please try again.'
			};
		}

		this.setState({ jsonResponse, mapReady: false });
	}

	getDistance(addressOne, addressTwo) {
		return getDistance(
			{ latitude: addressOne.lat, longitude: addressOne.lng, },
			{ latitude: addressTwo.lat, longitude: addressTwo.lng, }
		);
	}

	async getAddressInformation(field) {
		let jsonResponse = {};
		let center = this.state.center;
		let marker = this.state.marker;
		let addressToTest = field === 0 ? this.state.addressOneValue : this.state.addressTwoValue;

		jsonResponse = await this.callGoogle(addressToTest);

		// Recenters when the user asks for information about an address
		if (jsonResponse.geometry && jsonResponse.geometry.location) {
			center = {
				lat: jsonResponse.geometry.location.lat,
				lng: jsonResponse.geometry.location.lng
			};

			marker = {
				name: jsonResponse.formatted_address,
				position: { lat: jsonResponse.geometry.location.lat, lng: jsonResponse.geometry.location.lng }
			};
		}


		this.setState({ jsonResponse, center, marker, mapReady: false, });
	}

	async callGoogle(addressToTest) {
		// Regex for lat/lng coordinates pulled from https://stackoverflow.com/a/18690202
		let regex = new RegExp(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/);

		// If it satisfies the coordinates regex, use the reverse geocode, otherwise try using normal geocoding
		if (regex.test(addressToTest)) {
			return await server.reverseGeocode(addressToTest)
				.then(response => {
					return response.data;
				})
				.catch(err => {
					console.error('reverseGeocode()', err);
					throw err;
				});
		} else {
			return await server.geocode(addressToTest)
				.then(response => {
					return response.data;
				})
				.catch(err => {
					console.error('geocode()', err);
					throw err;
				});
		}
	}

	render() {
		const { classes } = this.props;

		return (
			<Grid className={classes.map} container>
				<Grid className={this.state.mapReady ? classes.left : ''} item xs={3}>
					<div className={classes.addressFields}>
						<TextField
							id="address-one"
							label="Address One"
							value={this.state.addressOneValue}
							onChange={(e) => { this.addressChange(e, 0); }}
							margin="normal"
							placeholder={'1 Lomb Memorial Dr, Rochester, NY 14623'}
							className={classes.textfield}
							onFocus={() => { this.setState({ mapReady: false }); }}
							required
						/>

						<Tooltip title='Select address' enterDelay={250}>
							<IconButton color='primary' className={classes.iconButton} onClick={() => { this.readyMapSelect(0); }}>
								<EditLocation />
							</IconButton>
						</Tooltip>
					</div>
					<div className={classes.addressFields}>
						<TextField
							id="address-two"
							label="Address Two"
							value={this.state.addressTwoValue}
							onChange={(e) => { this.addressChange(e, 1); }}
							margin="normal"
							className={classes.textfield}
							placeholder={'34.020608,-118.493223'}
							onFocus={() => { this.setState({ mapReady: false }); }}
							required
						/>

						<Tooltip title='Select address' enterDelay={250}>
							<IconButton color='primary' className={classes.iconButton} onClick={() => { this.readyMapSelect(1); }}>
								<EditLocation />
							</IconButton>
						</Tooltip>
					</div>
					<div>
						<Button className={classes.button} variant='contained' onClick={this.calculateDistance} color='primary' disabled={!this.state.addressOneValue || !this.state.addressTwoValue}>
							Calculate distance between the addresses!
						</Button>
					</div>
					<div>
						<Button className={classes.button} variant='outlined' onClick={() => { this.getAddressInformation(0); }} color='primary' disabled={!this.state.addressOneValue}>
							Get information about address one!
						</Button>
					</div>
					<div>
						<Button className={classes.button} variant='outlined' onClick={() => { this.getAddressInformation(1); }} color='primary' disabled={!this.state.addressTwoValue}>
							Get information about address two!
						</Button>
					</div>

					<div className={classes.response}>
						<pre className={classes.responseText}>{JSON.stringify(this.state.jsonResponse) !== '{}' && JSON.stringify(this.state.jsonResponse, null, 2)}</pre>
					</div>
				</Grid>

				<Grid item xs={9}>
					<Map
						google={this.props.google}
						zoom={11}
						containerStyle={{ position: 'relative' }}
						initialCenter={this.state.center}
						center={this.state.center}
						onClick={this.mapClicked}
						draggableCursor={'pointer'}
					>
						{
							this.state.marker &&
							<Marker
								title={this.state.marker.name}
								name={this.state.marker.name}
								position={this.state.marker.position}
							/>
						}
					</Map>
				</Grid>
			</Grid >
		);
	}
}

export default GoogleApiWrapper(
	(props) => ({
		apiKey: props.apiKey
	}
	))(withStyles(styles)(MapContainer));
