import { Injectable } from '@angular/core';

@Injectable()
export class AppSettings {
    // dev Link
    readonly siteURL = 'https://visteon.sharepoint.com/sites/MetadataReqAndApproval';
    // test Link
    // readonly siteURL = 'https://visteon.sharepoint.com/sites/MetadataReqAndApproval';

    // readonly HfmBRTasks = 'Hfm Business Rule Tasks';
    // readonly allTasks: string[] = ['Hfm Business Rule Tasks', 'HFM CCC workflow tasks', 'HFM Other request workflow tasks',
    //     'HFM Report workflow tasks', 'HFM-CA-New-WF Tasks', 'HFM-Entity New Request Tasks', 'QAD Corporate account workflow tasks',
    //     'QAD Corporate cost center workflow tasks', 'QAD Entity workflow tasks', 'QAD Other tasks', 'QadSubAccount WF Tasks'];
    readonly allTasks: string[] = ['Hfm Business Rule Tasks'];
    readonly allRequests: string[] = ['Hfm Business Rule'];
    readonly select_Tasks = '?$select=Title,Created,Status,TaskOutcome,ContentTypeId,RelatedItems,ID';
    readonly select_Requests = '?$select=Title,HFM_x0020_Business_x0020_Rule_x0';
    readonly orderby_Tasks = '&$orderby=Created';
    readonly orderby_Requests = '&$orderby=Created';
    readonly filterby_Lists = '&$filter=';
    readonly filterby_Completed_Lists = '&$filter=(Status eq \'Completed\') and (EditorId eq ';
    // readonly filterby_HfmBRTasks = '&$filter=';
    readonly filtersToApply: String[] = ['author'];

    readonly select_ListDetails = '?$select=EntityTypeName';

}
