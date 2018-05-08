import Layer from "../components/Layer";

export const enum LayerTypes {
    simple,
}

export default interface ILayerEvent<T, P> {
    readonly type: T;
    readonly payload?: P;
}

export type SimpleLayerEvent = ILayerEvent<LayerTypes.simple, { headline: JSX.Element, content: JSX.Element }>;
