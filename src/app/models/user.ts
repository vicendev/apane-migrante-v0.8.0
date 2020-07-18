import { IUser } from '../interfaces/iuser';
import * as _ from 'lodash';

export class User implements IUser {

    constructor( data ) {
        _.set(this, 'data', data);
    }

    get id(): string{
        return _.get(this, 'data.id');
    }

    get email(): string{
        return _.get(this, 'data.email');
    }

    get img(): string{
        return _.get(this, 'data.img');
    }

    get estado(): boolean{
        return _.get(this, 'data.estado');
    }

    get google(): boolean{
        return _.get(this, 'data.google');
    }

    get facebook(): boolean{
        return _.get(this, 'data.facebook');
    }

    get idToken(): string{
        return _.get(this, 'data.idToken');
    }
}
