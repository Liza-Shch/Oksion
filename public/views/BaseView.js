export default class BaseView {
    constructor(page) {
        this.Page = page;
        this.page = null;
        this.args = null;
        this._targetRender = document.body;
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
};