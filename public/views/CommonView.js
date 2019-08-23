import BaseView from "./BaseView";
import CommonPage from "../pages/CommonPage/CommonPage";
import Store from '../scripts/store';

export default class CommonView extends BaseView {
    constructor(args) {
        super(args, CommonPage);
    }
}