import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from './login.service';
import {NotificationService} from '../../shared/notification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {trigger, state, style, transition, animate} from '@angular/animations';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
    animations: [
        trigger('showLogin', [
            state('ready', style({opacity: 1 })),
            transition('void => ready', [ // Transição do estado VOID para READY
                style({opacity: 0, transform: 'translateX(-60px)'}),
                animate('300ms 0s ease-in-out')
            ])
        ])
    ]
})

export class LoginComponent implements OnInit {

  showLogin = 'ready';
  loginForm: FormGroup;
  navigateTo: string;

  constructor(private fb: FormBuilder, private loginService: LoginService,
              private notificationService: NotificationService, private actRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
        email: this.fb.control('', [Validators.required, Validators.email]),
        password: this.fb.control('', [Validators.required]),
    }); // Coleta info do formulario

      this.navigateTo = this.actRoute.snapshot.params['to'] || btoa('/'); // Recebe info via router, se não vier nada será atribuido o '/'
  }


  login() {
    this.loginService.login(this.loginForm.value.email,
        this.loginForm.value.password)
        .subscribe(user => this.notificationService.notify(`Bem vindo , ${user.name}`),
            response => // HttpErrorResponse é aquele 403 no bakcend
                this.notificationService.notify(response.error.message),
            () => {
            this.router.navigate([atob(this.navigateTo)])
            })
  } // 2 paramentros no subscribe um de sucesso de login outro de error

}
