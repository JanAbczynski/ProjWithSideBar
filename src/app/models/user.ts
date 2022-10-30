import { UserDocument } from "./Documents/UserDocument";
import { FullPermission } from "./FullPermission";

export class User {

    public Email?: string;
    public SecondEmail?: string;
    public Password?: string;
    public SecondPass?: string;
    public NewPassword?: string;

    public Country?: string;
    public City?: string;
    public ZipCode?: string;
    public Street?: string;
    public BuildingNumber?: string;
    public LocalNumber?: string;

    public Name?: string;
    public Surname?: string;
    public BirthDate?: Date;
    public Gender?: string;

    public Permissions?: FullPermission[];

    public Documents?: UserDocument[];


    constructor(

    ){

    }
}
