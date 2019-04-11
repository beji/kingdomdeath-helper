import { KeyboardEvent, useState } from 'react'
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

const NameEdit: React.FunctionComponent<INameEditProps> = ({ name, updateFunc }) => {
  const [editName, setEdit] = useState(false)

  let textfield: HTMLInputElement | null = null

  const setupTextRef = (elem: HTMLInputElement) => (textfield = elem)
  const handleNameClick = () => setEdit(true)
  const handleNameBlur = () => {
    if (textfield && textfield.value) {
      const newName = textfield.value
      updateFunc(newName)
      setEdit(false)
    }
  }
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNameBlur()
    }
  }

  if (editName) {
    return (
      <Fragment>
        <StyledInput type="text" ref={setupTextRef} defaultValue={name} onKeyPress={handleKeyPress} autoFocus={true} />
        <FancyButtonRight onClick={handleNameBlur}>✓</FancyButtonRight>
      </Fragment>
    )
  } else {
    return <EditableTarget onClick={handleNameClick}>{name} &#9998;</EditableTarget>
  }
}

export default NameEdit
