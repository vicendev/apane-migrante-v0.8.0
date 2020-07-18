import { ITramite } from '../interfaces/itramite';
import * as _ from 'lodash';

export class Tramite implements ITramite {

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

    get descripcion(): string {
        return _.get(this, 'data.descripcion');
    }

    get fechaCreacion(): string {
        return _.get(this, 'data.fechaCreacion');
    }

    get fechaActualizacion(): string {
        return _.get(this, 'data.fechaActualizacion');
    }
}
