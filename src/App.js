/**
 *  App.........: CalcMemo
 *  Descrição...: Calculadora com Fita Memória
 *  Autor.......: Nivaldo Hydalgo
 *  Criação.....: 09/02/2019
 *  Framework...: React Native
 */

import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { createStackNavigator } from "react-navigation";

import Calculadora from "./Calculadora";
import Ajuda from "./Ajuda";

import param from "./Parametros";

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: ('CalcMemo ' + param.versaoCalc),
      headerTintColor: param.corTextoNav,
      headerStyle: {
        height: param.alturaNavBar,
        backgroundColor: param.corNavBar
      },
      headerRight: (
        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate("Help")}>
          <Image
            style={styles.button}
            source={require("./images/ic_ajuda.png")}
          />
        </TouchableOpacity>
      )
    };
  };

  render() {
    return <Calculadora />;
  }
}

class HelpScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Ajuda',
      headerTintColor: param.corTextoNav,
      headerStyle: {
        height: param.alturaNavBar,
        backgroundColor: param.corNavBar
      },
    };
  };

  render() {
    return <Ajuda />;
  }
}

const RootStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Help: { screen: HelpScreen }
  },
  {
    initialRouteName: "Home"
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  botao: {

  },
});
