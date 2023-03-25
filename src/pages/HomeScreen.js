import React, { useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import MyImageButton from '../pages/componentes/MyImageButton';

const HomeScreen = ({ navigation }) => {

  return (

    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>

            <MyImageButton
              title="Produtos"
              btnColor='#2992C4'
              btnIcon="user-plus"
              customClick={() => navigation.navigate('ProductScreen')}
            />

            <MyImageButton
              title="Categoria"
              btnColor='#A45BB9'
              btnIcon="user-circle"
              customClick={() => navigation.navigate('CategoryScreen')}
            />

          </View>
        </View>


      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;