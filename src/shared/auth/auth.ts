import { Injectable } from '@angular/core';
import { GraphQLService } from '../services/graphql';
import { User } from '../types/user.types';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class Auth {
    
    public isLoggedIn: boolean = false;
    public user: User;

    constructor(private graphService: GraphQLService, private router: Router) {
    }

    public check() {
        if (localStorage.getItem('token')) {
            this.isLoggedIn = true;
        }
    }

    public verifyAndNavigate() {
        if (this.isLoggedIn) {
            this.graphService.getUserByToken(localStorage.getItem('token')).subscribe(
                data => this.user = data,
                err => console.log(err),
                () => {
                    console.log(this.user);
                    this.router.navigateByUrl(`/home/${this.user.id}`);
                });
        }
    }

    public logout() {
        localStorage.clear();
        this.router.navigateByUrl('/');
    }
}