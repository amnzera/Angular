import {CanActivate, CanLoad, Route, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {LoginService} from './login/login.service';

@Injectable()
export class LoggedinGuard implements CanLoad , CanActivate {

    constructor(private loginService: LoginService) {}

    checkAuthentication(path: string): boolean {
        const loggedIn = this.loginService.isLoggedIn(); // testa se está logado ou não

        if (!loggedIn) { // O path é o caminho que ele deveria ter ido se estive-se Logado...Ele pega essa info do router
            this.loginService.handleLogin(`/${path}`); // Senão estiver logado leve para pag de Login.
        }
        return loggedIn;
    }

    canLoad(route: Route): boolean {
        return this.checkAuthentication(route.path);
    }
                // Copia da rota que foi ativada
    canActivate(actRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
        return this.checkAuthentication(actRoute.routeConfig.path);
    }

}
