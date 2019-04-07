import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GraphQLService } from '../../shared/services/graphql';
import { User } from '../../shared/types/user.types';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { Picture } from '../../shared/types/picture.types';
//import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  id: number;
  //navigationData: any;
  user: User

  isLoading: boolean = false;
  displayUploadForm: boolean = false;

  image: File;
  reader: FileReader = new FileReader();
  picture: Picture;
  //pictureForUpload: any;

  //uploadForm: FormGroup;
  //picture: FormControl = new FormControl('', Validators.required);

  constructor(route: ActivatedRoute, 
    private graphService: GraphQLService, 
    public toast: ToastComponent) { 
    route.parent.params.subscribe(params => this.id = params.id);
  }

  ngOnInit() {
    this.getUser();
    this.getUserLocation();
  }

  getUserLocation() {
    if (navigator.geolocation) {
      //let nav;
      navigator.geolocation.watchPosition((position) => {
        this.getPosition(position);
      });
      //console.log(nav);
    }
  }

  getPosition(position) {
    console.log(position.coords);
    let navigationData: any = {};
    navigationData.user = this.id;
    navigationData.latitude = position.coords.latitude;
    navigationData.longitude = position.coords.longitude;
    this.graphService.changeLocation(navigationData).subscribe(
      loc => console.log(loc),
      (err) => {
        console.log(err);
        this.toast.setMessage('Error getting location');
      });
  }
  
  getUser() {
    this.isLoading = true;
    this.graphService.getUserById(this.id).subscribe(
      u => this.user = u,
      err => {
        this.isLoading = false;
        console.log(err);
        this.toast.setMessage('Error occured while loading profile');
      },
      () => {
        this.isLoading = false;
        console.log(this.user);
      });
  }

  showForm() {
    this.displayUploadForm = true;
  }

  closeForm() {
    this.displayUploadForm = false;
  }

  detectChange(event: any) {
    console.log(event.target.files[0]);
    this.image = event.target.files[0];
    this.reader.readAsDataURL(this.image)
    this.reader.addEventListener('load', (event) => {
      this.picture = {
        mimeType: this.image.type,
        binaryContent: this.reader.result.toString().replace(/^data:(.*;base64,)?/, ''),
        name: this.image.name
      };
      console.log(this.picture);
    });
    //console.log(this.picture);
  }

  upload() {
    this.isLoading = true;
    let pictureForUpload: any = this.picture;
    pictureForUpload.user = this.id;
    this.graphService.changePicture(pictureForUpload).subscribe(
      value => this.user.picture = value.data.upload,
      err => {
        this.isLoading = false;
        console.log(err);
        this.toast.setMessage('Error occured while uploading picture');
      },
      () => {
        this.isLoading = false;
        this.toast.setMessage('Successfully uploaded image');
        this.picture = undefined;
        //this.getUser();
      });
  }

}
