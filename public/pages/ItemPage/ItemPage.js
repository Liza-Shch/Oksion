import './ItemPage.scss';
import Circle from '../../components/Cirlce/Circle';
import ItemType from '../../components/ItemType/ItemType';
import ItemTypes from '../../const/ItemTypes';
import DistrictItem from '../../components/DistrictItem/DistrictItem';
import District from '../../const/District';
import ItemEdit from '../../components/ItemEdit/ItemEdit';
import CircleEdit from '../../components/CircleEdit/CircleEdit';
import AddressItem from '../../components/AddressItem/AddressItem';
import AddressEdit from '../../components/AddressEdit/AddressEdit';

export default class ItemPage {
    constructor({ el, item }) {
        this.el = el;
        this._item = item;
    }

    render() {
        this.el.classList.add('main-item');
        if (this._item.type === 'pion') {
            this.el.classList.add('main-item_pion')
        } else if (this._item.type === 'puon') {
            this.el.classList.add('main-item_puon')
        }

        const header = document.createElement('div');
        header.classList.add('main-item__header');

        const circleEdit = new ItemEdit({ Component: Circle, EditComponent: CircleEdit,
            args: { isWork: this._item.isWork, id: this._item.id }});
        const circleEditEl = circleEdit.create();

        const type = Object.assign({}, ItemTypes.find((type) => type.value == this._item.type)); 
        const itemType = new ItemType({ type: type });
        const itemTypeEl = itemType.create();

        header.append(itemTypeEl, circleEditEl)

        const district = Object.assign({}, District.find((district) => district.value == this._item.district));
        const districtItem = new DistrictItem({ text: district.text})
        const districtItemEl = districtItem.create()

        const addressEdit = new ItemEdit({ Component: AddressItem, EditComponent: AddressEdit,
            args: { address: this._item.address, id: this._item.id }});
        const addressEditEl = addressEdit.create();

        this.el.append(header, districtItemEl, addressEditEl);
        return this.el;
    }
}