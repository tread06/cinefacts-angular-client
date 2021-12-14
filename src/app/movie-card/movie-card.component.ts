import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {

  @Input() userFilter!: any[];

  movies: any[] = [];
  constructor(public movieService: MovieService) { }

ngOnInit(): void {
  this.getMovies();
}

getMovies(): void {
  this.movieService.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      if(this.userFilter){
        this.movies = this.movies.filter((movie)=>{
          this.userFilter.includes(movie._id);
        });
      }
    });
  }
}
