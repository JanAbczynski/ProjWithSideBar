import { customAddress } from "./customAddress";
import { OneRange } from "./OneRange";
import { OneRangeIndex } from "./OneRangeIndex";


export class Run {

    public Id?: string;
    public Name?: string;
    public OneRange? : OneRangeIndex[];



    constructor(Name: string){
        this.Name = Name;
    }
}