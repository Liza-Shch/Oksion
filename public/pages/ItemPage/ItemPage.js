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
import ItemTypeEdit from '../../components/ItemTypeEdit/ItemTypeEdit';
import EventBus from '../../scripts/EventBus';
import PageEvents from '../../events/PageEvents';
import DistrictItemEdit from '../../components/DistrictItemEdit/DistrictItemEdit';

export default class ItemPage {
    constructor({ el, item }) {
        this.el = el;
        this._item = item;
        this._typeClass = null;
        EventBus.on(PageEvents.UPDATE_ITEM_TYPE, this.updateType.bind(this));
    }

    render() {
        this.el.classList.add('main-item');
        if (this._item.type === 'pion') {
            this._typeClass = 'main-item_pion';
        } else if (this._item.type === 'puon') {
            this._typeClass = 'main-item_puon';
        }

        this.el.classList.add(this._typeClass);

        const header = document.createElement('div');
        header.classList.add('main-item__header');

        const circleEdit = new ItemEdit({ Component: Circle, EditComponent: CircleEdit,
            args: { isWork: this._item.isWork, id: this._item.id }});
        const circleEditEl = circleEdit.create();

        const type = Object.assign({}, ItemTypes.find((type) => type.value == this._item.type)); 
        const itemTypeEdit = new ItemEdit({ Component: ItemType, EditComponent: ItemTypeEdit,
            args: { type: type, id: this._item.id }});
        const itemTypeEditEl = itemTypeEdit.create();

        header.append(itemTypeEditEl, circleEditEl)

        const district = Object.assign({}, District.find((district) => district.value == this._item.district));
        const districtItem = new ItemEdit({ Component: DistrictItem, EditComponent: DistrictItemEdit,
            args: { district: district, id: this._item.id }});
        const districtItemEl = districtItem.create();

        const addressEdit = new ItemEdit({ Component: AddressItem, EditComponent: AddressEdit,
            args: { address: this._item.address, id: this._item.id }});
        const addressEditEl = addressEdit.create();

        this.el.append(header, districtItemEl, addressEditEl);
        return this.el;
    }

    updateType({ type: { value } }) {
        switch(value) {
            case 'pion': {
                this.el.classList.remove(this._typeClass);
                this._typeClass = 'main-item_pion';
                this.el.classList.add(this._typeClass);
                break;
            }
            case 'puon': {
                this.el.classList.remove(this._typeClass);
                this._typeClass = 'main-item_puon';
                this.el.classList.add(this._typeClass);
                break;
            }
        }
    }
}