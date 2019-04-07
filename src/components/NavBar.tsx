import React from 'react'
import styled from 'styled-components'
import { darken } from '../util'
import Link from './Link'
import { colorMagentaLachs } from './StyledComponents'

const NavbarWrapper = styled.nav`
  background-color: ${colorMagentaLachs};
  color: #fff;
  box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2), 0 0 0 rgba(16, 22, 26, 0), 0 1px 1px rgba(16, 22, 26, 0.4);
  padding: 0.1rem 0.5vw;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-flow: wrap;
`
const Head = styled.div`
  flex: 1;
  width: 50%;
`
const LinkBox = styled.div`
  display: none;
  .nav-trigger:checked ~ & {
    display: block;
    width: 100%;
  }
  @media only screen and (min-device-width: 667px) {
    flex: 1;
    display: flex;
    text-align: right;
    justify-content: flex-end;
  }
`
const NavTrigger = styled.input`
  display: none;
`
const NavTriggerLabel = styled.label`
  height: 1rem;
  color: #fff;
  display: block;
  flex: 1;
  break-after: always;
  width: 50%;
  text-align: right;
  @media only screen and (min-device-width: 667px) {
    display: none;
  }
`

const StyledLink = styled(Link)`
  display: block;
  color: #fff;
  text-decoration: none;
  text-align: center;
  padding: 0.5rem 0.5vw;
  border-radius: 3px;
  &:hover {
    background-color: ${darken(colorMagentaLachs, 0.2)};
  }
  @media only screen and (min-device-width: 667px) {
    display: inline-block;
  }
`

const Navbar: React.SFC = () => (
  <NavbarWrapper>
    <Head>Kingdom: Death - Helper </Head>
    <NavTrigger type="checkbox" className="nav-trigger" id="nav-trigger" />
    <NavTriggerLabel htmlFor="nav-trigger">☰</NavTriggerLabel>
    <LinkBox className="nav-content">
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/view/gear">Gear</StyledLink>
      <StyledLink to="/view/disorders">Disorders</StyledLink>
      <StyledLink to="/view/arts">Fighting arts</StyledLink>
      <StyledLink to="/innovations">Innovations</StyledLink>
    </LinkBox>
  </NavbarWrapper>
)

export default Navbar
