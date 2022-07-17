import { ADD_CHRONO, REMOVE_CHRONO, ADD_TIMEOUT, REMOVE_TIMEOUT, SET_BLUR_TIMESTAMP, SET_IS_RUNNING } from "./ACTION_TYPES.js";
import { addChronoState, removeChronoState, addTimeoutState, removeTimeoutState, setBlurTimestamp, setIsRunning } from "./STATES.js";

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
        case SET_BLUR_TIMESTAMP :
                return setBlurTimestamp(state, action)
        case SET_IS_RUNNING :
                return setIsRunning(state, action)
       
        default:
                // code ...   
    }
}