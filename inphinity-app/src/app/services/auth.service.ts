import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient){
        //set values by default
        if(localStorage.getItem("auth") === null || localStorage.getItem("token") === null){
            this.signOut();
        }
    }

    isAuth() {
        var bAuth, bToken, bUname : Boolean;
        bAuth = this.getAuth() == "true";
        bToken = this.getToken()     !== null && this.getToken()     !== "" && this.getToken()    !== 'undefined';
        bUname = this.getUsername()  !== null && this.getUsername()  !== "" && this.getUsername() !== 'undefined';

        return ( bAuth && bToken && bUname);
    }

    setAuth(a : boolean){
        localStorage.setItem("auth", a.toString());
    }

    getAuth(){
      return localStorage.getItem("auth");
    }

    setToken(token){
      localStorage.setItem("token", token);
    }

    getToken() : string{
      return localStorage.getItem('token');
    }

    storeUsername(un){
      localStorage.setItem("uname", un);
    }

    getUsername(){
      return localStorage.getItem("uname");
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
              .post<any>('https://dev.dwimworld.ch:7777/api/?url=http://trex.lan.iict.ch:8080/api/login/', body)
              .toPromise()
              .then(
                res => {
                  //request worked (in an HTTP way)
                  if(typeof(res.error) !== 'undefined'){
                    //throwing (rejecting) an error with API given error (failed auth by example)
                    reject(res.error);
                  } else {
                    //returning the token
                    this.storeUsername(userAccesses.username)
                    return resolve(res.token);
                  }
                },
                msg => {
                  // HTTP Request error
                  console.log(msg);
                  reject('HTTP ERROR (' +msg.statusText + ') : ' + msg.message);
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
    }
}