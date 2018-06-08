import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Payment } from './payment';

import { environment } from '../../environments/environment' ;

@Injectable()
export class PaymentService{
	private baseUrl = environment.api + 'payments';
	constructor(private http: Http) { }
	
	
	getFirms(): Observable<Payment[]> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
			 .do(data => console.log('getFirm: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
	
	 getFirm(id: number): Observable<Payment> {
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
	
	savePayment(payment: Payment): Observable<Payment> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (payment.paymentId === 0) {
            return this.createPayment(payment, options);
        }
        return this.updatePayment(payment, options);
    }

    private createPayment(payment: Payment, options: RequestOptions): Observable<Payment> {
        payment.paymentId = undefined;
        return this.http.post(this.baseUrl, payment, options)
            .map(this.extractData)
            .do(data => console.log('createfirm: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updatePayment(payment: Payment, options: RequestOptions): Observable<Payment> {
        const url = this.baseUrl+'/'+payment.paymentId;
        return this.http.put(url, payment, options)
            .map(() => payment)
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