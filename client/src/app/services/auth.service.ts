import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

@Injectable()

export class AuthService {

  constructor(
    private http: Http,
    private cookie: CookieService,
    private router: Router,
  ) { }

  login() {
    return this.http.get('http://localhost:3000/login')
      .subscribe(res => {
        const data = res.json();
        this.cookie.put('spotifyAuthState', data.state);
        window.location.href = data.url;
      });
  }

  callback(query) {
    const storedState = this.cookie.get('spotifyAuthState');
    this.cookie.remove('spotifyAuthState');
    return this.http.get('http://localhost:3000/callback?' + query + '&storedState=' + storedState)
      .subscribe(data => {
        this.cookie.putObject('auth', data.json());
        this.router.navigate(['/']);
      });
  }

  logout() {
    console.log(this.cookie.getObject('auth'));
    this.cookie.remove('auth');
    this.router.navigate(['/']);
  }
}
