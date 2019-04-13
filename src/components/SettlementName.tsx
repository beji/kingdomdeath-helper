import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import styled from 'styled-components'
import { setName, updateSurvivalLimit, setLanternYear } from '../actions/settlementActions'
import { IState } from '../interfaces'
import { SetNameAction, UpdateSurvivalLimitAction, SetLanternYearAction } from '../interfaces/actions'
import { colors, serifFont } from '../theme'
import NameEdit from './NameEdit'
import NumberEdit from './NumberEdit'

interface ISettlementNameDispatchProps {
  setName: (name: string) => SetNameAction
  updateSurvivalLimit: (survivalLimit: number) => UpdateSurvivalLimitAction
  setLanternYear: (year: number) => SetLanternYearAction
}

interface ISettlementNameStateProps {
  name?: string
  survivalLimit: number
  year: number
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
const InlineItem = styled.div`
  display: inline-block;
  margin-right: 1rem;
`

interface ISettlementNameProps extends ISettlementNameDispatchProps, ISettlementNameStateProps {}

const mapStateToProps = (state: IState): ISettlementNameStateProps => {
  return {
    name: state.settlement.name,
    survivalLimit: state.settlement.survivalLimit,
    year: state.settlement.year,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<SetNameAction | UpdateSurvivalLimitAction | SetLanternYearAction>): ISettlementNameDispatchProps => ({
  setName: (name: string) => dispatch(setName(name)),
  updateSurvivalLimit: (survivalLimit: number) => dispatch(updateSurvivalLimit(survivalLimit)),
  setLanternYear: (year: number) => dispatch(setLanternYear(year)),
})

const SettlementName: React.FunctionComponent<ISettlementNameProps> = ({ name, survivalLimit, year, setName, updateSurvivalLimit, setLanternYear }) => {
  let survivalLimitField: HTMLInputElement | null = null
  let yearField: HTMLInputElement | null = null
  const setupSurvivalLimitField = (elem: HTMLInputElement) => (survivalLimitField = elem)
  const setupYearField = (elem: HTMLInputElement) => (yearField = elem)

  const handleNameUpdate = (newName: string) => {
    setName(newName)
  }
  const handleSLChange = () => {
    if (survivalLimitField) {
      updateSurvivalLimit(parseInt(survivalLimitField.value, 10))
    }
  }
  const handleYearChange = () => {
    if (yearField) {
      setLanternYear(parseInt(yearField.value, 10))
    }
  }

  return (
    <Wrapper>
      <StyledName>
        <NameEdit name={name || 'The town with no name'} updateFunc={handleNameUpdate} />
      </StyledName>
      <InlineItem>
        Survival Limit: <NumberEdit innerRef={setupSurvivalLimitField} value={survivalLimit} changeFunc={handleSLChange} />
      </InlineItem>
      <InlineItem>
        Lantern year: <NumberEdit innerRef={setupYearField} value={year} changeFunc={handleYearChange} />
      </InlineItem>
    </Wrapper>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettlementName)
