import { elementAuxiliar } from '../Auxiliar/ElementAuxiliar.js';

class TemplateInput {
  /**
   * @param input {HTMLInputElement}
   */
  handle(input, td, dataObjet) {
    /**
     * INPUT
     */
    input.classList.add('input_estilo');
    input.autocomplete = false;
    elementAuxiliar.setData(input, dataObjet.elementData ?? {});
    /**
     * TD
     */
    // td.style.background = '#ccffcc';
    elementAuxiliar.setData(td, dataObjet.colData ?? {});
  }
}

export const templateInput = new TemplateInput();
