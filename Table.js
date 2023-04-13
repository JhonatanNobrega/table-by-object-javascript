import { tdText } from './TdText.js';
import { tdInput } from './TdInput.js';
import { tdSelect } from './TdSelect.js';
import { tdButton } from './TdButton.js';
import { templateTable } from './Template/TemplateTable.js';
import { elementAuxiliar } from './Auxiliar/ElementAuxiliar.js';

export class Table {

  inputsTHead = []

  constructor({ obj, elemento }) {
    this.table = document.createElement("table");
    templateTable.handle(this.table, obj.tableData ?? {});
    this.table.appendChild(this._criateTHead(obj));
    this.table.appendChild(document.createElement('tbody'));
    this.table.appendChild(document.createElement('tfoot'));
    elemento.appendChild(this.table);
  }

  _criateTHead({ prefix, colLimit, header = [] }) {
    if (!colLimit || !prefix) {
      new Error('Favor definir "colLimit", "prefix"');
    }
    let thead = document.createElement("thead");
    header.forEach((trData) => {
      let tr = document.createElement("tr");
      tr.dataset.prefix = prefix;
      thead.appendChild(tr);
      let tdReverse = trData.reverse();
      let inputsItem = [];
      tdReverse.forEach((dataObjet) => {
        let th = document.createElement("th");
        this.processCol({ col: th, dataObjet, prefix, inputs: inputsItem });
        tr.prepend(th);
      });
      if (inputsItem.length > 0) this.inputsTHead.push(inputsItem.reverse());
    });
    return thead;
  }

  criateTBody({ prefix, body, trConfig = [], appendTr = null, rowTable = false }) {
    if (!body || !prefix) {
      new Error('Favor definir "body", "prefix"');
    }
    let tbody = this.table.querySelector('tbody');
    let inputsReturn = [];
    body.forEach((trData, index) => {
      let tr = document.createElement("tr");
      if (trConfig[index]) elementAuxiliar.setData(tr, trConfig[index]);
      tr.dataset.prefix = prefix;
      if (appendTr) {
        tbody.insertBefore(tr, appendTr.nextSibling);
      } else {
        tbody.appendChild(tr);
      }
      let tdReverse = trData.reverse();
      let inputsItem = [];
      tdReverse.forEach((dataObjet) => {
        let td = document.createElement("td");
        this.processCol({ col: td, dataObjet, prefix, inputs: inputsItem });
        tr.prepend(td);
      });
      if (inputsItem.length > 0) {
        inputsReturn.push(inputsItem.reverse());
        if (rowTable) inputsItem.forEach(i => i.inputs = inputsItem);
      }
    });
    return inputsReturn;
  }

  criateTFoot({ prefix, foot }) {
    if (!foot || !prefix) {
      new Error('Favor definir "foot", "prefix"');
    }
    let tfoot = this.table.querySelector('tfoot');
    let inputsReturn = [];
    foot.forEach((trData) => {
      let tr = document.createElement("tr");
      tr.dataset.prefix = prefix;
      tfoot.appendChild(tr);
      let tdReverse = trData.reverse();
      let inputsItem = [];
      tdReverse.forEach((dataObjet) => {
        let td = document.createElement("td");
        this.processCol({ col: td, dataObjet, prefix, inputs: inputsItem });
        tr.prepend(td);
      });
      if (inputsItem.length > 0) inputsReturn.push(inputsItem.reverse());
    });
    return inputsReturn;
  }

  processCol({ col, dataObjet, prefix, inputs }) {
    if (typeof dataObjet.text === 'string') tdText.handle({ td: col, dataObjet });
    if (typeof dataObjet.input === 'string') tdInput.handle({ prefix, td: col, dataObjet, inputs });
    if (typeof dataObjet.select === 'string') tdSelect.handle({ prefix, td: col, dataObjet, inputs });
    if (typeof dataObjet.button === 'string') tdButton.handle({ prefix, td: col, dataObjet });
    this._criateConfig({ td: col, dataObjet });
  }

  _criateConfig({ td, dataObjet }) {
    if (dataObjet.col) td.colSpan = dataObjet.col;
    if (dataObjet.row) td.rowSpan = dataObjet.row;
  }

  getInputsTHead() {
    return this.inputsTHead;
  }

  getInput(arrayInputs, id) {
    for (let i = 0; i < arrayInputs.length; i++) {
      const linha = arrayInputs[i];
      for (let e = 0; e < linha.length; e++) {
        const coluna = linha[e];
        if (coluna.id === id) return coluna;
      }
    }
  }

  getInputs(arrayInputs, arrayIds) {
    let itensLocalizados = [];
    for (let i = 0; i < arrayInputs.length; i++) {
      const linha = arrayInputs[i];
      for (let e = 0; e < linha.length; e++) {
        const coluna = linha[e];
        if (arrayIds.includes(coluna.id)) {
          itensLocalizados.push(coluna);
        }
      }
    }
    return itensLocalizados;
  }

  getInputsAll(arrayInputs) {
    let itensLocalizados = [];
    for (let i = 0; i < arrayInputs.length; i++) {
      const linha = arrayInputs[i];
      itensLocalizados.push(...linha);
    }
    return itensLocalizados;
  }
}


