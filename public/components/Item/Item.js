import itemTmp from './Item.pug';
import './Item.scss';
import '../../mixins/item-type/item-type.scss';
import BaseComponent from '../BaseComponent';

export default class Item extends BaseComponent {
    constructor(args) {
        super()
        this.id = args.id;
        this.type = args.type;
        this.isWork = args.isWork;
        this.district = args.district;
        this.address = args.address;
    }

    render() {
        const data = {
            id: this.id,
            type: this.type,
            isWork: this.isWork,
            district: this.district,
            address: this.address 
        }

        return itemTmp.call({}, {data});
    }
}