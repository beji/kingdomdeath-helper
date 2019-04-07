import { KeyboardEvent } from 'react'
import React from 'react'
import { Fragment } from 'react'
import styled from 'styled-components'
import { FancyButton } from './StyledComponents'

const StyledInput = styled.input`
  font-size: 1rem;
  line-height: 1.5rem;
  padding: 0;
  vertical-align: middle;
  padding-right: 1.5rem;
`

const FancyButtonRight = styled(FancyButton)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`

const EditableTarget = styled.span`
  cursor: pointer;
`

interface INameEditProps {
  name: string
  updateFunc: (name: string) => void
}

interface INameEditState {
  editName: boolean
}

export default class NameEdit extends React.Component<INameEditProps, INameEditState> {
  private textfield?: HTMLInputElement

  public constructor(props: INameEditProps) {
    super(props)
    this.state = {
      editName: false,
    }
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleNameBlur = this.handleNameBlur.bind(this)
    this.handleNameClick = this.handleNameClick.bind(this)
    this.setupTextRef = this.setupTextRef.bind(this)
  }
  public render() {
    const { editName } = this.state
    const { name } = this.props
    if (editName) {
      return (
        <Fragment>
          <StyledInput type="text" ref={this.setupTextRef} defaultValue={name} onKeyPress={this.handleKeyPress} autoFocus={true} />
          <FancyButtonRight onClick={this.handleNameBlur}>✓</FancyButtonRight>
        </Fragment>
      )
    } else {
      return <EditableTarget onClick={this.handleNameClick}>{name} &#9998;</EditableTarget>
    }
  }

  private setupTextRef(elem: HTMLInputElement) {
    this.textfield = elem
  }

  private handleNameClick() {
    this.setState({
      editName: true,
    })
  }
  private handleNameBlur() {
    if (this.textfield && this.textfield.value) {
      const newName = this.textfield.value
      this.props.updateFunc(newName)
      this.setState({
        editName: false,
      })
    }
  }
  private handleKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      this.handleNameBlur()
    }
  }
}
