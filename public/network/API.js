import Ajax from "./Ajax";
import PageEvents from '../events/PageEvents';
import EventBus from '../scripts/eventbus';

export default class API {
    static onLogin(user) {
        Ajax.doPost('/api/login', user)
            .then((res) => {
                console.log("doPost", res);
                return res.json()
            })
            .then((data) => {
                if (data.status != 'ok') {
                    return EventBus.emit(PageEvents.LOGIN_ERROR, data);
                }

                EventBus.emit(PageEvents.LOGIN_SUCCESS, data);
            })
            .catch((err) => {
                // 500
                // EventBus.emit(render 500)
            })
    }
}