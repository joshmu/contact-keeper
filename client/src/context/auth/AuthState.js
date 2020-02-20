import React, { useReducer } from 'react'
import axios from 'axios'

import AuthContext from './authContext'
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

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  }
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Load User

  // Register User
  const register = async formData => {
    console.log('Registering...')
    try {
      const res = await axios({
        method: 'post',
        url: '/api/users',
        data: formData
      })
      dispatch({ type: REGISTER_SUCCESS, payload: res.data })
    } catch (e) {
      dispatch({ type: REGISTER_FAIL, payload: e.response.data })
    }
  }

  // Login User

  // Logout

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS })

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
        register,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState
