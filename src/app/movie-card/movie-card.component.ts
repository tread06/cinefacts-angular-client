import { UserService } from './../fetch-api-data.service';
import { DirectorViewComponent } from './../director-view/director-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';

import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { FlexibleConnectedPositionStrategy } from '@angular/cdk/overlay';


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

  /**
  * Called on component initialization.
  * Subscribes to the user observable.
  */
  ngOnInit(): void {
    const userObserver = {
      next: (user: any) => this.onUserUpdated(user),
      error: (err: Error) => this.user = null,
    };
    this.userService.userObservable$.subscribe(userObserver);
    this.getMovies();
  }

  /**
  * Called when the user is updated.
  * Updates the local user and calls getMovies is the user is not null.
  */
  onUserUpdated(user:any){
    this.user = user;
    if(this.user)
      this.getMovies();
  }

  /**
  * Populates the movie list using the movie service.
  * Filters movies using a user filter if one was passed to the component.
  */
  getMovies(): void {
    this.movieService.getAllMovies().subscribe((responce: any) => {
      this.movies = responce;

      //filter movies if a user filter is found
      if(this.userFilter){
        this.movies = this.movies.filter((movie)=>{
          return this.userFilter.includes(movie._id);
        });
      }
    });
  }

  /**
  * Called when the genre link is clicked.
  * Open the genre dialog.
  */
  openGenreDialog(name: string, info: string): void {
    this.dialog.open(GenreViewComponent, {
      width: '280px',
      data: {
        name: name,
        info: info
      }
    });
  }

  /**
  * Called when the director link is clicked.
  * Open the director dialog.
  */
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

  /**
  * Called when the synopsis link is clicked.
  * Open the synopsis dialog.
  */
  openSynopsisDialog(title: string, description:string): void {
    this.dialog.open(SynopsisViewComponent, {
      width: '280px',
      data: {
        title: title,
        description: description

      }
    });
  }

  /**
  * Called when the toggle favroite button is clicked.
  * Adds or removes the current movie form the user's favorites using the user service.
  */
  toggleFavorite(movieId: string): void {

    if(this.user.FavoriteMovies.includes(movieId)){
      this.userService.removeFavorite(this.user.Username, movieId).subscribe();
    }
    else{
      this.userService.addFavorite(this.user.Username, movieId).subscribe();
    }
  }

  /**
  * Returns the filled icon if the movie favorited.
  * Returns the empty icon if the movie is unfavorited.
  */
  getIsFavoriteIcon = (movieId: string):string=>{
    if(this.user.FavoriteMovies.includes(movieId)){
      return "favorite"
    }
    else
      return 'favorite_border'
  }
}
