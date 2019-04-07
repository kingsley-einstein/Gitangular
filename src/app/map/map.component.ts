import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/types/user.types';
import { GraphQLService } from '../../shared/services/graphql';
import { ToastComponent } from '../../shared/components/toast/toast.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  users: User[];

  isLoading: boolean = false;

  lat: number = -23.8779431;
  lng: number = -49.8046873;

  constructor(
    private graphService: GraphQLService,
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
        this.toast.setMessage('Error occured while loading users');
      },
      () => this.isLoading = false);
  }

}
