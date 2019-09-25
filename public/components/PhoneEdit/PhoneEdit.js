import LabelInput from '../LabelInput/LabelInput';

export default class PhoneEdit extends LabelInput {
    constructor({ phone, pattern = "79[0-9]{2}-[0-9]{3}-[0-9]{2}-[0-9]{2}", size = 18, label = 'Телефон', placeholder = 'Телефон'}) {
        super({ label: label, required: true, pattern: pattern, value: phone, size: size, placeholder: placeholder });
    }
}