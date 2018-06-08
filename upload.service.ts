import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Upload } from './upload';

import { environment } from '../../environments/environment' ;

@Injectable()
export class UploadService{
	private baseUrl = environment.api + 'uploads';
	constructor(private http: Http) { }
	
	
	getFirms(): Observable<Upload[]> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
			 .do(data => console.log('getFirm: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
	
	 getFirm(id: number): Observable<Upload> {
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
	
	saveUpload(upload: Upload): Observable<Upload> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (upload.uploadId === 0) {
            return this.createUpload(upload, options);
        }
        return this.updateUpload(upload, options);
    }

    private createUpload(upload: Upload, options: RequestOptions): Observable<Upload> {
        upload.uploadId = undefined;
        return this.http.post(this.baseUrl, upload, options)
            .map(this.extractData)
            .do(data => console.log('createfirm: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateUpload(upload: Upload, options: RequestOptions): Observable<Upload> {
        const url = this.baseUrl+'/'+upload.uploadId;
        return this.http.put(url, upload, options)
            .map(() => upload)
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