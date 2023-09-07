import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from 'src/app/_interfaces/User';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
// export class AuthenticationService {
//   constructor(private http: HttpClient, private envUrl: EnvironmentUrlService)
//   {}

//   public registerUser = (route: string, body: RegisterDto) => {
//     return this.http.post<RegisterResponseDto>(
//       this.createCompleteRoute(route, this.envUrl.urlAddress),
//       body
//     );
//   };

//   private createCompleteRoute = (route: string, envAddress: string) => {
//     return `${envAddress}/${route}`;
//   };
// }
export class AuthenticationService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(private router: Router, private http: HttpClient) {
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('user')!)
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<User>(`${environment.urlAddress}/users/authenticate`, { username, password,})
      .pipe( map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/authentication/login']);
  }

  register(user: User) {
    return this.http.post(`${environment.urlAddress}/authentication/register`, user);
  }

  getAll() {
    return this.http.get<User[]>(`${environment.urlAddress}/users`);
  }

  getById(id: string) {
    return this.http.get<User>(`${environment.urlAddress}/users/${id}`);
  }

  update(id: string, params: any) {
    return this.http.put(`${environment.urlAddress}/users/${id}`, params).pipe(
      map((x) => {
        // update stored user if the logged in user updated their own record
        if (id == this.userValue?.id) {
          // update local storage
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));

          // publish updated user to subscribers
          this.userSubject.next(user);
        }
        return x;
      })
    );
  }

  delete(id: string) {
    return this.http.delete(`${environment.urlAddress}/users/${id}`).pipe(
      map((x) => {
        // auto logout if the logged in user deleted their own record
        if (id == this.userValue?.id) {
          this.logout();
        }
        return x;
      })
    );
  }
}
