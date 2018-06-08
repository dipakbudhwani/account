app.get('/api/firms', function(req, res) {
	res.send([{"firmId":10,
	"firmName": 'ABP',
	"proprietor": 'Dipak',
	"adress": 'Paratwada',
	"city": 'Paratwada',
	"contact": '940537869',
	"emergencyContact": '940537869',
	"package": {packageId: 30, packageName: 'Silver',price: 3000, isActive: 1},
	"AddedBy":'Sam'},
	{"firmId":20,
	"firmName": 'ABP',
	"proprietor": 'Dipak',
	"adress": 'Paratwada',
	"city": 'Paratwada',
	"contact": '940537869',
	"emergencyContact": '940537869',
	"package": {packageId: 40, packageName: 'Gold',price: 4500, isActive: 1},
	"AddedBy":'Sam'}]);
});


export class Billing{
	billingId:number;
	CustId:number;
	DateTime:string;
	TotalAmount:number;
	nextBillId: number;
}

import { Package } from './package';

export class Firm{
	firmId:number;
	firmName: string;
	proprietor: string;
	adress: string;
	city: string;
	contact: string;
	emergencyContact: string;
	package: Package;
	AddedBy:string;
}

export class Package{
	packageId:number;
	packageName:string;
	price:number;
	isActive:number;
}

export class Customer{
	customerId:number;
 name:string;
 address:string;
 contact:string;
 creditLimit:number;
 addedBy:string;
 firmId:number;
}


export class Item{
	itemId:number;
	name:string;
	desc:string;
	AddedBy:string;
}

export class Payment{
	paymentId:number;
	amount:number;
	dateTime:string;
	custId:number;
	addedBy:string;
	approvedBy:string;
	firmId:number;
}

export class Sales{
	saleId:number;
	itemId:number;
	quantity:number;
	price:number;
	comision:number;
	salesAmount:number;
	dateTime:string ;
	billId:number;
	custId:number;
	addedBy:string;
	approvedBy:string;
	firmId:number;
}

export class Upload{
	uploadId:number;
	fileUrls:string[];
	fileCount: number;
	firmId:number;
	dateTime: string;
	validationId: number;
}

export class Validate{
	validateId:number;
	isValidated: number;
	firmId:number;
	dateTime: string;
}
