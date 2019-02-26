import React from 'react'
import { Map, TileLayer, LayersControl } from 'react-leaflet'
import { GoogleLayer } from 'react-leaflet-google'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const { BaseLayer } = LayersControl
const key = 'AIzaSyDEG4lyorD61vnJoAHG0FkQERZ-McElZyg'
const terrain = 'TERRAIN'
const road = 'ROADMAP'
const satellite = 'SATELLITE'
const hydrid = 'HYBRID'
//// Google's map type. Valid values are 'roadmap', 'satellite' or 'terrain'. 'hybrid' is not really supported.

export default class DisplayMap extends React.Component {

	mapRef = null;

	constructor() {
		super();
	}

	render() {

		this.mapRef = React.createRef();

		const { error, loading, zoom, lat, lng } = this.props

		if ( loading || ( error != '' ) ) {

			return (
					<Container>
						<Row>
							<Map />
						</Row>
					</Container>
				)

		}

		return (

			<Container>

				<Row>
					<Map
						ref={this.mapRef}
						center={[ lat, lng ]}
						zoom={ zoom }
						zoomControl={true}
					>
						<LayersControl position='topright'>
							<BaseLayer name='OpenStreetMap.Mapnik'>
								<TileLayer  url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"/>
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

			</Container>
		)

	}

	componentDidUpdate() {
		if (this.mapRef && this.mapRef.current) {
			this.mapRef.current.leafletElement.invalidateSize()
		}
	}

}

DisplayMap.propTypes = {
	error: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired, 
	zoom: PropTypes.number.isRequired,
	lng: PropTypes.number.isRequired,
	lat: PropTypes.number.isRequired,
}