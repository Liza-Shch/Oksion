import uploadImagesTmp from './UploadImages.pug';
import './UploadImages.scss';
import BaseComponent from '../BaseComponent';
import PreviewImages from '../PreviewImages/PreviewImages';
import ButtonEdit from '../ButtonEdit/ButtonEdit';

export default class UploadImages extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        return uploadImagesTmp.call({}, {})
    }

    afterRender() {
        const inputImagesEl = this.el.querySelector('input');
        inputImagesEl.addEventListener('change', this.showPreviewImages.bind(this))
    }

    showPreviewImages(e) {
        if (!e.target.files.length) {
            return
        }
        
        const previewImages = new PreviewImages({ files: e.target.files });
        const previewImagesEl = previewImages.create();
        this.el.append(previewImagesEl);
    }
}