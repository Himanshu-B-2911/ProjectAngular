import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { PurchaseService } from '../purchase.service';
import { PurchaseAddComponent } from '../purchase-add/purchase-add.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Purchase } from '../purchase';



@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['Index', 'name', 'Date', 'Quntity','Price','Total','action'];

  PurchasedataSource: MatTableDataSource<Purchase>;

  applyFilter(filterValue: string) {
    this.PurchasedataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private purchaseservice:PurchaseService, public dialog: MatDialog
              ) { }

  ngOnInit() {
    this.getPuchase();
  }
  
//Get UserData
getPuchase(){
  this.purchaseservice.getPurchase()
    .subscribe((responce : any) =>{
        this.purchaseservice._purchaseList = responce;
        console.log(this.purchaseservice._purchaseList);
           // Data table
           this.PurchasedataSource = new MatTableDataSource(this.purchaseservice._purchaseList);
             setTimeout(() => {
                      this.PurchasedataSource.paginator = this.paginator;
                            }, 0);
                        });
        }

//Open dialog form
openForm(){
   const dialogRef = this.dialog.open(PurchaseAddComponent,{
    width: '450px'
      });
         dialogRef.afterClosed().subscribe(result =>{
           
         this.getPuchase();
         });
        }
// Delete Doctor
deletePuchase(_id: any) {
  this.purchaseservice.removePuchase(_id)
      .subscribe(res => {
        });
        this.getPuchase();
       }
//UpdateUser
UpdatePuchase(_id:string){
//this.router.navigate(['./home/Useredit',_id])
}

//Table Filter

}
