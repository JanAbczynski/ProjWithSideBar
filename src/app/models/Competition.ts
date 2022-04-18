import { Run } from "./Run";
import { ShootingRange } from "./shootingRange";

export class Competition {

    public Id? :string;
    public StartDate?: string;
    public place?: string;
    public Name?: string;
    public Schortcut?: string;
    // public shootingRange?: ShootingRange;
    public shootingRanges?: ShootingRange[];
    public Runs?: Run[];



    constructor(

    ){

    }
}
