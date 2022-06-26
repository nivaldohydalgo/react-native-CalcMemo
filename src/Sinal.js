import React from "react";
import { StyleSheet, Image } from "react-native";

export default props => {
  let imagem = require("./images/ic_display_mais.png")

  switch (props.sinal) {
    case "-":
      imagem = require("./images/ic_display_menos.png");
      break;
    case "*":
      imagem = require("./images/ic_display_multiplicar.png");
      break;
    case "/":
      imagem = require("./images/ic_display_dividir.png");
      break;
    case "%":
      imagem = require("./images/ic_display_percentagem.png");
      break;
    case "=":
      imagem = require("./images/ic_display_igual.png");
      break;
  }

  return (
    <Image
      style={styles.displayImagem}
      source={imagem}
    />
  );
};

const styles = StyleSheet.create({
  displayImagem: {
    width: 20,
    height: 20
  }
});
