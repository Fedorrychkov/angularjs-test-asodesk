import { Component, OnInit } from 'angular-ts-decorators';
import ILink from '../../interfaces/ILink';

@Component({
  selector: 'app-nav',
  template: require('./nav.component.html'),
  styles: [ require('./nav.component.scss') ]
})
export class NavComponent implements OnInit {
  nav: ILink[] = [];

  /*@ngInject*/
  constructor() { }

  ngOnInit() {
    this.setNav();
  }

  setNav(): void {
    this.nav = [
      { name: 'stats', title: 'Stats' }
    ];
  }
}
