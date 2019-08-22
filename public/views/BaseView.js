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
        return this.page.render();
    };

    afterRender() {};

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