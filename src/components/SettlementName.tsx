import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import styled from 'styled-components'
import { setName, updateSurvivalLimit } from '../actions/settlementActions'
import { IState } from '../interfaces'
import { SetNameAction, UpdateSurvivalLimitAction } from '../interfaces/actions'
import { colors, serifFont } from '../theme'
import NameEdit from './NameEdit'
import NumberEdit from './NumberEdit'

interface ISettlementNameDispatchProps {
  setName: (name: string) => SetNameAction
  updateSurvivalLimit: (survivalLimit: number) => UpdateSurvivalLimitAction
}

interface ISettlementNameStateProps {
  name?: string
  survivalLimit: number
}
const Wrapper = styled.section`
  margin-bottom: 0.25rem;
  color: ${colors.text};
`
const StyledName = styled.div`
  span {
    ${serifFont}
    font-weight: bold;
    font-size: 2rem;
    margin-bottom: 1.5vh;
    display: inline-block;
  }
`

interface ISettlementNameProps extends ISettlementNameDispatchProps, ISettlementNameStateProps {}

const mapStateToProps = (state: IState): ISettlementNameStateProps => {
  return {
    name: state.settlement.name,
    survivalLimit: state.settlement.survivalLimit,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<SetNameAction | UpdateSurvivalLimitAction>): ISettlementNameDispatchProps => ({
  setName: (name: string) => dispatch(setName(name)),
  updateSurvivalLimit: (survivalLimit: number) => dispatch(updateSurvivalLimit(survivalLimit)),
})

const SettlementName: React.FunctionComponent<ISettlementNameProps> = ({ name, survivalLimit, setName, updateSurvivalLimit }) => {
  let valuefield: HTMLInputElement | null = null

  const handleNameUpdate = (newName: string) => {
    setName(newName)
  }
  const handleSLChange = () => {
    if (valuefield) {
      updateSurvivalLimit(parseInt(valuefield.value, 10))
    }
  }

  const setupValueRef = (elem: HTMLInputElement) => (valuefield = elem)

  return (
    <Wrapper>
      <StyledName>
        <NameEdit name={name || 'The town with no name'} updateFunc={handleNameUpdate} />
      </StyledName>
      Survival Limit: <NumberEdit innerRef={setupValueRef} value={survivalLimit} changeFunc={handleSLChange} />
    </Wrapper>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettlementName)
