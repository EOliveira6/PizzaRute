import React, { useState } from 'react';

import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from 'react-native';
import Mytextinput from '../componentes/Mytextinput';
import Mybutton from '../componentes/Mybutton';
import { DatabaseConnection } from '../../database/database-connection';


const db = DatabaseConnection.getConnection();


const RegisterCategory = ({ navigation }) => {


  let [categoryDescription, setCategoryDescription] = useState('');


  let register_category = () => {
    console.log(categoryDescription);

    /* if (!productId) {
     alert('Por favor preencha o código !');
     return;
   }  */

    if (!categoryDescription) {
      alert('Por favor preencha a descrição !');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO category (category_description) VALUES (?)',
        [categoryDescription],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sucesso',
              'Categoria Registrada com Sucesso !!!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Erro ao tentar Registrar a Categoria !!!');
        }
      );
    }, (error) => {
      console.log("Error during category create: " + error);
    }, () => {
      console.log("category creator transaction completed");
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>

            {/*   <Mytextinput
                placeholder="Código"
                onChangeText={
                  () => setCategoryId()
                }
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
 */}
              <Mytextinput
                placeholder="Entre com o nome"
                onChangeText={
                  (categoryDescription) => setCategoryDescription(categoryDescription)
                }
                style={{ padding: 10 }}
              />





              <Mybutton title="Salvar" customClick={register_category} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterCategory;