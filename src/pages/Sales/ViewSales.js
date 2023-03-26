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
        'SELECT * FROM sales where sales_id = ?',
        [inputSalesId],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setProductData(results.rows.item(0));
          } else {
            alert('Venda não encontrada !');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytext text=" Consulta de Vendas" />
          <Mytextinput
            placeholder="Entre com o Código da Venda"
            /* onChangeText={
              (inputSalesId) => setInputProdutId(inputSalesId)
            } */
            style={{ padding: 10 }}
          />
          <Mybutton title="Buscar Venda" customClick={searchUser} />
          <View
            style={{
              marginLeft: 35,
              marginRight: 35,
              marginTop: 10
            }}>
            <Text>Código : {productData.sales_id}</Text>
            <Text>Nome : {productData.sales_description}</Text>
            <Text>Preço : {productData.sales_price}</Text>
            <Text>Quantidade : {productData.sales_quantidade}</Text>
            <Text>Data : {productData.sales_date}</Text>
            
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewUser;