import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuItemModel} from './menu-item.model';
import {trigger, state, style, transition, animate} from '@angular/animations';

@Component({
  selector: 'mt-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
  animations: [
      trigger('menuAppeared', [
          state('ready', style({opacity: 1 })),
          transition('void => ready', [
              style({opacity: 0, transform: 'translateY(-20px)'}),
              animate('300ms 0s ease-in')
          ])
      ])
  ]
})
export class MenuItemComponent implements OnInit {

  menuState = 'ready';

  @Input() menuItem: MenuItemModel;
  @Output() add = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  eventoAdd() {
    this.add.emit(this.menuItem); // passa info através do template para o componente irmão MENU usando OUTPUT
  }

}
