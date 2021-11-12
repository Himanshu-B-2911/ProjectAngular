import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { PurchaseService } from '../../purchase/purchase.service';
import { MatPaginator } from '@angular/material/paginator';
import { StockService } from '../stock.service';

export interface Stock {
  
    prod_Name:string
    prod_Qunt:number;
    prod_Price:number;
    prod_Total:number;
}



@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['Index', 'name',  'Quntity','Price'];
  
  StockdataSource: MatTableDataSource<Stock>;

  applyFilter(filterValue: string) {
    this.StockdataSource.filter = filterValue.trim().toLowerCase();
  }
  
  constructor(public stockService:StockService) { }

  ngOnInit() {
    this.getPuchase();
  }

//Get StockData
  getPuchase(){
    this.stockService.getStock()
      .subscribe((responce : any) =>{
        this.stockService._stockList = responce;
        console.log(this.stockService._stockList);
           // Data table
           this.StockdataSource = new MatTableDataSource(this.stockService._stockList);
             setTimeout(() => {
                      this.StockdataSource.paginator = this.paginator;
                            }, 0);
                        });
        }
}
