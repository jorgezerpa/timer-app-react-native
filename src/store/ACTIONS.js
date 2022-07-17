import { ADD_CHRONO, REMOVE_CHRONO, ADD_TIMEOUT, REMOVE_TIMEOUT, SET_BLUR_TIMESTAMP, SET_IS_RUNNING } from "./ACTION_TYPES.js";

export const addChrono = (chrono) => ({ type: ADD_CHRONO, payload: chrono  })
export const removeChrono = (chronoId) => ({ type: REMOVE_CHRONO, payload: chronoId  })
export const addTimeout = (timeout) => ({ type: ADD_TIMEOUT, payload: timeout  })
export const removeTimeout = (timeoutId) => ({ type: REMOVE_TIMEOUT, payload: timeoutId  })
export const setBlurTimestamp = (object) => ({ type: SET_BLUR_TIMESTAMP, payload: object  }) //object -> text indicate what should change (timeouts or chronos)
export const setIsRunning = ({ object, isRunning, id }) => ({ type: SET_IS_RUNNING, payload: { object, isRunning, id }}) //object -> text indicate what should change (timeouts or chronos)


