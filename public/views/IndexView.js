import BaseView from "./BaseView";
import IndexPage from "../pages/IndexPage/IndexPage";

export default class IndexView extends BaseView {
    constructor() {
        console.log("Index"); 
        super(IndexPage);
    };

    beforeRender() {
        this.args.objects = [
            {
                type: "ПИОН",
                district: "Северо-западный",
                work: true,
            },
            {
                type: "ПУОН",
                district: "Западный",
                work: false,
            }
        ];
    };

    afterRender() {};
}