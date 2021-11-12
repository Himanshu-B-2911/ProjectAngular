import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { Router, ActivatedRoute } from '@angular/router';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-purchase-edit',
  templateUrl: './purchase-edit.component.html',
  styleUrls: ['./purchase-edit.component.css']
})
export class PurchaseEditComponent implements OnInit {

  PrchaseForm:FormGroup;
  _id='';
  prod_Name='';
  prod_Qunt='';
  prod_Price='';
  prod_Total='';
  updated: Date = null;

  constructor(
                public fb: FormBuilder,
                public purchaseservice : PurchaseService,
                public router:Router,
                private route: ActivatedRoute,
              ) { }

  ngOnInit() {
    this.formAccess();
    this.getUser(this.route.snapshot.params._id);
  }
  //Form Access
  formAccess(){
    this.PrchaseForm = this.fb.group({
      prod_Name: ['',[Validators.required]],
      prod_Price:['',[Validators.required]],
      prod_Qunt:['',[Validators.required]],
      prod_Total:['',[Validators.required]]
    });
  }
  getUser(_id: any) {
    this.purchaseservice.getPurchaseById(_id).subscribe((data: any) => {
      this._id = data._id;
      this.PrchaseForm.setValue({
        prod_Name: data.prod_Name,
        prod_Price: data.prod_Price,
        prod_Qunt: data.prod_Qunt,
        prod_Total: data.prod_Total
      });   
    });
  }

  UpdateUser(){
    this.purchaseservice.updatePuchase(this._id, this.PrchaseForm.value)
      .subscribe((res: any) => {
        
          const id = res._id;
          console.log(id)
          this.router.navigate(['./home/purchaselist']);
        }); 
    }

}
