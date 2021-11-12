import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  ProductForm:FormGroup;
  _id='';
  prod_Name='';
  prod_Desc='';
  prod_Price='';
  updated: Date = null;

  constructor(
                public fb: FormBuilder,
                public productservice : ProductService,
                public router:Router,
                private route: ActivatedRoute,
              ) { }

  ngOnInit() {
    this.formAccess();
    this.getProduct(this.route.snapshot.params._id);
  }
  //Form Access
  formAccess(){
    this.ProductForm = this.fb.group({
      prod_Name: ['',[Validators.required]],
      prod_Desc:['',[Validators.required]],
      prod_Price:['',[Validators.required]]
    });
  }
  getProduct(_id: any) {
    this.productservice.getProductById(_id).subscribe((data: any) => {
      this._id = data._id;
      this.ProductForm.setValue({
        prod_Name: data.prod_Name,
        prod_Desc: data.prod_Desc,
        prod_Price: data.prod_Price
        
      });
    });
  }

  UpdateProduct(){
    this.productservice.updateProduct(this._id, this.ProductForm.value)
      .subscribe((res: any) => {
          const id = res._id;
          console.log(id)
          this.router.navigate(['./home/productlist']);
        }); 
    }
}
