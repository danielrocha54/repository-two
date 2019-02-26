import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Map, TileLayer, LayersControl } from 'react-leaflet'
import { GoogleLayer } from 'react-leaflet-google'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import '../App.css'

const { BaseLayer } = LayersControl
const key = 'AIzaSyDEG4lyorD61vnJoAHG0FkQERZ-McElZyg'
const terrain = 'TERRAIN'
const road = 'ROADMAP'
const satellite = 'SATELLITE'
const hydrid = 'HYBRID'


export default class GeoLocationDialog extends React.Component {

	state = {
		open: false,
		submitted: false,
		mode: '',
		id: '',
		city: '',
		country: '',
		lat: '0.0000',
		lng: '0.0000',
		zoom: 2
	}

	mode = {
		UPDATE: 'UPDATE',
		CREATE: 'CREATE'
	}

	mapRef = null;

	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange = prop => event => {
		this.setState({ ['submitted']: false })
		this.setState({ [prop]: event.target.value });
	}

	asGeoLocation = () => {

		let location = {
			'city': this.state.city,
			'country': this.state.country,
			'lat': this.state.lat,
			'lng': this.state.lng
		}

		if ( this.state.id != '' ) {
			location['id'] = this.state.id
		}

		return location
	}

	handleSubmit(onCloseDialog, onAddCity, onUpdateCity) {

		this.setState({ ['submitted']: true })

		if (	(this.state.city != '') &&
				(this.state.country != '') &&
				(this.isLngLatValid(this.state.lng)) &&
				(this.isLngLatValid(this.state.lat))
			) {
				this.setState({ ['open']: false })
				onCloseDialog()
				if (this.state.mode === this.mode.UPDATE) {
					onUpdateCity(this.asGeoLocation())
				} else {
					onAddCity(this.asGeoLocation())
				}
		}

	}

	isLngLatValid = lnglat => {
		return /[\d]{1,2}\.[\d]{1,4}/.test(lnglat)
	}

	componentDidMount() {
		ValidatorForm.addValidationRule('isLngLatValid', (value) => {
			return this.isLngLatValid(value)
		});
	}

	setLngLat = (e) => {
		this.setState({ ['lat']: e.latlng.lat.toFixed(4) })
		this.setState({ ['lng']: e.latlng.lng.toFixed(4) })
	}

	setZoom = () => {
		this.setState({ ['zoom']: this.mapRef.current.leafletElement.getZoom() })
	}

	render() {

		const { dialogOpen, location, onCloseDialog, onAddCity, onUpdateCity } = this.props

		this.mapRef = React.createRef();

		function getModalStyle() {
			const top = 55;
			const left = 55;

			return {
				top: `${top}%`,
				left: `${left}%`,
				transform: `translate(-${top}%, -${left}%)`,
			}
		}

		if (this.state.open !== dialogOpen) {
			this.setState({ ['open']: true })
			this.setState({ ['id']: (location.id)? location.id : '' })
			this.setState({ ['mode']: (location.id)? this.mode.UPDATE : this.mode.CREATE })
			this.setState({ ['city']: (location.city)? location.city : '' })
			this.setState({ ['country']: (location.country)? location.country : '' })
			this.setState({ ['lat']: (location.lat)? location.lat : '0.0000' })
			this.setState({ ['lng']: (location.lng)? location.lng : '0.0000' })
			this.setState({ ['zoom']: (location.id)? 8 : 2 })
		}

		let title = (location.city)? 'Edit city ' + this.state.city : 'Create new city';

		return (

			<div>
				<Dialog
					open={this.state.open}
					onClose={()=>{
								this.setState({ ['open']: false })
								onCloseDialog()
							}}
					aria-labelledby="form-dialog-title"
					containerclassname={ 'ms-dialogMainOverride' } 
				>
					<DialogTitle className="geolocation-dialog">{ title }</DialogTitle>
					
					<DialogContent className="geolocation-dialog">

						<ValidatorForm
							ref="form"
							onSubmit={ () => { this.handleSubmit(onCloseDialog, onAddCity, onUpdateCity) } }
						>

							<Container>

								<Row>

									<Col md={{ span: 3 }}>

										<Row>
											<TextValidator
												label="City"
												value={ this.state.city }
												onChange={this.handleChange('city')}
												validators={['required']}
												errorMessages={['this field is required']}
											/>
										</Row>

										<br />
										<Row>
											<TextValidator
												label="Country"
												value={ this.state.country }
												onChange={this.handleChange('country')}
												validators={['required']}
												errorMessages={['this field is required']}
											/>
										</Row>

										<br />
										<Row>
											<TextValidator
												label="Longitute"
												value={ this.state.lng }
												onChange={this.handleChange('lng')}
												validators={['required', 'isLngLatValid']}
												errorMessages={['this field is required', 'Longitude values must have the formmat ##.####']}
											/>
										</Row>

										<br />
										<Row>
											<TextValidator
												label="Latitude"
												value={ this.state.lat }
												onChange={this.handleChange('lat')}
												validators={['required', 'isLngLatValid']}
												errorMessages={['this field is required', 'Latitude values must have the formmat ##.####']}
											/>
										</Row>


										<br />
										<br />
										<Row>

											<Button onClick={()=>{
														this.setState({ ['open']: false })
														onCloseDialog()
													}}
													color="primary"
											>
												Cancel
											</Button>

											{
												(location.city)?
													<Button onClick={()=>{
															this.setState({ ['open']: false })
															onCloseDialog()
															onUpdateCity(this.state)
														}}
														color="primary"
														type="submit"
													>
														Update
													</Button>
												:
													<Button
														color="primary"
														type="submit"
													>
														Add
													</Button>
											}

										</Row>

									</Col>

									<Col md={{ span: 1 }} />

									<Col md={{ span: 7 }}>

										<Row>
											<Map
												ref={this.mapRef}
												center={[ this.state.lat, this.state.lng ]}
												zoomControl={true}
												onClick={this.setLngLat}
												onZoom={this.setZoom}
												zoom={this.state.zoom}
											>
												<LayersControl position='topright'>
													<BaseLayer name='OpenStreetMap.Mapnik'>
														<TileLayer  url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
													</BaseLayer>
													<BaseLayer checked name='Google Maps Roads'>
														<GoogleLayer googlekey={key}  maptype={road} />
													</BaseLayer>
													<BaseLayer name='Google Maps Terrain'>
														<GoogleLayer googlekey={key}  maptype={terrain} />
													</BaseLayer>
													<BaseLayer name='Google Maps Satellite'>
														<GoogleLayer googlekey={key}  maptype={satellite} />
													</BaseLayer>
													<BaseLayer name='Google Maps Hydrid'>
														<GoogleLayer googlekey={key}  maptype={hydrid}  libraries={['geometry', 'places']} />
													</BaseLayer>
													<BaseLayer name='Google Maps with Libraries'>
														<GoogleLayer googlekey={key}  maptype={hydrid}  libraries={['geometry', 'places']} />
													</BaseLayer>
												</LayersControl>
											</Map>
										</Row>

									</Col>

								</Row>

							</Container>

						</ValidatorForm>

					</DialogContent>

				</Dialog>
			</div>
		)
	}

}

GeoLocationDialog.propTypes = {
	dialogOpen: PropTypes.bool.isRequired,
	location: PropTypes.object.isRequired,
	onCloseDialog: PropTypes.func.isRequired,
	onAddCity: PropTypes.func.isRequired,
	onUpdateCity: PropTypes.func.isRequired
};
