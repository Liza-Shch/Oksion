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
import ItemComposition from '../../components/ItemComposition/ItemComposition';
import ItemCompositionEdit from '../../components/ItemCompositionEdit/ItemCompositionEdit';
import ImagesEdit from '../../components/ImagesEdit/ImagesEdit';
import Note from '../../components/Note/Note';
import NoteEdit from '../../components/NoteEdit/NoteEdit';
import NewWork from '../../components/NewWork/NewWork';
import Contacts from '../../components/Contacts/Contacts';
import ContactsEdit from '../../components/ContactsEdit/ContactsEdit';

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
        circleEditEl.classList.add('main-item__margin-left');

        const type = Object.assign({}, ItemTypes.find((type) => type.value == this._item.type)); 
        const itemTypeEdit = new ItemEdit({ Component: ItemType, EditComponent: ItemTypeEdit,
            args: { type: type, id: this._item.id }});
        const itemTypeEditEl = itemTypeEdit.create();

        const noteEdit = new ItemEdit({ Component: Note, EditComponent: NoteEdit, args: {id: this._item.id, note: this._item.note }})
        const noteEditEl = noteEdit.create();

        const leftPart = document.createElement('div');
        leftPart.classList.add('main-item__part');
        leftPart.append(itemTypeEditEl, circleEditEl);

        const rightPart = document.createElement('div');
        rightPart.classList.add('main-item__part');
        rightPart.append(noteEditEl);

        header.append(leftPart, rightPart);

        const district = Object.assign({}, District.find((district) => district.value == this._item.district));
        const districtItem = new ItemEdit({ Component: DistrictItem, EditComponent: DistrictItemEdit,
            args: { district: district, id: this._item.id }});
        const districtItemEl = districtItem.create();

        const addressEdit = new ItemEdit({ Component: AddressItem, EditComponent: AddressEdit,
            args: { address: this._item.address, id: this._item.id }});
        const addressEditEl = addressEdit.create();
        addressEditEl.classList.add('main-item__margin-top_small');

        const addressFull = document.createElement('div');
        addressFull.append(districtItemEl, addressEditEl);
        addressFull.classList.add('main-item__item');

        const newWork = new NewWork({ id: this._item.id });
        const newWorkEl = newWork.create();
        newWorkEl.classList.add('main-item__item');

        const compositionEdit = new ItemEdit({ Component: ItemComposition, EditComponent: ItemCompositionEdit,
            args: { composition: this._item.composition, id: this._item.id }});
        const compositionEditEl = compositionEdit.create();
        compositionEditEl.classList.add('main-item__item');
        compositionEditEl.style.width = '100%';

        const imagesEdit = new ImagesEdit({ imageURLs: [ '', '', '', '', ''] });
        const imagesEditEl = imagesEdit.create();
        imagesEditEl.classList.add('main-item__item');

        const fakeContacts = [
            {
                name: {
                    name: 'Алексей',
                    surname: 'Щербаков',
                    patronymic: 'Николаевич',
                },

                phone: '+7 (902) 321-85-10',
            },
            {
                name: {
                    name: 'Максим',
                    surname: 'Иванов',
                    patronymic: 'Александрович',
                },

                phone: '+7 (902) 322-65-10',
            },
            {
                name: {
                    name: 'Богдан',
                    surname: 'Смирнов',
                    patronymic: 'Алексеевич',
                },

                phone: '+7 (902) 821-75-10',
            },
        ];

        const sidebar = document.createElement('div');
        sidebar.classList.add('main-item__sidebar');

        const contacts = new ItemEdit({ Component: Contacts, EditComponent: ContactsEdit, args: { contacts: fakeContacts }});
        const contactsEl = contacts.create();
        sidebar.append(contactsEl);
        const menu = document.querySelector('.menu');
        const menuHeight = getComputedStyle(menu).height;
        sidebar.style['top'] = `calc(${menuHeight} + 80px)`;
        
        const containerColumnEl = document.createElement('div');
        containerColumnEl.classList.add('main-item__container-column');
        containerColumnEl.append(newWorkEl, compositionEditEl);

        const container = document.createElement('div');
        container.classList.add('main-item__content');
        container.append(header, addressFull, containerColumnEl, imagesEditEl);
        
        this.el.append(container, sidebar);
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