import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import param from "./Parametros";
import Sinal from "./Sinal";

export default props => {
  return (
    <View style={styles.display}>
      <View style={styles.viewValor}>
        <View style={styles.containerValor}>
          <Text style={styles.displayValor} numberOfLines={1}>
            {props.valor}
          </Text>
        </View>
      </View>
      <View style={styles.viewImagem}>
        <View style={styles.containerImagem}>
          <Sinal sinal={props.sinal} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  display: {
    flex: 1,
    flexDirection: "row",
    margin: 2,
    marginBottom: 6,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: param.corDisplay,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: param.corBordaDisplay
  },

  viewValor: {
    flex: 10
  },

  viewImagem: {
    flex: 1
  },

  containerValor: {
    flex: 1,
    flexDirection: "column-reverse"
  },

  displayValor: {
    marginTop: 4,
    fontSize: 36,
    textAlignVertical: "bottom",
    textAlign: "right",
    color: param.corTextoDisplay
  },

  containerImagem: {
    flex: 1,
    flexDirection: "column-reverse",
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center"
  },

  displayImagem: {
    width: 20,
    height: 20
  }
});
