import BaseView from "./BaseView";
import ObjectsPage from "../pages/ObjectsPage/ObjectsPage";

export default class ObjectsView extends BaseView {
    constructor() {
        console.log('ObjectsViews');
        super(ObjectsPage);
        this.setTargetRender(document.querySelector('.main'));
    }
}