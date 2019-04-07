import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { Activator } from '../shared/guard/activator';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { DevelopersListComponent } from './developers-list/developers-list.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegistrationComponent
      },
      {
        path: 'home/:id',
        component: HomeComponent,
        canActivate: [Activator],
        children: [
          {
            path: '',
            component: MyProfileComponent
          },
          {
            path: 'devs',
            component: DevelopersListComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
