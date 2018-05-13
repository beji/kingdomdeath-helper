import React from "react";
import { Component, createRef, RefObject, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { importSettlement } from "../actions/importAction";
import { ISettlement } from "../interfaces";
import { ImportAction } from "../interfaces/actions";
import { clone } from "../util";
import { FancyButton } from "./StyledComponents";

interface IExportFormProps extends ISettlement {
    importSettlement: (settlement: ISettlement) => ImportAction;
}

interface IExportFormState {
    content: string;
}

const mapStateToProps = (state: ISettlement): IExportFormProps => {
    return clone(state) as IExportFormProps;
};

const mapDispatchToProps = (dispatch: Dispatch<ImportAction>) => ({
    importSettlement: (settlement: ISettlement) => dispatch(importSettlement(settlement)),
});

class ExportForm extends Component<IExportFormProps, IExportFormState> {

    private textfield: RefObject<any>;

    public constructor(props: IExportFormProps) {
        super(props);
        this.handleImport = this.handleImport.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleExport = this.handleExport.bind(this);
        this.textfield = createRef();
    }

    public render() {
        const context = this.context as any;
        return (
            <form>
                <textarea ref={this.textfield} defaultValue="" readOnly={false} onChange={this.handleChange} />
                <div>
                    <FancyButton onClick={this.handleImport}>Import</FancyButton>
                    <FancyButton onClick={this.handleExport}>Export</FancyButton>
                </div>
            </form>);
    }

    private handleImport(e: SyntheticEvent<HTMLButtonElement>) {
        e.preventDefault();
        const importData = JSON.parse(atob(this.textfield.current.value)) as ISettlement;
        this.props.importSettlement(importData);
    }

    private handleExport(e: SyntheticEvent<HTMLButtonElement>) {
        e.preventDefault();
        const exportData = btoa(JSON.stringify(this.props));
        this.textfield.current.value = exportData;
    }

    private handleChange(e: SyntheticEvent<HTMLTextAreaElement>) {
        e.preventDefault();
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExportForm);
