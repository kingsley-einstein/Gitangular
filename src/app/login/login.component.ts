import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GraphQLService } from '../../shared/services/graphql';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../shared/types/user.types';
import { Auth } from '../../shared/auth/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  username: FormControl = new FormControl('', Validators.required);
  password: FormControl = new FormControl('', Validators.required);

  isLoading: boolean = false;
  user: User;

  constructor(private router: Router,
    private graphService: GraphQLService,
    public toast: ToastComponent,
    fb: FormBuilder,
    private auth: Auth) {
      this.loginForm = fb.group({
        username: this.username,
        password: this.password
      });
     }

  ngOnInit() {
    this.checkForLogin();
  }

  navigateToRegistrationPage() {
    this.router.navigateByUrl('/register');
  }

  login() {
    this.isLoading = true;
    this.graphService.log(this.loginForm.value).subscribe(
      data => this.user = data,
      err => {
        console.log(err);
        this.isLoading = false;
        this.toast.setMessage('Error occured');
      },
      () => {
        this.isLoading = false;
        localStorage.setItem('token', this.user.token);
        console.log(this.user);
        this.toast.setMessage('Successfully logged in');
        this.router.navigateByUrl(`home/${this.user.id}`);
        this.loginForm.reset();
      });
  }

  checkForLogin() {
    this.auth.check();
    this.auth.verifyAndNavigate();
  }

}
