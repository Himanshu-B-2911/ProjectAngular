import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SalesService } from '../sales.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../user/user.service';
import { UserData } from '../../user/user-data';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { SalesAddComponent } from '../sales-add/sales-add.component';
import { PrintService } from '../print.service';


@Component({
  selector: 'app-sale-form',
  templateUrl: './sale-form.component.html',
  styleUrls: ['./sale-form.component.css']
})
export class SaleFormComponent implements OnInit {

  userList:UserData[];
   
 
  constructor( private saleService:SalesService,
               private userservice:UserService,
               private currentRoute:ActivatedRoute,
               private dialog: MatDialog,
               private router : Router,
               public printService:PrintService) { }

  ngOnInit() {
    this.getUser();
      
      let sales_id = this.currentRoute.snapshot.paramMap.get('sales_id');
         if (sales_id == null )
            this.resetForm();
  
        else {
        
            
              
             }
          }
  //----Manage Form Control
  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
      this.saleService.formData = {
        sales_id: Math.floor(100000 + Math.random() * 900000).toString(),
        user_id:'',
        user_Name:'',
        mobileNo:0,
        pay_Method:null,
        GTotal:0,
        DeleteIdbyproduct:'',
      };

    this.saleService.saleslist = [];
  }
  //------FetCh UseData For DropDown
  getUser(){
      this.userservice.getUser()
      .then(res=> this.userList = res as UserData[]
      )
  }
  //--------Dialoge Box
  AddOrEditOrderItem(orderItemIndex,sales_id, user_Mobile) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    
    dialogConfig.width = "50%";
    dialogConfig.data = { orderItemIndex, sales_id ,user_Mobile:this.saleService.formData.mobileNo  };
  
    this.dialog.open(SalesAddComponent, dialogConfig).afterClosed().subscribe(res => {
    this.updateGrandTotal();
    });
  }
  //-----------Calculate Grand Total------//
  updateGrandTotal() {
    this.saleService.formData.GTotal  = this.saleService.saleslist.reduce((prev, curr) => {
    return prev + curr.prod_Total;
    }, 0);
    this.saleService.formData.GTotal = parseFloat(this.saleService.formData.GTotal.toFixed(2));
  }
  //-----------Delete Item by id-----------//
  onDeleteOrderItem(orderItemID: number, i: number) {
    if (orderItemID != null)
      this.saleService.formData.DeleteIdbyproduct += ",";
      this.saleService.saleslist.splice(i, 1);
      this.updateGrandTotal();
  }

//-------------Set data by drop down------------//
  updateUser(ctrl){
    if (ctrl.selectedIndex == 0) {
      this.saleService.formData.mobileNo= 0;
      this.saleService.formData.user_Name = '';
      this.saleService.formData.user_id= '';
    }
    else {
      this.saleService.formData.mobileNo = this.userList[ctrl.selectedIndex - 1].mobileNo;
      this.saleService.formData.user_Name = this.userList[ctrl.selectedIndex - 1].user_Name;
      this.saleService.formData.user_id = this.userList[ctrl.selectedIndex - 1]._id;
      console.log('Get',this.saleService.formData.user_id );
      
    }
  }
  onSubmit(form :NgForm){
    console.log(form.value);
        this.saleService.postSales(form.value)
    .subscribe((res:any)=>{
        console.log(res)
        this.router.navigate(['/home/salelist'])
    }) 
}


  printInvoice() {
   
      window.print();
  }
  
}
