import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockListComponent } from './stock/stock-list/stock-list.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { SalesListComponent } from './sales/sales-list/sales-list.component';

import { PurchaseListComponent } from './purchase/purchase-list/purchase-list.component';

import { AccountListComponent } from './account/account-list/account-list.component';
import { AccountAddComponent } from './account/account-add/account-add.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { SaleFormComponent } from './sales/sale-form/sale-form.component';
import { InvoiceComponent } from './sales/invoice/invoice.component';
import { PurchaseEditComponent } from './purchase/purchase-edit/purchase-edit.component';
import { PrintLayoutComponent } from './sales/print-layout/print-layout.component';




const routes: Routes = [ 
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',

  },
  { 
    path:'login',
    component:LoginComponent
  },
  { path: 'print',
    outlet: 'print',
    component: PrintLayoutComponent,
    children: [
      { path: 'invoice/:_id', component: InvoiceComponent }
    ]
  },
   /*----------Home--------*/
   {
    path:'home',
    component:HomeComponent,
   //canActivate: [AuthGuard],
    children: [
      {
        path:'',
        children: [
           /*----------Dashboard--------*/
           {path:'',component:DashboardComponent},
          /*----------Account--------*/
          {path:'Accontlist',component:AccountListComponent },
          {path:'Accountadd',component:AccountAddComponent },
          /*----------Stock--------*/
          {path:'stocklist',component:StockListComponent },
         
          /*----------Sales--------*/

          {path:'salelist',component:SalesListComponent }, 
          {path:'saleform',component:SaleFormComponent },
          {path:'invoice/:_id',component:InvoiceComponent },

          /*----------Purchase--------*/
          {path:'purchaselist',component:PurchaseListComponent },
          {path:'purchaseedit/:_id',component:PurchaseEditComponent }, 
          /*----------Users--------*/
          {path:'Userlist',component:UserListComponent },
          {path:'Useredit/:_id',component:UserEditComponent }, 
          
           /*----------Produsct add--------*/
           {path:'productedit/:_id',component:ProductEditComponent }, 
           {path:'productlist',component:ProductListComponent }
          
          
        ]
      }
    ]
  },
]
 


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
