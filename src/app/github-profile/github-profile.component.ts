import { Component, OnInit, Input } from '@angular/core';
import { GithubService } from '../../shared/services/github';

@Component({
  selector: 'app-github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.css']
})
export class GithubProfileComponent implements OnInit {

  @Input()
  username: any;

  profile: any;

  constructor(private github: GithubService) { }

  ngOnInit() {
    this.getProfileFromGithub();
  }

  getProfileFromGithub() {
    this.github.getProfileFromGithub(this.username).subscribe((value: any) => {
      console.log(value);
      this.profile = value;
    });
  }

}
