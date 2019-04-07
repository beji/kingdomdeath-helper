import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: inline-block;
`
const StyledCheckbox = styled.div`
  border: 1px solid ${({ theme }) => theme.card.text};
  cursor: pointer;
  display: inline-block;
  margin: 0 0.25vh;
  width: 1rem;
  height: 1rem;
  &.active {
    background: ${({ theme }) => theme.page.hightlightBackground};
  }
`
const HighlightedCheckbox = styled(StyledCheckbox)`
  border-width: 3px;
`

interface ICheckboxProps {
  highlight?: boolean
  value: boolean
  onChange: () => void
}

const Checkbox: React.SFC<ICheckboxProps> = ({ highlight = false, onChange, value }) => (
  <Wrapper>
    {!highlight && <StyledCheckbox onClick={onChange} className={value ? 'active' : ''} />}
    {highlight && <HighlightedCheckbox onClick={onChange} className={value ? 'active' : ''} />}
  </Wrapper>
)

export default Checkbox
