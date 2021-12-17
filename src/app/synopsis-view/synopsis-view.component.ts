import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-view',
  templateUrl: './synopsis-view.component.html',
  styleUrls: ['./synopsis-view.component.css']
})
export class SynopsisViewComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SynopsisViewComponent>,
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
