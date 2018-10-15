import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { AppSettings } from './app.global';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json;odata=verbose' })
};

@Injectable()
export class AppService {
    private siteURL: string;
    RequestDigest: string;

    constructor(
        private _http: HttpClient, private _global: AppSettings) {
        this.siteURL = this._global.siteURL;
    }

    getListItem(url: string): Observable<any> {
        const httpURL = this.siteURL + url;
        return this._http.get(httpURL, httpOptions)
            .pipe(
            tap(data => this.log('fetched Data')),
            catchError(this.handleError('getListItem', []))
            );
    }

    addDatatoList(url: string, jsonBody: any, res: any): Observable<any> {
        const httpOptions1 = {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
                .set('Accept', 'application/json;odata=verbose')
                .set('X-RequestDigest', res)
        };
        const httpURL = this.siteURL + url;
        const data = JSON.stringify(jsonBody);
        // console.log(httpURL);
        // console.log(data);
        return this._http.post<any>(httpURL, data, httpOptions1).pipe(
            tap(httpres => this.log('fetched Data')),
            catchError(this.handleError('addListItem', []))
        );
    }

    editDatatoList(url: string, jsonBody: any, res: any): Observable<any> {
        const httpOptions1 = {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
                .set('Accept', 'application/json;odata=verbose')
                .set('X-RequestDigest', res)
                .set('X-HTTP-Method', 'MERGE')
                .set('If-Match', '*')
        };
        const httpURL = this.siteURL + url;
        // console.log(httpURL);
        const data = JSON.stringify(jsonBody);
        // console.log(data);
        return this._http.post<any>(httpURL, data, httpOptions1).pipe(
            tap(httpres => this.log('fetched Data')),
            catchError(this.handleError('editDatatoList', []))
        );
    }
    deleteDatafromList(url: string, res: any) {
        const httpOptions1 = {
            headers: new HttpHeaders().set('Content-Type', 'application/json;odata=verbose')
                .set('Accept', 'application/json;odata=verbose')
                .set('X-RequestDigest', res)
                .set('IF-MATCH', '*')
                .set('X-HTTP-Method', 'DELETE')
        };
        const data = '';
        const httpURL = this.siteURL + url;
        return this._http.post<any>(httpURL, data, httpOptions1).pipe(
            tap(httpres => this.log('Deleted Data')),
            catchError(this.handleError('deleteDatafromList', []))
        );
    }
    uploadaFile(url: string, result: ArrayBuffer, res: any) {
        // const length: string =  <string>buffer.byteLength;
        const httpURL = this.siteURL + url;
        const httpOptions1 = {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
                .set('Accept', 'application/json;odata=verbose')
                .set('X-RequestDigest', res)
            // .set('Content-Length', result.byteLength.toString())
        };
        // Read out file contents as a Data URL
        return this._http.post<any>(httpURL, result, httpOptions1).pipe(
            tap(httpres => this.log('fetched Data')),
            catchError(this.handleError('Upload File', []))
        );
    }
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error('Verbose Logging'); // log to console instead
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    private log(message: string) {
        // console.log('AppService: ' + message);
    }

    getService(): Observable<any> {
        const appweburl = this.siteURL + '/_api/contextinfo';
        return this._http.post<any>(appweburl, {}, httpOptions).pipe(
            tap(data => this.log('Fetched X-RequestDigest')),
            catchError(this.handleError('getService', []))
        );
    }
}
