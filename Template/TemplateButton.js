import { elementAuxiliar } from "../Auxiliar/ElementAuxiliar.js";

class TemplateButton {
  handle(button, td, dataObjet) {
    /**
     * BUTTON
     */
    this.typeCustom(button, dataObjet.typeCustom ?? 'Add', dataObjet);
    elementAuxiliar.setData(button, dataObjet.elementData ?? {});
    /**
     * TD
     */
    elementAuxiliar.setData(td, dataObjet.colData ?? {});
  }

  /**
   * @param button {HTMLButtonElement}
   */
  typeCustom(button, typeCustom, dataObjet) {
    button.tabIndex = 1;
    button.type = 'button';
    button.style.marginTop = '5px';
    button.style.marginBottom = '5px';
    button.classList.add('btn');
    if (typeCustom === 'Add') {
      button.dataset.style = 'expand-left';
      button.dataset.plugin = 'ladda';
      button.classList.add('btn-primary', 'btn-xs', 'ladda-button');
      button.innerHTML = `
        <span class="ladda-label">
          <i class="icon wb-plus" aria-hidden="true"></i>
        </span>
        <span class="ladda-spinner"></span>
      `;
    } else if (typeCustom === 'Remover') {
      button.dataset.style = 'expand-left';
      button.dataset.plugin = 'ladda';
      button.tabIndex = -1;
      button.classList.add('btn-danger', 'btn-xs', 'ladda-button');
      button.innerHTML = '<i class="icon wb-minus" style="color: #FFF"></i>';
    } else if (typeCustom === 'Dynamic') {
      button.innerHTML = dataObjet.button;
    }
  }
}

export const templateButton = new TemplateButton();
