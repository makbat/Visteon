import { Injectable, OnInit } from '@angular/core';

import { AppService } from './app.service';
import { AppSettings } from './app.global';

@Injectable()
export class RestCalls {
    constructor(
        private _appService: AppService, private _global: AppSettings) { }

    // get data from SharePoint List
    getListDataByTitle(select, orderby, filter, listName) {

        let data = null;
        let url = null;
        if (listName) {
            url = '/_api/web/lists/getbytitle(\'' + listName + '\')/items' + select + orderby + filter;
        }
        console.log('url for' + filter + '--- ' + url);
        return new Promise((resolve, reject) => {
            this._appService.getListItem(url).subscribe(
                (restData) => {
                    if (restData.d.results) {
                        data = restData.d.results;
                    }
                    // if (restData.d.Email) {
                    //     data = restData.d.Id;
                    // }
                    resolve(data);
                });
        });
    }

    // get SharePoint List Details
    getListByGuid(select, listGuid) {
        let data = null;
        let url = null;
        url = '/_api/web/lists(guid\'' + listGuid + '\')' + select;
        return new Promise((resolve, reject) => {
            this._appService.getListItem(url).subscribe(
                (restData) => {
                    if (restData.d) {
                        data = restData.d;
                    }
                    resolve(data);
                });
        });
    }

    // get Current User
    getCurrentUserData() {
        let data = null;
        let url = null;
        url = '/_api/web/currentUser';
        return new Promise((resolve, reject) => {
            this._appService.getListItem(url).subscribe(
                (restData) => {
                    if (restData.d) {
                        data = restData.d;
                    }
                    resolve(data);
                });
        });
    }

    // get Current User Group
    getCurrentUserGroupData(id: string) {
        let data = null;
        let url = null;
        url = '/_api/web/GetUserById(' + id + ')/Groups';
        return new Promise((resolve, reject) => {
            this._appService.getListItem(url).subscribe(
                (restData) => {
                    if (restData.d.results) {
                        data = restData.d.results;
                    }
                    resolve(data);
                });
        });
    }
}
