import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Item } from './item';

import { environment } from '../../environments/environment' ;

@Injectable()
export class ItemService{
	private baseUrl = environment.api + 'items';
	constructor(private http: Http) { }
	
	
	getFirms(): Observable<Item[]> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
			 .do(data => console.log('getFirm: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
	
	 getFirm(id: number): Observable<Item> {
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
	
	saveItem(item: Item): Observable<Item> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (item.itemId === 0) {
            return this.createItem(item, options);
        }
        return this.updateItem(item, options);
    }

    private createItem(item: Item, options: RequestOptions): Observable<Item> {
        item.itemId = undefined;
        return this.http.post(this.baseUrl, item, options)
            .map(this.extractData)
            .do(data => console.log('createfirm: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateItem(item: Item, options: RequestOptions): Observable<Item> {
        const url = this.baseUrl+'/'+item.itemId;
        return this.http.put(url, item, options)
            .map(() => item)
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
        return Observable.throw(error.json().error || 'Server error');
    }
}