import React, { Component } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";

import Botao from "./Botao";
import Display from "./Display";
import Fita from "./Fita";

import param from "./Parametros";
import {
  incrementarDigito,
  validarDigito,
  printaLogFuncao,
  realizarCalculo,
  montaFita,
  montaArrayOperacao
} from "./Funcoes";

const ws = {
  ultimaTecla: " ",
  stringDisplay: "0",
  resetDisplay: true,

  ultimaOperacao: " ",
  operacaoSetada: "+",
  saldoCalculo: 0,

  //--- divisor do que está OK

  operador1: 0,
  operacao: "+",
  operador2: 0,

  setaOperacao: "+",

  arrayOperacao: [],
  arrayFita: [],
  undoOperacao: false
};

const stateInicial = {
  valorDisplay: "0",
  sinalDisplay: " ",
  listaFita: [],
  isPortait: true
};

export default class Calculadora extends Component {
  state = { ...stateInicial };

  //======================================
  //            ADICIONA DIGITO
  //======================================
  addDigito = n => {
    printaLogFuncao("addDigito", n);
    console.debug("Teste addDigito...: V0002");

    if (ws.resetDisplay) {
      ws.stringDisplay = "0";
    }

    const digitoValidado = validarDigito(ws.stringDisplay, n);

    if (digitoValidado) {
      ws.stringDisplay = incrementarDigito(ws.stringDisplay, n);
      ws.resetDisplay = false;
      this.setState({ valorDisplay: ws.stringDisplay });
    }

    ws.ultimaTecla = n;
  };

  //======================================
  //      REALIZA CALCULO + - / * %
  //======================================
  fazCalculo = n => {
    printaLogFuncao("fazCalculo", n);
    console.debug("Teste fazCalculo...: V0002");

    const valor = parseFloat(ws.stringDisplay);
    let inCalcular = false;
    let novaOperacao = false;

    if (valor == 0) {
      if (n === "+" || n === "-") {
        novaOperacao = true;
      } else {
        if (!(ws.saldoCalculo == 0)) {
          novaOperacao = true;
        }
      }
    } else {
      novaOperacao = true;
      inCalcular = true;
    }

    if (inCalcular) {
      //********** REALIZAR O CÁLCULO *********//
      ws.saldoCalculo = realizarCalculo(
        ws.saldoCalculo,
        ws.operacaoSetada,
        valor
      );
      //********** INCREMENTA A OPERAÇÃO NA FITA *********//
      ws.arrayFita = montaFita(
        ws.arrayFita,
        ws.operacaoSetada,
        valor,
        ws.saldoCalculo
      );
      //********** INCREMENTA A OPERAÇÃO NO ARRAY DE OPERACOES *********//
      ws.arrayOperacao.push(
        montaArrayOperacao(ws.operacaoSetada, valor, ws.saldoCalculo)
      );
      //********** TRATAMENTOS DO CALCULO *********//
      ws.ultimaOperacao = ws.operacaoSetada;
      ws.operacaoSetada = n;
      ws.stringDisplay = ws.saldoCalculo.toString();
      ws.resetDisplay = true;
      this.setState({
        valorDisplay: ws.stringDisplay,
        sinalDisplay: ws.operacaoSetada,
        listaFita: ws.arrayFita
      });
    } else {
      if (novaOperacao) {
        //********** SOMENTE SETA A PROXIMA OPERACAO *********//
        ws.operacaoSetada = n;
        this.setState({
          sinalDisplay: ws.operacaoSetada
        });
      }
    }

    ws.ultimaTecla = n;
  };

  //======================================
  //        (=) Totaliza Saldo
  //======================================
  totalizaSaldo = n => {
    printaLogFuncao("totalizaSaldo", n);
    console.debug("totalizaSaldo...: V0001");

    //********** INCREMENTA A OPERAÇÃO NA FITA *********//
    ws.arrayFita = montaFita(ws.arrayFita, n, 0, ws.saldoCalculo);
    //********** INCREMENTA A OPERAÇÃO NO ARRAY DE OPERACOES *********//
    ws.arrayOperacao.push(montaArrayOperacao(n, 0, ws.saldoCalculo));

    //********** TRATAMENTOS DO CALCULO *********//
    ws.ultimaOperacao = n;
    ws.operacaoSetada = "+";
    ws.stringDisplay = "0";
    (ws.saldoCalculo = 0), (ws.resetDisplay = true);
    this.setState({
      valorDisplay: ws.stringDisplay,
      sinalDisplay: ws.operacaoSetada,
      listaFita: ws.arrayFita
    });

    ws.ultimaTecla = n;
  };

  //======================================
  //      (C) Reseta a Calculadota
  //======================================
  resetaCalculo = n => {
    printaLogFuncao("resetaCalculo", n);

    ws.resetDisplay = true;
    ws.saldoCalculo = 0;
    ws.stringDisplay = "0";
    ws.ultimaOperacao = " ";
    ws.operacaoSetada = "+";

    ws.arrayOperacao = [];
    ws.arrayFita = [];

    this.setState({
      valorDisplay: ws.stringDisplay,
      sinalDisplay: ws.operacaoSetada,
      listaFita: ws.arrayFita
    });

    ws.ultimaTecla = n;
  };

  //======================================
  //   (<) desfaz Ultimo digito/calculo
  //======================================
  undoUltimo = n => {
    printaLogFuncao("undoUltimo", n);
    let qtTecla = ws.stringDisplay.length;
    let qtOperacao = this.qtdeArray(ws.arrayOperacao);
    // Obs.: Não atualizar aqui o ultimaTecla

    console.debug("ws.ultimaTecla.....: " + ws.ultimaTecla);
    console.debug("ws.undoOperacao....: " + ws.undoOperacao);
    if (
      (qtTecla == 1 && ws.stringDisplay === "0") ||
      "/+*-%=".includes(ws.ultimaTecla) ||
      (ws.ultimaTecla == "<" && ws.undoOperacao == true)
    ) {
      console.debug("Entrou no IF do undo Operacao");
      if (qtOperacao > 0) {
        console.debug("Entrou no IF do qtOperacao > 0");
        (ws.undoOperacao = true),
          (ws.saldoCalculo = ws.arrayOperacao[qtOperacao - 1].saldo);
        // ws.stringDisplay = ws.saldoCalculo.toString();
        ws.stringDisplay = "0";
        if (qtOperacao > 1) {
          ws.arrayOperacao.pop();
          ws.arrayFita.shift();
        } else {
          ws.arrayOperacao = [];
          ws.arrayFita = [];
        }
        this.setState({
          valorDisplay: ws.stringDisplay,
          listaFita: ws.arrayFita
        });
      }
    } else {
      if (qtTecla == 1) {
        ws.stringDisplay = "0";
      } else {
        ws.stringDisplay = ws.stringDisplay.substring(0, qtTecla - 1);
      }
      this.setState({ valorDisplay: ws.stringDisplay });
    }

    ws.ultimaTecla = n;
  };

  //  qtdeArray = n => {
  //    let qtde = 0;
  //    for (let i in n) qtde++;
  //    return qtde;
  //  };

  //======================================
  //           Renderiza Tela
  //======================================

  handleTextLayout = evt => {
    let altura = evt.nativeEvent.layout.height;
    let largura = evt.nativeEvent.layout.width;
    if (altura > largura) {
      this.setState({ isPortait: true });
    } else {
      this.setState({ isPortait: false });
    }
  };

  render() {
    return (
      <View style={styles.containerGeral} onLayout={this.handleTextLayout}>
        {this.state.isPortait ? (
          /*===============================================================
          *                   Orientation: PORTAIT
          ---------------------------------------------------------------*/

          <View style={styles.containerPortait}>
            <View style={styles.fitaPort}>
              <Fita listaFita={this.state.listaFita} />
            </View>
            <View style={styles.displayPort}>
              <Display
                valor={this.state.valorDisplay}
                sinal={this.state.sinalDisplay}
              />
            </View>
            <View style={styles.tecladoPort}>
              <View style={styles.linhaTeclas}>
                <Botao label="C" reseta onClick={this.resetaCalculo} />
                <Botao label="<" reseta onClick={this.undoUltimo} />
                <Botao label="%" operacao onClick={this.fazCalculo} />
                <Botao label="*" operacao onClick={this.fazCalculo} />
              </View>
              <View style={styles.linhaTeclas}>
                <Botao label="7" onClick={this.addDigito} />
                <Botao label="8" onClick={this.addDigito} />
                <Botao label="9" onClick={this.addDigito} />
                <Botao label="/" operacao onClick={this.fazCalculo} />
              </View>
              <View style={styles.linhaTeclas}>
                <Botao label="4" onClick={this.addDigito} />
                <Botao label="5" onClick={this.addDigito} />
                <Botao label="6" onClick={this.addDigito} />
                <Botao label="-" operacao onClick={this.fazCalculo} />
              </View>
              <View style={styles.linhaTeclas}>
                <Botao label="1" onClick={this.addDigito} />
                <Botao label="2" onClick={this.addDigito} />
                <Botao label="3" onClick={this.addDigito} />
                <Botao label="+" operacao onClick={this.fazCalculo} />
              </View>
              <View style={styles.linhaTeclas}>
                <Botao label="0" duplo onClick={this.addDigito} />
                <Botao label="." simples onClick={this.addDigito} />
                <Botao label="=" simples igual onClick={this.totalizaSaldo} />
              </View>
            </View>
          </View>
        ) : (
          /*=============================================================*/
          /*===============================================================
          *                  Orientation: LANDSCAPE
          ---------------------------------------------------------------*/

          <View style={styles.containerLandscape}>
            <View style={styles.containerLandDireito}>
              <View style={styles.fitaLand}>
                <Fita listaFita={this.state.listaFita} />
              </View>
            </View>

            <View style={styles.containerLandEsquerdo}>
              <View style={styles.displayLand}>
                <Display valor={this.state.valorDisplay} sinal="+" />
              </View>
              <View style={styles.tecladoLand}>
                <View style={styles.linhaTeclas}>
                  <Botao label="C" reseta onClick={this.resetaCalculo} />
                  <Botao label="<" reseta onClick={this.undoUltimo} />
                  <Botao label="%" operacao onClick={this.fazCalculo} />
                  <Botao label="*" operacao onClick={this.fazCalculo} />
                </View>
                <View style={styles.linhaTeclas}>
                  <Botao label="7" onClick={this.addDigito} />
                  <Botao label="8" onClick={this.addDigito} />
                  <Botao label="9" onClick={this.addDigito} />
                  <Botao label="/" operacao onClick={this.fazCalculo} />
                </View>
                <View style={styles.linhaTeclas}>
                  <Botao label="4" onClick={this.addDigito} />
                  <Botao label="5" onClick={this.addDigito} />
                  <Botao label="6" onClick={this.addDigito} />
                  <Botao label="-" operacao onClick={this.fazCalculo} />
                </View>
                <View style={styles.linhaTeclas}>
                  <Botao label="1" onClick={this.addDigito} />
                  <Botao label="2" onClick={this.addDigito} />
                  <Botao label="3" onClick={this.addDigito} />
                  <Botao label="+" operacao onClick={this.fazCalculo} />
                </View>
                <View style={styles.linhaTeclas}>
                  <Botao label="0" duplo onClick={this.addDigito} />
                  <Botao label="." simples onClick={this.addDigito} />
                  <Botao label="=" simples igual onClick={this.totalizaSaldo} />
                </View>
              </View>
            </View>
          </View>
        )
        /*=============================================================*/
        }
      </View>
    );
  }
}

/***********************************************************************
 *                             S T Y L E S
 **********************************************************************/

const styles = StyleSheet.create({
  containerGeral: {
    flex: 1,
    padding: 6,
    backgroundColor: param.corFundo
  },

  containerPortait: {
    flex: 1,
    backgroundColor: param.corFundo
  },

  containerLandscape: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: param.corFundo
  },

  containerLandDireito: {
    flex: 1,
    backgroundColor: param.corFundo
  },

  containerLandEsquerdo: {
    flex: 1,
    backgroundColor: param.corFundo
  },

  fitaPort: {
    flex: 28,
    backgroundColor: param.corFundo
  },

  displayPort: {
    flex: 9,
    backgroundColor: param.corFundo
  },

  tecladoPort: {
    flex: 40,
    backgroundColor: param.corFundo
  },

  fitaLand: {
    flex: 1,
    backgroundColor: param.corFundo
  },

  displayLand: {
    flex: 5,
    backgroundColor: param.corFundo
  },

  tecladoLand: {
    flex: 20,
    backgroundColor: param.corFundo
  },

  linhaTeclas: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
