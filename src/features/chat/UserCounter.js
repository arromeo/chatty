import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const UserCounterDisplay = styled.span`
  color: #8da9c4;
  font-weight: 700;
  font-size: 1.5em;
`

export function UserCounter({ userCount }) {
  return <UserCounterDisplay>Online Users: {userCount}</UserCounterDisplay>
}

UserCounter.propTypes = {
  userCount: PropTypes.number
}
