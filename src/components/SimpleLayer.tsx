import React, { SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { hideLayer } from "../actions";
import { ISimpleLayer, IState, LayerType } from "../interfaces";
import { HideLayerAction } from "../interfaces/actions";
import { clone } from "../util";
import { CloseIcon, SimpleLayerHeadline, SimpleLayerWrapper } from "./StyledComponents";

interface ISimpleLayerStateProps {
    layer?: ISimpleLayer;
}

interface ISimpleLayerDispatchProps {
    hideLayer: () => HideLayerAction;
}

interface ISimpleLayerProps extends ISimpleLayerStateProps, ISimpleLayerDispatchProps { }

const mapStateToProps = (state: IState): ISimpleLayerStateProps => {
    if (state.interface.layer && state.interface.layer.type === LayerType.simple) {
        return {
            layer: clone(state.interface.layer),
        };
    }
    return {
        layer: undefined,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<HideLayerAction>): ISimpleLayerDispatchProps => ({
    hideLayer: () => dispatch(hideLayer()),
});

class SimpleLayer extends React.Component<ISimpleLayerProps> {
    public constructor(props: ISimpleLayerProps) {
        super(props);
        this.hideLayer = this.hideLayer.bind(this);
    }
    public render() {
        if (this.props.layer) {
            const { headline, content } = this.props.layer;
            return (
                <SimpleLayerWrapper>
                    <CloseIcon onClick={this.hideLayer}>X</CloseIcon>
                    {headline && <SimpleLayerHeadline>{headline}</SimpleLayerHeadline>}
                    {content}
                </SimpleLayerWrapper>
            );
        } else {
            return "";
        }
    }

    private hideLayer(e?: SyntheticEvent<HTMLElement>) {
        this.props.hideLayer();
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleLayer);
