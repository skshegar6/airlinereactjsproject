  
export default function AncillariesReducer(state = [], action) {
  
    if(action.type === 'LOAD_ANCILLARIES'){
        return action.ancillaries;
    }else if(action.type === 'ADD_ANCILLARY'){
        return [...state, action.ancillary.ancillary]
    }else if(action.type === 'EDIT_ANCILLARY'){
        let UpdatedData = state.map(ancillary1 => {
            if(ancillary1.id === action.ancillary.ancillary.id){
                return action.ancillary.ancillary;
            }else{
                return ancillary1;
            }
        })
        return Object.assign([], state,UpdatedData);
    }else if(action.type === 'DELETE_ANCILLARY'){
        const newState = Object.assign([], state);
        const indexOfCatToDelete = state.findIndex(ancillary => {
            return ancillary.id ===action.ancillary.ancillary.id
        })
        newState.splice(indexOfCatToDelete, 1);
        return newState;
    }
    
    return state;
    
  }
