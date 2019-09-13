export default class BaseComponent {
    constructor() {
        this.el = null;
    }

    create() {
        this.beforeRender();
        this.el = this.renderDOM();
        this.afterRender();
        return this.el;
    }

    beforeRender() {}

    render() {
        return ''
    }

    renderDOM() {
        const html = this.render();
        const buffer = document.createElement('div');
        buffer.insertAdjacentHTML('afterbegin', html);
        return buffer.firstElementChild;
    }

    afterRender() {}

    coverUp() {
        this.el.style['display'] = 'none';
    }

    show() {
        this.el.style['display'] = 'unset';
    }

    hide() {
        this.el.remove();
        this.el = null;
    }
}