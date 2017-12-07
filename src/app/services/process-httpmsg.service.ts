import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProcessHTTPMsgService {

  constructor() { }
  
  public extractData(res: Response){
    let body = res.json();
    return body || { };
  }
}
