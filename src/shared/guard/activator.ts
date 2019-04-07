import { CanActivate, Router } from '@angular/router';
import { Auth } from '../auth/auth';
import { ToastComponent } from '../components/toast/toast.component';
import { Injectable } from '@angular/core';

@Injectable()
export class Activator implements CanActivate {
    constructor(private auth: Auth, 
        private toast: ToastComponent, 
        private router: Router) {}

    canActivate(): boolean {
        this.auth.check();
        if (!this.auth.isLoggedIn) {
            this.toast.setMessage('You need to login to continue');
            this.router.navigateByUrl('/');
        }

        return this.auth.isLoggedIn;
    }
}