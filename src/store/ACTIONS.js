import { ADD_CHRONO, REMOVE_CHRONO, ADD_TIMEOUT, REMOVE_TIMEOUT } from "./ACTION_TYPES.js";

export const addChrono = (chrono) => ({ type: ADD_CHRONO, payload: chrono  })
export const removeChrono = (chronoId) => ({ type: REMOVE_CHRONO, payload: chronoId  })
export const addTimeout = (timeout) => ({ type: ADD_TIMEOUT, payload: timeout  })
export const removeTimeout = (timeoutId) => ({ type: REMOVE_TIMEOUT, payload: timeoutId  })