import indexContainerTmp from './IndexContainer.pug';
import './IndexContainer.scss';
import '../../mixins/title-icon/title-icon.scss';
import '../../mixins/text/text.scss';
import BaseComponent from '../BaseComponent';

export default class IndexContainer extends BaseComponent {
    constructor() {
        super()
    };

    render() {
        return indexContainerTmp.call({}, {});
    }
}