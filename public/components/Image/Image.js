import imageTmp from './Image.pug';
import './Image.scss';
import BaseComponent from "../BaseComponent";

export default class Image extends BaseComponent {
    constructor({ url, size = 'small' }) {
        super();
        this._url = url;
        this._size = size;
    }

    render() {
        const data = {
            url: this._url,
            size: this._size,
        }

        return imageTmp.call({}, { data })
    }
}