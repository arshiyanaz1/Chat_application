import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';

const RootStack = createNativeStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator screenOptions={{ headerShown: false }} >
        <RootStack.Screen name="Login" component={LoginScreen}/>
    </RootStack.Navigator>
);

export default RootStackScreen;