import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productform:FormGroup;

  constructor( public dialogRef: MatDialogRef<ProductAddComponent>,
               public fb: FormBuilder,
               public productservice : ProductService,
               public router:Router) { }

  ngOnInit() {
    this.ProductformAccess();
  }

//Product Form access
 ProductformAccess(){
    this.productform = this.fb.group({
      prod_Name: ['',[Validators.required]],
      prod_Desc:['',[Validators.required]],
      prod_Price:['',[Validators.required]]
    });
  }
  //Form DataSubmit & Push to table
  submitProduct(){
    let product =this.productform.value;
    console.log(this.productform.value)
    this.productservice.addProduct(product).subscribe(res=>{
            product = res
                this.productservice._productList.push(product)
                   // this.router.navigate(['./home/productlist'])
      }) 
       this.dialogRef.close(); 
       this.productform.reset();
  }

}
