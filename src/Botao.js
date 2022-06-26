import React from "react";
import { TouchableOpacity, StyleSheet, Text, View, Image } from "react-native";

import param from "./Parametros";

export default props => {
  let stylesBotao = [styles.botao]
  if (props.duplo) stylesBotao.push(styles.botaoDuplo)
  if (props.simples) stylesBotao.push(styles.botaoSimples)
  if (props.operacao) stylesBotao.push(styles.botaoOperacao)
  if (props.igual) stylesBotao.push(styles.botaoIgual)
  if (props.reseta) stylesBotao.push(styles.botaoReseta)

  let tecla = (props.label)
  if ( tecla === '*' ) { tecla = 'x' }
  if ( tecla === '<' ) {
    return (
      <TouchableOpacity style={stylesBotao} onPress={() => props.onClick(props.label)}>
        <View>
          <Image
            style={styles.imageBotao}
            source={require("./images/ic_backspace.png")}
          />
        </View>
      </TouchableOpacity>
    );
  } else {
    if ( tecla === '/' ) {
      return (
        <TouchableOpacity style={stylesBotao} onPress={() => props.onClick(props.label)}>
          <View>
              <Text style={styles.textoBotao}>&divide;</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={stylesBotao} onPress={() => props.onClick(props.label)}>
          <View>
              <Text style={styles.textoBotao}>{tecla}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  }
};

const styles = StyleSheet.create({
  botao: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: param.corBotao,
    marginHorizontal: 2,
    marginVertical: 2,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: param.corBordaBotao,
  },

  textoBotao: {
    fontSize: 30,
    color: param.corTextoBotao,
    fontWeight: "bold",
    textAlign: 'center',
  },

  botaoDuplo: {
    flex: 204,
  },

  botaoSimples: {
    flex: 98,
  },

  botaoOperacao: {
    backgroundColor: param.botaoOperacao,
  },

  botaoIgual: {
    backgroundColor: param.botaoIgual,
  },

  botaoReseta: {
    backgroundColor: param.botaoReseta,
  },

  imageBotao: {
    width: 34, 
    height: 34,
  },
});
