import BaseView from "./BaseView";
import CommonPage from "../pages/CommonPage/CommonPage";

export default class CommonView extends BaseView {
    constructor() {
        super(CommonPage);
    };

    beforeRender() {};
    afterRender() {};
}