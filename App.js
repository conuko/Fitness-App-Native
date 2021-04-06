import React, { useEffect } from 'react';
import {View, Platform, StatusBar} from 'react-native';
import Constants from 'expo-constants';
import AddEntry from './components/AddEntry';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {purple, white} from './utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import MainNavigator from './components/MainNavigator';
import Live from './components/Live';
//import { setLocalNotification } from './utils/helpers';

// custom StatusBar:
function AppStatusBar({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tab =
  Platform.OS === 'ios'
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator();

export default function App() {

  return (
    <Provider store={createStore(reducer)}>
      <View style={{flex: 1}}>
        <AppStatusBar backgroundColor={purple} barStyle="light-content" />
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName='Add Entry'
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let icon;
                if (route.name === 'Add Entry') {
                  icon = (
                    <FontAwesome name='plus-square' size={size} color={color} />
                  );
                } else if (route.name === 'History') {
                  icon = (
                    <Ionicons name='ios-bookmarks' size={size} color={color} />
                  );
                } else if (route.name === 'Live') {
                  icon = (
                    <Ionicons
                      name='ios-speedometer'
                      size={size}
                      color={color}
                    />
                  );
                }
                return icon;
              },
            })}
            tabBarOptions={{
              activeTintColor: Platform.OS === 'ios' ? purple : white,
              style: {
                height: 60,
                backgroundColor: Platform.OS === "ios" ? white : purple,
                shadowColor: "rgba(0, 0, 0, 0.24)",
                shadowOffset: {
                  width: 0,
                  height: 3
                },
                shadowRadius: 6,
                shadowOpacity: 1
              },
              indicatorStyle: {
                // Android tab indicator (line at the bottom of the tab)
                backgroundColor: 'yellow',
              },
            }}
          >
            <Tab.Screen name="Add Entry" component={AddEntry} />
            <Tab.Screen name="History" component={MainNavigator} />
            <Tab.Screen name="Live" component={Live} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}
