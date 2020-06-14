import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import AdminScreen from './screens/AdminScreen'
import AddCouponScreen from './screens/AddCouponScreen'
import AddActionScreen from './screens/AddActionScreen'

import { Provider as PaperProvider } from 'react-native-paper';

import * as firebase from 'firebase';
import "firebase/firestore";

console.disableYellowBox = true;
const Stack = createStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyCT1OSripopUO0ui-ZXFyXcxbutLkUOoW0",
  authDomain: "io-supermarket-app.firebaseapp.com",
  databaseURL: "https://io-supermarket-app.firebaseio.com",
  projectId: "io-supermarket-app",
  storageBucket: "io-supermarket-app.appspot.com"
};

export default function App(props) {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <PaperProvider>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        <NavigationContainer linking={LinkingConfiguration}>
          <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            <Stack.Screen name="AdminScreen" component={AdminScreen} />
            <Stack.Screen name="AddCoupon" component={AddCouponScreen} />
            <Stack.Screen name="AddAction" component={AddActionScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
