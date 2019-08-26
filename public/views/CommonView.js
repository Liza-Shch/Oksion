import BaseView from "./BaseView";
import CommonPage from "../pages/CommonPage/CommonPage";
import Store from '../scripts/Store';

export default class CommonView extends BaseView {
    constructor(args) {
        super(args, CommonPage);
    }
}