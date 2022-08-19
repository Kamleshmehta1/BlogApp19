// data layer setup

import React, { createContext, useContext, useReducer } from "react";

// this is the data layer
export const StateContext = createContext();

// BUILD A PROVIDER

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// use state values

export const UseStateValue = () => useContext(StateContext);