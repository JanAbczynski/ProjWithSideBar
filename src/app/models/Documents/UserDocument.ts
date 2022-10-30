import { AvalibleDocument } from "./AvalibleDocument";
import { UserDocumentDetail } from "./UserDocumentDetail";

export class UserDocument {

    public Id?: any;
    public DocumentNumber: string;
    public ExpireDate: Date;
    public Document: AvalibleDocument;
    public Details: UserDocumentDetail[];
    public DetailsFriendly: string;



    constructor(DocumentNumber: string, ExpireDate: Date,  Document: AvalibleDocument, Details: UserDocumentDetail[], DetailsFriendly: string
    ){
        this.DocumentNumber = DocumentNumber;
        this.ExpireDate = ExpireDate;
        this.Document = Document;
        this.Details = Details;
        this.DetailsFriendly = DetailsFriendly;
    }
}