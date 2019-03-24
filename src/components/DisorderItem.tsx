import React, { SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import { showLayer } from "../actions";
import { IDisorder, ISimpleLayer, LayerType } from "../interfaces";
import { ShowLayerAction } from "../interfaces/actions";
import { colorMagentaLachs } from "./StyledComponents";

interface IDisorderItemOwnProps {
    disorder: IDisorder;
}

interface IDisorderItemDispatchProps {
    showLayer: (layer: ISimpleLayer) => ShowLayerAction;
}

interface IDisorderItemProps extends IDisorderItemOwnProps, IDisorderItemDispatchProps { }

const DisorderItemWrapper = styled.div`
    cursor: pointer;
    margin-top: 1vh;
    margin-bottom: 1vh;
    &:before{
        content: "►";
        color: ${colorMagentaLachs};
        margin-right: 0.25rem;
    }
`;

const mapDispatchToProps = (dispatch: Dispatch<ShowLayerAction>): IDisorderItemDispatchProps => ({
    showLayer: (layer: ISimpleLayer) => dispatch(showLayer(layer)),
});

class DisorderItem extends React.Component<IDisorderItemProps> {
    public constructor(props: IDisorderItemProps) {
        super(props);

        this.showDescription = this.showDescription.bind(this);
    }

    public render() {
        const { disorder } = this.props;
        return (
            <React.Fragment>
                <DisorderItemWrapper onClick={this.showDescription}>{disorder.name}</DisorderItemWrapper>
            </React.Fragment>
        );
    }
    private showDescription(e: SyntheticEvent<HTMLElement>) {
        const { disorder } = this.props;
        this.props.showLayer({
            content: disorder.description,
            headline: disorder.name,
            type: LayerType.simple,
        });
    }
}

export default connect(null, mapDispatchToProps)(DisorderItem);
