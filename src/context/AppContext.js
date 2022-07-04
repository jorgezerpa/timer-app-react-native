import React, { useState, useReducer, createContext } from "react";
import INITIAL_STATE from "../store/INITIAL_STATE";
import * as actions from "../store/ACTIONS";
import { appReducer } from "../store/REDUCER";

export const AppContext = createContext({
    state: [],
});


export function AppContextProvider(props) {
    const { children } = props;
    const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);

    const valueContext = {state, dispatch, actions };

  return (
    <AppContext.Provider value={ valueContext }>{children}</AppContext.Provider>
  );
}