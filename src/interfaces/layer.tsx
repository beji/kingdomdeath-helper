export enum LayerTypes {
    simple,
}

export interface ILayerEvent {
    type: LayerTypes;
    payload: {
        headline: JSX.Element | string;
        content: JSX.Element | string;
    };
}
