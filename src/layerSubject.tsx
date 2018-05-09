import { SimpleLayerEvent } from "interfaces/layer";
import { Subject } from "rxjs/Subject";

const layerSubject = new Subject<SimpleLayerEvent>();

export default layerSubject;
