import inputMsgTmp from './InputMsg.pug';
import './InputMsg.scss';
import BaseComponent from "../BaseComponent";

export default class InputMsg extends BaseComponent {
    constructor({ type = 'error', msg }) {
        super();
        this._type = type;
        this._msg = msg;
    }

    render() {
        const data = {
            type: this._type,
            msg: this._msg,
        }

        return inputMsgTmp.call({}, { data })
    }
}