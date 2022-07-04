import { customAddress } from "./customAddress";
import { OneRange } from "./OneRange";
import { OneRangeIndex } from "./OneRangeIndex";
import { TargetModel } from "./Target/TargetModel";


export class Run {

    public Id?: string;
    public Name?: string;
    public OneRange? : OneRangeIndex[];
    public NoOfShots?: number;
    public TestShots?: number;
    public Target?: TargetModel;
    public Duration?: number;
    public Minutes?: Number;
    public Seconds?: Number;
    public Distance?: Number;



    constructor(Name: string){
        this.Name = Name;
    }
}