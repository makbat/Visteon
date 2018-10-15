import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RequestsDataInTask, ListDetail } from './requests';

import { AppService } from './app.service';
import { AppSettings } from './app.global';
import { RestCalls } from './app.component.rest';

import * as _ from 'lodash';
import { Task } from './tasks';
import { User, UesrGroup } from './users';
import { filter } from 'rxjs/operators/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService, AppSettings, RestCalls]
})
export class AppComponent implements OnInit {
  allTasks: Task[] = new Array<Task>();

  constructor(
    private _appService: AppService, private _global: AppSettings, private _restCalls: RestCalls) {
  }
  ngOnInit() {
    console.log('I am working');
    this.getAllTasks();
  }

  getAllTasks(): void {
    const allTasksListNames: string[] = this._global.allTasks;

    const select = this._global.select_HfmBRTasks;
    const orderBy = this._global.orderby_HfmBRTasks;
    this._restCalls.getCurrentUserData().then(
      (userData) => {
        if (userData) {
          const returnedUser = <User>userData;
          this._restCalls.getCurrentUserGroupData(returnedUser.Id).then(
            (userGroupData) => {
              if (userGroupData) {
                const returnedUserGroups = <UesrGroup[]>userGroupData;
                let filterValue = this._global.filterby_HfmBRTasks;
                returnedUserGroups.forEach(userGroup => {
                  filterValue = filterValue + 'AssignedToId eq ' + userGroup.Id + ' or ';
                });
                filterValue = filterValue.substring(0, filterValue.length - 4);
                console.log('filter value ' + filterValue);


                allTasksListNames.forEach(taskListName => {
                  this._restCalls.getTaskData(select, orderBy, filterValue, taskListName).then(
                    (data) => {
                      if (data) {
                        const returnedTasks = <Task[]>data;
                        returnedTasks.forEach(tempTask => {
                          let listDetails: ListDetail = null;
                          let relatedItem: RequestsDataInTask = null;
                          const pushedTask: Task = tempTask;
                          const jsonObject: any = JSON.parse(tempTask.RelatedItems);
                          if (jsonObject !== null && jsonObject.length > 0) {
                            relatedItem = <RequestsDataInTask>jsonObject[0];
                            this._restCalls.getListByGuid(this._global.select_ListDetails, relatedItem.ListId).then(
                              (listData) => {
                                listDetails = <ListDetail>listData;
                                const listName = listDetails.EntityTypeName.substring(0, listDetails.EntityTypeName.indexOf('List'));
                                pushedTask.RelatedItemsUrl = this._global.siteURL + '/Lists/' + listName +
                                  '/DispForm.aspx?ID=' + relatedItem.ItemId;
                              });
                          }
                          pushedTask.TaskItemUrl = this._global.siteURL + '/Lists/' + taskListName +
                            '/DispForm.aspx?ID=' + pushedTask.ID;
                          this.allTasks.push(pushedTask);
                        });
                      }
                    });
                });
              }
            });
        }
      });


    // this._restCalls.getCurrentUserGroupData().then(
    //   (userGroupData) => {
    //     if (userGroupData) {
    //       console.log(userGroupData);
    //       const returnedUserGroups = <UesrGroup[]>userGroupData;
    //       console.log('Returned User Groups');
    //       console.log(returnedUserGroups);
    //   const returnedUser = <User>userData;
    //   const filterValue = this._global.filterby_HfmBRTasks + 'AuthorId eq ' + returnedUser.Id ;
    //   console.log('filter value ' + filterValue);
    //   this._restCalls.getTaskData(select, orderBy, filterValue , this._global.HfmBRTasks).then(
    //     (data) => {
    //       if (data) {
    //         const returnedTasks = <Task[]>data;
    //         returnedTasks.forEach(tempTask => {
    //           let listDetails: ListDetail = null;
    //           let relatedItem: RequestsDataInTask = null;
    //           const pushedTask: Task = tempTask;
    //           const jsonObject: any = JSON.parse(tempTask.RelatedItems);
    //           if (jsonObject !== null && jsonObject.length > 0) {
    //             relatedItem = <RequestsDataInTask>jsonObject[0];
    //             this._restCalls.getListByGuid(this._global.select_ListDetails, relatedItem.ListId).then(
    //               (listData) => {
    //                 listDetails = <ListDetail>listData;
    //                 const listName = listDetails.EntityTypeName.substring(0, listDetails.EntityTypeName.indexOf('List'));
    //                 pushedTask.RelatedItemsUrl = this._global.siteURL + '/Lists/' + listName +
    //                 '/DispForm.aspx?ID=' + relatedItem.ItemId;
    //               });
    //           }
    //           pushedTask.TaskItemUrl = this._global.siteURL + '/Lists/' + this._global.HfmBRTasks +
    //           '/DispForm.aspx?ID=' + pushedTask.ID;
    //           console.log('HFM rule :' + pushedTask.ID);
    //           this.allTasks.push(pushedTask);
    //         });
    //         console.log(this.allTasks);
    //       }
    //     });
    //   }
    // });
  }

  // getFilters(filtersToApply) {
  //   let filterUrl = t
  //   filtersToApply.forEach(filter => {
  //     if (filter === 'author') {
  //       filterUrl = filterUrl + 'AuthorId eq ' + this.getCurrentUserId();
  //     }
  //     console.log('filterUrl ' + filterUrl);
  //     return filterUrl;
  //   });
  // }

  // getCurrentUserId() {
  //   let Id = '';
  //   this._restCalls.getCurrentUserData().then(
  //     (userData) => {
  //       if (userData) {
  //         const returnedUser = <User>userData;
  //         console.log('user : ' + returnedUser.Id);
  //         Id = returnedUser.Id;
  //       }
  //     });
  //   return Id;
  // }
}
