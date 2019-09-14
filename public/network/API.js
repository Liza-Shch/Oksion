import Ajax from "./Ajax";
import PageEvents from '../events/PageEvents';
import EventBus from '../scripts/EventBus';
import StoreEvents from "../events/StoreEvents";

export default class API {
    /**
     * check authentication
     * return email, permissions
     * @param {Event} events - callback events
     */
    static onAuth(event) {
        Ajax.doGet('/api/auth')
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            if (data.status != 'ok') {
                EventBus.emit(StoreEvents.UPDATE_USER, null);
                EventBus.emit(event.common.event, event.common.args);
                event.error.forEach((event) => {
                    EventBus.emit(event.event, event.args);
                });
                return;
            };

            const user = {
                email: data.email,
                permissions: data.permissions
            };

            EventBus.emit(StoreEvents.UPDATE_USER, user);
            EventBus.emit(event.common.event, event.common.args);
            event.success.forEach((event) => {
                EventBus.emit(event.event, event.args);
            });
        })
    }

    static onLogin(user) {
        Ajax.doPost('/api/login', user)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            if (data.status != 'ok') {
                return EventBus.emit(PageEvents.LOGIN_ERROR, data.errors);
            }

            const user = {
                email: data.email,
                permissions: data.permissions
            };

            EventBus.emit(StoreEvents.UPDATE_USER, user);
            EventBus.emit(PageEvents.LOGIN_SUCCESS);
            EventBus.emit(PageEvents.RENDER_MENU);
        })
        .catch((err) => {
            // 500
            // EventBus.emit(render 500)
        })
    }

    static onLogout() {
        Ajax.doGet('/api/logout')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            EventBus.emit(StoreEvents.UPDATE_USER, null);
            EventBus.emit(PageEvents.RENDER_INDEX_PAGE, '/');
            EventBus.emit(PageEvents.HIDE_MENU);
        })
        .catch((err) => {

        })
    }

    /**
     * Get items with filter
     * @param {Object} args - {cond, event} cond - condition of selection {type, district}
     */
    static onGetItems(args) {
        Ajax.doPost('/api/items', args.cond)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            data.items.map((item) => {
                item['isWork'] = item['is_work'];
                return item;
            });
            
            EventBus.emit(StoreEvents.UPDATE_ITEMS, data.items);

            console.log("events", args.event);
            args.event.success.forEach((event) => {
                console.log("event", event);
                EventBus.emit(event.event, event.args)
            });
        })
        .catch((err) => {
        })
    }

    static onGetItem(args) {
        Ajax.doPost('/api/item', { id: args.id })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            data.item.isWork = data.item['is_work'];

            EventBus.emit(StoreEvents.UPDATE_ITEM, data.item)
            
            args.event.success.forEach((event) => {
                EventBus.emit(event.event, event.args)
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    static onUpdateItemWork(args) {
        EventBus.emit(StoreEvents.UPADTE_ITEM_WORK, args)
    }

    static onUpdateItemAddress(args) {
        EventBus.emit(StoreEvents.UPADTE_ITEM_ADDRESS, args)
    }

    static onUpdateItemType(args) {
        EventBus.emit(StoreEvents.UPDATE_ITEM_TYPE, args)
    }

    static onUpdateItemDistrict(args) {
        EventBus.emit(StoreEvents.UPDATE_ITEM_DISTRICT, args)
    }
}