import { Component, OnInit } from '@angular/core';
import { Auth } from '../../shared/auth/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth: Auth) { }

  ngOnInit() {
  }

  async logout() {
    await this.auth.logout();
  }

}
