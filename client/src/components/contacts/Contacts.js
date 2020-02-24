import React, { useContext, useEffect } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import ContactContext from '../../context/Contact/contactContext'

import Spinner from '../layout/Spinner'
import ContactItem from './ContactItem'

const Contacts = () => {
  const { contacts, filtered, getContacts, loading } = useContext(
    ContactContext
  )

  useEffect(() => {
    getContacts()
    // eslint-disable-next-line
  }, [])

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h5>Please add a contact.</h5>
  }

  return (
    <>
      {contacts === null ? (
        <Spinner />
      ) : (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(contact => (
                <CSSTransition
                  key={contact._id}
                  timeout={1000}
                  classNames="item"
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))
            : contacts.map(contact => (
                <CSSTransition
                  key={contact._id}
                  timeout={1000}
                  classNames="item"
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      )}
    </>
  )
}

export default Contacts
