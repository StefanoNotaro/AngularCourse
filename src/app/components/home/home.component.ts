import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  videos: any[] = [];
  selectedVideo: any;

  constructor(public _youtubeService: YoutubeService) {
    _youtubeService.getVideos().subscribe(x => {
      this.videos = x;
    });
  }

  ngOnInit() {
  }

  verVideo(video: any) {
    this.selectedVideo = video;

    $('#myModal').modal();
  }

  cerrarModal() {
    this.selectedVideo = null;

    $('#myModal').modal('hide');
  }

  cargarMasVideos() {
    this._youtubeService.getVideos().subscribe(x => {
      x.forEach(y => {
        this.videos.push(y);
      });
    });
  }

}
