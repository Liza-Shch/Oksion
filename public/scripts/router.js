export default class Router {
    constructor(controller) {
        this._routes = {};
        this._controller = controller;
    };

    /**
     * add connection between url and view
     * @param {string} url example: "/object/:param1/:param2"
     * @param {View} view 
     */
    addRoute(url, view) {
        this._routes[url] = {
            View: view,
            view: null,
            pattern: new RegExp('^' + url.replace(new RegExp(':\\w+', 'g'), '(\\w+)') + '$', 'g')
        };

        return this;
    };

    /**
     * run view which controlls url
     * @param {string} url example: "/object/param1/param2"
     */
    go(url) {
        console.log(this);
        for (let key in this._routes) {
            console.log(key);
            let parsedUrl = this._routes[key].pattern.exec(url);
            if (!parsedUrl) {
                continue;
            };

            if (!this._routes[key].view || parsedUrl.length > 1) {
                this._routes[key].view = new this._routes[key].View(...(parsedUrl.slice(1,)));
            };

            this._controller(this._routes[key].view);
            window.history.pushState('', '', url);
            break;
        };
    };

    start() {
        window.addEventListener('click', function (event) {
            if (!(event.target instanceof HTMLAnchorElement)) {
                return;
            };

            event.preventDefault();

            this.go(event.target.pathname);
        }.bind(this));

        const firstPath = window.location.pathname;
        this.go(firstPath);
    };
};