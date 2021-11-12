import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { SalesService } from '../sales.service';
import { Sales } from '../sales';
import { MatPaginator } from '@angular/material/paginator';
import { PrintService } from '../print.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.css']
})
export class SalesListComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['Index','Order No.', 'Customer', 'Contact', 'Date','Action','Detail'];
  SalesdataSource: MatTableDataSource<Sales>;

  applyFilter(filterValue: string) {
    this.SalesdataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private SalesService:SalesService,
              private printService :PrintService,
              private route :ActivatedRoute) {
    
   }

  ngOnInit() {
    this.getSales();
   
  }
  //Get UserData
    getSales(){
      this.SalesService.getSales()
            .subscribe((responce : any) =>{
                this.SalesService.SalesOrder = responce;
                     console.log(this.SalesService.SalesOrder);
                      // Data table
                      this.SalesdataSource = new MatTableDataSource(this.SalesService.SalesOrder);
                          setTimeout(() => {
                                this.SalesdataSource.paginator = this.paginator;
                                 }, 0);
                           });
                      }
                      onPrintInvoice(_id:any) {
                        console.log(_id);
                        this.printService
                        .printDocument('invoice', _id);
                        
                       
                      }
                      getUserSales(ctr){
                        console.log(ctr);
                        
                        this.SalesService.gteUserProduct(ctr).subscribe(res =>{
                          console.log(res);
                          
                        })

                      }

}
