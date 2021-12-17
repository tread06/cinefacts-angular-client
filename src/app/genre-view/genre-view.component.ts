import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-view',
  templateUrl: './genre-view.component.html',
  styleUrls: ['./genre-view.component.css']
})
export class GenreViewComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<GenreViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  /**
  * Called when the close button is clicked.
  * Closes the dialog.
  */
  closeDialog(){
    this.dialogRef.close();
  }

}
