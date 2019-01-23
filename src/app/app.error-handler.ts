import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ErrorHandler, Injectable, Injector, NgZone} from '@angular/core';
import {NotificationService} from './shared/notification.service';
import {LoginService} from './security/login/login.service';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

    constructor(private ns: NotificationService, private injector: Injector,
                private zone: NgZone) {
        super();
    }
    // Lembrando o errorResponse vem do banckend
    handleError(errorResponse: HttpErrorResponse | any) { // função espera uma atribuição do tipo 'response' más tambem pode ser que não venha nada
        // Criando uma zona para essas mensagem
        this.zone.run( () => { // O angular irá disparar novamente caso o erro seja disparado

            if (errorResponse instanceof HttpErrorResponse) {
                switch (errorResponse.status) {
                    case 401: this.injector.get(LoginService).handleLogin(); // Enviando para a tela de login
                        break;
                    case 403: this.ns.notify('Não autorizado')
                        break;
                    case 404: this.ns.notify('Recurso não encontrado')
                        break;
                }
            }

        })

        super.handleError(errorResponse)
    }
}