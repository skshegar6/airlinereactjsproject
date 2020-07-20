
import { handleResponse,handleError} from './apiUtils';
const API_BASE_ADDRESS = 'http://localhost:8080';

export function getPassangers(flightId,PassengerId){
  return fetch(API_BASE_ADDRESS+'/passengers/'+flightId+'/'+PassengerId)
    .then(handleResponse)
    .catch(handleError);
}

export function getPassangersByFlight(flightId){
  return fetch(API_BASE_ADDRESS+'/passengersByFlight/'+flightId)
    .then(handleResponse)
    .catch(handleError);
}

export function addPassenger(passenger){
  let action = passenger.id ? "/updatepassenger/" : '/addpassenger/';
  return fetch(API_BASE_ADDRESS+action+(passenger.id || ""),{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(passenger)
    })
    .then(handleResponse)
    .catch(handleError);
}

export function deletePassenger(passengerId){
  return fetch(API_BASE_ADDRESS+'/deletepassenger/'+passengerId,{
    method:"DELETE"
  })
  .then(handleResponse)
  .catch(handleError);
}