import { IState, UUID } from 'interfaces'
import React, { ReactNode } from 'react'
import { connect } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'
import { colors } from '../theme'

interface ILinkStateProps {
  settlementId?: UUID
}

interface ILinkOwnProps {
  to: string
  className?: string
  children?: ReactNode
}

const mapStateToProps = (state: IState): ILinkStateProps => ({
  settlementId: state.settlement.id,
})

const StyledRouterLink = styled(RouterLink)`
  &,
  &:visited,
  &:active,
  &:hover {
    color: ${colors.text};
  }
`

const Link: React.FunctionComponent<ILinkStateProps & ILinkOwnProps> = ({ children, settlementId, className, to }) => (
  <StyledRouterLink className={className} to={`${to}?id=${settlementId}`}>
    {children}
  </StyledRouterLink>
)

export default connect(mapStateToProps)(Link)
