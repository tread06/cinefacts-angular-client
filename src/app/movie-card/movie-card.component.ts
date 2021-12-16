import { UserService } from './../fetch-api-data.service';
import { DirectorViewComponent } from './../director-view/director-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';

import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {

  @Input() userFilter!: any[];

  //store user to check for movie id
  user: any= null;

  movies: any[] = [];
  constructor(public movieService: MovieService, private userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    const userObserver = {
      next: (user: any) => this.user = user,
      error: (err: Error) => this.user = null,
    };
    this.userService.userObservable$.subscribe(userObserver);
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getAllMovies().subscribe((responce: any) => {
      this.movies = responce;
      if(this.userFilter){
        this.movies = this.movies.filter((movie)=>{
          this.userFilter.includes(movie._id);
        });
      }
      console.log(this.movies);
    });
  }

  openGenreDialog(name: string, info: string): void {
    this.dialog.open(GenreViewComponent, {
      width: '280px',
      data: {
        name: name,
        info: info
      }
    });
  }
  openDirectorDialog(name: string, birth: string, death: string, bio: string): void {
    this.dialog.open(DirectorViewComponent, {
      width: '280px',
      data: {
        name: name,
        birth: birth,
        death: death,
        bio: bio
      }
    });
  }
  openSynopsisDialog(title: string, description:string): void {
    this.dialog.open(SynopsisViewComponent, {
      width: '280px',
      data: {
        title: title,
        description: description

      }
    });
  }
  toggleFavorite(movieId: string): void {

    console.log(this.user);
    let isFavorite:boolean = this.user.FavoriteMovies.includes(movieId);

    const favorites = {
      next: (user: any) => console.log(user),
      error: (err: Error) => console.log(err),
    };

    if(isFavorite){
      console.log("Trying to remove favorite");
      this.userService.removeFavorite(this.user.Username, movieId).subscribe(favorites);
    }
    else{
      console.log("Trying to add favorite");
      this.userService.addFavorite(this.user.Username, movieId).subscribe(favorites);
    }
  }
}
