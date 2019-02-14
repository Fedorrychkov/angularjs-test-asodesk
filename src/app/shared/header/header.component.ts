import { Component } from 'angular-ts-decorators';

@Component({
  selector: 'app-header',
  template: require('./header.component.html'),
  styles: [ require('./header.component.scss') ]
})
export class HeaderComponent {
}
