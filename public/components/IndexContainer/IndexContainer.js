import indexContainerTmp from './IndexContainer.pug';
import './IndexContainer.scss';
import '../../mixins/title-icon/title-icon.scss';
import '../../mixins/text/text.scss';

export default class IndexContainer {
    constructor() {};

    render() {
        return indexContainerTmp.call({}, {});
    }
}