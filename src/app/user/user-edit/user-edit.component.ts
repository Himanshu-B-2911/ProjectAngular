import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserAddComponent } from '../user-add/user-add.component';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  UserForm:FormGroup;
  _id='';
  user_Name='';
  mobileNo='';
  address='';
  updated: Date = null;

  constructor(
                public fb: FormBuilder,
                public userservice : UserService,
                public router:Router,
                private route: ActivatedRoute,
              ) { }

  ngOnInit() {
    this.formAccess();
    this.getUser(this.route.snapshot.params._id);
  }
  //Form Access
  formAccess(){
    this.UserForm = this.fb.group({
      user_Name: ['',[Validators.required]],
      mobileNo:['',[Validators.required]],
      address:['',[Validators.required]]
    });
  }
  getUser(_id: any) {
    this.userservice.getUserById(_id).subscribe((data: any) => {
      this._id = data._id;
      this.UserForm.setValue({
        user_Name: data.user_Name,
        mobileNo: data.mobileNo,
        address: data.address
      });   
    });
  }

  UpdateUser(){
    this.userservice.updateUser(this._id, this.UserForm.value)
      .subscribe((res: any) => {
          const id = res._id;
          console.log(id)
          this.router.navigate(['./home/Userlist']);
        }); 
    }
}
