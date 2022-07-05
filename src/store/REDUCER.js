import { ADD_CHRONO, REMOVE_CHRONO, ADD_TIMEOUT, REMOVE_TIMEOUT } from "./ACTION_TYPES.js";
import { addChronoState, removeChronoState, addTimeoutState, removeTimeoutState } from "./STATES.js";

export function appReducer(state, action){
    switch(action.type){
        case ADD_CHRONO :
                return addChronoState(state, action)
        case REMOVE_CHRONO :
                return removeChronoState(state, action)
        case ADD_TIMEOUT :
                return addTimeoutState(state, action)
        case REMOVE_TIMEOUT :
                return removeTimeoutState(state, action)
       
        default:
                // code ...   
    }
}