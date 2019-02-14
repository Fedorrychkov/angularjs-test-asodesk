import { Component, OnInit } from 'angular-ts-decorators';
import { StateService } from '@uirouter/angularjs';
import { IHttpResponse } from 'angular';
import { IStat, IStats } from '../../interfaces/IStat';
import { StatsService } from '../../services/stats.service';

@Component({
  selector: 'app-stats',
  template: require('./stats.component.html'),
  styles: [ require('./stats.component.scss') ]
})
export class StatsComponent implements OnInit {
  public stats: IStat[] = [];
  public openedStat: IStat;
  public popupIsOpen = false;
  public isLoaded = false;
  public allChecked = false;
  public dtOptions: any;
  public dtColumnDefs: any;

  /*@ngInject*/
  constructor(
    private statsService: StatsService,
    private DTOptionsBuilder: any,
    private DTColumnDefBuilder: any,
    private $rootScope: any,
    private $state: StateService,
  ) {
    this.dtOptions = this.DTOptionsBuilder.newOptions()
      .withPaginationType('full_numbers')
      .withDisplayLength(10)
      .withOption('bInfo', false)
      .withOption('bPaginate', false)
      .withOption('searching', false)
      .withOption('paging', false)
      .withOption('order', [0, 'desc']);

    this.dtColumnDefs = [
      this.DTColumnDefBuilder.newColumnDef(0).notSortable(),
      this.DTColumnDefBuilder.newColumnDef(1).notSortable(),
      this.DTColumnDefBuilder.newColumnDef(2).notSortable(),
      this.DTColumnDefBuilder.newColumnDef(3).notSortable(),
      this.DTColumnDefBuilder.newColumnDef(4).notSortable(),
      this.DTColumnDefBuilder.newColumnDef(5).notSortable(),
      this.DTColumnDefBuilder.newColumnDef(6).notSortable(),
      this.DTColumnDefBuilder.newColumnDef(7).notSortable(),
      this.DTColumnDefBuilder.newColumnDef(8).notSortable(),
    ];
  }

  ngOnInit() {
    this.getStats();
    this.$rootScope.$on('close-popup', ($scope, state ) => {
      this.popupIsOpen = state;
    });
  }

  getStats(): void {
    this.statsService.getStats()
      .then(data => {
        if (data) {
          this.stats = data.map(item => {
            item.checked = false;
            if (typeof item.suggestions_count !== 'number') {
              item.suggestions_count = 0;
            }
            return item;
          });
          this.stats[0].checked = true;
        }
        this.isLoaded = true;
      });
  }

  // TODO: If we have only 1 element, we have a bug with "checkAll and check"
  check(stat): void {
    const check = !stat.checked;
    let allChecks = 1;

    if (this.stats.length === 1) {
      this.stats[0].checked = true;
      return;
    }

    this.stats.map(item => {
      if (item.id === stat.id) {
        item.checked = check;
      }
      allChecks = allChecks * +item.checked;
    });
    this.allChecked = !!allChecks;
    this.checkTrues(stat);
    return;
  }

  checkTrues(last) {
    const onlyChecked: IStat[] = this.stats.filter(item => {
      if (item.checked === true) {
        return item;
      }
    });

    if (onlyChecked.length > 0) {
      return;
    }

    if (!last) {
      if (this.stats.length > 0) {
        this.stats[0].checked = true;
      }
      return;
    }

    this.stats.forEach((item, i) => {
      if (item.id === last.id) {
        if (this.stats.length === 1) {
          return;
        }
        this.stats[i < this.stats.length - 1 ? i + 1 : i - 1].checked = true;
      }
    });
  }

  checkAll(item): void {
    const check = !item;

    if (!check) {
      const stats: IStat[] = this.stats.map(item => {
        item.checked = false;
        return item;
      });
      stats[0].checked = true;
      this.stats = stats;
      return;
    }
    const stats: IStat[] = this.stats.map((item: any) => {
      item.checked = true;
      return item;
    });
    this.stats = stats;
  }

  delete(id: number) {
    const stats: IStat[] = this.stats.filter(item => {
      if (item.id !== id) {
        return item;
      }
    });

    this.stats = stats;
    this.statsService.stats = stats;
    this.checkTrues(false);
  }

  openPopup(stat) {
    this.openedStat = stat;
    this.popupIsOpen = true;
  }
}
