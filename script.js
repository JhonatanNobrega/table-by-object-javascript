import { Table } from './Table.js';

const divTabela = document.getElementById('divTabela');

let objHeader = {
  prefix: 'ts',
  header: [
    [
      { text: 'Kvp' },
      { text: 'mA' },
      { text: 'ms' },
      { text: 'mAs' },
      { text: 'Kvp' },
      { text: 'mGy' },
      { text: 'ms' },
      { text: 'HVL' },
      { text: 'Indicador de dose (mGy)' },
      { text: 'mGy/mAs' },
    ],
    [
      { input: 'Kvp', int: '' },
      { input: 'mA', float: '' },
      { input: 'ms', float: '', },
      { input: 'mAs', dynamic: '--' },
      { button: '' },
      { text: 'Adicione para preencher mais informações', col: 5, dataStyle: { fontWeight: 'normal' } },
    ],
  ]
};

const tabelaTs = new Table({ obj: objHeader, elemento: divTabela });
