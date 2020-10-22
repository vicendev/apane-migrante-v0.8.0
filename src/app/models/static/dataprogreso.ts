import { IDataProgreso } from '../../interfaces/static/idataprogreso';
import * as _ from 'lodash';

export class DataProgreso implements IDataProgreso{

    constructor( data ) {
        _.set(this, 'data', data);
    }

    get numFases(): number {
        return _.get(this, 'data.numFases');
    }

    set numFases(value: number) {
        _.set(this, 'data.numFases', value);
    }

    get fase(): number {
        return _.get(this, 'data.fase');
    }

    set fase(value: number) {
        _.set(this, 'data.fase', value);
    }

    get titulo(): string {
        return _.get(this, 'data.titulo');
    }

    set titulo(value: string) {
        _.set(this, 'data.titulo', value);
    }

    get progreso(): number {
        return _.get(this, 'data.progreso');
    }

    set progreso(value: number) {
        _.set(this, 'data.progreso', value);
    }

    get opts(): any {
        return _.get(this, 'data.opts');
    }

    set opts(value: any) {
        _.set(this, 'data.opts', value);
    }

}
