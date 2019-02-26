import {	CENTER,
			FETCH_LOCATIONS_BEGIN,
			FETCH_LOCATIONS_SUCCESS,
			FETCH_LOCATIONS_FAILURE,
			LOCATION_DELETE,
			LOCATION_UPDATE,
			LOCATION_CREATE } from '../actions/MapActions'

const initState = {
	zoom: 2,
	lng: 0,
	lat: 0,
	locations: [],
	loading: false,
	error: ''
}

export default (state = initState, action) => {

	let newState = null;

	switch (action.type) {

		case CENTER:
			newState = {
				...state,
				zoom: 12,
				lng: action.payload.lng,
				lat: action.payload.lat
			}
			break

		case FETCH_LOCATIONS_BEGIN:
			newState = {
				...state,
				loading: true,
				error: ''
			}
			break

		case FETCH_LOCATIONS_SUCCESS:
			newState = {
				...state,
				loading: false,
				locations: action.payload.locations
			}
			break

		case FETCH_LOCATIONS_FAILURE:
			newState = {
				...state,
				loading: false,
				error: action.payload.error,
				items: []
			}
			break

		default:
			newState = state;
			break
	}
	
	console.log("===== NEW STATE =====");
	console.log("=====================");
	console.log(newState);

	return newState;
}