import { customAddress } from "./customAddress";
import { OneRange } from "./OneRange";


export class ShootingRange {

    public Id?: string;
    public Name?: string;
    public Description?: string;
    public Address?: customAddress;
    public OneRange?: OneRange[];
    public IsPublic?: boolean;
    public IsEditable?: boolean;



    constructor(Name: string){
        this.Name = Name;
    }
}
