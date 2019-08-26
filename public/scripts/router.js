import Store from './Store';

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
        console.log("GO", url);
        if (!Store.user.isAuth()) {
            url = '/'
        }

        let found = false;
        for (let key in this._routes) {
            console.log(key, url);
            let parsedUrl = this._routes[key].pattern.exec(url);
            if (!parsedUrl) {
                if (this._routes[key].view && this._routes[key].view.isShown()) {
                    console.log('Hide', key);
                    this._routes[key].view.hide();
                };
                continue;
            };

            const View = this._routes[key].View;
            if (!this._routes[key].view || parsedUrl.length > 1) {
                console.log('New View');
                const el = document.createElement('div');
                this._routes[key].view = new View({el: el, args:(parsedUrl.slice(1,))});
            };

            this._controller(this._routes[key].view);
            this._routes[key].view.setShown(true);
            window.history.pushState('', '', url);
            found = true;
        };

        if (!found) {
            // view not found
        }
    };

    start() {
        window.addEventListener('click', function (event) {
            if (!(event.target instanceof HTMLAnchorElement)) {
                return;
            };

            event.preventDefault();

            console.log('target link');
            this.go(event.target.pathname);
        }.bind(this));

        console.log('dcdcwd');
        // const firstPath = window.location.pathname;
        // this.go(firstPath);
    };
};