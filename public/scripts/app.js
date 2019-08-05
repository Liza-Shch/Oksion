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
                    .addRoute("/", IndexView)
                    .addRoute("/login", LoginView)
                    .addRoute("/object/:id", ObjectView);
    };

    /**
     * run view methods
     * @param {View object} view 
     */
    controller(view) {
        view.beforeRender();
        view.render();
        view.afterRender();
    };

    run() {
        this.commonView.beforeRender();
        document.body.innerHTML = this.commonView.render();
        this.commonView.afterRender();
        this.router.start();
    };
}