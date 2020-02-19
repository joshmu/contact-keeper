import React, { useReducer } from 'react'

import authContext from './authContext'
import authReducer from './authReducer'

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../Types'

const AuthState = () => {
  // init
  const initialState = {}
  const [state, dispatch] = useReducer(authReducer, initialState)

  // actions

  // context
  return <authContext.Provider>{props.children}</authContext.Provider>
}

export default AuthState
