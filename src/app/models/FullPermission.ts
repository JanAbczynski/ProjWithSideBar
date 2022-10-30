import { FullPermissionsDetail } from "./FullPermissionsDetail";

export class FullPermission {

    public Id?: any;


    public UserId?: string;
    public RawPermission?: any;
    public PermissionDetailFriendly?: string;
    public DocumentNumber?: string;
    public ExpireDate?: Date;
    public UserPermissionDetail?: FullPermissionsDetail[];


    constructor(
    ){

    }
}