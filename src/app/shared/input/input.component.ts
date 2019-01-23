import {Component, Input, OnInit , ContentChild, AfterContentInit} from '@angular/core';
import {NgModel, FormControlName} from '@angular/forms';

@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, AfterContentInit {

  input: any;
  @Input() label: string; // Recebe valor de outro component
  @Input() errorMessage: string;
  @Input() showTip = true;
  @ContentChild(NgModel) model: NgModel;
  @ContentChild(FormControlName) control: FormControlName;

  constructor() { }

  ngOnInit() {
  }
  ngAfterContentInit() {
    this.input = this.model || this.control;
    if (this.input === undefined) {
      throw  new Error('Esse componente precisa ser usado com diretiva ngModel ou formControlName');
    }
  }
  hasSucess(): boolean {
     return this.input.valid && (this.input.dirty || this.input.touched);
  }
  hasError(): boolean {
      return this.input.invalid && (this.input.dirty || this.input.touched);
  }
}

/*1) O ControlValueAccessor é uma interface usada pelas diretivas de formulários para interagir com os controles de entrada de dados.
Serve de ponte entre a API e o DOM.
Como a gente criou um componente personalizado, uma abstração maior que simplesmente adicionar elementos <inputs> na página,
precisamos implementar essa interface para que o form reconheça o nosso componente como um componente de formulário.*/

/*2)De forma simplificada é a maneira como registramos o componente no framework.
Usamos esse token (NG_VALUE_ACCESSOR) para registrar o componente que acabamos de criar.
O Angular vai usar os valores desse token para passar as referências para a API de forms.
Usamos "forwardRef" porque no momento que esse provider for obtido, o componente ainda não está registrado,
então basicamente declaramos uma referência de que ele vai estar disponível posteriormente.*/

/*3)No método "registerOnChange",é recebida uma referência a uma função que deve ser chamada sempre que o valor interno do componente mudar.
Isso é necessário para notificar o formulário do novo valor.Então, no método setValue, que é interno,usamos a função passada no método anterior para notificar o form desse novo valor.
A função onChange é a forma que o componente usa para avisar o mundo externo das mudanças internas. Mesma ideia vale para "registerOnTouched"*/