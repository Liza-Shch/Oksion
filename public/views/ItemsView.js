import BaseView from "./BaseView";
import ItemsPage from "../pages/ItemsPage/ItemsPage";
import EventBus from "../scripts/EventBus";
import APIEvents from "../events/APIEvents";
import PageEvents from "../events/PageEvents";
import Store from '../scripts/Store';

export default class ItemsView extends BaseView {
    constructor() {
        console.log('ItemsViews');
        super(ItemsPage);
        this.setTargetRender(document.querySelector('.container'));

        EventBus.on(PageEvents.PREPARE_ARGS_ITEMS_PAGE, this.prepareArgs.bind(this));
        EventBus.on(PageEvents.RENDER_ITEMS_PAGE, this.render.bind(this));
        EventBus.on(PageEvents.AFTER_RENDER_ITEMS_PAGE, this.afterRender.bind(this));
        // EventBus.on(PageEvents.UPDATE_ITEMS, this.onUpdateItems.bind(this));
    }

    create(args) {
        this.args = args;
        this.el = document.createElement('div');
        this.beforeRender();
    }

    beforeRender() {
        const args = {
            cond: {
                type: 'any',
                district: 'any'
            },
            event: {
                success: [
                    { event: PageEvents.PREPARE_ARGS_ITEMS_PAGE },
                    { event: PageEvents.RENDER_ITEMS_PAGE },
                    { event: PageEvents.AFTER_RENDER_ITEMS_PAGE }
                ]
            }
        }
        EventBus.emit(APIEvents.GET_ITEMS, args);
    }

    prepareArgs() {
        this.args.items = Store.getItems();
    }

    // onUpdateItems(order) {
    //     console.log("BUGAGA");
    //     const items = Store.getItems();
    //     console.log("StoreITEMS", items);
    //     this.page.setItems(items);
    //     // this.page.updateItems(order);
    // }
}