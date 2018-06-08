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