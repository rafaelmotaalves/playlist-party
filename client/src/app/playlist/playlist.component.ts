import { Component, Input} from '@angular/core';
import { PlaylistService } from '../services/playlist.service';
import { ActivatedRoute } from '@angular/router';
import { TrackFormComponent } from '../form/trackForm.component';
import { Playlist } from './playlist';


@Component({
  selector: 'app-playlist',
  templateUrl: 'playlist.component.html',
  styleUrls: ['./playlist.component.css'],
  providers: [PlaylistService],
})

export class PlaylistComponent {

  @Input() trackForm: TrackFormComponent;

  tracks = [];
  model = { query: '' };
  constructor(
    private _playlist: PlaylistService,
    private _route: ActivatedRoute,
  ) { }

  playlistId;
  playlist: Playlist = <Playlist>{};

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.playlistId = params.id;
      this._playlist.showPlaylist(this.playlistId)
        .subscribe(playlist => this.playlist = playlist);
    });
  }

  receiveTrack($track) {
    this.playlist.tracks.push($track);
  }
}
