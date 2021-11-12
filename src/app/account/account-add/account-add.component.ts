import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../account-list/account-list.component';


@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.css']
})
export class AccountAddComponent implements OnInit {

  
  constructor( public dialogRef: MatDialogRef<AccountAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
 
  ngOnInit() {
  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }
}
