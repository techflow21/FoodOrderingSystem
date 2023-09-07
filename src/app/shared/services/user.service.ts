import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from 'src/app/_interfaces/User';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //private apiUrl = environment.urlAddress;
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject(
      JSON.parse(localStorage.getItem('user')!)
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  // login(username: string, password: string) {
  //   return this.http
  //     .post<User>(`${environment.urlAddress}/users/authenticate`, {
  //       username,
  //       password,
  //     })
  //     .pipe(
  //       map((user) => {
  //         // store user details and jwt token in local storage to keep user logged in between page refreshes
  //         localStorage.setItem('user', JSON.stringify(user));
  //         this.userSubject.next(user);
  //         return user;
  //       })
  //     );
  // }

  // logout() {
  //   // remove user from local storage and set current user to null
  //   localStorage.removeItem('user');
  //   this.userSubject.next(null);
  //   this.router.navigate(['/authentication/login']);
  // }

  // register(user: User) {
  //   return this.http.post(
  //     `${environment.urlAddress}/authentication/register`,
  //     user
  //   );
  // }

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
          this.authService.logout();
        }
        return x;
      })
    );
  }

  getAllUsersBySearchTerm(searchTerm: string): Observable<User[]> {
    return this.getAll().pipe(
      map((users) =>
        users.filter(
          (user) =>
            user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.username?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }

  // getAllUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(this.apiUrl);
  // }

  // getUserById(id: number): Observable<User | undefined> {
  //   return this.http.get<User>(`${this.apiUrl}/${id}`);
  // }

  // addUser(user: User): Observable<User> {
  //   return this.http.post<User>(this.apiUrl, user);
  // }

  // updateUser(id: number, updatedUser: User): Observable<User> {
  //   return this.http.put<User>(`${this.apiUrl}/${id}`, updatedUser);
  // }

  // deleteUserById(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }
}
