import React from 'react'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LoadingOverlay from 'react-loading-overlay'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import DisplayMap from './DisplayMap'
import DisplayTable from './DisplayTable'


export default class MapManager extends React.Component {

	state = {
		errorOpen: true
	}

	constructor() {
		super();
	}

	render() {

		const { store, loading, error } = this.props

		if ( error != '' ) {

			return (

					<Container>
						<Row>
							<Dialog
								open={this.state.errorOpen}
								onClose={() => {this.setState({ ['errorOpen']: false })}}
								aria-labelledby="alert-dialog-title"
								aria-describedby="alert-dialog-description"
							>
								<DialogTitle id="alert-dialog-title">{"Unable to obtain data from server"}</DialogTitle>
									<DialogContent>
										<DialogContentText id="alert-dialog-description">
											{ error }
										</DialogContentText>
									</DialogContent>
									<DialogActions>
										<Button onClick={() => {this.setState({ ['errorOpen']: false })}} color="primary">
											Close
										</Button>
									</DialogActions>
							</Dialog>
						</Row>
					</Container>

				)

		}

		return (

			<Container>

				<LoadingOverlay
					active={ loading }
					spinner
					text='Loading your content...'
				>
					<Row>
						<Col md={{ span: 7 }}>
							<DisplayMap
								zoom={ store.getState().map.zoom }
								lat={ store.getState().map.lat }
								lng={ store.getState().map.lng }
								error={ store.getState().map.error }
								loading={ store.getState().map.loading }
							/>
						</Col>
						<Col md={{ span: 5 }}>
							<DisplayTable
								store={ store }
								error={ store.getState().map.error }
								loading={ store.getState().map.loading }
								locations={ store.getState().map.locations }
								onDisplayCity={(coordinates) => store.dispatch({ type: 'CENTER', payload: coordinates })}
							/>
						</Col>
					</Row>
				</LoadingOverlay>
			</Container>
		)
	}

}

MapManager.propTypes = {
  store: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired
}