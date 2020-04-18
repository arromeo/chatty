import React from 'react'

function UserCounter(props) {
  return (
    <span className="user-counter">
      <p>Online Users: {props.userCount}</p>
    </span>
  )
}

export default UserCounter
