import districtItemTmp from './DistrictItem.pug';
import './DistrictItem.scss';

export default class District {
    constructor(args) {
        this.text = args.text;
        this._el = null;
    }

    create() {
        this._el = this.renderDOM();
        return this._el;
    }

    render() {
        const data = {
            text: this.text
        }

        return districtItemTmp.call({}, { data })
    }

    renderDOM() {
        const html = this.render()
        const buffer = document.createElement('div');
        buffer.insertAdjacentHTML('afterbegin', html);
        return buffer.firstElementChild
    }
}