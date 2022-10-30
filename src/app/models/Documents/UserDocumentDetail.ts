import { AvalibleDocumentDetails } from "./AvalibleDocumentDetails";

export class UserDocumentDetail {

    public Id: string;
    public DocumentDetail: AvalibleDocumentDetails;


    constructor(Id: string, DocumentDetail: AvalibleDocumentDetails
    ){
        this.Id = Id;
        this.DocumentDetail = DocumentDetail;
    }
}