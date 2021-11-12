import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../product/product';
import { SalesService } from '../sales.service';
import { NgForm } from '@angular/forms';
import { SalesItem } from '../sales-item';
import { Stock } from '../../stock/stock';
import { StockService } from '../../stock/stock.service';


@Component({
  selector: 'app-sales-add',
  templateUrl: './sales-add.component.html',
  styleUrls: ['./sales-add.component.css']
})
export class SalesAddComponent implements OnInit {
  
  formData : SalesItem;

  productList : Product[];

  Stock : Stock[];

  stockData :Stock;

  _id:string;      //-----Use to manage Stock

  prod_Qunt:number;//------Temp Varibale for Update Stocks

  isValid: boolean = true;

  StockEmpty;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<SalesAddComponent>,
    private stockService:StockService,
    private salesSevice: SalesService
   ) { }

    ngOnInit() {
      this.stockService.getStock().subscribe(res => {this.productList = res as Product[]});
    
      if (this.data.orderItemIndex == null)
          this.formData = {
               user_Mobile:this.data.user_Mobile,
              sales_id: this.data.sales_id,
              prod_id:'', 
              prod_Name:'',
              prod_Price:0,
              prod_Qunt:0,
              prod_Total:0  
        }
      else
        this.formData = Object.assign({}, this.salesSevice.saleslist[this.data.orderItemIndex]);

        this.stockData ={
          _id:'',
          prod_id:'',
          prod_Name:'',
          prod_Price:0,
          prod_Qunt:null,
          prod_Total:0
        }
        console.log('User Id',this.formData.user_Mobile);
              console.log(this.formData.sales_id);
        
        }
       
        
         updatePrice(ctrl) {
            if (ctrl.selectedIndex == 0) {
               this.formData.prod_Price = 0;
               this.formData.prod_Name = '';
               this._id='';
              }
         else {
               this.formData.prod_Price = this.productList[ctrl.selectedIndex - 1].prod_Price;
               this.formData.prod_Name = this.productList[ctrl.selectedIndex - 1].prod_Name;
               this._id= this.productList[ctrl.selectedIndex - 1]._id;

             //-----Get Sock Detail By id
             console.log('Selected Id',this._id);
             this.stockService.getStockById(this._id)
                  .subscribe((res:any) =>{ this.prod_Qunt = res.prod_Qunt
                  if(this.prod_Qunt >= 1){
                     }else{
                           this.StockEmpty = 'Stock Not Avalable';
                          }
                           console.log('Get Data By Id ',res.prod_Qunt);
                           this.stockData._id       = res._id
                           this.stockData.prod_id   = res.prod_id
                           this.stockData.prod_Name = res.prod_Name
                           this.stockData.prod_Price= res.prod_Price
                           this.stockData.prod_Total= res.prod_Total    
                           })   
                          }
                      }
//------------Update Total------------------------------------
              UpdateTotal(){
                    this.formData.prod_Total = parseFloat((this.formData.prod_Qunt * this.formData.prod_Price).toFixed(2));
                   }     
//------------send Data From Dialoge Box------------------------
              onSubmit(form: NgForm){
                //console.log(form.value)
                console.log(form.value);
                
                if(this.prod_Qunt > this.formData.prod_Qunt ){
                    if (this.validateForm(form.value)) {
                          if (this.data.orderItemIndex == null)
                              this.salesSevice.saleslist.push(form.value);
                          else
                            this.salesSevice.saleslist[this.data.orderItemIndex] = form.value;
                            this._id = form.value.prod_id;
                            this.salesSevice.postSP(form.value)
                              .subscribe((res:any)=>{console.log(res)})
                            this.dialogRef.close();
                            }
                            this.CalculateQunt();
              }else{
                    console.log('Empty');
                    this.dialogRef.close();     
                  }
              }
//---------Use To calcular Stock
             CalculateQunt(){
                if(this.prod_Qunt >= this.formData.prod_Qunt ){
                    this.stockData.prod_Qunt = parseFloat((this.prod_Qunt - this.formData.prod_Qunt).toFixed(2))
                    console.log('Result',this.stockData.prod_Qunt);
                    this.updateStock()
                 }else{
                     console.log('Stock not Availbale');
                     }
                 }
//-----------Maintain-----Stock
              updateStock(){
                    this.stockService.updateStock(this._id,this.stockData).subscribe((res:any)=>{
                    })
                } 
              validateForm(formData: SalesItem) {
                this.isValid = true;
                if (formData.prod_id == null)
                  this.isValid = false;
                else if (formData.prod_Qunt == 0)
                  this.isValid = false;
                return this.isValid;
              }
}
