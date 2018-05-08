import React, { SyntheticEvent } from "react";
import { ILayerEvent, LayerTypes } from "../interfaces/layer";
import layerSubject from "../layerSubject";
import FancyButton from "./FancyButton";
import { StatLayer, StatLayerHeadline } from "./SurvivorStatElements";

interface ILayerState {
    data?: ILayerEvent;
}

export default class Layer extends React.Component<{}, ILayerState> {
    public constructor(props: any) {
        super(props);
        layerSubject.subscribe((data: any) => {
            const d = data as ILayerEvent;
            this.setState({ data: d });
        });
        this.hideLayer = this.hideLayer.bind(this);
        this.state = {
            data: undefined,
        };
    }
    public render() {
        const { data } = this.state;
        if (data) {
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
        e.stopPropagation();
        this.setState({
            data: undefined,
        });
    }

}
