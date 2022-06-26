/*=========================================================
Função: INCREMENTA DIGITO (inclui digito no Display)
=========================================================*/
const incrementarDigito = (display, digito) => {
  let novoDisplay = "0";

  switch (digito) {
    case "0":
      novoDisplay = display + digito;
      break;
    case ".":
      novoDisplay = display + digito;
      break;
    default:
      if (display === "0") {
        novoDisplay = digito;
      } else {
        novoDisplay = display + digito;
      }
      break;
  }

  return novoDisplay;
};

/*=========================================================
Função: VALIDAR DIGITO (se inclui na String do Display)
=========================================================*/
const validarDigito = (display, digito) => {
  let validado = true;

  switch (digito) {
    case "0":
      if (display === "0") {
        validado = false;
      }
      break;
    case ".":
      if (display.includes(".")) {
        validado = false;
      }
      break;
  }

  /*--- Valida o tamanho do numero com a tecla digitada ---*/
  let txt = " ";
  if (display.length == 1 && display === "0") {
    txt = digito;
  } else {
    txt = display + digito;
  }

  let tamanho = txt.length;
  let qt_int = 0;
  let qt_dec = 0;
  let in_ponto = false;
  for (var i = 0; i < tamanho; i++) {
    if (txt.substring(i, i + 1) === ".") {
      in_ponto = true;
    } else {
      if (in_ponto) {
        qt_dec++;
      } else {
        qt_int++;
      }
    }
  }

  if ( !(display.length == 1 && display === "0") ) {
    if (tamanho > 18 || qt_int > 10 || qt_dec > 3) {
      validado = false
    }
  }

  return validado;
};

/*=========================================================
Função: REALIZAR CALCULO
=========================================================*/
const realizarCalculo = (saldo, operacao, valor) => {
  let resultado = 0;

  switch (operacao) {
    case "+":
      resultado = saldo + valor;
      break;
    case "-":
      resultado = saldo - valor;
      break;
    case "*":
      resultado = saldo * valor;
      break;
    case "/":
      resultado = saldo / valor;
      break;
    case "%":
      resultado = (saldo * valor) / 100;
      break;
  }

  return resultado;
};

/*=========================================================
Função: MONTA A FITA DA CALCULADORA
=========================================================*/
const montaFita = (array, operacao, valor, resultado) => {
  let qtde = 0;
  for (let i in array) qtde++;

  let proximoRegistro = qtde;
  let textoFita = " "

  if ( operacao === "=" ) {
    textoFita = " = " + resultado.toString();
  } else {
    textoFita = operacao + " " + valor.toString() + " = " + resultado.toString();
  }

  let novoRegistro = [{ id: proximoRegistro, texto: textoFita }];
  let novaFita = novoRegistro.concat(array);

  return novaFita;
};

/*=========================================================
Função: CARREGA ARRAY DE OPERACOES
=========================================================*/
const montaArrayOperacao = (oper, vr, sdo) => {
  let novaOperacao = {
    operacao: oper,
    valor: vr,
    saldo: sdo
  };

  return novaOperacao;
};

/*=========================================================
Função: PRINT NO CONSOLE O LOG
=========================================================*/
const printaLogFuncao = (funcao, n) => {
  console.debug("=======================================================");
  console.debug("Funcao..............: " + funcao);
  console.debug("Clicou em...........: " + n);
};

export {
  incrementarDigito,
  validarDigito,
  printaLogFuncao,
  realizarCalculo,
  montaFita,
  montaArrayOperacao
};
