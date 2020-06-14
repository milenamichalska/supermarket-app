import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import PunktyScreen from '../screens/PunktyScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Ekran głowny',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
        }}
      />
      <BottomTab.Screen
        name="Punkty"
        component={PunktyScreen}
        options={{
          title: 'Punkty Plus',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-trophy" />,
        }}
      />
      <BottomTab.Screen
        name="Kupony"
        component={LinksScreen}
        options={{
          title: 'Kupony',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-pricetag" />,
        }}
      />
      <BottomTab.Screen
        name="Lista"
        component={LinksScreen}
        options={{
          title: 'Lista Zakupów',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-list" />,
        }}
      />
      <BottomTab.Screen
        name="Skaner"
        component={LinksScreen}
        options={{
          title: 'Skaner',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-disc" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Witaj w Aplikacji SupermarketApp!';
    case 'Punkty':
      return 'Punkty Plus';
  }
}
