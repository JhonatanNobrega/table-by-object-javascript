import { elementAuxiliar } from '../Auxiliar/ElementAuxiliar.js';

class TemplateSelect {
  /**
   * @param select {HTMLSelectElement}
   */
  handle(select, td, dataObjet) {
    /**
     * SELECT
     */
    select.classList.add('form-control');
    select.autocomplete = false;
    elementAuxiliar.setData(select, dataObjet.elementData ?? {});
    /**
     * TD
     */
    elementAuxiliar.setData(td, dataObjet.colData ?? {});
  }
}

export const templateSelect = new TemplateSelect();
