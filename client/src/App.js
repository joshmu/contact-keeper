import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

import ContactState from './context/Contact/ContactState'
import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'
import Alerts from './components/layout/Alerts'

import './App.css'

const App = () => {
  return (
    <Fragment>
      <AuthState>
        <ContactState>
          <AlertState>
            <Router>
              <Navbar />
              <div className="container">
                <Alerts />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Router>
          </AlertState>
        </ContactState>
      </AuthState>
    </Fragment>
  )
}

export default App
