import Router from "./router";
import CommonView from "../views/CommonView";
import IndexView from "../views/IndexView";
import LoginView from "../views/LoginView";
import ObjectView from "../views/ObjectView";

export default class App {
    constructor() {
        this.router = new Router(this.controller);
        this.commonView = new CommonView();
    };

    init() {
        this.router
                    .addRoute("/", LoginView)
                    .addRoute("/objects", IndexView)
                    .addRoute("/objects/:id", ObjectView);
    };

    /**
     * run view methods
     * @param {View object} view 
     */
    controller(view) {
        const targetRender = document.querySelector('.main') || document.createElement('div').classList.add('main');
        view.setTargetRender(targetRender);
        view.beforeRender();
        view.render();
        view.afterRender();
    };

    run() {
        this.commonView.beforeRender();
        this.commonView.getTargetRender().innerHTML = this.commonView.render();
        this.commonView.afterRender();
        this.router.start();
    };
};