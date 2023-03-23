import { elementAuxiliar } from './ElementAuxiliar.js';

class TdInput {

    handle({ prefix, td, tdData, inputs }) {
        let input = document.createElement("input");
        inputs.push(input);
        elementAuxiliar.setData(input, tdData);
        this._processId({ prefix, input, tdData });
        this._callbacks({ input, tdData });
        input.id = this._processId({ prefix, tdData });

        input.classList.add("form-control");
        input.title = tdData.input;
        input.getValue = this.getValue;
        input.setValueFloat = this.setValueFloat;
        if (tdData.dynamic) this.dynamic({ input });
        if (tdData.float) this.float({ input, inputs });
        if (tdData.int) this.int({ input, inputs });
        if (tdData.value) input.value = tdData.value;


        td.appendChild(input);
    }

    _callbacks({ input, tdData }) {
        if (tdData.callbackChange) {
            input.addEventListener('change', tdData.callbackChange);
        }
    }

    _processId({ prefix, tdData }) {
        if (tdData.iden) {
            return prefix + '_' + tdData.iden;
        }
        return prefix + '_' + tdData.input.toLowerCase();
    }

    getValue() {
        return stringByFloat(this.value);
    }

    setValueFloat(float, limit = false) {
        float = limit ? roundFloat(float, limit) : float;
        this.value = String(float).replace('.', ',');
    }

    dynamic({ input }) {
        input.readOnly = true;
        input.tabIndex = -1;
        input.disabled = true;
        input.style.background = '#CCC';
        input.value = '--';
    }

    float({ input, inputs, sanitize = true }) {
        input.type = 'text';
        input.pattern = '[\-?0-9]+([,\.][0-9]+)?';
        // input.step = 'any';
        input.inputMode = 'decimal';
        input.inputAnterior = inputs[inputs.length - 2];
        input.addEventListener('beforeinput', keyInputFloat);
        if (sanitize) input.addEventListener('change', inputSanitizeFloat);
    }

    int({ input, inputs }) {
        // if (input.dataset.float_negativo === 'true') input.min = -9999999999;
        this.float({ input, inputs, sanitize: false });
        input.addEventListener('change', inputSanitizeInt);
    }
}

/**
 * FLOAT
 */
function inputSanitizeFloat(event) {
    if (event.target.dataset.float_negativo === 'true') {
        event.target.value = event.target.value.replace(/[^0-9\-\.]/, '');
        return;
    }
    event.target.value = event.target.value.replace(/[^0-9\.]/, '');
}

function keyInputFloat(event) {
    if (['deleteContentBackward', 'deleteContentForward'].includes(event.inputType)) return;
    if (['insertLineBreak'].includes(event.inputType)) return focarInputPosterior(event);
    let qtPonto = countChar(event.target.value, '.');
    if (event.data === '.' || parseInt(event.data, 10) < 10) {
        if (qtPonto === 1 && event.data === '.') event.preventDefault();
        return;
    }
    if (event.data === ',') {
        event.preventDefault();
        if (qtPonto === 0) event.target.value = event.target.value + '.';
        return;
    }
    if (event.data === '-' && event.target.dataset.float_negativo === 'true') {
        let qtNegativo = countChar(event.target.value, '-');
        if (qtNegativo === 0) return;
    }
    event.preventDefault();
}

/**
 * INT
 */
function inputSanitizeInt(event) {
    if (event.target.dataset.float_negativo === 'true') {
        event.target.value = event.target.value.replace(/[^0-9\-]+/g, '');
        return;
    }
    event.target.value = event.target.value.replace(/[^0-9]+/g, '');
}
function keyInputInt(event) {
    if (['deleteContentBackward', 'deleteContentForward'].includes(event.inputType)) return;
    // if (event.data === 'Enter') return focarInputPosterior(event);
    if (parseInt(event.data, 10) < 10) return;
    if (event.data === '-' && event.target.dataset.int_negativo === 'true') return;
    event.preventDefault();
}

function stringByFloat(valorString) {
    if (valorString === '') return '';
    let float = valorString.replaceAll('.', '');
    float = parseFloat(float.replace(',', '.'));
    return float;
}

function focarInputPosterior(event) {
    event.preventDefault();
    let inputAnterior = event.currentTarget.inputAnterior
    if (inputAnterior) {
        inputAnterior.focus();
    }
}

function floatByString(valorFloat, qtDecimal = false) {
    valorFloat = qtDecimal ? roundFloat(valorFloat, qtDecimal) : valorFloat;
    let valorString = valorFloat.toString();
    let qt = countChar(valorString, '.');
    if (qt === 1) {
        valorString = valorString.replaceAll(',', '');
        valorString = valorString.replaceAll('.', ',');
    }
    return valorString;
}

function roundFloat(valorFloat, qtDecimal) {
    if (qtDecimal && qtDecimal > 0) {
        let valorRedondar = 10;
        for (let i = 1; i < qtDecimal; i++) {
            valorRedondar *= 10;
        }
        valorFloat = Math.round(valorFloat * valorRedondar) / valorRedondar;
    }
    return valorFloat;
}


function countChar(valorString, letraAlvo) {
    let resultado = 0;
    for (const letraAtual of valorString) {
        if (letraAtual === letraAlvo) {
            resultado++;
        }
    }
    return resultado;
}

export const tdInput = new TdInput;