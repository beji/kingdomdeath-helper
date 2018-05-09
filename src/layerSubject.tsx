import { HideLayerEvent, SimpleLayerEvent } from "interfaces/layer";
import { Subject } from "rxjs/Subject";

export type LayerSubjectMessage = SimpleLayerEvent | HideLayerEvent;

const layerSubject = new Subject<LayerSubjectMessage>();

export default layerSubject;
