import { User } from './user.model';

export interface Food{
    offset:number;
    group:string;
    name:string;
    ndbno:number;
    ds:string;
    manu:string;
    user?:Array<User>;
}