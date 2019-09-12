import circleTmp from './Circle.pug';
import '../../mixins/circle/circle.scss';
import EventBus from '../../scripts/EventBus';
import PageEvents from '../../events/PageEvents';

export default class Circle {
    constructor(args) {
        this.isWork = args.isWork;
        this._el = null;
        EventBus.on(PageEvents.UPDATE_ITEM_WORK, this.update.bind(this))
    }

    create() {
        this._el = this.renderDOM();
        return this._el
    }
    
    render() {
        const data = {
            type: this.isWork ? 'work' : 'not-work'
        }

        return circleTmp.call({}, { data })
    }

    renderDOM() {
        const html = this.render();
        const buffer = document.createElement('div');
        buffer.insertAdjacentHTML('afterbegin', html);
        return buffer.firstElementChild;
    }

    coverUp() {
        this._el.style['display'] = 'none';
    }

    update({ isWork = false }) {
        this.isWork = isWork;
        const newEl = this.renderDOM();
        this._el.innerHTML = newEl.innerHTML;
        this._el.classList = newEl.classList;
    }
}