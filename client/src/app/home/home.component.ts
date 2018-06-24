import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlaylistService } from '../services/playlist.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  providers: [PlaylistService, AuthService],
  styleUrls: ['home.component.css'],
})

export class HomeComponent {

  constructor(
    private auth: AuthService,
    private router: Router,
    private playlist: PlaylistService,
  ) { }

  playlists;

  ngOnInit() {
    this.playlist.getUserPlaylists()
      .subscribe(data => { this.playlists = data; console.log(data)});
  }
}
