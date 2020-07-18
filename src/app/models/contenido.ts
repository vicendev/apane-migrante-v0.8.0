import { IContenido } from '../interfaces/icontenido';
import * as _ from 'lodash';

export class Contenido implements IContenido{

    constructor( data ) {
        _.set(this, 'data', data);
    }

    get id(): string {
        return _.get(this, 'data.id');
    }

    get key(): string {
        return _.get(this, 'data.key');
    }

    get menuID(): string {
        return _.get(this, 'data.menuID');
    }

    get titulo(): string {
        return _.get(this, 'data.titulo');
    }

    set titulo(value: string) {
        _.set(this, 'data.titulo', value);
    }

    get fechaCreacion(): string {
        return _.get(this, 'data.fechaCreacion');
    }

    get fechaActualizacion(): string {
        return _.get(this, 'data.fechaActualizacion');
    }
}
