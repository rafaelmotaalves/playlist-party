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
    private auth: AuthService,
    private playlist: PlaylistService,
    private cookie: CookieService,
    private tracks: TracksService,
    private router: Router,
  ) {}

  ngOnInit() {
    if (!this.auth.isLoggedIn() && !window.location.href.includes('callback')) {
      this.router.navigate(['/login']);
    }
  }

}
