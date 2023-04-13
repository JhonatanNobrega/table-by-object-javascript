import { templateSelect } from './Template/TemplateSelect.js';

class TdSelect {

  handle({ prefix, td, dataObjet, inputs }) {
    this.dataObjet = dataObjet;
    this.td = td;
    this.prefix = prefix;
    this.inputs = inputs;
    this.select = document.createElement('select');
    this.inputs.push(this.select);
    this.settings();
    this.processType();
    this.td.appendChild(this.select);
  }

  processType() {
    // if (this.hasType('dynamic')) {
    //   inputDynamic.handle(this.onType('dynamic'));
    // } else {
    this.select.getValue = getValue;
    // }
  }

  hasType(type) {
    return typeof this.dataObjet[type] !== 'undefined';
  }

  onType(type) {
    return { input: this.input, value: this.dataObjet[type], inputs: this.inputs };
  }

  /**
   * Configurações gerais
   */
  settings() {
    if (this.dataObjet.tabIndex) this.input.tabIndex = this.dataObjet.tabIndex;
    templateSelect.handle(this.select, this.td, this.dataObjet);
    this.callbacks();
    this.processId();
    this.select.title = this.dataObjet.select;
    if (this.dataObjet.options) this.setOption();
    this.select.value = this.dataObjet.value ?? '';
  }

  /**
   * Criação dos OPTIONS do INPUT
   */
  setOption() {
    let options = this.dataObjet.options;
    if (options.length === 1) {
      return options.forEach(opt => {
        let option = document.createElement('option');
        option.value = opt;
        option.innerText = opt;
        this.select.appendChild(option);
      });
    }
    if (options.length === 2) {
      for (let i = 0; i < options[0].length; i++) {
        const chave = options[0][i];
        const valor = options[1][i];
        let option = document.createElement('option');
        option.value = valor;
        option.innerText = chave;
        this.select.appendChild(option);
      }
    }
  }

  /**
   * Set Callback
   */
  callbacks() {
    if (this.dataObjet.callbackChange) {
      this.select.addEventListener('change', this.dataObjet.callbackChange);
    }
  }

  /**
   * Set id, data (prefix, iden)
   */
  processId() {
    let iden = this.dataObjet.select.toLowerCase();
    if (this.dataObjet.iden) iden = this.dataObjet.iden;
    this.select.id = this.prefix + '_' + iden;
    this.select.dataset.prefix = this.prefix;
    this.select.dataset.iden = iden;
  }
}

function getValue() {
  return this.value;
}

export const tdSelect = new TdSelect();
