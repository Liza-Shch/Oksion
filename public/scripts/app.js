import Router from "./router";
import IndexView from "../views/IndexView";
import LoginView from "../views/LoginView";
import ObjectView from "../views/ObjectView";

export default class App {
    constructor() {
        this.router = new Router(this.controller);
        this.IndexView = IndexView;
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
        view.render();
    };

    run() {
        this.router.start();
    };
}