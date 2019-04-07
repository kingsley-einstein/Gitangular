import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GithubService {
    constructor(private http: HttpClient) {}

    getProfileFromGithub(username: any) {
        return this.http.get(`${environment.github}/users/${username}`);
    }
}