import React from 'react';
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducer from './reducers/RootReducer'
import thunk from 'redux-thunk'

import reactLogo from './assets/react.png'
import materialUILogo from './assets/materialUI.svg'
import bootstrapLogo from './assets/bootstrap.svg'
import reduxLogo from './assets/redux.png'
import leafletLogo from './assets/leaflet.png'
import googleMapsLogo from './assets/google_maps.png'
import springLogo from './assets/spring.png'
import javaLogo from './assets/java.png'
import mysqlLogo from './assets/mysql.png'
import fedoraLogo from './assets/fedora.png'


const appstore = createStore(reducer, applyMiddleware(thunk))
const appElem = document.getElementById('app')

const render = () => ReactDOM.render(
	<div className="jumbotron">

		<Container>
			<Row>
				<Col md={{ span: 1 }}>
					<img width="110" heigth="110" src={reactLogo} />
				</Col>
				<Col md={{ span: 1 }}>
					<img width="70" heigth="70" src={reduxLogo} />
				</Col>
				<Col md={{ span: 1 }}>
					<img width="80" heigth="80" src={materialUILogo} />
				</Col>
				<Col md={{ span: 1 }}>
					<img width="70" heigth="70" src={bootstrapLogo} />
				</Col>
				<Col md={{ span: 1 }}>
					<img width="70" heigth="70" src={googleMapsLogo} />
				</Col>
				<Col md={{ span: 2 }}>
					<img width="150" heigth="150" src={leafletLogo} />
				</Col>
				<Col md={{ span: 1 }}>
					<img width="70" heigth="70" src={springLogo} />
				</Col>
				<Col md={{ span: 1 }}>
					<img width="50" heigth="50" src={javaLogo} />
				</Col>
				<Col md={{ span: 1 }}>
					<img width="70" heigth="70" src={mysqlLogo} />
				</Col>
				<Col md={{ span: 1 }}>
					<img width="70" heigth="70" src={fedoraLogo} />
				</Col>
			</Row>

			<Row>
				<App store={appstore} />
			</Row>

		</Container>

	</div>
	,
	appElem
)

render()
appstore.subscribe(render)

//
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
