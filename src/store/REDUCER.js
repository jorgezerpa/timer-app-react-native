import { ADD_CHRONO, REMOVE_CHRONO } from "./ACTION_TYPES.js";
import { addChronoState, removeChronoState } from "./STATES.js";

export function appReducer(state, action){
    switch(action.type){
        case ADD_CHRONO :
                return addChronoState(state, action)
        case REMOVE_CHRONO :
                return removeChronoState(state, action)
        case "INCREASE_PRODUCT_QUANTITY" :
                // code...
        case "DECREASE_PRODUCT_QUANTITY" :
                // code ...
        default:
                // code ...   
    }
}