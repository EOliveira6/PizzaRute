import React, { useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import MyImageButton from '../componentes/MyImageButton';
import { DatabaseConnection } from '../../database/database-connection';

const db = DatabaseConnection.getConnection();

const CategoryScreen = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='category'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS category', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS category(category_id INTEGER PRIMARY KEY AUTOINCREMENT, category_description VARCHAR(50))',
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>

            <MyImageButton
              title="Registrar Categoria"
              btnColor='#2992C4'
              btnIcon="user-plus"
              customClick={() => navigation.navigate('RegisterCat')}
            />

            <MyImageButton
              title="Atualizar Categoria"
              btnColor='#A45BB9'
              btnIcon="user-circle"
              customClick={() => navigation.navigate('UpdateCat')}
            />

            <MyImageButton
              title="Visualizar Categoria"
              btnColor='#F9AD29'
              btnIcon="user"
              customClick={() => navigation.navigate('ViewCat')}
            />
            <MyImageButton
              title="Visualizar Todos"
              btnColor='#384F62'
              btnIcon="users"
              customClick={() => navigation.navigate('ViewAllCat')}
            />
            <MyImageButton
              title="Excluir Categoria"
              btnColor='#D1503A'
              btnIcon="user-times"
              customClick={() => navigation.navigate('DeleteCat')}
            />
          </View>
        </View>


      </View>
    </SafeAreaView>
  );
};

export default CategoryScreen;