import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GraphQLService } from '../../shared/services/graphql';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../shared/types/user.types';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  email: FormControl = new FormControl('', Validators.compose([
    Validators.required,
    Validators.email
  ]));
  username: FormControl = new FormControl('', Validators.required);
  password: FormControl = new FormControl('', Validators.required);
  github: FormControl = new FormControl('', Validators.required);

  isLoading: boolean = false;

  newUser: User;

  constructor(
    private router: Router,
    private graphService: GraphQLService,
    public toast: ToastComponent,
    fb: FormBuilder) { 
      this.registrationForm = fb.group({
        username: this.username,
        email: this.email,
        password: this.password,
        github: this.github
      });
    }

  ngOnInit() {
  }

  navigateToLoginPage() {
    this.router.navigateByUrl('/');
  }

  submit() {
    this.isLoading = true;
    this.graphService.create(this.registrationForm.value).subscribe(
      data => this.newUser = data.data.create,
      err => {
        console.log(err);
        this.isLoading = false;
        this.toast.setMessage('Error occured');
      },
      () => {
        this.isLoading = false;
        this.toast.setMessage('Successfully registered');
        console.log(this.newUser);
        this.registrationForm.reset();
      });
  }

}
