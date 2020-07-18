import { ITramiteCore } from '../interfaces/itramitecore';
import * as _ from 'lodash';

export class TramiteCore implements ITramiteCore{

    constructor( data ) {
        _.set(this, 'data', data);
    }

    get id(): string {
        return _.get(this, 'data.id');
    }

    get key(): string {
        return _.get(this, 'data.key');
    }

    get titulo(): string {
        return _.get(this, 'data.titulo');
    }

    get numFases(): number {
        return _.get(this, 'data.numFases');
    }

    get fechaCreacion(): string {
        return _.get(this, 'data.fechaCreacion');
    }

    get fechaActualizacion(): string {
        return _.get(this, 'data.fechaActualizacion');
    }

}
