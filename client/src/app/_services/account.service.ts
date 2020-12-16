import { User } from './../_models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/';
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any): Observable<any> {
    return this.http.post(this.baseUrl + "api/account/login", model).pipe(
      map((response: User) => {
        const user = response;
        if (response != null) {
          localStorage.setItem("User", JSON.stringify(user));
          this.setUser(user);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + "api/account/register", model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem("User", JSON.stringify(user));
          this.setUser(user);
        }
      })
    );
  }

  setUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem("User");
    this.currentUserSource.next(null);
  }


}
