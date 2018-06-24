import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()

export class PlaylistService {
  constructor(
    private http: Http,
    private router: Router,
    private cookie: CookieService,
  ) { }

  getUserPlaylists() {
    const auth: any = this.cookie.getObject('auth');
    return this.http.get('http://localhost:3000/playlists?id=' + auth.id)
      .pipe(map(data => data.json()));
  }

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
      .subscribe(data => console.log(data.json()));
  }

  addTrack(playlist, uri) {
    console.log('addTrack');
    const auth: any = this.cookie.getObject('auth');

    const headers = new Headers({
      'Authorization': 'Bearer ' + auth.accessToken,
    });
    const options = new RequestOptions({ headers: headers });
    return this.http.get(`http://localhost:3000/playlists/${playlist}/add/${uri}?id=` + auth.id, options)
      .subscribe(data => console.log(data.json()));
  }

  showPlaylist(id) {
    const auth: any = this.cookie.getObject('auth');

    const headers = new Headers({
      'Authorization': 'Bearer ' + auth.accessToken,
    });
    const options = new RequestOptions({ headers });
    return this.http.get(`http://localhost:3000/playlists/${id}?id=` + auth.id, options)
      .pipe(map(data => data.json()));
  }
}

