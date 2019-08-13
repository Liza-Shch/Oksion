import ERROR_MSG from "../../pages/ErrorMsg";

class FormMixin {
    constructor() {
        console.log("Form controller");
    };

    validation(form) {
        const inputs = form.querySelectorAll('input');
        const emptyInputs = [];
        inputs.forEach(input => {
            if (!input.value) {
                const emptyInput = {};
                emptyInput.input = input;
                emptyInput.error = input.parentElement.nextElementSibling;
                emptyInput.msg = ERROR_MSG.FIELD_IS_REQUIRED;
                emptyInputs.push(emptyInput);
            }
        });

        if (!emptyInputs.length) {
            return {success: true, emptyInputs: null};
        }

        return {success: false, emptyInputs: emptyInputs};
    };

    renderInputErrors(emptyInputs) {
        console.log(emptyInputs);
        emptyInputs.forEach((emptyInput) =>  {
            emptyInput.input.classList.add('form-input__input_error');
            emptyInput.error.textContent = emptyInput.msg;
            emptyInput.error.classList.add('form-input__msg_error');
        });
    };

    clearErrors() {
        console.log('clear error');
        const errors = document.querySelectorAll('.form-input__msg_error');
        errors.forEach((error) => {
            error.classList.remove('form-input__msg_error');
            error.textContent = '';
        });

        const inputs = document.querySelectorAll('.form-input__input_error');
        inputs.forEach((input) => {
            input.classList.remove('form-input__input_error');
        })
    }
}

export default new FormMixin();