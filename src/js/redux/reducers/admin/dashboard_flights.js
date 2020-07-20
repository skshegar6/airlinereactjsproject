

export default function FlightsDashborad(state = [], action) {
  if(action.type === 'LOAD_FLIGHTS'){
      return action.flights;
  }
  return state;
}

