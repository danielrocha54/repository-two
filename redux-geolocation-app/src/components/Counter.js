import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Counter extends React.Component {

	constructor (props) {
		super(props)
	}

	render () {
		const { value, onIncrement, onDecrement, onReset } = this.props
		return (
			<Container>
				<Row>
					<Col md={{ span: 7, offset: 4 }}>
						<h5>the counter has the value = {value}</h5>
					</Col>
				</Row>
				<Row>
					<Col md={{ span: 1, offset: 5 }}>
						<Button variant="primary" size="lg" onClick={onIncrement}>
							+
						</Button>
					</Col>
					<Col md={{ span: 1 }}>
						<Button variant="primary" size="lg" onClick={onDecrement}>
							-
						</Button>
					</Col>
					{ ( value != 0 )?
						<Col> 
							<Button variant="primary" size="lg" onClick={onReset}>
								0
							</Button>
						</Col>
						:
						null
					}
				</Row>
			</Container>
		)
	}

}

Counter.propTypes = {
	value: PropTypes.number.isRequired,
	onIncrement: PropTypes.func.isRequired,
	onDecrement: PropTypes.func.isRequired,
	onReset: PropTypes.func.isRequired
}

export default Counter