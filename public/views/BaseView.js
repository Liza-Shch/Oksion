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
        console.log(this.el);
        this.page = new this.Page(this.args);
        console.log("Base render");
        return this.page.render();
    };

    afterRender() {};

    hide() {
        this.setShown(false);
        if (this.el) this.el.remove();
    }

    setShown(shown) {
        this._shown = shown;
    }

    isShown() {
        return this._shown;
    }

};