import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef,MatDialog } from '@angular/material/dialog';

import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { UserData } from '../user-data';



@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  UserForm: FormGroup;
   user:UserData;
  
  constructor(   public dialogRef: MatDialogRef<UserAddComponent>,
                 public fb: FormBuilder,
                 public userservice : UserService,
                 public router:Router
                 //@Inject(MAT_DIALOG_DATA) public data : any
                 ) { }

  ngOnInit() {
    this.UserformAccess();
  }

//User Form acess
  UserformAccess(){
    this.UserForm = this.fb.group({
      user_Name: ['',[Validators.required]],
      mobileNo:['',[Validators.required]],
      address:['',[Validators.required]]
    });
  }

  //Form DataSubmit & Push to table
  submitUser(){
    let user =this.UserForm.value;
    console.log(this.UserForm.value)
    this.userservice.addUser(user).subscribe(res=>{
            user = res
                this.userservice._usersList.push(user)
                   // this.router.navigate(['./home/Userlist'])
      }) 
       this.dialogRef.close(); 
       this.UserForm.reset();
  }
}
