import React, { SyntheticEvent } from "react";
import { Subscription } from "rxjs/Subscription";
import { LayerTypes, SimpleLayerEvent } from "../interfaces/layer";
import layerSubject from "../layerSubject";
import FancyButton from "./FancyButton";
import { StatLayer, StatLayerHeadline } from "./SurvivorStatElements";

interface ILayerState {
    data?: SimpleLayerEvent;
    subscription: Subscription;
}

export default class Layer extends React.Component<{}, ILayerState> {
    public constructor(props: any) {
        super(props);
        const subscription = layerSubject.subscribe((data) => {
            this.setState({ data });
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
                case LayerTypes.simple: {
                    const { headline, content } = data.payload;
                    return (
                        <StatLayer>
                            {headline && <StatLayerHeadline>{headline}</StatLayerHeadline>}
                            <div>{content}</div>
                            <FancyButton onClick={this.hideLayer}>Close</FancyButton>
                        </StatLayer>
                    );
                }
                default: return "";
            }
        } else {
            return "";
        }
    }

    private hideLayer(e: SyntheticEvent<HTMLElement>) {
        this.setState({
            data: undefined,
        });
    }

}
