import { IState } from 'interfaces'
import { HideLayerAction } from 'interfaces/actions'
import React, { SyntheticEvent } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { Dispatch } from 'redux'
import styled, { ThemeProvider } from 'styled-components'
import { hideLayer } from '../actions'
import Home from '../pages'
import InnovationsPage from '../pages/innovations'
import SurvivorCardPage from '../pages/suvivorcard'
import ViewPage from '../pages/view'
import ExportForm from './ExportForm'
import BaseStatLayer from './layers/BaseStatLayer'
import DefenseStatLayer from './layers/DefenseStatLayer'
import DisordersList from './layers/DisordersList'
import FightingArtsList from './layers/FightingArtsList'
import GearList from './layers/GearList'
import SimpleLayer from './layers/SimpleLayer'
import SpecialStatLayer from './layers/SpecialStatLayer'
import NavBar from './NavBar'
import SocketConnector from './SocketConnector'

import theme from '../theme'

const AppWrapper = styled.div`
  margin: 2.5rem 1vw 1vh;
`

interface IAppStateProps {
  readonly layerActive?: boolean
}

interface IAppDispatchProps {
  hideLayer: () => HideLayerAction
}

interface IAppProps extends IAppStateProps, IAppDispatchProps {}

const BlurWrapper = styled.div<IAppStateProps>`
  ${({ layerActive }) => layerActive && 'filter: blur(5px) brightness(50%)'}
`

const mapStateToProps = (state: IState): IAppStateProps => ({
  layerActive: typeof state.interface.layer !== 'undefined',
})

const mapDispatchToProps = (dispatch: Dispatch<HideLayerAction>): IAppDispatchProps => ({
  hideLayer: () => dispatch(hideLayer()),
})

class App extends React.Component<IAppProps> {
  public constructor(props: IAppProps) {
    super(props)
    this.hideLayer = this.hideLayer.bind(this)
  }

  public render() {
    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <>
            <AppWrapper>
              <BlurWrapper layerActive={this.props.layerActive} onClick={this.hideLayer}>
                <Route exact={true} path="/" component={Home} />
                <Route path="/card/:cardnumber" component={SurvivorCardPage} />
                <Route path="/view/:type" component={ViewPage} />
                <Route path="/innovations" component={InnovationsPage} />
                <ExportForm />
                <SocketConnector />
              </BlurWrapper>
              <SimpleLayer />
              <BaseStatLayer />
              <DefenseStatLayer />
              <SpecialStatLayer />
              <DisordersList />
              <FightingArtsList />
              <GearList />
            </AppWrapper>
            <NavBar />
          </>
        </ThemeProvider>
      </BrowserRouter>
    )
  }

  private hideLayer(e: SyntheticEvent<HTMLElement>) {
    if (this.props.layerActive) {
      e.stopPropagation()
      this.props.hideLayer()
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
