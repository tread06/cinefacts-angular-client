import { Component, OnInit } from '@angular/core';
import { MovieService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {

  movies: any[] = [];
  constructor(public movieService: MovieService) { }

ngOnInit(): void {
  this.getMovies();
}

getMovies(): void {
  console.log("Try get movies");
  this.movieService.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
}
