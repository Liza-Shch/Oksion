import itemCompositionTmp from './ItemComposition.pug';
import './ItemComposition.scss';
import BaseComponent from '../BaseComponent';
import ItemPart from '../ItemPart/ItemPart';
import EventBus from '../../scripts/EventBus';
import PageEvents from '../../events/PageEvents';

export default class ItemComposition extends BaseComponent {
    constructor({ composition }) {
        super();
        this._composition = composition;
        this._parts = [];
        EventBus.on(PageEvents.UPDATE_ITEM_COMPOSITION, this.update.bind(this));
    }

    render() {
        return itemCompositionTmp.call({}, {})
    }

    renderDOM() {
        this._parts = this._composition.map((part) => { return new ItemPart(part) });
        const html = this.render();
        const buffer = document.createElement('div');
        buffer.insertAdjacentHTML('afterbegin', html);
        const el = buffer.firstElementChild;

        this._parts.forEach((part) => el.append(part.create()));
        return el;
    }

    create() {
        this.el = this.renderDOM();
        this.afterRender();
        return this.el;
    }

    update(composition) {
        this._composition = composition;
        const newEl = this.renderDOM();
        this.el.innerHTML = newEl.innerHTML;
        this.el.classList = newEl.classList;
    }
}