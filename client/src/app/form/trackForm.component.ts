import { Component, Input, Output, EventEmitter} from '@angular/core';
import { TracksService } from '../services/tracks.service';
import { PlaylistService } from '../services/playlist.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-track',
  templateUrl: 'trackForm.component.html',
  styleUrls: ['./trackForm.component.css'],
  providers: [TracksService, PlaylistService],
})

export class TrackFormComponent {


  @Input() playlistId: string;

  @Output() addTrackEvent = new EventEmitter<string>();

  tracks = [];
  model = { query: '' };
  constructor(
    private track: TracksService,
    private _playlist: PlaylistService,
    private route: ActivatedRoute,
  ) { }

  playlist = {};



  searchTracks(query: string) {
    if (query.length <  2) {
      this.tracks = [];
    } else {
      this.track.search(query.split(' ').join('%20'))
        .subscribe( data => this.tracks = data);
    }
  }

  addTrack(track) {
    this._playlist.addTrack(this.playlistId, track.uri);
    this.tracks = [];
    this.addTrackEvent.emit(track);
  }

}
