import { Component, OnInit } from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';

@Component({
  selector: 'mt-about',
  templateUrl: './about.component.html',
    animations: [
        trigger('showAbout', [
            state('ready', style({opacity: 1 })),
            transition('void => ready', [
                style({opacity: 0, transform: 'translateX(-60px)'}),
                animate('300ms 0s ease-in-out')
            ])
        ])
    ]
})
export class AboutComponent implements OnInit {

    showAbout = 'ready';

  constructor() { }

  ngOnInit() {
  }

}
