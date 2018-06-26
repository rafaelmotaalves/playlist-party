import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { PlaylistService } from './services/playlist.service';
import { TracksService } from './services/tracks.service';
import { PlayListFormComponent } from './form/playlistForm.component';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService, PlaylistService, TracksService],
})
export class AppComponent {
  url: string = window.location.href;

  constructor(
    private _auth: AuthService,
    private _playlist: PlaylistService,
    private _cookie: CookieService,
    private _tracks: TracksService,
    private _router: Router,
  ) {}

  ngOnInit() {
    if (this._auth.isLoggedIn()) {
      const auth: any = this._cookie.getObject('auth');
      if (auth.expiresAt < Date.now()) {
        this._auth.refresh(auth.refreshToken)
          .subscribe((newAuth) => {
            auth.accessToken = newAuth.accessToken;
            auth.expiresAt = newAuth.expiresAt;
            console.log(auth);
            return this._cookie.putObject(auth, 'auth');
          });
      }
    } else {
      const route = window.location.href.split('/')[3];
      if (!route.includes('callback')) {
        this._router.navigate(['/login']);
      }
    }
  }

}
