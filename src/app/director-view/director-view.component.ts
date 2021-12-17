import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.css']
})
export class DirectorViewComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DirectorViewComponent>,
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
