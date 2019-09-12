import BaseView from "./BaseView";
import ItemPage from "../pages/ItemPage/ItemPage";
import Store from "../scripts/Store";
import PageEvents from "../events/PageEvents";
import EventBus from "../scripts/EventBus";
import APIEvents from "../events/APIEvents";

export default class ItemView extends BaseView {
    constructor() {
        super(ItemPage);
        this.setTargetRender(document.querySelector('.container'));
        
        EventBus.on(PageEvents.PREPARE_ARGS_ITEM_PAGE, this.prepareArgs.bind(this));
        EventBus.on(PageEvents.RENDER_ITEM_PAGE, this.render.bind(this));
        EventBus.on(PageEvents.AFTER_RENDER_ITEM_PAGE, this.afterRender.bind(this));
        console.log('ITEM VIEW CONSTRUCTOR')
    };

    create(args) {
        console.log('CREATE ITEM VIEW')
        this.args = args;
        this.el = document.createElement('div');
        console.log(this.el);
        this.beforeRender();
    }

    beforeRender() {
        const args = {
            id : this.args.id,
            event: {
                success: [
                    { event: PageEvents.PREPARE_ARGS_ITEM_PAGE },
                    { event: PageEvents.RENDER_ITEM_PAGE },
                    { event: PageEvents.AFTER_RENDER_ITEM_PAGE }
                ]
            }
        }

        EventBus.emit(APIEvents.GET_ITEM, args)
    }

    prepareArgs() {
        this.args.item = Store.getItemByID(this.args.id);
    }
}