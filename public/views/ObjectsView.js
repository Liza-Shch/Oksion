import BaseView from "./BaseView";
import ObjectsPage from "../pages/ObjectsPage/ObjectsPage";

export default class ObjectsView extends BaseView {
    constructor(args) {
        console.log('ObjectsViews');
        super(args, ObjectsPage);
        this.setTargetRender(document.querySelector('.container'));
    }
}