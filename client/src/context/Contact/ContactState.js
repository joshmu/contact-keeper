import React, { useReducer } from 'react'
import uuid from 'uuid'
import contactContext from './conactContext'
import contactReducer from './contactReducer'
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../Types'

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Jill Johnson',
        email: 'jill@gmail.com',
        phone: '111-111-111',
        type: 'personal'
      },
      {
        id: 2,
        name: 'Sara Watson',
        email: 'sara@gmail.com',
        phone: '222-222-222',
        type: 'personal'
      },
      {
        id: 3,
        name: 'Harry White',
        email: 'harry@gmail.com',
        phone: '333-333-333',
        type: 'professional'
      }
    ]
  }

  const [state, dispatch] = useReducer(contactReducer, initialState)

  // Add Contact
  const addContact = contact => {
    contact.id = uuid.v4()
    dispatch({ type: ADD_CONTACT, payload: contact })
  }

  // Delete Contact
  const deleteContact = contact => {
    const newContacts = state.contacts.filter(c => c.id !== contact.id)
    dispatch({ type: DELETE_CONTACT, payload: newContacts })
  }

  // Set Current Contact

  // Clear Current Contact

  // Update Contact

  // Filter Contacts

  // Clear Filter

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        addContact,
        deleteContact
      }}
    >
      {props.children}
    </contactContext.Provider>
  )
}

export default ContactState