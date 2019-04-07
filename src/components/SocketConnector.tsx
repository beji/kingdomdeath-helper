import { RemoteableActions } from 'interfaces/reducer'
import QRCode from 'qrcode.react'
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import styled from 'styled-components'
import { importSettlement, remoteAction } from '../actions/importAction'
import socket from '../clientsocket'
import { ISettlement, IState } from '../interfaces'
import { ImportAction, RemoteAction } from '../interfaces/actions'
import { IRoomMessage, SocketMessages } from '../interfaces/socketMessages'
import { clone, getURLParam } from '../util'

// const roomId = getURLParam("id");

const QRWrapper = styled.div`
  margin: 2.5rem 1vw 1vh;
`

interface ISocketConnectorStateProps {
  settlement?: ISettlement
}
interface ISocketConnectorDispatchProps {
  importSettlement: (imported: ISettlement) => ImportAction
  remoteAction: (action: RemoteableActions) => RemoteAction
}

interface ISocketConnectorProps extends ISocketConnectorStateProps, ISocketConnectorDispatchProps {}

const mapStateToProps = (state: IState): ISocketConnectorStateProps => {
  return {
    settlement: clone(state.settlement),
  }
}
const mapDispatchToProps = (dispatch: Dispatch<ImportAction | RemoteAction>): ISocketConnectorDispatchProps => ({
  importSettlement: (imported: ISettlement) => dispatch(importSettlement(imported)),
  remoteAction: (action: RemoteableActions) => dispatch(remoteAction(action)),
})

class SocketConnector extends React.Component<ISocketConnectorProps> {
  public constructor(props: ISocketConnectorProps) {
    super(props)
  }

  public componentDidMount() {
    socket.on(SocketMessages.STATE_UPDATE, (data: RemoteableActions) => {
      console.log('STATE UPDATE!!!', data)
      console.log('new state', data)
      this.props.remoteAction(data)
    })

    socket.on(SocketMessages.FULL_SYNC, (data: ISettlement) => {
      console.log('Full Sync incoming!')
      this.props.importSettlement(data)
    })

    const roomId = getURLParam('id')

    if (roomId !== '') {
      const message: IRoomMessage = { room: roomId }
      socket.emit(SocketMessages.JOIN, message)
      console.log('roomId', roomId)
    } else if (this.props.settlement) {
      window.history.pushState({}, 'Kingdom Death', `/?id=${this.props.settlement.id}`)
      const message: IRoomMessage = { room: this.props.settlement.id }
      socket.emit(SocketMessages.JOIN, message)
      console.log('roomId', this.props.settlement.id)
    }
  }

  public render() {
    return (
      <QRWrapper>
        {' '}
        {this.props.settlement && window && <QRCode size={256} value={`${window.location.protocol}//${window.location.hostname}/?id=${this.props.settlement.id}`} />}
      </QRWrapper>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SocketConnector)
