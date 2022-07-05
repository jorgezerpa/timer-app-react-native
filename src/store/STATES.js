export function addChronoState(state, action){
    const { chronos } = state;
    chronos.push(action.payload);
    return ({
        ...state,
        chronos: [...chronos] 
    })
    
}

export function removeChronoState(state, action){
    // const index = state.chronos.findIndex(chrono => chrono.id === action.payload);
    // state.chronos.splice(index, 1);
    const newState = state.chronos.filter(chrono=>chrono.id !== action.payload);
    return ({
        ...state,
        chronos: [...newState]
    })
}

export function addTimeoutState(state, action){
    const { timeouts } = state;
    timeouts.push(action.payload);
    return ({
        ...state,
        timeouts: [...timeouts] 
    })
}

export function removeTimeoutState(state, action){
    // const index = state.chronos.findIndex(chrono => chrono.id === action.payload);
    // state.chronos.splice(index, 1);
    const newState = state.timeouts.filter(timeout=>timeout.id !== action.payload);
    return ({
        ...state,
        timeouts: [...newState]
    })
}