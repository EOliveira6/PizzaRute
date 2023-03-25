import React, { useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import Mytext from '../componentes/Mytext';
import Mytextinput from '../componentes/Mytextinput';
import Mybutton from '../componentes/Mybutton';
import { DatabaseConnection } from '../../database/database-connection';

const db = DatabaseConnection.getConnection();

const ViewUser = () => {
  let [inputCategoryId, setInputCategoryId] = useState('');
  let [categoryData, setCategoryData] = useState({});

  let searchUser = () => {
    console.log(inputCategoryId);
    setCategoryData({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM category where category_id = ?',
        [inputCategoryId],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setCategoryData(results.rows.item(0));
          } else {
            alert('Categoria não encontrada !');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytext text="Filtro de Categoria" />
          <Mytextinput
            placeholder="Entre com o Código da Categoria"
            onChangeText={
              (inputCategoryId) => setInputCategoryId(inputCategoryId)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="Buscar Categoria" customClick={searchUser} />
          <View
            style={{
              marginLeft: 35,
              marginRight: 35,
              marginTop: 10
            }}>
            <Text>Código : {categoryData.category_id}</Text>
            <Text>Nome : {categoryData.category_description}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewUser;