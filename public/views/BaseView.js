export default class BaseView {
    constructor(page) {
        this._page = page;
        this.args = {};
        this._targetRender = document.body;
    };

    getTargetRender() {
        return this._targetRender;
    };

    setTargetRender(targetRender) {
        this._targetRender = targetRender;
    }

    render() {
        const page = new this._page(this.args);
        console.log("Base render");
        return page.render();
    };
};