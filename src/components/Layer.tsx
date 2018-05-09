import React, { SyntheticEvent } from "react";
import { Subscription } from "rxjs/Subscription";
import styled from "styled-components";
import { LayerEvents, SimpleLayerEvent } from "../interfaces/layer";
import layerSubject, { LayerSubjectMessage } from "../layerSubject";
import { CloseIcon, colorMagentaLachs, SimpleLayer, SimpleLayerHeadline } from "./StyledComponents";

interface ILayerState {
    data?: LayerSubjectMessage;
    subscription: Subscription;
}

export default class Layer extends React.Component<{}, ILayerState> {
    public constructor(props: any) {
        super(props);
        const subscription = layerSubject.subscribe((data) => {
            if (data.type === LayerEvents.hide) {
                this.hideLayer();
            } else {
                this.setState({ data });
            }
        });
        this.hideLayer = this.hideLayer.bind(this);
        this.state = {
            data: undefined,
            subscription,
        };
    }

    public componentWillUnmount() {
        this.state.subscription.unsubscribe();
    }
    public render() {
        const { data } = this.state;
        if (data && data.payload) {
            switch (data.type) {
                case LayerEvents.show_simple: {
                    const { headline, content } = data.payload;
                    return (
                        <SimpleLayer>
                            <CloseIcon onClick={this.hideLayer}>X</CloseIcon>
                            {headline && <SimpleLayerHeadline>{headline}</SimpleLayerHeadline>}
                            {content}
                        </SimpleLayer>
                    );
                }
                default: return "";
            }
        } else {
            return "";
        }
    }

    private hideLayer(e?: SyntheticEvent<HTMLElement>) {
        this.setState({
            data: undefined,
        });
    }

}
