import commonPageTmp from "./CommonPage.pug";

export default class CommonPage {
    constructor(authAs) {
        this.authAs = authAs;
    };

    render() {
        console.log("CommonPage render");
        const renderData = {
            authAs: this.authAs,
        };

        return commonPageTmp.call({}, renderData);
    };
}