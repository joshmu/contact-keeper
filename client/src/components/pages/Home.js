import React, { useContext, useEffect } from 'react'
import ContactForm from '../contacts/ContactForm'
import Contacts from '../contacts/Contacts'
import ContactFilter from '../contacts/ContactFilter'
import AuthContext from '../../context/auth/authContext'

const Home = () => {
  const { token, loadUser } = useContext(AuthContext)
  useEffect(() => {
    if (token) {
      loadUser()
    }
    // eslint-disable-next-line
  }, [token])

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
