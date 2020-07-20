import { handleResponse,handleError} from './apiUtils';
const API_BASE_ADDRESS = 'http://localhost:8080';

export function getFlights(){
  return fetch(API_BASE_ADDRESS+'/flights_overall_data/')
    .then(handleResponse)
    .catch(handleError);
}

export function saveUsers(user){
  let action = user.id ? "/updateperson/" : '/createperson/';
  return fetch(API_BASE_ADDRESS+action+(user.id || ""),{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(user)
    })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteUser(user){
  return fetch(API_BASE_ADDRESS+'/deleteperson/'+user,{
    method:"DELETE"
  })
  .then(handleResponse)
  .catch(handleError);
}
