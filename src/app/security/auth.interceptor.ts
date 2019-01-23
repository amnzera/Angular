import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable, Injector} from '@angular/core';
import {LoginService} from './login/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    // injector pode referenciar todos os componentes ou serviços
    constructor(private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const loginService = this.injector.get(LoginService); // pegando loginService via injector

        if (loginService.isLoggedIn()) { // ele só faz o header se estiver logado
            // Adicionando o hearder
            const  authRequest = request.clone({setHeaders: {'Authorization': `Bearer ${loginService.user.accessToken}`}});
            return next.handle(authRequest) // Enviando o header

        } else {
            return next.handle(request); // Manda seguir o fluxo
        }

    }

}

// Para cara request esse cara será reposavel pela criação do header com o token
