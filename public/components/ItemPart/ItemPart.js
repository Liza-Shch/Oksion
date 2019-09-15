import itemPartTmp from './ItemPart.pug';
import './ItemPart.scss';
import BaseComponent from "../BaseComponent";

export default class ItemPart extends BaseComponent {
    constructor({ name, count }) {
        super();
        this._name = name;
        this._count = count;
    }

    render() {
        const data = {
            name: this._name,
            count: this._count,
        }
        
        return itemPartTmp.call({}, { data })
    }
}