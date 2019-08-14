import React, { Suspense } from 'react'
import styled from 'styled-components'
import BarLoader from 'react-spinners/BarLoader'

export function FullScreenSuspense({ children }) {
  return <Suspense fallback={<Fallback />}>{children}</Suspense>
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Fallback = () => (
  <Container>
    <BarLoader />
  </Container>
)
