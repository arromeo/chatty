import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Components
import { UserCounter } from './UserCounter'

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 0 1 auto;
  background: #0b2545;
  padding: 1rem;
`

const NavBarText = styled.span`
  color: #8da9c4;
  font-weight: 700;
  font-size: 1.5em;
`

export function InfoBar({ userCount }) {
  return (
    <NavBar>
      <NavBarText>Chatty</NavBarText>
      <UserCounter userCount={userCount} />
    </NavBar>
  )
}

InfoBar.propTypes = {
  userCount: PropTypes.number
}
