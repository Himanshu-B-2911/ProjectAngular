import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import {MatTableModule} from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select'
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StockListComponent } from './stock/stock-list/stock-list.component';

import { SalesListComponent } from './sales/sales-list/sales-list.component';
import { SalesAddComponent } from './sales/sales-add/sales-add.component';
import { PurchaseListComponent } from './purchase/purchase-list/purchase-list.component';
import { PurchaseAddComponent } from './purchase/purchase-add/purchase-add.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { AccountListComponent } from './account/account-list/account-list.component';
import { AccountAddComponent } from './account/account-add/account-add.component';
import { LoginComponent } from './auth/login/login.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { HomeComponent } from './home/home.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {HttpModule } from '@angular/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { PurchaseEditComponent } from './purchase/purchase-edit/purchase-edit.component';
import { SaleFormComponent } from './sales/sale-form/sale-form.component';
import { InvoiceComponent } from './sales/invoice/invoice.component';
import { PrintLayoutComponent } from './sales/print-layout/print-layout.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    StockListComponent,
    SalesListComponent,
    SalesAddComponent,
    PurchaseListComponent,
    PurchaseAddComponent,
    UserListComponent,
    UserAddComponent,
    AccountListComponent,
    AccountAddComponent,
    LoginComponent,
    ChangePasswordComponent,
    HomeComponent,
    UserEditComponent,
    ProductListComponent,
    ProductAddComponent,
    ProductEditComponent,
    PurchaseEditComponent,
    SaleFormComponent,
    InvoiceComponent,
    PrintLayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatDialogModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,
    MatTableModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
      }
  ],
  bootstrap: [AppComponent],
  entryComponents:[UserAddComponent,ProductAddComponent,PurchaseAddComponent,SalesAddComponent]
})
export class AppModule { }
