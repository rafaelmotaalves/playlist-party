import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

@Injectable()

export class PlaylistService {
  constructor(
    private http: Http,
    private router: Router,
    private cookie: CookieService,
  ) { }

  createPlaylist(name, description) {
    const auth: any = this.cookie.getObject('auth');
    const params = 'data=' + JSON.stringify({
      name,
      description,
    });

    const headers = new Headers({
      'Authorization': 'Bearer ' + auth.accessToken,
      'content-type': 'application/x-www-form-urlencoded',
    });
    const options = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:3000/playlists?id=' + auth.id, params, options)
      .subscribe((data) => console.log(data.json()));
  }
}
