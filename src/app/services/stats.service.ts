import { IHttpService, IPromise, IQService } from 'angular';
import { Injectable } from 'angular-ts-decorators';
import { IStat, IStats } from '../interfaces/IStat';


@Injectable('statsService')
export class StatsService {

  /*@ngInject*/
  constructor(
    private $http: IHttpService,
    private $q: IQService
  ) { }

  public stats: IStat[] = [];
  private url = '//app.asodesk.com/api/us/demo/data-stats';

  getStats(): IPromise<IStat[]> {
    const deferred = this.$q.defer<IStat[]>();
    if (this.stats.length === 0) {
      this.$http.get<IStats>(this.url).then(response => {
        this.stats = response.data.data;
        deferred.resolve(response.data.data);
      }, error => {
        console.log(error);
        deferred.reject(error);
      });
    } else {
      deferred.resolve(this.stats);
    }
    return deferred.promise;
  }

  getStat(id: number): IPromise<IStat> {
    const deferred = this.$q.defer<IStat>();
    if (this.stats.length  === 0) {
      this.getStats()
      .then((stats) => {
        const stat = stats.filter(item => item.id === id);
        if (stat[0]) {
          deferred.resolve(stat[0]);
        } else {
          const error = `stat with id=${id} not found`;
          deferred.reject(error);
        }
      }, (err) => {
        deferred.reject(err);
      });
    } else {
      const stat = this.stats.filter(item => item.id === id);
      if (stat[0]) {
        deferred.resolve(stat[0]);
      } else {
        const error = `stat with id=${id} not found`;
        deferred.reject(error);
      }
    }
    return deferred.promise;
  }
}
