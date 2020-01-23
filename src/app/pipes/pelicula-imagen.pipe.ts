import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'peliculaImagen'
})
export class PeliculaImagenPipe implements PipeTransform {

  transform(pelicula: any, isPoster = false): any {
    if (!pelicula) {
      return 'assets/images/NoImageAvailable.png';
    }

    const url = 'http://image.tmdb.org/t/p/w500';

    if (pelicula.poster_path && isPoster) {
      return url + pelicula.poster_path;
    } else if (pelicula.backdrop_path) {
      return url + pelicula.backdrop_path;
    } else if (pelicula.poster_path) {
      return url + pelicula.poster_path;
    }

    return 'assets/images/NoImageAvailable.png';
  }

}
