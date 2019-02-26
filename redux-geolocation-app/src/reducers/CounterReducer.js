import { INCREMENT, DECREMENT, RESET } from '../actions/CounterActions'


const initState = {
	value: 0
}

export default (state = initState, action) => {

	switch (action.type) {
		
		case INCREMENT:
			return {
				...state,
				value: state.value + 1
			}

		case DECREMENT:
			return {
				...state,
				value: state.value - 1
			}

		case RESET:
			return {
				...state,
				value: 0
			}

		default:
			return state
	
	}

}