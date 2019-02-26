import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import classNames from 'classnames/bind'

import GeoLocationDialog from './GeoLocationDialog'
import * as mapActions from '../actions/MapActions'

import '../App.css'

export default class DisplayTable extends React.Component {

	state = {
		dialogOpen: false,
		dialogLocations: {}
	}

	constructor() {
		super();
	}

	render() {

		var self = this;

		const { store, error, loading, locations, onDisplayCity } = self.props

		function displayRow(row) {
			self['clicked_row'] = row.id;
			onDisplayCity( { lng: row.lng, lat: row.lat } );
		}

		return (
			
			<Container>
				<Row>

					<Paper className="paper-root">
						<Table className="table-root">
							<TableHead>
								<TableRow>
									<TableCell>City</TableCell>
									<TableCell>Country</TableCell>
									<TableCell padding="none"></TableCell>
									<TableCell padding="none"></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{locations.map(row => (
										<TableRow
											className={classNames({
												'table-row-class': true,
												'table-row-cliked': (row.id === self['clicked_row'])
											})}
											key={row.id}
										>
											<TableCell
												component="th"
												scope="row"
												onClick={()=>{ displayRow(row) }}
											>
												{row.city}
											</TableCell>
											<TableCell
												onClick={()=>{ displayRow(row) }}
											>
												{row.country}
											</TableCell>
											<TableCell padding="none">
												<IconButton
													aria-label="Edit"
													color="default"
													onClick={()=>{
															this.setState({ ['dialogOpen']: true })
															this.setState({ ['dialogLocations']: row })
														}}
												>
													<EditIcon/>
												</IconButton>
											</TableCell>
											<TableCell padding="none">
												<IconButton
													aria-label="Delete"
													color="default"
													onClick={()=>{
															store.dispatch(mapActions.deleteLocation(row.id))
														}}
												>
													<DeleteIcon />
												</IconButton>
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</Paper>
				</Row>
				<div className="spacer"></div>
				<Row>
					<Fab
						color="primary"
						aria-label="Add"
						onClick={()=>{
								this.setState({ ['dialogOpen']: true })
								this.setState({ ['dialogLocations']: {} })
							}}
					>
						<AddIcon />
					</Fab>
				</Row>

				<GeoLocationDialog
					dialogOpen={ this.state.dialogOpen }
					location={ this.state.dialogLocations }
					onCloseDialog={() => { this.setState({ ['dialogOpen']: false }) } }
					onAddCity={ (location) => { store.dispatch(mapActions.createLocation(location) ) } }
					onUpdateCity={ (location) => { store.dispatch(mapActions.updateLocation(location) ) } }
				/>

			</Container>

		)
	}

}

DisplayTable.propTypes = {
	store: PropTypes.object.isRequired,
	error: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired,
	locations: PropTypes.array.isRequired,
	onDisplayCity: PropTypes.func.isRequired
}