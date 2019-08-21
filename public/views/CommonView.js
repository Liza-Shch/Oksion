import BaseView from "./BaseView";
import CommonPage from "../pages/CommonPage/CommonPage";
import Store from '../scripts/store';

export default class CommonView extends BaseView {
    constructor(args) {
        // const permissions = {
        //     read: null,
        //     write: null,
        //     usersModify: null
        // };

        // const userPermissions = Store.user.getPermissions();
        // if (!userPermissions) {
        //     super(args, CommonPage);
        //     return;
        // };

        // userPermissions.forEach((permission) => {
        //     switch (permission.name) {
        //         case Store.permissions.read.name:
        //             permissions.read = Store.permissions.read;
        //             break;
        //         case Store.permissions.write.name:
        //             permissions.write = Store.permissions.write;
        //             break;
        //         case Store.permissions.usersModify.name:
        //             permissions.usersModify = Store.permissions.usersModify;
        //             break;
        //     }
        // });
        // args.permissions = permissions;
        super(args, CommonPage);
    };
}