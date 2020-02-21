import React, { useContext, useEffect } from 'react'
import ContactForm from '../contacts/ContactForm'
import Contacts from '../contacts/Contacts'
import ContactFilter from '../contacts/ContactFilter'
import AuthContext from '../../context/auth/authContext'

const Home = () => {
  const { token, isAuthenticated, loadUser } = useContext(AuthContext)
  useEffect(() => {
    if (isAuthenticated) {
      console.log('loading user for home')
      loadUser()
    }
    // eslint-disable-next-line
  }, [isAuthenticated])

  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  )
}

export default Home
