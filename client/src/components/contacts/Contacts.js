import React, { useContext, Fragment } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import ContactContext from '../../context/Contact/contactContext'

import ContactItem from './ContactItem'

const Contacts = () => {
  const contactContext = useContext(ContactContext)

  const { contacts, filtered } = contactContext

  if (contacts.length === 0) {
    return <h5>Please add a contact.</h5>
  }

  return (
    <Fragment>
      <TransitionGroup>
        {filtered !== null
          ? filtered.map(contact => (
              <CSSTransition key={contact.id} timeout={1000} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))
          : contacts.map(contact => (
              <CSSTransition key={contact.id} timeout={1000} classNames="item">
                <ContactItem contact={contact} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  )
}

export default Contacts
