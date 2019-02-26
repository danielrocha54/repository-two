import React from 'react'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { connect } from 'react-redux';

import './App.css'
import MapManager from './components/MapManager'
import Counter from './components/Counter'
import * as mapActions from './actions/MapActions'
import * as counterActions from './actions/CounterActions'


export default class App extends React.Component {

  constructor(props) {
    super(props);
    props.store.dispatch(mapActions.fetchLocations());
  }

  render() {

    const { store } = this.props

    return (
          <Container>
            
            <div className="spacer"></div>
            <Row>
              <MapManager
                store={store}
                loading={store.getState().map.loading}
                error={store.getState().map.error}
              />
            </Row>

            <div className="spacer"></div>
            <Row>
              <Counter
                value={store.getState().counter.value}
                onIncrement={() => store.dispatch({ type: counterActions.INCREMENT })}
                onDecrement={() => store.dispatch({ type: counterActions.DECREMENT })}
                onReset={() => store.dispatch({ type: counterActions.RESET })}
              />
            </Row>
          </Container>
      )

    }
  
}

App.propTypes = {
  store: PropTypes.object.isRequired
}

