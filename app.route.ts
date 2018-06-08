import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';




import { BillingComponent } from './billing/billing.component';
import { FirmComponent } from './bussinessfirm/firm.component';
import { CustomerComponent } from './customer/customer.component';
import { ItemComponent } from './item/item.component';
import { PaymentComponent } from './payment/payment.component';
import { SalesComponent } from './sales/sales.component';
import { UploadComponent } from './upload/upload.component';
import { ValidateComponent } from './validate/validate.component';



const routes:Routes = [{path:'billing',component:BillingComponent},
{path:'firm',component:FirmComponent},
{path:'customer',component:CustomerComponent},
{path:'item',component:ItemComponent},
{path:'payment',component:PaymentComponent},
{path:'sales',component:SalesComponent},
{path:'upload',component:UploadComponent},
{path:'validate',component:ValidateComponent}];

@NgModule({
	imports:[RouterModule.forRoot(routes)],
	exports:[RouterModule]
	
})

export class AppRoute{}