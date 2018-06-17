import { Component } from '@angular/core';
import { TracksService } from '../services/tracks.service';

@Component({
  selector: 'track-form',
  templateUrl: 'trackForm.component.html',
  providers: [TracksService],
})

export class TrackFormComponent {

  tracks = [];
  model = { query: '' };
  constructor(
    private track: TracksService,
  ) { }

  getTracks(query: string) {
    if (query.length <  2) {
      this.tracks = [];
    } else {
      this.track.search(query.split(' ').join('%20'))
        .subscribe( data => this.tracks = data);
    }
  }
}
