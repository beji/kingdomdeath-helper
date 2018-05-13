export const enum LayerEvents {
    show_simple,
    hide,
}

export default interface ILayerEvent<T, P> {
    readonly type: T;
    readonly payload?: P;
}

export type SimpleLayerEvent = ILayerEvent<LayerEvents.show_simple, { headline: JSX.Element, content: JSX.Element }>;

export type HideLayerEvent = ILayerEvent<LayerEvents.hide, undefined>;
