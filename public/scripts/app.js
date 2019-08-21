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
import AppEvents from "../events/AppEvents";
import MenuView from "../views/MenuView";

export default class App {
    constructor() {
        this.router = new Router(this.controller);
        this.commonView = null;
        this.menuView = null;
    };

    init() {
        this.router
        .addRoute("/", IndexView)
        .addRoute("/objects", ObjectsView)
        .addRoute("/objects/:id", ObjectView);

        const el = document.createElement('div');
        this.commonView = new CommonView({el: el});
        this.menuView = new MenuView({});

        EventBus.on(AppEvents.RUN, this.run.bind(this));
        EventBus.on(APIEvents.AUTH, API.onAuth);
        EventBus.on(APIEvents.LOGIN, API.onLogin);
        EventBus.on(StoreEvents.UPDATE_USER, Store.onUpdateUser.bind(Store));
        EventBus.on(PageEvents.RENDER_OBJECTS_PAGE, this.router.go.bind(this.router));
        EventBus.on(PageEvents.RENDER_MENU, this.menuView.create.bind(this.menuView));
        EventBus.on(PageEvents.HIDE_MENU, this.menuView.hide.bind(this.menuView));
    };

    /**
     * run view methods
     * @param {View object} view 
     */
    controller(view) {
        view.beforeRender();
        view.getTargetRender().appendChild(view.render());
        view.afterRender();
    };

    start() {
        const event = {
            common: { event: AppEvents.RUN, args: null },
            success: [
                {event: PageEvents.RENDER_OBJECTS_PAGE, args: '/objects'},
                {event: PageEvents.RENDER_MENU, args: null}
            ],
            error: [
                {event: PageEvents.HIDE_MENU, args: null},
            ]
        };

        EventBus.emit(APIEvents.AUTH, event);
    };

    run() {
        this.commonView.beforeRender();
        this.commonView.getTargetRender().appendChild(this.commonView.render());
        this.commonView.afterRender();
        this.router.start();
    };
};