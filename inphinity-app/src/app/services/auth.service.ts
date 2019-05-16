import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient){
        if(localStorage.getItem("auth") === null || localStorage.getItem("token") === null){
            this.signOut();
        }
    }

    isAuth() {
        return (localStorage.getItem('auth') == "true" && localStorage.getItem('token') !== null && localStorage.getItem('token') !== "");
    }

    setAuth(a : boolean){
        localStorage.setItem("auth", a.toString());
    }

    setToken(token : string){
      localStorage.setItem("token", token);
    }

    getToken() : string{
      return localStorage.getItem('token');
    }

    signIn(userAccesses, caller) {
      return new Promise(
        (resolve, reject) => {
          setTimeout(
            () => {
              let headers = new Headers();
              headers.append('Content-Type', 'multipart/form-data');
              headers.append('Cache-Control', 'no-cache');
            
              let formData: FormData = new FormData(); 
              formData.append("username", userAccesses.username);
              formData.append("password", userAccesses.password)

              this.http
              .post<any>("http://trex.lan.iict.ch:8080/api/login", formData, {
                headers: new HttpHeaders({
                  'Content-Type': 'multipart/form-data',
                  'Cache-Control': 'no-cache',
                  'Access-Control-Allow-Origin': '*'
                })
              })
              .toPromise()
              .then(
                res => {
                  console.log(res.json().results);
                  resolve();
                },
                msg => {
                  reject(msg.statusText);
                }
              );
            }, 100
          );
        }
      );
    }
  
    signOut() {
      this.setAuth(false);
      this.setToken('');
    }
}