import React from 'react'

const Error = ({message}) => {
  return (
    <div>
      <p style={{ color: "red" }}>{message}</p>
    </div>
  )
}

export default Error