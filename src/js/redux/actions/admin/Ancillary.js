
import * as ancillariesApi from '../../api/ancillaryApiActions.js';


export function loadAncillariesByFlightInServer(flightId){
  return function (dispatch){
    return  ancillariesApi.getAncillariesByFlight(flightId).then(ancillaries =>{
       dispatch({ type: 'LOAD_ANCILLARIES', ancillaries })
    }).catch(error =>{
      throw error;
    })
  }
}



export function saveAncillaryApiInServer(ancill){
  return function (dispatch){
    return ancillariesApi.addAncillary(ancill).then(ancillary =>{
      if(ancill.id){
        dispatch({ type: 'EDIT_ANCILLARY', ancillary })
      }else{
        dispatch({ type: 'ADD_ANCILLARY', ancillary })
      }
    }).catch(error =>{
      throw error;
    })
  }
}

export function deleteAncillaryInServer(ancillaryId){
  return function (dispatch){
    return ancillariesApi.deleteAncillary(ancillaryId).then(ancillary =>{
      dispatch({ type: 'DELETE_ANCILLARY', ancillary })
    }).catch(error =>{
      throw error;
    })
  }
}



export function addPassanger(passanger) {
    return { type: "ADD_PASSANGER", passanger }
    
}

export function editPassanger(passanger){
    return{type:"EDIT_PASSANGER",passanger}
}

export function deletePassanger(deleteName){
    return{type:"DELETE_PASSANGER",deleteName}
}

export function loadPassanger(passanger) {
    return{type:"LOAD_PASSANGERS",passanger}
}



