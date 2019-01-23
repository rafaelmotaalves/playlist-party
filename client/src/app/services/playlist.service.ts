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
    return this.http.get('http://localhost:8080/playlists?id=' + auth.id)
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

    return this.http.post('http://localhost:8080/playlists?id=' + auth.id, params, options)
      .subscribe(data => this.router.navigate(['playlists/' + data.json()._id ]));
  }

  addTrack(playlist, uri) {
    const auth: any = this.cookie.getObject('auth');

    const headers = new Headers({
      'Authorization': 'Bearer ' + auth.accessToken,
    });
    const options = new RequestOptions({ headers: headers });
    return this.http.get(`http://localhost:8080/playlists/${playlist}/add/${uri}?id=` + auth.id, options)
      .subscribe(data => console.log(data.json()));
  }

  deletePlaylist(id) {
    const auth: any = this.cookie.getObject('auth');
    const headers = new Headers({
      'Authorization': 'Bearer ' + auth.accessToken,
    });
    const options = new RequestOptions({ headers });
    console.log(id);

    return this.http.delete(`http://localhost:8080/playlists/${id}`)
      .subscribe(data => console.log(data.json()));

  }

  showPlaylist(id) {
    const auth: any = this.cookie.getObject('auth');

    const headers = new Headers({
      'Authorization': 'Bearer ' + auth.accessToken,
    });
    const options = new RequestOptions({ headers });
    return this.http.get(`http://localhost:8080/playlists/${id}?id=` + auth.id, options)
      .pipe(map(data => data.json()));
  }
}

