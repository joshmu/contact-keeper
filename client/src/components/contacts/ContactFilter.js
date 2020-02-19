import React, { useContext, useRef, useEffect } from 'react'
import ContactContext from '../../context/Contact/contactContext'

const ContactFilter = () => {
  const contactContext = useContext(ContactContext)
  const { filtered, filterContacts, clearFilter } = contactContext

  const text = useRef('')

  useEffect(() => {
    if (filtered === null) {
      text.current.value = ''
    }
  })

  const onChange = e => {
    if (text.current.value !== '') {
      filterContacts(e.target.value)
    } else {
      clearFilter()
    }
  }

  return (
    <form onSubmit={e => e.preventDefault()} autoComplete="off">
      <input
        ref={text}
        type="text"
        name="search"
        placeholder="Search Contacts..."
        onChange={onChange}
      />
    </form>
  )
}

export default ContactFilter
