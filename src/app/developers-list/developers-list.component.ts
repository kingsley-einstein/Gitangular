import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/types/user.types';
import { GraphQLService } from '../../shared/services/graphql';
import { ToastComponent } from 'src/shared/components/toast/toast.component';

@Component({
  selector: 'app-developers-list',
  templateUrl: './developers-list.component.html',
  styleUrls: ['./developers-list.component.css']
})
export class DevelopersListComponent implements OnInit {

  users: User[];

  isLoading: boolean = false;
  
  constructor(private graphService: GraphQLService,
    public toast: ToastComponent) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.graphService.getAllUsers(0).subscribe(
      users => this.users = users,
      err => {
        this.isLoading = false;
        console.log(err);
        this.toast.setMessage('Error occured while loading list');
      },
      () => {
        this.isLoading = false;
        console.log(this.users);
      });
  }

}
