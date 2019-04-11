import React from 'react'
import { Fragment } from 'react'
import styled from 'styled-components'
import { colors } from '../theme'
import { FancyButton } from './StyledComponents'

const StyledInput = styled.input`
  border-radius: 0;
  font-size: 1rem;
  line-height: 1.5rem;
  padding: 0;
  text-align: center;
  vertical-align: middle;
  width: 2.5rem;
  background-color: ${colors.cardBorder};
  border: 1px solid ${colors.cardBorder};
`

const FancyButtonLeft = styled(FancyButton)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  width: 1.5rem;
`

const FancyButtonRight = styled(FancyButton)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  width: 1.5rem;
`
const HiddenInput = styled.input`
  display: none;
`

interface INumberEditProps {
  addToDisplay?: number
  innerRef: (ref: HTMLInputElement) => void
  changeFunc?: () => void
  value: number
}

const NumberEdit: React.FunctionComponent<INumberEditProps> = ({ addToDisplay, innerRef, changeFunc, value }) => {
  let textfield: HTMLInputElement | null = null
  let displayfield: HTMLInputElement | null = null

  const handleValueChange = (increment: number) => {
    if (textfield && textfield.value && displayfield) {
      const oldValue = parseInt(textfield.value, 10)
      textfield.value = (oldValue + increment).toString()
      displayfield.value = ((addToDisplay || 0) + oldValue + increment).toString()
    }
    if (changeFunc) {
      changeFunc()
    }
  }

  const setupInputRef = (elem: HTMLInputElement) => {
    textfield = elem
    innerRef(elem)
  }

  const setupDisplayRef = (elem: HTMLInputElement) => {
    displayfield = elem
  }

  return (
    <Fragment>
      <FancyButtonLeft onClick={() => handleValueChange(-1)}>-</FancyButtonLeft>
      <StyledInput type="text" ref={setupDisplayRef} value={(value + (addToDisplay || 0)).toString()} readOnly={true} />
      <FancyButtonRight onClick={() => handleValueChange(1)}>+</FancyButtonRight>
      <HiddenInput type="text" ref={setupInputRef} value={value.toString()} readOnly={true} />
    </Fragment>
  )
}

export default NumberEdit
