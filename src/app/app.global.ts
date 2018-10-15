import { Injectable } from '@angular/core';

@Injectable()
export class AppSettings {
    // dev Link
    readonly siteURL = 'https://visteon.sharepoint.com/sites/MetadataReqAndApproval';
    // test Link
    // readonly siteURL = 'https://visteon.sharepoint.com/sites/MetadataReqAndApproval';

   // readonly HfmBRTasks = 'Hfm Business Rule Tasks';
    readonly allTasks: string[] = ['Hfm Business Rule Tasks', 'Qad Corporate Account Workflow Tasks'];
    readonly select_HfmBRTasks = '?$select=Title,Created,Status,TaskOutcome,ContentTypeId,RelatedItems,ID';
    readonly orderby_HfmBRTasks = '&$orderby=Created';
    readonly filterby_HfmBRTasks = '&$filter=';
    readonly filtersToApply: String[] = ['author'];

    readonly select_ListDetails = '?$select=EntityTypeName';

}
