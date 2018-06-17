import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Playlist } from './playlist';
import { PlaylistService } from '../services/playlist.service';
@Component({
  selector: 'playlist-form',
  templateUrl: 'playlistForm.component.html',
  providers: [AuthService],
})

export class PlayListFormComponent {

  model = new Playlist('', '');
  constructor(
    private auth: AuthService,
    private playlist: PlaylistService,
  ) { }

  print(a) {
    console.log(a);
  }
}
