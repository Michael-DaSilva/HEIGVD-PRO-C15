import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class APIDatasService {

  constructor(private http: HttpClient) {
  }

  getDatas(route, token) {
    //HTTP Request headers
    let reqheaders = new HttpHeaders();
    console.log('adding token :' + token);
    reqheaders = reqheaders.append('Content-Type', 'application/json');
    reqheaders = reqheaders.append('Authorization', 'Bearer ' + token);
    reqheaders = reqheaders.append('Accept', '*/*');
    reqheaders = reqheaders.append('Cache-Control', 'no-cache');

    return this.http.get('https://dev.dwimworld.ch:7777/api/?url=http://trex.lan.iict.ch:8080/api' + route, {headers: reqheaders});
  }
}
