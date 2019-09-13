import districtItemTmp from './DistrictItem.pug';
import './DistrictItem.scss';
import BaseComponent from '../BaseComponent';

export default class District extends BaseComponent {
    constructor(args) {
        super()
        this.text = args.text;
    }

    render() {
        const data = {
            text: this.text
        }

        return districtItemTmp.call({}, { data })
    }
}