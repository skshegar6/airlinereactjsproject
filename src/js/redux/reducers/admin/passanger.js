  
export default function PassangersReducer(state = [], action) {
  
    if(action.type === 'LOAD_PASSENGERS'){
        return action.passengers.passenger;
    }else if(action.type === 'ADD_PASSENGER'){
        return [...state,action.passenger.passenger]
    }else if(action.type === 'EDIT_PASSENGER'){
        return Object.assign([], state,
                state.map(passenger => { 
                    if(passenger.id == action.passenger.passenger.id){
                        return action.passenger.passenger;
                    }else{
                        return passenger;   
                    } 
                }) 
            );
    }else if(action.type === 'DELETE_PASSENGER'){
        const newState = Object.assign([], state);
        const indexOfCatToDelete = state.findIndex(passenger => {
            return passenger.id ===action.passenger.passenger.id
        })
        newState.splice(indexOfCatToDelete, 1);
        return newState;
    }
    
    return state;
    
  }
