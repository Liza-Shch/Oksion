import imagesEditTmp from './ImagesEdit.pug';
import './ImagesEdit.scss';
import BaseComponent from "../BaseComponent";
import Images from '../Images/Images';
import UploadImages from '../UploadImages/UploadImages';
import Checkbox from '../Checkbox/Checkbox';
import ButtonEdit from '../ButtonEdit/ButtonEdit';

export default class ImagesEdit extends BaseComponent {
    constructor({ imageURLs, imageSize }) {
        super();
        this._images = new Images({ imageURLs: imageURLs, imageSize: imageSize });
        this._buttonUpload = new UploadImages();
        this._buttonChoose = new ButtonEdit({ action: this._onButtonChooseClick.bind(this), type: 'cancel', text: 'Выбрать' });
        this._buttonCancel = new ButtonEdit({ action: this.closeCheckboxes.bind(this), type: 'cancel', text: 'Отменить' });
        this._buttonDelete = new ButtonEdit({ action: this._onButtonDeleteClick.bind(this), type: 'save', text: 'Удалить' });
        this._checkboxes = [];
    }

    render() {
        return imagesEditTmp.call({}, {})
    }

    renderDOM() {
        const el = super.renderDOM();

        const imagesEl = this._images.create();
        const controllsEl = document.createElement('div');
        controllsEl.classList.add('images-edit__controlls');
        const buttonUploadEl = this._buttonUpload.create();
        const buttonChooseEl = this._buttonChoose.create();
        controllsEl.append(buttonChooseEl, buttonUploadEl)
        el.append(imagesEl, controllsEl);
        return el
    }

    _onButtonChooseClick() {
        this._buttonChoose.hide();
        this._buttonUpload.hide();
        this.updateControlls([this._buttonCancel, this._buttonDelete]);
        this.showCheckboxes();
    }

    updateControlls(controlls) {
        const controllsEl = this.el.querySelector('.images-edit__controlls');
        controllsEl.innerHTML = '';
        controlls.forEach((controll) => {
            const controllEl = controll.create();
            controllsEl.append(controllEl);
        })
    }

    showCheckboxes() {
        const images = this._images.getImages();
        images.forEach((image) => {
            const checkbox = new Checkbox();
            this._checkboxes.push(checkbox);
            const checkboxEl = checkbox.create();
            checkboxEl.addEventListener('click', (e) => {
                e.stopPropagation();
            })
            image.el.append(checkboxEl);
        })
    }

    closeCheckboxes() {
        this._checkboxes.forEach((checkbox) => {
            checkbox.el.remove()
        })

        this._checkboxes = [];

        this.updateControlls([this._buttonChoose, this._buttonUpload])
    }

    _onButtonDeleteClick() {
        this.deleteImages();
        this.updateControlls([this._buttonChoose, this._buttonUpload]);
        this.closeCheckboxes();
    }

    deleteImages() {
        const chosenImages = [];
        const images = this._images.getImages();
        images.forEach((image) => {
            const checkboxEl = image.el.querySelector('input');
            if (checkboxEl.checked) {
                chosenImages.push(image)
            }
        })

        console.log(chosenImages)
    }
}