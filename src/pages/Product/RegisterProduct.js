import React, { useState } from 'react';
import * as SQLite from 'expo-sqlite';
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
import CategoryScreen from '../Category/CategoryScreen';

const db = DatabaseConnection.getConnection();


const RegisterProduct = ({ navigation }) => {

  //let [productId, setProductId] = useState('');
  let [productDescription, setProductDescription] = useState('');
  let [productPrice, setProductPrice] = useState('');
  let [categoryDescription, setCategoryDescription] = useState('');

  let register_product = () => {
    console.log(productDescription, productPrice);

     /* if (!productId) {
      alert('Por favor preencha o código !');
      return;
    }  */

    if (!productDescription) {
      alert('Por favor preencha a descrição !');
      return;
    }
    if (!productPrice) {
      alert('Por favor preencha o produto');
      return;
    }
    /* if (!categoryId) {
      alert('Por favor preencha o código !');
      return;
    } */

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO product (product_description, product_price) VALUES (?,?)',
        [productDescription, productPrice],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sucesso',
              'Produto Registrado com Sucesso !!!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Erro ao tentar Registrar o Produto !!!');
        }
      );
    }, (error) => {
      console.log("Error during product create: " + error);
    }, () => {
      console.log("product creator transaction completed");
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

              {/* <Mytextinput
                placeholder="Entre com o código"
                onChangeText={
                  (productId) => setProductId(productId)
                } 
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              /> */}
              <Mytextinput
                placeholder="Entre com o Nome do Produto"
                onChangeText={
                  (productDescription) => setProductDescription(productDescription)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Entre com o valor do produto"
                onChangeText={
                  (productPrice) => setProductPrice(productPrice)
                }
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
               <Mytextinput
                placeholder="Entre com o categoria do produto"
                /* onChangeText={
                  (productPrice) => setProductPrice(productPrice)
                } */
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />

              


              <Mybutton title="Salvar" customClick={register_product} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterProduct;