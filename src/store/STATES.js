export function addChronoState(state, action){
    const { chronos } = state.chronos;
    chronos.push(action.payload);
    const newChronos = { ...state.chronos, chronos: chronos  };

    return ({
        ...state,
        chronos: {...newChronos}
    })
}

export function removeChronoState(state, action){
    const filterChronosArray = state.chronos.chronos.filter(chrono=>chrono.id !== action.payload);
    const newChronos = { ...state.chronos, chronos: filterChronosArray };
    
    return ({
        ...state,
        chronos: {...newChronos}
    })
}

export function addTimeoutState(state, action){
    const { timeouts } = state.timeouts;
    timeouts.push(action.payload);
    const newTimeouts = { ...state.timeouts, timeouts: timeouts  };

    return ({
        ...state,
        timeouts: {...newTimeouts}
    })

}

export function removeTimeoutState(state, action){
    const filterTimeoutsArray = state.timeouts.timeouts.filter(timeout=>timeout.id !== action.payload);
    const newTimeouts = { ...state.timeouts, timeouts: filterTimeoutsArray };
    
    return ({
        ...state,
        timeouts: {...newTimeouts}
    })
}

export function setBlurTimestamp(state, action){
    const timestamp = new Date();
    if(action.payload === 'chronos'){ 
        return ({
            ...state,
            chronos: { ...state.chronos, blurTimestamp: timestamp }
        })
    }
    if(action.payload === 'timeouts'){ 
        return ({
            ...state,
            timeouts: { ...state.timeouts, blurTimestamp: timestamp }
        })
    }
}

export function setIsRunning(state, action){
    //payload = { object, isRunning, id }
    if(action.payload.object === 'chronos'){
        const newChronosArray =  state.chronos.chronos.map(chrono=>{
            if(chrono.id === action.payload.id) chrono.isRunning = action.payload.isRunning;
            return chrono;
        });
        return ({
            ...state,
            chronos: { ...state.chronos, chronos: [...newChronosArray] }
        })    
    }
    
    if(action.payload.object === 'timeouts'){ 
        const newTimeoutsArray =  state.timeouts.timeouts.map(timeout=>{
            if(timeout.id === action.payload.id) timeout.isRunning = action.payload.isRunning;
            return timeout;
        });
        return ({
            ...state,
            timeouts: { ...state.timeouts, timeouts: [...newTimeoutsArray] }
        })    
        
    }
}


