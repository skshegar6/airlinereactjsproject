
import * as fligthsApi from '../../api/flightsApiActions.js';

export  function loadFlightsInServer(){
  return function (dispatch){
    return fligthsApi.getFlights().then(flights =>{
      dispatch({ type: 'LOAD_FLIGHTS', flights })
    }).catch(error =>{
      throw error;
    })
  }
}


