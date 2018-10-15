export class RequestsDataInTask {
    ItemId: string;
    WebId: string;
    ListId: string;
}

export class ListDetail {
    EntityTypeName: string;
}

export class Request {
    Title: string;
    HFM_x0020_Business_x0020_Rule_x0: RequestStatus;
    ViewStatusUrl: string;
    ViewStatusText: string;
}

export class RequestStatus {
    Description: string;
    Url: string;
}
