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

  ngOnInit(): void {
    const userObserver = {
      next: (user: any) => this.onUserUpdated(user),
      error: (err: Error) => this.user = null,
    };
    this.userService.userObservable$.subscribe(userObserver);
    this.getMovies();
  }

  onUserUpdated(user:any){
    this.user = user;
    if(this.user)
      this.getMovies();
  }

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

    if(this.user.FavoriteMovies.includes(movieId)){
      this.userService.removeFavorite(this.user.Username, movieId).subscribe();
    }
    else{
      this.userService.addFavorite(this.user.Username, movieId).subscribe();
    }
  }

  getIcon = (movieId: string):string=>{
    if(this.user.FavoriteMovies.includes(movieId)){
      return "favorite"
    }
    else
      return 'favorite_border'
  }
}
