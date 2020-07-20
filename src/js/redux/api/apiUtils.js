export async function handleResponse(response){
    if(response.ok) return response.json();
    if(response.status === 4000){
        const error = await response.text(); 
        throw new Error(error);
    }
}

export function handleError(error){
    console.log("API call failed"+ error);
    throw error;
}