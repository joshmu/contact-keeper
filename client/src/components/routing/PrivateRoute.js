import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, token } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !token ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    ></Route>
  )
}

export default PrivateRoute
