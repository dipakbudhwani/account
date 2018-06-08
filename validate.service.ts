import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Validate } from './validate';

import { environment } from '../../environments/environment' ;

@Injectable()
export class ValidateService{
	private baseUrl = environment.api + 'validates';
	constructor(private http: Http) { }
	
	
	getFirms(): Observable<Validate[]> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
			 .do(data => console.log('getFirm: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
	
	 getFirm(id: number): Observable<Validate> {
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
	
	saveValidate(validate: Validate): Observable<Validate> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (validate.validateId === 0) {
            return this.createValidate(validate, options);
        }
        return this.updateValidate(validate, options);
    }

    private createValidate(validate: Validate, options: RequestOptions): Observable<Validate> {
        validate.validateId = undefined;
        return this.http.post(this.baseUrl, validate, options)
            .map(this.extractData)
            .do(data => console.log('createfirm: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateValidate(validate: Validate, options: RequestOptions): Observable<Validate> {
        const url = this.baseUrl+'/'+validate.validateId;
        return this.http.put(url, validate, options)
            .map(() => validate)
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