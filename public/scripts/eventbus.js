class EventBus {
    constructor() {
        this._listeners = {};
    };

    /**
     * event callback subscription
     * @param {const string} event 
     * @param {function} callback 
     */
    on(event, callback) {
        this._listeners[event] = this._listeners[event] || [];
        this._listeners[event].push(callback);
    };


    /**
     * event callback unsubscription
     * @param {const string} event 
     * @param {} callback 
     */
    off(event, callback) {
        if (!this._listeners[event]) {
            return;
        };

        this._listeners[event] = this._listeners[event].filter((listener) => {
            return listener !== callback;
        });
    };

    /**
     * run event's callbacks
     * @param {const string} event
     * @param {object} args - args for callbacks
     */
    emit(event, args) {
        this._listeners[event].forEach((listener) => {
            listener(args);
        });
    };
};

export default new EventBus();