import Router from "./router";
import CommonView from "../views/CommonView";
import IndexView from "../views/IndexView";
import ObjectsView from "../views/ObjectsView";
import ObjectView from "../views/ObjectView";
import EventBus from "./eventbus";
import PageEvents from "../events/PageEvents";
import APIEvents from "../events/APIEvents";
import StoreEvents from "../events/StoreEvents";
import Store from "../scripts/store";
import API from "../network/API";

export default class App {
    constructor() {
        this.router = new Router(this.controller);
        this.commonView = new CommonView();
    };

    init() {
        this.router
                    .addRoute("/", IndexView)
                    .addRoute("/objects", ObjectsView)
                    .addRoute("/objects/:id", ObjectView);

        // EventBus.on(PageEvents.RENDER_LOGIN_FORM, IndexView.onLoginFormRender);
        // EventBus.on(PageEvents.AFTER_RENDER_LOGIN_FORM, IndexView.onLoginFormAfterRender);
        EventBus.on(APIEvents.LOGIN, API.onLogin);
        // EventBus.on(PageEvents.LOGIN_SUCCESS, IndexView.onLoginSuccess);
        // EventBus.on(PageEvents.LOGIN_ERROR, IndexView.onLoginError);
        EventBus.on(StoreEvents.UPDATE_USER, Store.onUpdateUser.bind(Store));
        EventBus.on(PageEvents.RENDER_OBJECTS_PAGE, this.router.go.bind(this.router));
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