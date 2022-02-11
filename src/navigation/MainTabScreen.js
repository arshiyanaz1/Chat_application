import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import ChatScreen from '../screens/ChatScreen';
import AddChat from '../screens/AddChat'
import MessageScreen from '../screens/MessageScreen';
import EditProfile from '../screens/EditProfile';
import MapScreen from "../screens/MapScreen";
import ExploreScreen from "../screens/ExploreScreen";

const Tab = createMaterialBottomTabNavigator();
const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Feed"
    activeColor="#fff"
    barStyle={{ backgroundColor: '#1C2E46' }}
  >
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#1C2E46',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarColor: '#1C2E46',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="bell" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="MapTab"
      component={MapStackScreen}
      options={{
        tabBarLabel: 'Map',
        tabBarColor: '#1C2E46',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="map" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Explore"
      component={ExploreScreen}
      options={{
        tabBarLabel: 'Explore',
        tabBarColor: '#1C2E46',
        tabBarIcon: ({color}) => (
          <Icon name="ios-aperture" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;
const HomeStack = createNativeStackNavigator();

const HomeStackScreen = ({ navigation }) => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }} >
      <HomeStack.Screen name="Chat"
        component={ChatScreen} />
      <HomeStack.Screen name="AddChat" component={AddChat} options={() => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: '#1C2E46',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerBackTitleVisible: false
      })} />
      <HomeStack.Screen name="EditProfile" component={EditProfile} />

      <HomeStack.Screen name="Message"
        options={({ navigation, route }) => ({
          title: route.params.userName,
          headerShown: true,
          headerStyle: {
            backgroundColor: '#1C2E46',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerBackTitleVisible: false
        })}

        component={MessageScreen} />
    </HomeStack.Navigator>
  );
}

const MapStack = createNativeStackNavigator();

const MapStackScreen = ({ navigation }) => {
  return (
    <MapStack.Navigator screenOptions={{ headerShown: false }} >
      <MapStack.Screen name="Map" component={MapScreen} options={() => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: '#1C2E46',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerBackTitleVisible: false
      })} />

    </MapStack.Navigator>
  );
}

/* const ExploreStack = createNativeStackNavigator();

const ExploreStackScreen = ({ navigation }) => {
  return (
    <ExploreStack.Navigator screenOptions={{ headerShown: false }} >
      <ExploreStack.Screen name="Explore" component={ExploreScreen} options={() => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: '#1C2E46',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerBackTitleVisible: false
      })} />

    </ExploreStack.Navigator>
  );
} */


