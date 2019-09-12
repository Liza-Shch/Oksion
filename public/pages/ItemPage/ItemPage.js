import './ItemPage.scss';
import Circle from '../../components/Cirlce/Circle';
import ItemType from '../../components/ItemType/ItemType';
import ItemTypes from '../../const/ItemTypes';
import DistrictItem from '../../components/DistrictItem/DistrictItem';
import District from '../../const/District';
import ItemEdit from '../../components/ItemEdit/ItemEdit';
import CircleEdit from '../../components/CircleEdit/CircleEdit';

export default class ItemPage {
    constructor(args) {
        console.log('ITEMPAGE ARGS', args)
        this._el = args.el;
        this._item = args.item;
    }

    render() {
        this._el.classList.add('main-item');
        if (this._item.type === 'pion') {
            this._el.classList.add('main-item_pion')
        } else if (this._item.type === 'puon') {
            this._el.classList.add('main-item_puon')
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

        this._el.append(header, districtItemEl);
        return this._el;
    }
}