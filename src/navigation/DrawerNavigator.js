import React, { useEffect, useMemo, useReducer, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginStackScreen from './MainTabScreen'
import CustomDrawer from '../components/CustomDrawer'
import ProfileScreen from '../screens/ProfileScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MainTabScreen from './MainTabScreen'
import RootStackScreen from './RootStackStack';
import { AuthContext } from '../components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';


const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
    const [user, setUser] = useState(null);
    const [initializing, setInitializing] = useState(true);

    const authContext = useMemo(() => ({
        user, setUser,
        signIn: async (userName, password) => {
            try {
                await auth().signInWithEmailAndPassword(userName, password)
            } catch (e) {
                console.log('error', e)
            }
        },
        signOut: async () => {
            try {
                await auth().signOut();
            } catch (e) {
                console.log('error', e)
            }
        },
        toggleTheme: async () => {

        },
        signUp: () => {
        },
    }));

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, [])
    if (initializing) return null;


    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {user !== null ? (
                    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} screenOptions={{
                        headerShown: false,
                        drawerActiveBackgroundColor: '#1C2E46',
                        drawerActiveTintColor: '#fff',
                        drawerInactiveTintColor: '#333',
                        drawerLabelStyle: { marginLeft: -25, fontSize: 15 }
                    }}>
                        <Drawer.Screen name="Home" component={MainTabScreen} options={{
                            drawerIcon: ({ color }) => (
                                <Ionicons name="home-outline" size={22} color={color} />
                            )
                        }} />

                        <Drawer.Screen name="Profile" component={ProfileScreen} options={{
                            drawerIcon: ({ color }) => (
                                <Ionicons name="person-outline" size={22} color={color} />
                            )
                        }} />

                        <Drawer.Screen name="Login" component={LoginStackScreen} options={{
                            drawerIcon: ({ color }) => (
                                <AntDesign name="login" size={22} color={color} />
                            )
                        }} />

                    </Drawer.Navigator>
                ) :
                    <RootStackScreen />
                }
            </NavigationContainer>
        </AuthContext.Provider>
    )
}

export default DrawerNavigator
