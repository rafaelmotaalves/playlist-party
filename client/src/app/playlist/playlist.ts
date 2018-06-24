export interface Playlist {
  name: string;
  description: string;
  img: string;
  spotifyId: string;
  owner: string;
  tracks: [{ name: string, album: string, artists: string, uri: string }];
};