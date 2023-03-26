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
import ViewSalesProduct from '../Sales/ViewSalesProduct';
import ViewSales from '../Sales/ViewSales';
import CategoryScreen from '../Category/CategoryScreen';

const db = DatabaseConnection.getConnection();


const RegisterSales = ({ navigation }) => {

  let [salesId, setSalesId] = useState('');
  let [SalesDescription, setSalesDescription] = useState('');
  let [SalesPrice, setSalesPrice] = useState('');
  let [SalesQtd, setSalesQtd] = useState('');
  let [SalesDate, setSalesDate] = useState('');


  let register_sale = () => {
    console.log(salesId, salesDescription, salesPrice, salesQtd, SalesDate);

    /* if (!salesId) {
     alert('Por favor preencha o código !');
     return;
   }  */

    if (!salesDescription) {
      alert('Por favor preencha a descrição !');
      return;
    }
    if (!salesPrice) {
      alert('Por favor preencha o valor do produto');
      return;
    }
    /* if (!categoryId) {
      alert('Por favor preencha o código !');
      return;
    } */

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO sales (sales_description, sales_price, sales_qtd, sales_date) VALUES (?,?,?,?)',
        [salesDescription, salesPrice, salesQtd, SalesDate],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sucesso',
              'Venda Registrada com Sucesso !!!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Erro ao tentar Registrar a Venda !!!');
        }
      );
    }, (error) => {
      console.log("Error during sales create: " + error);
    }, () => {
      console.log("sales creator transaction completed");
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

              <Mytextinput
                placeholder="Entre com o código"
                onChangeText={
                  (salesId) => setSalesId(salesId)
                }
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Entre com o Nome do Produto"
                onChangeText={
                  (salesDescription) => setSalesDescription(salesDescription)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Entre com o valor do produto"
                onChangeText={
                  (salesPrice) => setSalesPrice(salesPrice)
                }
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Entre com a quantidade do produto"
                /* onChangeText={
                  (salesPrice) => setSalesPrice(salesPrice)
                } */
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Informe a Data"
                /* onChangeText={
                  (salesPrice) => setSalesPrice(salesPrice)
                } */
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />

              <Mybutton title="Pesquisar Produtos" customClick={() => navigation.navigate('ViewSalesProduct')} />
              

              <Mybutton title="Salvar" customClick={register_sale} />

              <Mybutton title="Consultar Venda" customClick={() => navigation.navigate('ViewSales')} />

            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterSales;