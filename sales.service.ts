import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Sales } from './sales';

import { environment } from '../../environments/environment' ;

@Injectable()
export class SalesService{
	private baseUrl = environment.api + 'saless';
	constructor(private http: Http) { }
	
	
	getFirms(): Observable<Sales[]> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
			 .do(data => console.log('getFirm: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
	
	 getFirm(id: number): Observable<Sales> {
        const url = this.baseUrl+'/'+id;
        return this.http.get(url)
            .map(this.extractData)
            .do(data => console.log('getFirm: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
	
	deleteFirm(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = this.baseUrl+'/'+id;
        return this.http.delete(url, options)
            .do(data => console.log('deleteFirm: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
	
	saveSales(sales: Sales): Observable<Sales> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (sales.saleId === 0) {
            return this.createSales(sales, options);
        }
        return this.updateSales(sales, options);
    }

    private createSales(sales: Sales, options: RequestOptions): Observable<Sales> {
        sales.saleId = undefined;
        return this.http.post(this.baseUrl, sales, options)
            .map(this.extractData)
            .do(data => console.log('createfirm: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateSales(sales: Sales, options: RequestOptions): Observable<Sales> {
        const url = this.baseUrl+'/'+sales.saleId;
        return this.http.put(url, sales, options)
            .map(() => sales)
            .do(data => console.log('updateFirm: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
	private extractData(response: Response) {
        let body = response.json();
        return body || {};
    }
	private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error("Error "+error);
        return Observable.throw(error.json().error || 'Server error');
    }
}