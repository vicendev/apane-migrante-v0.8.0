import { ITramiteProgreso } from '../interfaces/itramiteprogreso';
import * as _ from 'lodash';

export class TramiteProgreso implements ITramiteProgreso{

    constructor ( data ) {
        _.set(this, 'data', data);
    }

    get id(): string {
        return _.get(this, 'data.id')
    }

    get tramiteCoreID(): string {
        return _.get(this, 'data.tramiteCoreID')
    }

    
    get userID(): string {
        return _.get(this, 'data.userID')
    }

    
    get estado(): string {
        return _.get(this, 'data.estado')
    }

    set estado(value: string) {
        _.set(this, 'data.estado', value)
    }
    
    get fase(): number {
        return _.get(this, 'data.fase')
    }

    set fase(value: number) {
        _.set(this, 'data.fase', value)
    }

    get opts(): any {
        return _.get(this, 'data.opts')
    }

    set opts(value: any) {
        _.set(this, 'data.opts', value)
    }

    get fechaCreacion(): string {
        return _.get(this, 'data.fechaCreacion')
    }

    get fechaActualizacion(): string {
        return _.get(this, 'data.fechaActualizacion')
    }
}
