import { ITramiteMenu } from '../interfaces/itramitemenu';
import * as _ from 'lodash';

export class TramiteMenu implements ITramiteMenu{

    constructor ( data ) {
        _.set(this, 'data', data);
    }

    get id(): string {
        return _.get(this, 'data.id')
    }

    get titulo(): string {
        return _.get(this, 'data.titulo')
    }

    get menuID(): string {
        return _.get(this, 'data.menuID')
    }

    get submenu(): boolean {
        return _.get(this, 'data.submenu')
    }

    get fechaCreacion(): string {
        return _.get(this, 'data.fechaCreacion')
    }

    get fechaActualizacion(): string {
        return _.get(this, 'data.fechaActualizacion')
    }
}
