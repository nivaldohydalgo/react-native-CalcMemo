import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

export default class Calculadora extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.texto}>Benvindo a Ajuda!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  texto: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
