import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import {AppRoute} from './app.route';

import { AppComponent } from './app.component';

import { BillingComponent } from './billing/billing.component';
import { FirmComponent } from './bussinessfirm/firm.component';
import { CustomerComponent } from './customer/customer.component';
import { ItemComponent } from './item/item.component';
import { PaymentComponent } from './payment/payment.component';
import { SalesComponent } from './sales/sales.component';
import { UploadComponent } from './upload/upload.component';
import { ValidateComponent } from './validate/validate.component';


import { FirmService } from './bussinessfirm/firm.service';
import {CustomerService } from './customer/customer.service';
import {ItemService } from './item/item.service';
import {PaymentService } from './payment/payment.service';
import {SalesService } from './sales/sales.service';
import {UploadService } from './upload/upload.service';
import {ValidateService } from './validate/validate.service';
import {BillingService } from './billing/billing.service';



@NgModule({
  declarations: [
    AppComponent,
	BillingComponent,
	FirmComponent,
	CustomerComponent,
	ItemComponent,
	PaymentComponent,
	SalesComponent,
	UploadComponent,
	ValidateComponent
  ],
  imports: [
    BrowserModule,
	AppRoute,
	HttpModule
  ],
  providers: [FirmService, CustomerService, ItemService, PaymentService,SalesService, UploadService, ValidateService, BillingService],
  bootstrap: [AppComponent]
})
export class AppModule {}
