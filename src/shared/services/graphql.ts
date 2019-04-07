import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { environment } from '../../environments/environment';
import { Query } from '../types/query.types';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class GraphQLService {
    constructor(private apollo: Apollo, http: HttpLink) {
        apollo.create({
            link: http.create({
                uri: `${environment.gitAngular}/graphql`
            }),
            cache: new InMemoryCache()
        });
    }

    create({email, username, password, github}) {
        return this.apollo.mutate({
            mutation: gql `
                mutation {
                    create(email: "${email}", username: "${username}", password: "${password}", github: "${github}") {
                        id,
                        email,
                        username,
                        token
                    }
                }
            `
        });
    }

    update(id, email, password) {
        return this.apollo.mutate({
            mutation: gql `
                mutation {
                    update(id: ${id}, email: "${email}", password: "${password}") {
                        id,
                        email,
                        username,
                        token
                    }
                }
            `
        });
    }

    delete(id) {
        return this.apollo.mutate({
            mutation: gql `
                mutation {
                    delete(id: ${id})
                }
            `
        })
    }

    log({username, password}) {
        return this.apollo.query<Query>({
            query: gql `
                query {
                    log(username: "${username}", password: "${password}") {
                        id,
                        token
                    }
                }
            `
        }).pipe(map(item => item.data.log));
    }

    changeLocation({user, latitude, longitude}) {
        return this.apollo.mutate({
            mutation: gql `
                mutation {
                    newLocation(user: ${user}, latitude: ${latitude}, longitude: ${longitude}) {
                        id,
                        latitude,
                        longitude
                    }
                }
            `
        });
    }

    changePicture({user, mimeType, binaryContent, name}) {
        return this.apollo.mutate({
            mutation: gql `
                mutation {
                    upload(user: ${user}, mimeType: "${mimeType}", binaryContent: "${binaryContent}", name: "${name}") {
                        id,
                        mimeType,
                        binaryContent,
                        name
                    }
                }
            `
        });
    }

    getUserById(id) {
        return this.apollo.query<Query>({
            query: gql `
                query {
                    byId(id: ${id}) {
                        email,
                        username,
                        github,
                        token,
                        location {
                            latitude,
                            longitude
                        },
                        picture {
                            mimeType,
                            binaryContent
                        }
                    }
                }
            `
        }).pipe(map(item => item.data.byId));
    }

    getUserByToken(token) {
        return this.apollo.query<Query>({
            query: gql `
                query {
                    byToken(token: "${token}") {
                        id
                    }
                }
            `
        }).pipe(map(item => item.data.byToken));
    }

    getAllUsers(page: number) {
        return this.apollo.query<Query>({
            query: gql `
                query {
                    allUsers(page: ${page}) {
                        username,
                        github,
                        location {
                            latitude,
                            longitude
                        },
                        picture {
                            mimeType,
                            binaryContent
                        }
                    }
                }
            `
        }).pipe(map(item => item.data.allUsers));
    }
}