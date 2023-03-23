import { Table } from "./Table.js";

const divTabela = document.getElementById("divTabela");

let obj = {
  prefix: 'ts',
  cabecalho: [
    [
      { text: "Kvp" },
      { text: "mA" },
      { text: "ms" },
      { text: "mAs" },
      { text: "Kvp" },
      { text: "mGy" },
      { text: "ms" },
      { text: "HVL" },
      { text: "Indicador de dose (mGy)" },
      { text: "mGy/mAs" },
    ],
    [
      { input: "Kvp", int: "true", dataSet: { float_negativo: 'true' } },
      { input: "mA", float: "true", callbackChange: CalcularMas, dataSet: { float_negativo: 'true' } },
      { input: "ms", float: "true", callbackChange: CalcularMas },
      { input: "mAs", dynamic: "true" },
      { button: "", callback: PermitirAdd },
      { text: "Adicione para preencher mais informações", col: 5, dataStyle: { fontWeight: 'normal' } },
    ],
  ]
};




const tabelaTs = new Table({ obj, elemento: divTabela });
const arrayTabelaTs = tabelaTs.getInputsTHead();
const [kvp, ma, ms, mas] = arrayTabelaTs;

[ma, ms].forEach(item => {
  item.addEventListener('change', CalcularMas);
});
function CalcularMas() {
  if (ma.getValue() === '' || ms.getValue() === '') return mas.value = '--';
  mas.setValueFloat(ms.getValue() * ma.getValue() / 1000, 2);
}

window.ma = ma;

function PermitirAdd() {
  let itemVazio = arrayTabelaTs.find(item => item.value === '');
  if (itemVazio) {
    window.alert('Favor informar: ' + itemVazio.title);
    itemVazio.focus();
    return;
  }

  // SALVAR NA BASE DE DADOS

  let corpo = [
    [
      { button: '', callback: RemoverTs, typeCustom: 'Remover' },
      { text: '' },
      { text: '' },
      { text: '' },
      { input: 'Kvp', iden: 'kvp1', float: 'true' },
      { input: 'mGy', iden: 'mgy1', float: 'true' },
      { input: 'ms', iden: 'ms1', float: 'true' },
      { text: '' },
      { text: '' },
      { input: 'mGy/mAs', iden: 'mgy_mas1', dynamic: 'true' },
    ],
    [
      { text: kvp.value },
      { text: ma.value },
      { text: ms.value },
      { text: mas.value },
      { input: 'Kvp', iden: 'kvp2', float: 'true' },
      { input: 'mGy', iden: 'mgy2', float: 'true' },
      { input: 'ms', iden: 'ms2', float: 'true' },
      { input: 'HVL', float: 'true' },
      { input: 'Indicador de dose (mGy)', iden: 'dose', float: 'true' },
      { input: 'mGy/mAs', iden: 'mgy_mas2', dynamic: 'true' },
    ],
    [
      { text: '' },
      { text: '' },
      { text: '' },
      { text: '' },
      { input: 'Kvp', iden: 'kvp3', float: 'true' },
      { input: 'mGy', iden: 'mgy3', float: 'true' },
      { input: 'ms', iden: 'ms3', float: 'true' },
      { text: '' },
      { text: '' },
      { input: 'mGy/mAs', iden: 'mgy_mas3', dynamic: 'true' },
    ]
  ];

  let inputs = tabelaTs.criateTBody({ prefix: 'ts1', corpo });
  arrayTabelaTs.forEach(item => item.value = '');
  CalcularMas();
}

function RemoverTs(event) {
  event.target.removerTrs(event);
}
