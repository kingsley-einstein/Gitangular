import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GraphQLService {
    constructor(private apollo: Apollo, http: HttpLink) {
        apollo.create({
            link: http.create({
                uri: environment.gitAngular
            }),
            cache: new InMemoryCache()
        });
    }
}