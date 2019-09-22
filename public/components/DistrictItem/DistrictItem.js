import districtItemTmp from './DistrictItem.pug';
import './DistrictItem.scss';
import BaseComponent from '../BaseComponent';
import EventBus from '../../scripts/EventBus';
import PageEvents from '../../events/PageEvents';

export default class District extends BaseComponent {
    constructor({ district }) {
        super()
        this.district = district;
        EventBus.on(PageEvents.UPDATE_ITEM_DISTRICT, this.update.bind(this));
    }

    render() {
        const data = {
            text: this.district.text,
        }

        return districtItemTmp.call({}, { data })
    }

    update({ district }) {
        this.district = district;
        const newEl = this.renderDOM();
        this.el.innerHTML = newEl.innerHTML;
        this.el.classList = newEl.classList;
    }
}