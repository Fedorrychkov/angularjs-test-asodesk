import { Component, OnInit, Input } from 'angular-ts-decorators';
import { IStat } from '../../interfaces/IStat';

@Component({
  selector: 'app-popup',
  template: require('./popup.component.html'),
  styles: [ require('./popup.component.scss') ]
})
export class PopupComponent implements OnInit {
  @Input()
  stat: IStat;

  @Input()
  opened: boolean;

  constructor(private $rootScope: any) {}

  ngOnInit() {

  }

  close() {
    this.$rootScope.$broadcast('close-popup', false);
  }
}
