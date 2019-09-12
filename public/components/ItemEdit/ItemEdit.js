import './ItemEdit.scss';
import ButtonEdit from "../ButtonEdit/ButtonEdit";
import EventBus from '../../scripts/EventBus';
import PageEvents from '../../events/PageEvents';

export default class ItemEdit {
    constructor({ Component, EditComponent, args = null }) {
        this._component = new Component(args);
        this._editComponent = new EditComponent(args);
        this._button = new ButtonEdit({ action: this._onUpdate.bind(this), type: 'edit' });
        this._el = null;

        EventBus.on(PageEvents.CLOSE_CIRCLE_EDIT, this.afterRender.bind(this))
    }

    create() {
        this._el = this.renderDOM();
        this.afterRender();
        return this._el
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
        this._el.onmouseenter = this._button.show.bind(this._button);
        this._el.onmouseleave = this._button.coverUp.bind(this._button);
    }

    _onUpdate(e) {
        e.preventDefault();
        this._button.coverUp();
        this._el.onmouseenter = null;
        this._el.onmouseleave = null;
        const editComponent = this._editComponent.create();
        this._el.appendChild(editComponent);
    }
}