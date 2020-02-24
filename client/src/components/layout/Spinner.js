import React from 'react'
import spinner from './spinner.gif'

export const Spinner = () => (
  <>
    <img
      src={spinner}
      alt="Loading..."
      style={{ width: '120px', display: 'block', margin: 'auto' }}
    />
  </>
)

export default Spinner
