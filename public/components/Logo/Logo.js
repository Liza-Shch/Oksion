import logoTmp from './Logo.pug';
import './Logo.scss';
import BaseComponent from '../BaseComponent';

export default class Logo extends BaseComponent {
    constructor() {
        super()
    };

    render() {
        return logoTmp.call({}, {});
    };
};