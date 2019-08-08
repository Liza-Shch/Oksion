import Router from "./router";
import CommonView from "../views/CommonView";
import IndexView from "../views/IndexView";
import LoginView from "../views/LoginView";
import ObjectView from "../views/ObjectView";
import EventBus from "./eventbus";
import { PageEvents } from "../events/PageEvents";

export default class App {
    constructor() {
        this.router = new Router(this.controller);
        this.commonView = new CommonView();
    };

    init() {
        this.router
                    .addRoute("/", IndexView)
                    .addRoute("/objects", LoginView)
                    .addRoute("/objects/:id", ObjectView);

        EventBus.on(PageEvents.RENDER_LOGIN_FORM, IndexView.onLoginFormRender);
        EventBus.on(PageEvents.AFTER_RENDER_LOGIN_FORM, IndexView.onLoginFormAfterRender);
    };

    /**
     * run view methods
     * @param {View object} view 
     */
    controller(view) {
        view.beforeRender();
        view.getTargetRender().innerHTML = view.render();
        view.afterRender();
    };

    run() {
        this.commonView.beforeRender();
        this.commonView.getTargetRender().innerHTML = this.commonView.render();
        this.commonView.afterRender();
        this.router.start();
    };
};