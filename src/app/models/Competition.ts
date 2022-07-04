import { CrewStand } from "./Dictionary/CrewStand";
import { Run } from "./Run";
import { ShootingRange } from "./shootingRange";

export class Competition {

    public Id? :string;
    public StartDate?: Date;
    public EndDate?: Date;
    public place?: string;
    public Name?: string;
    public Schortcut?: string;
    // public shootingRange?: ShootingRange;
    public shootingRanges?: ShootingRange[];
    public Runs?: Run[];
    public ManyDays?: boolean;
    public Crew?: CrewStand[];



    constructor(

    ){

    }
}
