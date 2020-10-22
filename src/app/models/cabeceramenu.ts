import { ICabeceraMenu } from '../interfaces/icabeceramenu';
import * as _ from 'lodash';

export class CabeceraMenu implements ICabeceraMenu{

    constructor( data ) {
        _.set(this, 'data', data);
    }

    get id(): string {
        return _.get(this, 'data.id');
    }

    get titulo(): string {
        return _.get(this, 'data.titulo');
    }

    set titulo(value: string) {
        _.set(this, 'data.titulo', value);
    }

    get menuID(): string {
        return _.get(this, 'data.menuID');
    }

    get imgPath(): string {
        return _.get(this, 'data.imgPath');
    }

    get fechaCreacion(): string {
        return _.get(this, 'data.fechaCreacion');
    }

    get fechaActualizacion(): string {
        return _.get(this, 'data.fechaActualizacion');
    }
}
