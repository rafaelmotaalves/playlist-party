import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { PlaylistService } from './services/playlist.service';
import { TracksService } from './services/tracks.service';
import { PlayListFormComponent } from './form/playlistForm.component';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService, PlaylistService, TracksService],
})
export class AppComponent {
  constructor(
    private auth: AuthService,
    private playlist: PlaylistService,
    private cookie: CookieService,
    private tracks: TracksService,
  ) {}

  url: string = window.location.href;
  title = 'Testando Angular :)';

  isLoggedIn(): boolean {
    return this.cookie.getObject('auth') !== undefined;
  }

  

}
