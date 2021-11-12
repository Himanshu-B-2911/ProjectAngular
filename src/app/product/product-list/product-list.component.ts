import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../product';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../product.service';
import { ProductAddComponent } from '../product-add/product-add.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['Index', 'Product name', 'Description', 'Price','action'];
   
  ProductdataSource: MatTableDataSource<Product>;

  constructor(public dialog: MatDialog,private productservice:ProductService,private router:Router) { }

  ngOnInit() {
    this.getUser();
}

//Get UserData
getUser(){
this.productservice.getProduct()
.then((responce : any) =>{
  this.productservice._productList = responce as Product[]
  console.log(this.productservice._productList);
     // Data table
     this.ProductdataSource = new MatTableDataSource(this.productservice._productList);
       setTimeout(() => {
                this.ProductdataSource.paginator = this.paginator;
                      }, 0);
                  });
  }

//Open dialog form
openForm(){
const dialogRef = this.dialog.open(ProductAddComponent,{
width: '450px'
});
   dialogRef.afterClosed().subscribe(result =>{
     
   this.getUser();
   });
  }
// Delete Doctor
deleteUser(_id: any) {
this.productservice.removeProduct(_id)
.subscribe(res => {
  });
  this.getUser();
 }
//UpdateUser
UpdateUser(_id:string){
//this.router.navigate(['./home/Useredit',_id])
}

//Table Filter
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
     this.ProductdataSource.filter = filterValue.trim().toLowerCase();
     }

}
