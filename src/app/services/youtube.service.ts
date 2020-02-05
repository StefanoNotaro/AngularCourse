import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private baseUrl = 'https://www.googleapis.com/youtube/v3';

  private apiKey = 'AIzaSyBwvFXhvwFfIsmbusinfTA0CVDSlfrgbck';

  private uploads = 'UUXuqSBlHAE6Xw-yeJA0Tunw';

  private nextPageToken = '';

  constructor(public _htppClient: HttpClient) { }

  getVideos() {
    const url = `${ this.baseUrl }/playlistItems`;

    const params = new HttpParams()
      .set('part', 'snippet')
      .set('maxResult', '10')
      .set('playlistId', this.uploads)
      .set('key', this.apiKey);

    if (this.nextPageToken) {
      params.set('pageToken', this.nextPageToken);
    }

    console.log('pageToken:', this.nextPageToken);
    console.log('params: ', params.toString());
    return this._htppClient.get(url, { params })
    .pipe(
      map((x: any) => {
        this.nextPageToken = x.nextPageToken;

        let videos: any[] = [];

        x.items.forEach((y: any) => {
          let snippet = y.snippet;
          videos.push(snippet);
        });

        return videos ;
      })
    );
  }
}
