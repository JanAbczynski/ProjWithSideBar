import { CustomFile } from "../CustomFile";
import { WebFile } from "../WebFile";
import { PointModel } from "./PointModel";
import { TargetSizes } from "./TargetSizes";


export class TargetModel {
 
    public Id?: string;
    public Name?: string;
    public Size?: TargetSizes[];
    public NewSize?: TargetSizes;
    public TargetImage?: File;
    public TargetImage2?: FormData;
    public FileUrl?: string;
    public File?: CustomFile;
    public NewPoint?: PointModel;
    public Points?: PointModel[];
    public AttachmentFile?: WebFile;
    public AllowToChange?: boolean;
    public IsActive?: boolean;
    public IsPublic?: boolean;

    constructor(

    ){

    }
}
