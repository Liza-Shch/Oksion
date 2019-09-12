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
            pattern: new RegExp('^' + url.replace(new RegExp(':\\w+', 'g'), '(\\w+)') + '$')
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
                    this._routes[key].view.setShown(false);
                    this._routes[key].view.hide();
                };
                continue;
            };

            const View = this._routes[key].View;
            if (!this._routes[key].view) {
                console.log('New View');
                this._routes[key].view = new View();
            };

            this._controller(this._routes[key].view, { id: parsedUrl[1] });
            this._routes[key].view.setShown(true);
            window.history.pushState('', '', url);
            found = true;
        };

        if (!found) {
            console.log('url not found')
        }
    };

    start() {
        window.addEventListener('click', function linkCallback (e) {
            if (!(e.target instanceof HTMLAnchorElement)) {
                return;
            };

            e.preventDefault();
            // e.stopPropagation();
            console.log('target link');
            this.go(event.target.pathname);
            // return false;
        }.bind(this));

        // const firstPath = window.location.pathname;
        // this.go(firstPath);
    };
};