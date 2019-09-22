import circleTmp from './Circle.pug';
import '../../mixins/circle/circle.scss';
import EventBus from '../../scripts/EventBus';
import PageEvents from '../../events/PageEvents';
import BaseComponent from '../BaseComponent';

export default class Circle extends BaseComponent {
    constructor(args) {
        super()
        this.isWork = args.isWork;
        EventBus.on(PageEvents.UPDATE_ITEM_WORK, this.update.bind(this))
    }
    
    render() {
        const data = {
            type: this.isWork ? 'work' : 'not-work'
        }

        return circleTmp.call({}, { data })
    }

    update({ isWork = false }) {
        this.isWork = isWork;
        const newEl = this.renderDOM();
        this.el.innerHTML = newEl.innerHTML;
        this.el.classList = newEl.classList;
    }
}