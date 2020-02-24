import React, { useReducer } from 'react'
import axios from 'axios'

import AuthContext from './authContext'
import authReducer from './authReducer'

import setAuthToken from '../../utils/setAuthToken'

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
  const loadUser = async () => {
    console.log('Loading User...')
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }

    try {
      const res = await axios({
        method: 'get',
        url: '/api/auth'
      })

      if (res.data === null) {
        return dispatch({
          type: AUTH_ERROR,
          payload: 'empty user object received'
        })
      }

      dispatch({ type: USER_LOADED, payload: res.data })
    } catch (err) {
      console.error(err)
      dispatch({ type: AUTH_ERROR, payload: err.response.data })
    }
  }

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
      loadUser()
    } catch (err) {
      console.error(err)
      dispatch({ type: REGISTER_FAIL, payload: err.response.data })
    }
  }

  // Login User
  const login = async formData => {
    console.log('Logging in...')
    try {
      const res = await axios({
        method: 'post',
        url: '/api/auth',
        data: formData
      })
      dispatch({ type: LOGIN_SUCCESS, payload: res.data })
      loadUser()
    } catch (err) {
      dispatch({ type: LOGIN_FAIL, payload: err.response.data })
    }
  }

  // Logout
  const logout = () => dispatch({ type: LOGOUT })

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
        login,
        logout,
        loadUser,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState
