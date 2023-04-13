import { elementAuxiliar } from '../Auxiliar/ElementAuxiliar.js';

class TemplateTable {

  /**
   * @param element {HTMLTableElement}
   */
  handle(element, tableData) {
    element.style.width = '100%';
    element.classList.add('table-l-d', 'p-table', 'borderTables', 'mb-30', 'text-center');
    elementAuxiliar.setData(element, tableData);
  }
}

export const templateTable = new TemplateTable();
