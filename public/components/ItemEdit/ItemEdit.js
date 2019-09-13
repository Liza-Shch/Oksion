import './ItemEdit.scss';
import ButtonEdit from "../ButtonEdit/ButtonEdit";
import EventBus from '../../scripts/EventBus';
import PageEvents from '../../events/PageEvents';
import BaseComponent from '../BaseComponent';

export default class ItemEdit extends BaseComponent {
    constructor({ Component, EditComponent, args = null }) {
        super()
        this._component = new Component(args);
        this._editComponent = new EditComponent(args);
        this._button = new ButtonEdit({ action: this._onUpdate.bind(this), type: 'edit' });

        EventBus.on(PageEvents.CLOSE_CIRCLE_EDIT, this.afterRender.bind(this))
    }

    renderDOM() {
        const component = this._component.create();
        const button = this._button.create();
        const el = document.createElement('div');
        el.classList.add('item-edit');
        el.append(component, button);
        return el;
    }


    afterRender() {
        this.el.onmouseenter = this._button.show.bind(this._button);
        this.el.onmouseleave = this._button.coverUp.bind(this._button);
    }

    _onUpdate(e) {
        e.preventDefault();
        this._button.coverUp();
        this.el.onmouseenter = null;
        this.el.onmouseleave = null;
        const editComponent = this._editComponent.create();
        this.el.appendChild(editComponent);
    }
}