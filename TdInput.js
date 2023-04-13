import { templateInput } from './Template/TemplateInput.js';
import { inputFloat } from './Inputs/InputFloat.js';
import { inputInt } from './Inputs/InputInt.js';
import { inputDynamic } from './Inputs/InputDynamic.js';
import { inputScale } from './Inputs/InputScale.js';
import { inputDate } from './Inputs/InputDate.js';
import { inputString } from './Inputs/InputString.js';

class TdInput {

  handle({ prefix, td, dataObjet, inputs }) {
    this.dataObjet = dataObjet;
    this.td = td;
    this.prefix = prefix;
    this.inputs = inputs;
    this.input = document.createElement("input");
    this.td.appendChild(this.input);
    this.inputs.push(this.input);
    this.settings();
    this.processType();
  }

  processType() {
    if (this.hasType('dynamic')) {
      inputDynamic.handle(this.onType('dynamic'));
      this.input.getValue = getValue;
    } else if (this.hasType('float')) {
      inputFloat.handle(this.onType('float'));
    } else if (this.hasType('int')) {
      inputInt.handle(this.onType('int'));
    } else if (this.hasType('scale')) {
      inputScale.handle(this.onType('scale'));
    } else if (this.hasType('date')) {
      inputDate.handle(this.onType('date'), this.dataObjet);
    } else if (this.hasType('string')) {
      inputString.handle(this.onType('string'), this.dataObjet);
      this.input.getValue = getValue;
    } else {
      this.input.getValue = getValue;
    }
  }

  hasType(type) {
    return typeof this.dataObjet[type] !== 'undefined';
  }

  onType(type) {
    return { input: this.input, td: this.td, value: this.dataObjet[type], inputs: this.inputs };
  }

  /**
   * Configurações gerais
   */
  settings() {
    if (this.dataObjet.tabIndex) this.input.tabIndex = this.dataObjet.tabIndex;
    this.input.type = 'text';
    templateInput.handle(this.input, this.td, this.dataObjet);
    this.callbacks();
    this.processId();
    this.input.title = this.dataObjet.input;
    if (this.dataObjet.options) this.setOption();
  }

  /**
   * Criação dos OPTIONS do INPUT
   */
  setOption() {
    let dataList = document.createElement('datalist');
    dataList.id = this.input.id + '_list';
    this.dataObjet.options.forEach(opt => {
      let option = document.createElement('option');
      option.value = opt;
      dataList.appendChild(option)
    });
    this.td.appendChild(dataList);
    this.input.setAttribute('list', dataList.id);
  }

  /**
   * Set Callback
   */
  callbacks() {
    if (this.dataObjet.callbackChange) {
      this.input.callbackChange = this.dataObjet.callbackChange;
    }
  }

  /**
   * Set id, data (prefix, iden)
   */
  processId() {
    let iden = this.dataObjet.input.toLowerCase();
    if (this.dataObjet.iden) iden = this.dataObjet.iden;
    this.input.id = this.prefix + '_' + iden;
    this.input.dataset.prefix = this.prefix;
    this.input.dataset.iden = iden;
  }
}

function getValue() {
  return this.value;
}

export const tdInput = new TdInput;
