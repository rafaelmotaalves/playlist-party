import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable()

export class TracksService {
  constructor(
    private http: Http,
    private router: Router,
    private cookie: CookieService,
  ) { }

  search(query: string) {
    const auth: any = this.cookie.getObject('auth');

    const headers = new Headers({
      'Authorization': 'Bearer ' + auth.accessToken,
      'content-type': 'application/x-www-form-urlencoded',
    });
    const options = new RequestOptions({ headers: headers });
    return this.http.get('http://localhost:8080/tracks/search?q=' + query, options)
      .pipe(map((data: Response) => data.json()));
  }
}
