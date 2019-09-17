import checkboxTmp from './Checkbox.pug';
import './Checkbox.scss';
import BaseComponent from "../BaseComponent";

export default class Checkbox extends BaseComponent {
    constructor() {
        super();
        this.isChecked = false;
    }

    render() {
        return checkboxTmp.call({}, {})
    }
}