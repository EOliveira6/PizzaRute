import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';

import Mytext from '../componentes/Mytext';
import Mytextinput from '../componentes/Mytextinput';
import Mybutton from '../componentes/Mybutton';
import { DatabaseConnection } from '../../database/database-connection';

const db = DatabaseConnection.getConnection();

const UpdateCategory = ({ navigation }) => {
  let [inputCategoryId, setInputCategoryId] = useState('');
  let [categoryDescription, setCategoryDescription] = useState('');
  

  let updateAllStates = (description) => {
    setCategoryDescription(description);
   
  };

  let searchCategory = () => {
    console.log(inputCategoryId);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM category where category_id = ?',
        [inputCategoryId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(
              res.category_description,
        
            );
          } else {
            alert('Categoria não encontrada!');
            updateAllStates('', '', '');
          }
        }
      );
    });
  };
  let updateCategory = () => {
    console.log(inputCategoryId, categoryDescription);

    if (!inputCategoryId) {
      alert('Por Favor informe o Código!');
      return;
    }
    if (!categoryDescription) {
      alert('Por favor informe a descrição !');
      return;
    }
    

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE category set category_description=? where category_id=?',
        [categoryDescription, inputCategoryId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sucesso',
              'Categoria atualizada com sucesso !!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Erro ao atualizar a categoria');
        }
      );
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
              <Mytext text="Filtro de Produto" />
              <Mytextinput
                placeholder="Entre com o Código da Categoria"
                style={{ padding: 10 }}
                onChangeText={
                  (inputCategoryId) => setInputCategoryId(inputCategoryId)
                }
              />
              <Mybutton
                title="Buscar Categoria"
                customClick={searchCategory}
              />
              <Mytextinput
                placeholder="Entre com a descrição"
                value={categoryDescription}
                style={{ padding: 10 }}
                onChangeText={
                  (categoryDescription) => setCategoryDescription(categoryDescription)
                }
              />
              
              <Mybutton
                title="Atualizar Categoria"
                customClick={updateCategory}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateCategory;