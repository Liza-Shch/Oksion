import userMenuTmp from './UserMenu.pug';
import './UserMenu.scss';

export default class UserMenu {
    constructor(authAs) {
        this._authAs = authAs;
    };

    render() {
        const renderData = {
            authAs: this._authAs,
        };

        return userMenuTmp.call({}, renderData);
    };
};