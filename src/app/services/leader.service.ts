import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';

@Injectable()
export class LeaderService {

  constructor(private http: Http, 
              private processHTTPMsgService: ProcessHTTPMsgService) { }
  
  getLeaders() : Observable<Leader[]> {
    //return Observable.of(LEADERS).delay(2000);
    return this.http.get(baseURL + 'leaders').
                     map(res => { return this.processHTTPMsgService.extractData(res); }).catch(error => { return this.processHTTPMsgService.handleError(error)});
  }
  getLeader(id: number) : Observable<Leader> {
    //return Observable.of(LEADERS.filter((leader) => (leader.id === id))[0]).delay(2000);
    return this.http.get(baseURL + 'leaders/' + id).
                     map(res => { return this.processHTTPMsgService.extractData(res); }).catch(error => { return this.processHTTPMsgService.handleError(error)});
  }
  getFeaturedLeader() : Observable<Leader> {
    //return Observable.of(LEADERS.filter((leader) => (leader.featured))[0]).delay(2000);
    return this.http.get(baseURL + 'leaders?featured=true')
                    .map(res => { return this.processHTTPMsgService.extractData(res)[0]; })
                    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }
}
