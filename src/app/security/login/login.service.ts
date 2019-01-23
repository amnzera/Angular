import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MEAT_API} from '../../app.api';
import {UserModel} from './user.model';
import {tap, filter} from 'rxjs/operators';

import {NavigationEnd, Router} from '@angular/router';

@Injectable()

export class  LoginService {

    user: UserModel;
    lastUrl: string;

    constructor(private http: HttpClient, private router: Router) {
        this.router.events.pipe(filter( e => e instanceof NavigationEnd)) // No events do router tem todos os links que usuario carregou ou vai carrega/estou filtrando qual o link que ele está no momento
                           .subscribe((e: NavigationEnd) => this.lastUrl = e.url)
    }

    isLoggedIn(): boolean {
        return this.user !== undefined;
    }

    logout() {
        this.user = undefined;
    }

    login(email: string, password: string): Observable<UserModel> {
        return this.http.post<UserModel>(`${MEAT_API}/login`,
            {email: email, password: password})
            .pipe(
                tap(user => this.user = user) // Armazena a info que chegou do backend
            )

    }
    // Se ninguem passar nenhum valor no path use o last URL
    handleLogin( path: string = this.lastUrl ) {
        this.router.navigate(['/login', btoa(path)]);
    }

}