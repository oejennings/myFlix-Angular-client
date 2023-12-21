//src/app/movie-card/movie-card.components.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
    ) { }

ngOnInit(): void {
  this.getMovies();

}

/**
 * gets all movies
 * @returns array of movies
 */
getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * returns dialog with information about movies genre
   * @param genre 
   */
  openGenreDialog(genre: any): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: {
        title: genre.Name,
        content: genre.Description,
      }
    })
  }

  /**
   * returns dialog with information about movies description
   * @param synopsis 
   */
  openDescriptionDialog(synopsis: string): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: {
        title: "Description",
        content: synopsis,
      }
    })
  }

  /**
   * returns dialog with information about movies director
   * @param director 
   */
  openDirectorDialog(director: any): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: {
        title: director.Name,
        content: director.Bio,
      }
    })
  }

  /**
   * 
   * @param id 
   * @returns boolean if movies is a favorite movie or not
   */
  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavoriteMovie(id)
  }

  /**
   * removes movie from favorites
   * @param id 
   */
  removeFavorite(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe(() => {
      this.snackBar.open('removed from favorites', 'OK', {
        duration: 2000
      })
    });
  }

  /**
   * add movie to favorites
   * @param id 
   */
  addFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe(() => {
      this.snackBar.open('added to favorites', 'OK', {
        duration: 2000
      })
    });
  }
}
