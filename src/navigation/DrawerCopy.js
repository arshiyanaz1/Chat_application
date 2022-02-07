import React, { useEffect, useMemo, useReducer, useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
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
    /*  const [isLoading, setIsLoading] = useState(true);
     const [userToken, setUserToken] = useState(null); */

    const initialLoginState = {
        isLoading: true,
        userName: null,
        userToken: null,
    };

    loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGIN':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGOUT':
                return {
                    ...prevState,
                    userName: null,
                    userToken: null,
                    isLoading: false,
                };
            case 'REGISTER':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };
        }
    }

    const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);
    const authContext = useMemo(() => ({
        signIn: async (userName, password) => {
            /*  setUserToken('fgkj')
             setIsLoading(false); */
            let userToken;
            userToken = null;
            if (userName == 'user' && password == 'pass') {
                try {
                  /*   await auth().signInWithEmailAndPassword(userName,password) */
                    userToken = 'fgkj';
                    await AsyncStorage.setItem('userToken', userToken)
                } catch (e) {
                    console.log('error', e)
                }
            }
            dispatch({ type: 'LOGIN', id: userName, token: userToken });
        },
        signOut:async () => {
            /* setUserToken(null)
            setIsLoading(false); */
            try {
                await auth().signOut();
                await AsyncStorage.removeItem('userToken');
            } catch (e) {
                console.log('error', e)
            }
            dispatch({ type: 'LOGOUT' });
        },
        signUp: () => {
           /*  setUserToken('fgkj')
            setIsLoading(false); */
        },
    }));
    useEffect(() => {
        setTimeout(async () => {
            /* setIsLoading(false); */
            let userToken;
            userToken = null;
            try {
                userToken = await AsyncStorage.getItem('userToken')
            } catch (e) {
                console.log('error', e)
            }
            dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
        }, 1000);
    }, [])

    if (loginState.isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }


    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {loginState.userToken !== null ? (
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