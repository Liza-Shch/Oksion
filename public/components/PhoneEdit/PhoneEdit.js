import LabelInput from '../LabelInput/LabelInput';

export default class PhoneEdit extends LabelInput {
    constructor({ phone, pattern = "[+]7 [(][0-9]{3}[)] [0-9]{3}-[0-9]{2}-[0-9]{2}", size = 18,
        maxLength = 18, label = 'Телефон', placeholder = 'Телефон',
        msgError = 'Введите телефон в формате +7 (999) 999-99-99' }) {
        super({ label: label, required: true, pattern: pattern, value: phone, size: size,
            placeholder: placeholder, maxLength: maxLength, msgError: msgError });
    }
}