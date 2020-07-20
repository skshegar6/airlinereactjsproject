
import * as passangersApi from '../../api/passangerApiActions.js';

export function loadPassangersInServer(flightId,PassengerId){
    return function (dispatch){
      return  passangersApi.getPassangers(flightId,PassengerId).then(passengers =>{
         dispatch({ type: 'LOAD_PASSENGERS', passengers })
      }).catch(error =>{
        throw error;
      })
    }
}

export function loadPassangersByFlightInServer(flightId){
  return function (dispatch){
    return  passangersApi.getPassangersByFlight(flightId).then(passengers =>{
       dispatch({ type: 'LOAD_PASSENGERS', passengers })
    }).catch(error =>{
      throw error;
    })
  }
}



export function savePassangerInServer(pass){
  return function (dispatch){
    return passangersApi.addPassenger(pass).then(passenger =>{
      if(pass.id){
        dispatch({ type: 'EDIT_PASSENGER', passenger })
      }else{
        dispatch({ type: 'ADD_PASSENGER', passenger })
      }
    }).catch(error =>{
      throw error;
    })
  }
}

export  function editPassangerInServer(passengerId){
  return function (dispatch){
    return passangersApi.addPassenger(passengerId).then(passenger =>{
      dispatch({ type: 'EDIT_PASSENGER', passenger })
    }).catch(error =>{
      throw error;
    })
  }
}


export function deletePassangerInServer(passengerId){
  return function (dispatch){
    return passangersApi.deletePassenger(passengerId).then(passenger =>{
      dispatch({ type: 'DELETE_PASSENGER', passenger })
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



