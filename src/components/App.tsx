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
import theme from '../theme'
import ExportForm from './ExportForm'
import BaseStatLayer from './layers/BaseStatLayer'
import DefenseStatLayer from './layers/DefenseStatLayer'
import DisordersList from './layers/DisordersList'
import FightingArtsList from './layers/FightingArtsList'
import GearList from './layers/GearList'
import SimpleLayer from './layers/SimpleLayer'
import SpecialStatLayer from './layers/SpecialStatLayer'
import WeaponProficiencyList from './layers/WeaponProficiencyList'
import NavBar from './NavBar'
import SocketConnector from './SocketConnector'

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

const App: React.FunctionComponent<IAppProps> = ({ hideLayer, layerActive }) => {
  const hideLayerIfActive = (e: SyntheticEvent<HTMLElement>) => {
    if (layerActive) {
      e.stopPropagation()
      hideLayer()
    }
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <>
          <AppWrapper>
            <BlurWrapper layerActive={layerActive} onClick={hideLayerIfActive}>
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
            <WeaponProficiencyList />
            <GearList />
          </AppWrapper>
          <NavBar />
        </>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
