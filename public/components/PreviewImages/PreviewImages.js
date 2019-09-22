import previewImagesTmp from './PreviewImages.pug';
import './PreviewImages.scss';
import BaseComponent from "../BaseComponent";
import EditControlls from '../EditControlls/EditControlls';

export default class PreviewImages extends BaseComponent {
    constructor({ files }) {
        super();
        this._files = [...files];
        this._images = [];
        this._controlls = new EditControlls({ actionCancel: this.hide.bind(this), actionSave: this.save.bind(this) })
    }

    render() {
        return previewImagesTmp.call({}, {})
    }

    renderDOM() {
        const html = this.render();
        const buffer = document.createElement('div');
        buffer.insertAdjacentHTML('afterbegin', html);
        const el = buffer.firstElementChild;

        const imagesEl = el.querySelector('.preview-images__images');
        this._files.forEach((file) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onloadend = () => {
                const image = new Image();
                image.src = fileReader.result;
                image.classList.add('preview-images__image');
                imagesEl.append(image);
            }
        })

        const controllsEl = this._controlls.create();
        controllsEl.classList.add('preview-images__controlls');
        el.append(controllsEl);
        
        return el
    }

    afterRender() {
        this._onClickOutside = this._onClickOutside.bind(this);
        document.addEventListener('click', this._onClickOutside);
    }

    hide() {
        this.el.remove();
        this.el = null;
        document.removeEventListener('click', this._onClickOutside);
    }

    _onClickOutside(e) {
        e.preventDefault();
        if (e.target.closest('.preview-images')) {
            return
        }

        this.hide();
    }

    save() {
    }
} 