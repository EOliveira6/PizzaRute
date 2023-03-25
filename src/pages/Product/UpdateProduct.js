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

const UpdateProduct = ({ navigation }) => {
  let [inputProductId, setInputProductId] = useState('');
  let [productDescription, setProductDescription] = useState('');
  let [productPrice, setProductPrice] = useState('');
  let [categoryId, setCategoryId] = useState('');

  let updateAllStates = (description, price, category) => {
    setProductDescription(description);
    setProductPrice(price);
    setCategoryId(category);
  };

  let searchProduct = () => {
    console.log(inputProductId);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM product where product_id = ?',
        [inputProductId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(
              res.product_description,
              res.product_price,
              res.category_id
            );
          } else {
            alert('Produto não encontrado!');
            updateAllStates('', '', '');
          }
        }
      );
    });
  };
  let updateProduct = () => {
    console.log(inputProductId, productDescription, productPrice, categoryId);

    if (!inputProductId) {
      alert('Por Favor informe o Código!');
      return;
    }
    if (!productDescription) {
      alert('Por favor informe a descrição !');
      return;
    }
    if (!productPrice) {
      alert('Por Favor informe o valor !');
      return;
    }
    if (!categoryId) {
      alert('Por Favor informe a categoria !');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE product set product_description=?, product_price=? , category_id=? where product_id=?',
        [productDescription, productPrice, categoryId, inputProductId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sucesso',
              'Produto atualizado com sucesso !!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Erro ao atualizar o produto');
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
                placeholder="Entre com o Código do Produto"
                style={{ padding: 10 }}
                onChangeText={
                  (inputProductId) => setInputProductId(inputProductId)
                }
              />
              <Mybutton
                title="Buscar Produto"
                customClick={searchProduct}
              />
              <Mytextinput
                placeholder="Entre com a descrição"
                value={productDescription}
                style={{ padding: 10 }}
                onChangeText={
                  (productDescription) => setProductDescription(productDescription)
                }
              />
              <Mytextinput
                placeholder="Entre com o valor"
                value={'' + productPrice}
                onChangeText={
                  (productPrice) => setProductPrice(productPrice)
                }
                maxLength={10}
                style={{ padding: 10 }}
                keyboardType="numeric"
              />
              <Mytextinput
                value={categoryId}
                placeholder="Entre com a categoria"
                onChangeText={
                  (categoryId) => setCategoryId(categoryId)
                }
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: 'top', padding: 10 }}
              />
              <Mybutton
                title="Atualizar Produto"
                customClick={updateProduct}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateProduct;