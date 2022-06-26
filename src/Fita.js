import React from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import param from './Parametros'

export default props => {
  return (
    <View style={styles.fita}>
      <SafeAreaView>
        <FlatList 
          data={props.listaFita}
          inverted
          keyExtractor={item => String(item.id)}
          renderItem={( {item} ) => {
            return (
              <View style={styles.item}>
                <Text style={styles.texto}>
                  {item.texto}
                </Text>
              </View>  
            )
          }}
        />
      </SafeAreaView>
    </View>
  )
};

const styles = StyleSheet.create({
  fita: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    margin: 3,
    marginTop: 4,
    marginBottom: 4,
    borderRadius: 10,
    backgroundColor: param.corFita, 
    borderWidth: 2,
    borderColor: param.corBordaFita,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  item: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  texto: {
    fontSize: 18,
    color: param.corTextoFita,
  },

  corNegativo: {
    color: param.corNegativo,
  },

  corPadrao: {
    color: param.corPadrao,
  },
});
