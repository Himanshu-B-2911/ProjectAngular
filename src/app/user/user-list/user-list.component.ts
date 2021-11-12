import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserAddComponent } from '../user-add/user-add.component';
import{ UserData } from '../user-data';
import { UserService } from '../user.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['Index', 'name', 'mobileNo', 'adress','action'];
   
  UserdataSource: MatTableDataSource<UserData>;
   
 
  constructor(public dialog: MatDialog,private userservice:UserService,private router:Router) {}

  ngOnInit() {
            this.getUser();
  }

//Get UserData
getUser(){
    this.userservice.getUser()
      .then(responce  => {this.userservice._usersList = responce as UserData[];
          console.log(this.userservice._usersList);
             // Data table
             this.UserdataSource = new MatTableDataSource(this.userservice._usersList);
               setTimeout(() => {
                        this.UserdataSource.paginator = this.paginator;
                              }, 0);
                             } );
          }

//Open dialog form
openForm(){
     const dialogRef = this.dialog.open(UserAddComponent,{
      width: '450px'
        });
           dialogRef.afterClosed().subscribe(result =>{
             
           this.getUser();
           });
          }
// Delete Doctor
deleteUser(_id: any) {
    this.userservice.removeUser(_id)
        .subscribe(res => {
          });
          this.getUser();
         }


//Table Filter
applyFilter(event: Event) {
          const filterValue = (event.target as HTMLInputElement).value;
             this.UserdataSource.filter = filterValue.trim().toLowerCase();
             }
}
