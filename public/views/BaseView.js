export default class BaseView {
    constructor(args, page) {
        this.Page = page;
        this.page = null;
        this.args = args;
        this._targetRender = document.body;
        this._shown = false;
        this.el = args.el;
    };

    getTargetRender() {
        return this._targetRender;
    };

    setTargetRender(targetRender) {
        this._targetRender = targetRender;
    };

    beforeRender() {};

    render() {
        this.page = new this.Page(this.args);
        console.log("Base render");
        this.el = this.page.render();
        this._targetRender.appendChild(this.el);
    };

    afterRender() {};

    create() {
        this.beforeRender();
        this.render();
        this.afterRender();
    }

    hide() {
        this.setShown(false);
        if (this.el) {
            this.el.remove(); 
            this.el = document.createElement('div');
            this.args.el = this.el;
        }
    }

    setShown(shown) {
        this._shown = shown;
    }

    isShown() {
        return this._shown;
    }

};