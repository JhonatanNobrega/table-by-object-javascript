import { tdText } from './TdText.js';
import { tdInput } from './TdInput.js';
import { tdButton } from './TdButton.js';

export class Table {

  inputsTHead = []

  constructor({ obj, elemento }) {
    this.table = document.createElement("table");
    this.table.classList.add("table");
    this.table.appendChild(this._criateTHead(obj));
    this.table.appendChild(document.createElement('tbody'));
    this.table.appendChild(document.createElement('tfoot'));
    elemento.appendChild(this.table);
  }

  _criateTHead({ prefix, limiteColuna, cabecalho }) {
    if (!limiteColuna || !cabecalho || !prefix) {
      new Error('Favor definir "limiteColuna", "cabecalho", "prefix"');
    }
    let thead = document.createElement("thead");
    cabecalho.forEach((trData) => {
      let tr = document.createElement("tr");
      thead.appendChild(tr);

      let tdReverse = trData.reverse();
      tdReverse.forEach((tdData) => {
        let th = document.createElement("th");
        if (typeof tdData.text === 'string') tdText.handle({ td: th, tdData });
        if (typeof tdData.input === 'string') tdInput.handle({ prefix, td: th, tdData, inputs: this.inputsTHead });
        if (typeof tdData.button === 'string') tdButton.handle({ td: th, tdData });
        this._criateConfig({ td: th, tdData });
        tr.prepend(th);
      });

    });
    return thead;
  }

  criateTBody({ prefix, corpo }) {
    if (!corpo || !prefix) {
      new Error('Favor definir "corpo", "prefix"');
    }
    let tbody = this.table.querySelector('tbody');
    let inputsReturn = [];
    corpo.forEach((trData) => {
      let tr = document.createElement("tr");
      tr.dataset.prefix = prefix;
      tbody.appendChild(tr);
      let tdReverse = trData.reverse();
      let inputsItem = [];
      tdReverse.forEach((tdData) => {
        let td = document.createElement("td");
        if (typeof tdData.text === 'string') tdText.handle({ td, tdData });
        if (typeof tdData.input === 'string') tdInput.handle({ prefix, td, tdData, inputs: inputsItem });
        if (typeof tdData.button === 'string') tdButton.handle({ prefix, td, tdData });
        this._criateConfig({ td, tdData });
        tr.prepend(td);
      });
      inputsReturn.push(inputsItem);
    });
    return inputsReturn;
  }

  _criateConfig({ td, tdData }) {
    if (tdData.col) td.colSpan = tdData.col;
    if (tdData.row) td.rowSpan = tdData.row;
  }

  getInputsTHead() {
    return this.inputsTHead.reverse();
  }
}


