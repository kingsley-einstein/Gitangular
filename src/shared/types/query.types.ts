import { User } from './user.types';

export type Query = {
    byId: User;
    byToken: User;
    allUsers: User[];
    log: User;
}