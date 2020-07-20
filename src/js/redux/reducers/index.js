import { combineReducers } from 'redux';
import PassangersReducer from './admin/passanger.js';
import FlightsDashborad from "./admin/dashboard_flights.js";
import AncillariesReducer from './admin/ancillary.js'
const rootReducer = combineReducers({
    passengers : PassangersReducer,
    flights : FlightsDashborad,
    ancillaries : AncillariesReducer
})
export default rootReducer;