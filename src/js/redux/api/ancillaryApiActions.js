
import { handleResponse,handleError} from './apiUtils';
const API_BASE_ADDRESS = 'http://localhost:8080';

export function getAncillaries(flightId){
  return fetch(API_BASE_ADDRESS+'/getancillariesbyflight/'+flightId)
    .then(handleResponse)
    .catch(handleError);
}

export function getAncillariesByFlight(flightId){
  return fetch(API_BASE_ADDRESS+'/getancillariesbyflight/'+flightId)
    .then(handleResponse)
    .catch(handleError);
}

export function addAncillary(ancillary){
  let action = ancillary.id ? "/updateancillary/" : '/addancillary/';
  return fetch(API_BASE_ADDRESS+action+(ancillary.id || ""),{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(ancillary)
    })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteAncillary(ancillaryId){
  return fetch(API_BASE_ADDRESS+'/deleteancillary/'+ancillaryId,{
    method:"DELETE"
  })
  .then(handleResponse)
  .catch(handleError);
}