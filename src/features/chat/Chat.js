import React from 'react'
import styled from 'styled-components'

// Components
import { MessageList } from '../message'
import { InfoBar } from './InfoBar'
import { Compose } from './Compose'

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 100%;
  width: 100%;
`

export function Chat() {
  return (
    <Layout>
      <InfoBar userCount={1} />
      <MessageList />
      <Compose />
    </Layout>
  )
}
