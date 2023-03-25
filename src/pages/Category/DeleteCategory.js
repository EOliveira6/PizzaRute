import React, { useState } from 'react';
import { View, Alert, SafeAreaView } from 'react-native';
import Mytextinput from '../componentes/Mytextinput';
import Mybutton from '../componentes/Mybutton';
import { DatabaseConnection } from '../../database/database-connection';

const db = DatabaseConnection.getConnection();

const DeleteCategory = ({ navigation }) => {
  let [inputCategoryId, setInputCategoryId] = useState('');

  let deleteCategory = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  category where category_id=?',
        [inputCategoryId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sucesso',
              'Categoria Excluída com Sucesso !',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Por favor entre com um código de categoria válido !');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytextinput
            placeholder="Entre com o Código do Categoria"
            onChangeText={
              (inputCategoryId) => setInputCategoryId(inputCategoryId)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="Excluir Categoria" customClick={deleteCategory} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteCategory;