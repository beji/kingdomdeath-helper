import styled from 'styled-components'
import { colors, serifFont, textFont } from '../theme'
import { darken } from '../util'

const colorMagentaLachs = '#A12D6A'

export { colorMagentaLachs }

export const Card = styled.div`
  color: ${({ theme }) => theme.card.text};
  border: 1px solid ${({ theme }) => theme.card.border.base};
  border-radius: 0.5rem;
  padding: 1vh 1vw;
  background-color: ${({ theme }) => theme.card.background};
  box-shadow: 0px 0px 7px 1px rgba(0, 0, 0, 0.75);
  &:hover {
    border-color: ${colorMagentaLachs};
  }
`

export const CloseIcon = styled.div`
  background: #212121;
  color: #aaa;
  border: 1px solid ${({ theme }) => theme.card.border.hint};
  border-radius: 50%;
  cursor: pointer;
  ${textFont}
  font-size:1rem;
  height: 2rem;
  line-height: 2rem;
  position: absolute;
  right: -1rem;
  text-align: center;
  top: -1rem;
  width: 2rem;
  &:hover {
    background: ${colorMagentaLachs};
  }
`

export const SimpleLayerWrapper = styled(Card)`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  left: 50%;
  padding: 0.5rem;
  position: fixed;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 30vw;
  z-index: 10;
  @media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
    width: 90%;
  }
`

export const SimpleLayerHeadline = styled.div`
  font-weight: bold;
  ${serifFont}
  padding:.5rem;
  text-align: center;
  width: 100%;
`

export const FancyButton = styled.button`
  background-color: ${colorMagentaLachs};
  color: #fff;
  border: 1px solid ${darken(colorMagentaLachs, 0.1)};
  border-radius: 4px;
  cursor: pointer;
  appearance: button;
  display: inline-block;
  font-size: 1rem;
  line-height: 1.5rem;
  vertical-align: middle;
  white-space: nowrap;
  &:hover {
    background-color: ${darken(colorMagentaLachs, 0.2)};
  }
`

export const FilterInput = styled.input`
  font-size: 1rem;
  padding: 0.25rem;
  width: 80%;
  background-color: ${({ theme }) => theme.card.border.base};
  border: 1px solid ${colors.cardBorder};
  &::placeholder {
    color: ${({ theme }) => theme.card.border.hint};
  }
`

export const ListWrapper = styled(Card)`
  left: 50%;
  line-height: 1rem;
  padding: 0.5rem;
  position: fixed;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 30vw;
  height: 50vh;
  z-index: 10;
  @media only screen and (min-device-width: 375px) and (max-device-width: 667px) {
    width: 95%;
  }
`
export const List = styled.div`
  overflow-y: auto;
  height: 70%;
  margin: 1rem 0;
`
export const ListElement = styled.div`
  border: 1px solid #aaa;
  cursor: pointer;
  margin: 0.25rem;
  padding: 0.5rem;
  &:hover {
    background: ${({ theme }) => theme.card.border.base};
    border-color: ${colorMagentaLachs};
  }
`

export const SelectedListElement = styled(ListElement)`
  border: 3px solid ${colorMagentaLachs};
`

export const StyledText = styled.div`
  color: ${({ theme }) => theme.card.text};
`

export const ListItem = styled.div`
  cursor: pointer;
  margin-top: 1vh;
  margin-bottom: 1vh;
  &:before {
    content: '►';
    color: ${colorMagentaLachs};
    margin-right: 0.25rem;
  }
`
