import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../Header'
import Navigation from '../Navigation'

const index = () => {
  return (
    <>
     <Navigation />
     <Header />
     <BodyWrapper>
       <Outlet />
     </BodyWrapper>
    </>
  )
}

export default index

const BodyWrapper = styled.div`
  padding-left: 157px;
  padding-top: 129px;
`