import logoTmp from './Logo.pug';
import './Logo.scss';

export default class Logo {
    constructor() {};

    render() {
        return logoTmp.call({}, {});
    };
};