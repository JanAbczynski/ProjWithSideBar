import { customAddress } from "./customAddress";
import { OneRange } from "./OneRange";


export class ShootingRangeIndex {

    public Id?: string;
    public Name?: string;
    public Description?: string;
    public ZipCode?: string;
    public City?: string[];
    public Disabled?: boolean;
    public IsPublic?: boolean;
    public OneRanges?: string;


    constructor(){
    }
}