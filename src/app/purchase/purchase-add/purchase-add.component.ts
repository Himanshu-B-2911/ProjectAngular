import { Component, OnInit } from '@angular/core';


import { PurchaseService } from '../purchase.service';
import { MatDialogRef } from '@angular/material/dialog';

import { ProductService } from '../../product/product.service';
import { Product } from '../../product/product';
import { NgForm } from '@angular/forms';
import { Purchase } from '../purchase';
import { StockService } from '../../stock/stock.service';

@Component({
  selector: 'app-purchase-add',
  templateUrl: './purchase-add.component.html',
  styleUrls: ['./purchase-add.component.css']
})
export class PurchaseAddComponent implements OnInit {

  formData : Purchase;

  productList : Product[];
  entry;
  constructor(public dialogRef: MatDialogRef<PurchaseAddComponent>,
              public purchaseservice : PurchaseService,
              public productService:ProductService,
              public stockservice:StockService
                ) { }

  ngOnInit() {
            this.productService.getProduct().then(res => {this.productList = res as Product[]});
            
                this.formData = {
                  prod_id:'',
                  prod_Name:'',
                  prod_Price:0,
                  prod_Qunt:0,
                  prod_Total:0,
                  date:null
                }
              }
              updatePrice(ctrl) {
                if (ctrl.selectedIndex == 0) {
                  this.formData.prod_Price = 0;
                  this.formData.prod_Name = '';
                }
                else {
                  this.formData.prod_Price = this.productList[ctrl.selectedIndex - 1].prod_Price;
                  this.formData.prod_Name = this.productList[ctrl.selectedIndex - 1].prod_Name;
                }
               
              }
              UpdateTotal(){
                this.formData.prod_Total = parseFloat((this.formData.prod_Qunt * this.formData.prod_Price).toFixed(2));
               
              }
              onSubmit(form:NgForm){
                this.entry  = form.value;
                console.log(this.entry)
                    this.purchaseservice.addPurchase(this.entry)
                    .subscribe(res =>{
                      console.log(res)
                      this.entry = res;
                      this.purchaseservice._purchaseList.push(this.entry)
                    });
                    this.AddStock();
                    this.dialogRef.close();
              }
              AddStock(){
                  this.stockservice.postStock(this.entry).subscribe(res =>{ 
                    console.log(res);
                })
                
                 
              }
}