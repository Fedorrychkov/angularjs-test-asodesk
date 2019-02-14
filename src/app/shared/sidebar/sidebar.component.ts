import { Component } from 'angular-ts-decorators';

@Component({
  selector: 'app-sidebar',
  template: require('./sidebar.component.html'),
  styles: [ require('./sidebar.component.scss') ]
})
export class SidebarComponent {
}
