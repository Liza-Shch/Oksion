import imagesTmp from './Images.pug';
import './Images.scss';
import BaseComponent from "../BaseComponent";
import Image from '../Image/Image';
import ButtonEdit from '../ButtonEdit/ButtonEdit';

export default class Images extends BaseComponent {
    /**
     * 
     * @param {Array} imageURLs - array of urls
     */
    constructor({ imageURLs, imageSize = 'small' }) {
        super();
        this._imageURLs = imageURLs;
        this._imageSize = imageSize;
        this._images = [];
        this._buttonNext = new ButtonEdit({ action: this.showNextImage.bind(this), type: 'next' });
        this._buttonPrev = new ButtonEdit({ action: this.showPrevImage.bind(this), type: 'prev' });
        this._currentPage = 0;
        this._largeImage = null;
    }

    render() {
        return imagesTmp.call({}, {})
    }

    renderDOM() {
        const el = super.renderDOM();

        const content = el.querySelector('.images__content');
        this._imageURLs.forEach((imageURL) => {
            const image = new Image({ url: imageURL, size: this._imageSize });
            const imageEl = image.create();
            content.append(imageEl);
            this._images.push(image);
        });

        content.style['grid-template-columns'] = `repeat(${this._images.length}, 1fr)`;

        const buttonNext = this._buttonNext.create();
        buttonNext.classList.add('images__button', 'images__button_next');
        const buttonPrev = this._buttonPrev.create();
        buttonPrev.classList.add('images__button', 'images__button_prev');
        el.prepend(buttonPrev);
        el.append(buttonNext);

        return el
    }

    computedShownImagesCount() {
        const imageWidth = this.computedImageWidth();
        if (!imageWidth) {
            return 0
        }

        const width = this.computedWidth();
        const res = +width.substr(0, width.length - 2) / +imageWidth.substr(0, imageWidth.length - 2);
        return Math.trunc(res)
    }

    computedWidth() {
        return getComputedStyle(this.el.querySelector('.images__content')).width;
    }

    computedImageWidth() {
        if (!this._images.length) {
            return 0;
        }

        return getComputedStyle(this._images[0].el).width;
    }

    showNextImage() {
        if (this.computedShownImagesCount() + this._currentPage > this._images.length) {
            return
        }

        this._currentPage++;
        this._images.forEach((img) => {
            const width = this.computedImageWidth();
            img.el.classList.add('images__image_animation');
            img.el.style['transform'] = `translateX(-${width.substr(0, width.length - 2) * this._currentPage}px)`;
        })
    }

    showPrevImage() {
        if (this._currentPage < 1) {
            return
        }

        this._currentPage--;
        this._images.forEach((img) => {
            const width = this.computedImageWidth();
            img.el.classList.add('images__image_animation');
            img.el.style['transform'] = `translateX(-${width.substr(0, width.length - 2) * this._currentPage}px)`;
        })
    }

    afterRender() {
        this._onCloseLargeImage = this._onCloseLargeImage.bind(this);
        this._images.forEach((img) => {
            img.el.addEventListener('click', this._onShowLargeImage.bind(this), img.el);
        })
    }

    _onShowLargeImage(el) {
        this._largeImage = new Image({ url: el._url, size: 'large' });
        const largeImageEl = this._largeImage.create();
        largeImageEl.classList.add('images__image_large-js');
        this.el.append(largeImageEl);
        setTimeout(() => document.addEventListener('click', this._onCloseLargeImage), 100); 
    }

    _onCloseLargeImage(e) {
        e.preventDefault();
        if (e.target.closest('.images__image_large-js')) {
            return
        }

        this._largeImage.el.remove();
        this._largeImage = null;
        document.removeEventListener('click', this._onCloseLargeImage);
    }

    getImages() {
        return this._images;
    }
}