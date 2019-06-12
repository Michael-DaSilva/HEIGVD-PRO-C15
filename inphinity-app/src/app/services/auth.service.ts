import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  private isLoggedIn = new BehaviorSubject(false);

  constructor(private http: HttpClient, private router: Router) {
    //set values by default
    if (localStorage.getItem('auth') === null || localStorage.getItem('token') === null) {
      this.signOut();
    } else {
      this.isLoggedIn.next(true);
    }
  }
  /**
   * author : R. Fournier
   * goal   : Verifiy if the user is authetificated by recovering the token inside the local storage and that his
   *          username is valid
   *
   */
  isAuth() {
    let bAuth, bToken, bUname: boolean;
    bAuth = this.getAuth() == 'true';
    bToken = this.getToken() !== null && this.getToken() !== '' && this.getToken() !== 'undefined';
    bUname = this.getUsername() !== null && this.getUsername() !== '' && this.getUsername() !== 'undefined';

    return (bAuth && bToken && bUname);
  }
  /**
   * author : R. Fournier
   * goal   : Store a boolean value to know if the user is authentificated
   *
   * parameters : a: boolean who say if the user is authentificated
   */
  setAuth(a: boolean) {
    localStorage.setItem('auth', a.toString());
  }
  /**
   * author : R. Fournier
   * goal   : Return the boolean value "auth"
   *
   */
  getAuth() {
    return localStorage.getItem('auth');
  }
  /**
   * author : R. Fournier
   * goal   : Store the token returned by the API
   *
   * parameters : token: the token sent by the API
   */
  setToken(token) {
    localStorage.setItem('token', token);
  }
  /**
   * author : R. Fournier
   * goal   : Return the token stored in the localstorage
   *
   */
  getToken(): string {
    return localStorage.getItem('token');
  }
  /**
   * author : R. Fournier
   * goal   : Store the username of the user
   *
   * parameters : un: string who represent the username
   */
  storeUsername(un) {
    localStorage.setItem('uname', un);
  }
  /**
   * author : R. Fournier
   * goal   : Return the username stored in the localstorage
   *
   */
  getUsername() {
    return localStorage.getItem('uname');
  }

  /**
   * author : R. Fournier
   * goal   : Send POST request to API and returns the results (via exceptions)
   *
   * parameters : userAccesses : object with {username : ..., password : ...}
   */
  signIn(userAccesses, caller) {
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {

            //HTTP Request headers
            let headers = new Headers();
            headers.append('Content-Type', 'multipart/form-data');
            headers.append('Cache-Control', 'no-cache');

            //POST Request parameters
            const body = new HttpParams()
              .set('username', userAccesses.username)
              .set('password', userAccesses.password);

            this.http
              .post<any>('https://dev.dwimworld.ch/api/?url=http://trex.lan.iict.ch:8080/api/login/', body)
              .toPromise()
              .then(
                res => {
                  //request worked (in an HTTP way)
                  if (typeof (res.error) !== 'undefined') {
                    //throwing (rejecting) an error with API given error (failed auth by example)
                    reject(res.error);
                  } else {
                    //returning the token
                    this.storeUsername(userAccesses.username);
                    this.isLoggedIn.next(true);
                    return resolve(res.token);
                  }
                },
                msg => {
                  // HTTP Request error
                  console.log(msg);
                  reject('HTTP ERROR (' + msg.statusText + ') : ' + msg.message);
                }
              );
          }, 100
        );
      }
    );
  }

  /**
   * author : R. Fournier
   * goal   : Resets value to de-auth
   *
   */
  signOut() {
    this.setAuth(false);
    this.setToken('');
    this.storeUsername('');
    this.router.navigate(['login']);
    this.isLoggedIn.next(false);
  }
}
