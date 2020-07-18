import { IPerfilMenu } from '../interfaces/iperfilmenu';
import * as _ from 'lodash';

export class PerfilMenu implements IPerfilMenu{

    constructor( data ) {
        _.set(this, 'data', data);
    }

    get id(): string {
        return _.get(this, 'data.id');
    }

    get titulo(): string {
        return _.get(this, 'data.titulo');
    }

    get fechaCreacion(): string {
        return _.get(this, 'data.fechaCreacion');
    }

    get fechaActualizacion(): string {
        return _.get(this, 'data.fechaActualizacion');
    }
}
