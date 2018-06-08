import {Component, OnInit} from '@angular/core';
import { FirmService } from './firm.service';
import { Firm } from './firm';
@Component({
	selector: 'firm',
	templateUrl: './firm.component.html',
  styleUrls: ['./firm.component.css']
	
})
export class FirmComponent{
	constructor(private firmService:FirmService){ 
	
	this.firmService.getFirms();
	
	}
	
	firm: Firm[];
	errorMessage="";
	ngOnInit() {
		
     this.firmService.getFirms().subscribe(result => this.firm = result);
    }
	
	
	
}

