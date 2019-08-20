import BaseView from "./BaseView";
import CommonPage from "../pages/CommonPage/CommonPage";
import eventbus from "../scripts/eventbus";

export default class CommonView extends BaseView {
    constructor() {
        super(CommonPage);
    };
}