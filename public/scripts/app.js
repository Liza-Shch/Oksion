import Router from "./Router";
import CommonView from "../views/CommonView";
import IndexView from "../views/IndexView";
import ItemsView from "../views/ItemsView";
import ItemView from "../views/ItemView";
import EventBus from "./EventBus";
import PageEvents from "../events/PageEvents";
import APIEvents from "../events/APIEvents";
import StoreEvents from "../events/StoreEvents";
import Store from "./Store";
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
        .addRoute("/items", ItemsView)
        .addRoute("/items/:id", ItemView)

        const el = document.createElement('div');
        this.commonView = new CommonView({el: el});
        this.menuView = new MenuView({});

        EventBus.on(AppEvents.RUN, this.run.bind(this));
        EventBus.on(APIEvents.AUTH, API.onAuth);
        EventBus.on(APIEvents.LOGIN, API.onLogin);
        EventBus.on(StoreEvents.UPDATE_USER, Store.onUpdateUser.bind(Store));
        EventBus.on(PageEvents.CREATE_ITEMS_PAGE, this.router.go.bind(this.router));
        EventBus.on(PageEvents.RENDER_MENU, this.menuView.create.bind(this.menuView));
        EventBus.on(PageEvents.HIDE_MENU, this.menuView.hide.bind(this.menuView));
        EventBus.on(APIEvents.LOGOUT, API.onLogout);
        EventBus.on(PageEvents.RENDER_INDEX_PAGE, this.router.go.bind(this.router));
        EventBus.on(APIEvents.GET_ITEMS, API.onGetItems);
        EventBus.on(StoreEvents.UPDATE_ITEMS, Store.onUpdateItems.bind(Store));
        EventBus.on(APIEvents.GET_ITEM, API.onGetItem);
        EventBus.on(PageEvents.CREATE_ITEM_PAGE, this.router.go.bind(this.router));
        EventBus.on(StoreEvents.UPDATE_ITEM, Store.onUpdateItem.bind(Store));
        EventBus.on(StoreEvents.UPADTE_ITEM_WORK, Store.onUpdateItemWork.bind(Store));
        EventBus.on(APIEvents.UPDATE_ITEM_WORK, API.onUpdateItemWork);
        EventBus.on(APIEvents.UPDATE_ITEM_ADDRESS, API.onUpdateItemAddress);
        EventBus.on(StoreEvents.UPADTE_ITEM_ADDRESS, Store.onUpdateItemAddress.bind(Store));
        EventBus.on(APIEvents.UPDATE_ITEM_TYPE, API.onUpdateItemType.bind(this));
        EventBus.on(StoreEvents.UPDATE_ITEM_TYPE, Store.onUpdateItemType.bind(Store));
        EventBus.on(APIEvents.UPDATE_ITEM_DISTRICT, API.onUpdateItemDistrict);
        EventBus.on(StoreEvents.UPDATE_ITEM_DISTRICT, Store.onUpdateItemDistrict.bind(Store));
        EventBus.on(APIEvents.UPDATE_ITEM_COMPOSITION, API.onUpdateItemComposition);
        EventBus.on(StoreEvents.UPDATE_ITEM_COMPOSITION, Store.onUpdateItemComposition.bind(Store));
        EventBus.on(APIEvents.UPDATE_ITEM_NOTE, API.onUpdateItemNote);
        EventBus.on(StoreEvents.UPDATE_ITEM_NOTE, Store.onUpdateItemNote.bind(Store));
        EventBus.on(APIEvents.CREATE_WORK, API.onCreateWork);
    };

    /**
     * run view methods
     * @param {View object} view 
     */
    controller(view, args) {
        console.log('Controller view');
        view.create(args);
    };

    start() {
        console.log('START')
        const event = {
            common: { event: AppEvents.RUN, args: null },
            success: [
                {event: PageEvents.CREATE_ITEMS_PAGE, args: '/items'},
                {event: PageEvents.RENDER_MENU, args: null}
            ],
            error: [
                {event: PageEvents.HIDE_MENU, args: null},
                {event: PageEvents.RENDER_INDEX_PAGE, args: '/'}
            ]
        };

        EventBus.emit(APIEvents.AUTH, event);
    };

    run() {
        this.commonView.create();
        this.router.start();
    };
};