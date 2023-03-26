import React, { useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import MyImageButton from '../componentes/MyImageButton';
import { DatabaseConnection } from '../../database/database-connection';

const db = DatabaseConnection.getConnection();

const SalesScreen = ({ navigation }) => {
 

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>

            <MyImageButton
              title="Registrar Venda"
              btnColor='#2992C4'
              btnIcon="user-plus"
              customClick={() => navigation.navigate('RegisterSales')}
            />

           {/*  <MyImageButton
              title="Atualizar Categoria"
              btnColor='#A45BB9'
              btnIcon="user-circle"
              customClick={() => navigation.navigate('UpdateCat')}
            /> */}

           {/*  <MyImageButton
              title="Pesquisar Produto"
              btnColor='#F9AD29'
              btnIcon="user"
              customClick={() => navigation.navigate('ViewSalesProduct')}
            /> */}
            <MyImageButton
              title="Consultar Vendas"
              btnColor='#384F62'
              btnIcon="users"
              customClick={() => navigation.navigate('ViewAllSales')}
            />
            <MyImageButton
              title="Cancelar Venda"
              btnColor='#D1503A'
              btnIcon="user-times"
              customClick={() => navigation.navigate('DeleteSales')}
            />
          </View>
        </View>


      </View>
    </SafeAreaView>
  );
};

export default SalesScreen;