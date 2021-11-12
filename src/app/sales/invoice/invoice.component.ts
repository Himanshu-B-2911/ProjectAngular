import { Component, OnInit } from '@angular/core';
import { PrintService } from '../print.service';
import { ActivatedRoute } from '@angular/router';
import { SalesService } from '../sales.service';
import { Sales } from '../sales';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
 
  customerData=[];

  constructor(private route: ActivatedRoute,
              private salesservice:SalesService) { }

  ngOnInit() {
    this.getCustomer(this.route.snapshot.params._id);
  }
  getCustomer(_id:any){
    this.salesservice.getOrderByID(_id)
    .subscribe(res => {this.customerData = res
      console.log(res);} )
    
    
  }

}
