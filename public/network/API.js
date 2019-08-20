import Ajax from "./Ajax";
import PageEvents from '../events/PageEvents';
import EventBus from '../scripts/eventbus';
import StoreEvents from "../events/StoreEvents";

export default class API {
    /**
     * check authentication
     * return email, permissions
     * @param {Event} event - callback event
     */
    static onAuth(event) {
        Ajax.doGet('/api/auth')
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            if (data.status != 'ok') {
                return EventBus.emit(StoreEvents.UPDATE_USER, null);
            };

            const user = {
                email: data.email,
                permissions: data.permissions
            };

            EventBus.emit(StoreEvents.UPDATE_USER, user);
            EventBus.emit(event);
        })
    }

    static onLogin(user) {
        Ajax.doPost('/api/login', user)
        .then((res) => {
            console.log("doPost", res);
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
        })
        .catch((err) => {
            // 500
            // EventBus.emit(render 500)
        })
    }
}