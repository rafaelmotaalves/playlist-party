import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';



@Injectable()

export class AuthService {

  constructor(
    private http: Http,
    private cookie: CookieService,
    private router: Router,
  ) { }

  login() {
    return this.http.get('http://localhost:8080/login')
      .subscribe(res => {
        const data = res.json();
        this.cookie.put('spotifyAuthState', data.state);
        window.location.href = data.url;
      });
  }

  callback(query) {
    const storedState = this.cookie.getObject('spotifyAuthState');
    this.cookie.remove('spotifyAuthState');
    const url = 'http://localhost:8080/callback?' + query.replace('#_=_', '') + '&storedState=' + storedState;
    console.log(url);
    return this.http.get(url)
      .subscribe(data => {
        this.cookie.putObject('auth', data.json());
        this.router.navigate(['playlists']);
      });
  }

  refresh(refreshToken) {
    return this.http.get('http://localhost:8080/refresh?refreshToken=' + refreshToken)
      .pipe(map(data => data.json()));
  }

  logout() {
    this.cookie.remove('auth');
    this.router.navigate(['login']);
  }

  isLoggedIn(): boolean {
    return this.cookie.getObject('auth') !== undefined;
  }
}
