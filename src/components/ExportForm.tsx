import React, { createRef, SyntheticEvent } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { importSettlement } from '../actions/importAction'
import { ISettlement, IState } from '../interfaces'
import { ImportAction } from '../interfaces/actions'
import { clone } from '../util'
import { FancyButton } from './StyledComponents'

interface IExportFormProps extends ISettlement {
  importSettlement: (settlement: ISettlement) => ImportAction
}

interface IExportFormState {
  content: string
}

const mapStateToProps = (state: IState): IExportFormProps => {
  return clone(state.settlement) as IExportFormProps
}

const mapDispatchToProps = (dispatch: Dispatch<ImportAction>) => ({
  importSettlement: (settlement: ISettlement) => dispatch(importSettlement(settlement)),
})

const ExportForm: React.FunctionComponent<IExportFormProps> = props => {
  const textfield = createRef<HTMLTextAreaElement>()

  const handleImport = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (textfield.current) {
      const importData = JSON.parse(atob(textfield.current.value)) as ISettlement
      props.importSettlement(importData)
    }
  }

  const handleExport = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const exportData = btoa(JSON.stringify(props))
    if (textfield.current) {
      textfield.current.value = exportData
    }
  }

  const handleChange = (e: SyntheticEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
  }

  return (
    <form>
      <textarea ref={textfield} defaultValue="" readOnly={false} onChange={handleChange} />
      <div>
        <FancyButton onClick={handleImport}>Import</FancyButton>
        <FancyButton onClick={handleExport}>Export</FancyButton>
      </div>
    </form>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExportForm)
