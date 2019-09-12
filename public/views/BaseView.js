export default class BaseView {
    constructor(page) {
        this.Page = page;
        this.page = null;
        this.args = {};
        this._targetRender = document.body;
        this._shown = false;
    };

    getTargetRender() {
        return this._targetRender;
    };

    setTargetRender(targetRender) {
        this._targetRender = targetRender;
    };

    beforeRender() {};

    render() {
        this.page = new this.Page({ ...this.args, el: this.el});
        this.el = this.page.render();
        this._targetRender.appendChild(this.el);
    };

    afterRender() {};

    create(args) {
        this.args = args;
        this.el = document.createElement('div');
        this.beforeRender();
        this.render();
        this.afterRender();
    }

    hide() {
        console.log('HIDE', this.el)
        if (this.el) {
            this.el.remove();
            this.el = null;
        }
    }

    setShown(shown) {
        this._shown = shown;
    }

    isShown() {
        return this._shown;
    }

};