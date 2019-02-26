import { combineReducers } from "redux"
import counter from "./CounterReducer"
import map from "./MapReducer"

export default combineReducers({
  counter,
  map
});