import axios from 'axios'

export const CENTER						=	"CENTER"
export const FETCH_LOCATIONS_BEGIN		=	"FETCH_LOCATIONS_BEGIN"
export const FETCH_LOCATIONS_SUCCESS	=	"FETCH_LOCATIONS_SUCCESS"
export const FETCH_LOCATIONS_FAILURE	=	"FETCH_LOCATIONS_FAILURE"


export const fetchLocationsBegin = () => ({
	type: FETCH_LOCATIONS_BEGIN
})

export const fetchLocationsSuccess = locations => ({
	type: FETCH_LOCATIONS_SUCCESS,
	payload: { locations }
})

export const fetchLocationsFailure = error => ({
	type: FETCH_LOCATIONS_FAILURE,
	payload: { error }
})



export const fetchLocations = () => {
	return dispatch => {
		dispatch(fetchLocationsBegin());
		/*return getLocations()*/
		return axios.get('http://localhost:8080/api/locations')
			.then(response => {
					dispatch(fetchLocationsSuccess(response.data.data))
					return response.data.data
					/*dispatch(fetchLocationsSuccess(response.locations))
					return response.locations*/
				})
			.catch(error =>
				dispatch(fetchLocationsFailure( (error.data)? error.data.errorMessage : error.message) )
			)
	}
}


export const createLocation = (location) => {
	return dispatch => {
		dispatch(fetchLocationsBegin())
		return axios.post('http://localhost:8080/api/create', location)
			.then(response => {
				dispatch(fetchLocations())
			})
			.catch(error =>
				dispatch(fetchLocationsFailure( (error.data)? error.data.errorMessage : error.message) )
			)
	}
}

export const updateLocation = (location) => {
	return dispatch => {
		dispatch(fetchLocationsBegin())
		return axios.post('http://localhost:8080/api/update', location)
			.then(response => {
				dispatch(fetchLocations())
			})
			.catch(error =>
				dispatch(fetchLocationsFailure( (error.data)? error.data.errorMessage : error.message) )
			)
	}
}

export const deleteLocation = (locationId) => {
	return dispatch => {
		dispatch(fetchLocationsBegin())
		return axios.delete('http://localhost:8080/api/delete/' + locationId)
			.then(response => {
				dispatch(fetchLocations())
			})
			.catch(error =>
				dispatch(fetchLocationsFailure( (error.data)? error.data.errorMessage : error.message) )
			)
	}
}



/*function getLocations() {
	return new Promise(resolve => {

		setTimeout(
			() =>
				resolve({
					locations: [
						{
							id:			1, 
							city: 		'Zurich',
							country:	'Schweiz',
							lat:		47.3769,
							lng:		8.5417
						},
						{
							id:			2,
							city: 		'Leipzig',
							country:	'Deutchland',
							lat:		51.3397,
							lng:		12.3731
						},
						{
							id:			3,
							city: 		'Vienna',
							country:	'Osterreich',
							lat:		48.2082,
							lng:		16.3738
						},
						{
							id:			4,
							city: 		'Frankfurt',
							country:	'Deutchland',
							lat:		50.1109,
							lng:		8.6821
						},
						{
							id:			5,
							city: 		'Munchen',
							country:	'Deutchland',
							lat:		48.1351,
							lng:		11.5820
						},
					]
				}),
			10000
		)
	})
}*/

function handleErrors(response) {
	if (!response.ok) {
		throw Error(response.statusText)
	}
	return response
}
