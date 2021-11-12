import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Sales } from './sales';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  isPrinting=false;
  PrintData = [];

  constructor(private router:Router) { }
  
  printDocument(documentName: any, documentData:any[]) {
    this.isPrinting = true;
    this.router.navigate(['/',
      { outlets: {
        'print': ['print', documentName, documentData.join()]
      }}]);
  }
  onDataReady() {
    setTimeout(() => {
      window.print();
      this.isPrinting = false;
      this.router.navigate([{ outlets: { print: null }}]);
    });
  }
}
