export default class BaseView {
    constructor(page) {
        this._page = page;
        this.args = {};
    };

    render() {
        const page = new this._page(this.args);
        console.log("Base render");
        return page.render();
    };
};