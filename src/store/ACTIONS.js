import { ADD_CHRONO, REMOVE_CHRONO } from "./ACTION_TYPES.js";

export const addChrono = (chrono) => ({ type: ADD_CHRONO, payload: chrono  })
export const removeChrono = (chronoId) => ({ type: REMOVE_CHRONO, payload: chronoId  })