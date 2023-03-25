import React, { useState } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import Mytext from '../componentes/Mytext';
import Mytextinput from '../componentes/Mytextinput';
import Mybutton from '../componentes/Mybutton';
import { DatabaseConnection } from '../../database/database-connection';

const db = DatabaseConnection.getConnection();

const ViewUser = () => {
  let [inputProductId, setInputProdutId] = useState('');
  let [productData, setProductData] = useState({});

  let searchUser = () => {
    console.log(inputProductId);
    setProductData({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM product where product_id = ?',
        [inputProductId],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setProductData(results.rows.item(0));
          } else {
            alert('Produto não encontrado !');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytext text="Filtro de Produto" />
          <Mytextinput
            placeholder="Entre com o Código do Produto"
            onChangeText={
              (inputProductId) => setInputProdutId(inputProductId)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="Buscar Produto" customClick={searchUser} />
          <View
            style={{
              marginLeft: 35,
              marginRight: 35,
              marginTop: 10
            }}>
            <Text>Código : {productData.product_id}</Text>
            <Text>Nome : {productData.product_description}</Text>
            <Text>Preço : {productData.product_price}</Text>
            <Text>Categoria do Produto : {productData.category_id}</Text>
            
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewUser;