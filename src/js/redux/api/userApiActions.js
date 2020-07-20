import { handleResponse,handleError} from './apiUtils';
const API_BASE_ADDRESS = 'http://localhost:8080';

export function loginUser(userDetails){
return fetch(API_BASE_ADDRESS+"/login",{
    method:"POST",
    headers:{"content-type":"application/json"},
    body:JSON.stringify(userDetails)
  })
  .then(handleResponse)
  .catch(handleError);
}
