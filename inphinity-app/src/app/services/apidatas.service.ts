import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIDatasService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }
  /**
   * author : R. Fournier
   * goal   : Generic function to recover data from the API
   *
   * parameters : route: the value to pass to the API in the URL
   */
  getDatas(route): Observable<any> {
    const token = this.authService.getToken();
    // HTTP Request headers
    let reqheaders = new HttpHeaders();
    reqheaders = reqheaders.append('Content-Type', 'application/json');
    reqheaders = reqheaders.append('Authorization', 'Bearer ' + token);
    reqheaders = reqheaders.append('Accept', '*/*');
    reqheaders = reqheaders.append('Cache-Control', 'no-cache');

    return this.http.get('https://dev.dwimworld.ch/api/?url=http://trex.lan.iict.ch:8080/api' + route, {headers: reqheaders});
  }

  getDatasRawUrl(url: string): Observable<any> {
    const token = this.authService.getToken();
    // HTTP Request headers
    let reqheaders = new HttpHeaders();
    reqheaders = reqheaders.append('Content-Type', 'application/json');
    reqheaders = reqheaders.append('Authorization', 'Bearer ' + token);
    reqheaders = reqheaders.append('Accept', '*/*');
    reqheaders = reqheaders.append('Cache-Control', 'no-cache');

    return this.http.get('https://dev.dwimworld.ch/api/?url=' + url, {headers: reqheaders});
  }
}
