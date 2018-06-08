import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Firm } from './firm';

import { environment } from '../../environments/environment' ;

@Injectable()
export class FirmService{
	private baseUrl = environment.api + 'firms';
	constructor(private http: Http) { }
	
	
	getFirms(): Observable<Firm[]> {
		console.log("called ");
        return this.http.get(this.baseUrl)
            .map(this.extractData)
			 .do(data => console.log('getFirm: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
	
	 getFirm(id: number): Observable<Firm> {
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
	
	saveFirm(firm: Firm): Observable<Firm> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (firm.firmId === 0) {
            return this.createFirm(firm, options);
        }
        return this.updateFirm(firm, options);
    }

    private createFirm(firm: Firm, options: RequestOptions): Observable<Firm> {
        firm.firmId = undefined;
        return this.http.post(this.baseUrl, firm, options)
            .map(this.extractData)
            .do(data => console.log('createfirm: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateFirm(firm: Firm, options: RequestOptions): Observable<Firm> {
        const url = this.baseUrl+'/'+firm.firmId;
        return this.http.put(url, firm, options)
            .map(() => firm)
            .do(data => console.log('updateFirm: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
	private extractData(response: Response) {
        let body = response.json() as Firm;
		console.log(body[1].package);
        return body || {};
    }
	private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error("Error "+error);
        return Observable.throw(error.json().error || 'Server error');
    }
}