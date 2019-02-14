import { Component, OnInit } from 'angular-ts-decorators';
import { StateService } from '@uirouter/core';
import { StatsService } from '../../services/stats.service';
import { IStat } from '../../interfaces/IStat';

@Component({
  selector: 'app-explore',
  template: require('./explore.component.html'),
  styles: [ require('./explore.component.scss') ]
})
export class ExploreComponent implements OnInit {

  public stat: IStat;
  public loading = false;
  /*@ngInject*/
  constructor(
    private $state: StateService,
    private statsService: StatsService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.statsService.getStat(+this.$state.params.id)
      .then(data => {
        this.stat = data;
        this.loading = false;
      });
  }
}
