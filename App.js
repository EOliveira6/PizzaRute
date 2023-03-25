import 'react-native-gesture-handler';

import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/pages/HomeScreen';
import RegisterProduct from './src/pages/Product/RegisterProduct';
import ProductScreen from './src/pages/Product/ProductScreen';
import CategoryScreen from './src/pages/Category/CategoryScreen';
import ViewProduct from './src/pages/Product/ViewProduct';
import ViewAllProduct from './src/pages/Product/ViewAllProduct';
import UpdateProduct from './src/pages/Product/UpdateProduct';
import DeleteProduct from './src/pages/Product/DeleteProduct';

import RegisterCategory from './src/pages/Category/RegisterCategory';
import ViewCategory from './src/pages/Category/ViewCategory';
import ViewAllCategory from './src/pages/Category/ViewAllCategory';
import DeleteCategory from './src/pages/Category/DeleteCategory';
import UpdateCategory from './src/pages/Category/UpdateCategory';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: 'PizzaRute',
            headerStyle: {
              backgroundColor: '#00AD98',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />


        <Stack.Screen
          name="ProductScreen"
          component={ProductScreen}
          options={{
            title: 'PizzaRute - Produtos',
            headerStyle: {
              backgroundColor: '#00AD98',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <Stack.Screen
          name="CategoryScreen"
          component={CategoryScreen}
          options={{
            title: 'PizzaRute - Categorias',
            headerStyle: {
              backgroundColor: '#00AD98',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />


        <Stack.Screen
          name="Register"
          component={RegisterProduct}
          options={{
            title: 'Cadastrar Produto',
            headerStyle: {
              backgroundColor: '#2992C4',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <Stack.Screen
          name="View"
          component={ViewProduct}
          options={{
            title: 'Visualizar Produto',
            headerStyle: {
              backgroundColor: '#F9AD29',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />



        <Stack.Screen
          name="ViewAll"
          component={ViewAllProduct}
          options={{
            title: 'Visualizar Todos os Produtos',
            headerStyle: {
              backgroundColor: '#384F62',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <Stack.Screen
          name="Delete"
          component={DeleteProduct}
          options={{
            title: 'Excluir Produto',
            headerStyle: {
              backgroundColor: '#D1503A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <Stack.Screen
          name="Update"
          component={UpdateProduct}
          options={{
            title: 'Atualizar Produto',
            headerStyle: {
              backgroundColor: '#A45BB9',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <Stack.Screen
          name="RegisterCat"
          component={RegisterCategory}
          options={{
            title: 'Cadastrar Categoria',
            headerStyle: {
              backgroundColor: '#2992C4',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <Stack.Screen
          name="ViewCat"
          component={ViewCategory}
          options={{
            title: 'Visualizar Categoria',
            headerStyle: {
              backgroundColor: '#F9AD29',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <Stack.Screen
          name="ViewAllCat"
          component={ViewAllCategory}
          options={{
            title: 'Visualizar Todas as Categorias',
            headerStyle: {
              backgroundColor: '#384F62',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <Stack.Screen
          name="DeleteCat"
          component={DeleteCategory}
          options={{
            title: 'Excluir Categoria',
            headerStyle: {
              backgroundColor: '#D1503A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

        <Stack.Screen
          name="UpdateCat"
          component={UpdateCategory}
          options={{
            title: 'Atualizar Categoria',
            headerStyle: {
              backgroundColor: '#A45BB9',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;