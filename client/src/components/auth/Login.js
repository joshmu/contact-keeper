import React, { useState, useContext, useEffect } from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Login = props => {
  const { setAlert } = useContext(AlertContext)
  const {
    login,
    error,
    clearErrors,
    isAuthenticated,
    token,
    loadUser
  } = useContext(AuthContext)
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const { email, password } = user

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/')
    }
    if (!isAuthenticated && token) {
      loadUser()
    }
    if (error) {
      setAlert(error, 'danger')
      clearErrors()
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, token, props.history])

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })
  const onSubmit = e => {
    e.preventDefault()
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger')
    } else {
      login({ email, password })
      console.log('LOGIN SUBMIT')
    }
  }

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  )
}

export default Login
