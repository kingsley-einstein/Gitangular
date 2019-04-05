import { Location } from './location.types';
import { Picture } from './picture.types';

export type User = {
    id: number;
    email: string;
    username: string;
    password: string;
    github: string;
    token: string;
    location: Location;
    picture: Picture;
}