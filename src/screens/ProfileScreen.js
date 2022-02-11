import React, { useState, useEffect, useRef, Fragment } from 'react';
import { View, Text, StyleSheet, Animated, Image, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from "../Redux/actions/cardAction.js";
import config from '../../config'

const ProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const profileData = useSelector(state => state.profile)

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch,profileData])

    return (
        <View style={styles.containerImage}>
            <Image style={styles.bgImage} source={require('../assets/users/user-5.jpg')} />
            <View style={styles.bottomContainer}>
                
                <Image style={styles.profile} source={require('../assets/users/user-5.jpg')} />
               {/*  <Text style={{color:'black'}}>{config.MAP_KEY}</Text> */}
                <TouchableOpacity onPress={() => navigation.navigate('EditProfile', { profileData: profileData })} style={{ bottom: '9%', right: '2%' }}>
                    <Feather

                        name="edit"
                        color="green"
                        size={20}
                    />
                </TouchableOpacity>
                {profileData.map((data) => {
                    return (
                        <Fragment key={data.id}>
                            <Text style={styles.name}>{data.userName}</Text>
                            <Text style={{ color: 'black', bottom: '7%' }}>{data.city}</Text>

                            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                                <View style={styles.fallower}>
                                    <Text style={styles.number}>{data.fallowers}</Text>
                                    <Text style={[styles.number, { fontWeight: 'normal', fontSize: 18 }]}>followers</Text>
                                </View>

                                <View style={styles.fallower}>
                                    <Text style={styles.number}>{data.fallowings}</Text>
                                    <Text style={[styles.number, { fontWeight: 'normal', fontSize: 18 }]}>followings</Text>
                                </View>

                            </View>
                        </Fragment>
                    )
                })}
            </View>
        </View>
    )
}
export default ProfileScreen;

const styles = StyleSheet.create({
    containerImage: {
        flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bgImage: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    bottomContainer: {
        marginTop: '52%',
        height: '90%',
        width: 400,
        backgroundColor: 'white',
        borderTopStartRadius: 50,
        borderTopEndRadius: 50,
        alignItems: 'center'
    },
    profile: {
        height: 120,
        width: 120, borderRadius: 25,
        bottom: '10%'
    },
    name: {
        fontSize: 36,
        fontWeight: 'bold',
        bottom: '8%'
    },
    row: {
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        paddingVertical: 10
    },
    heading: {
        fontSize: 18
    },
    value: {
        fontSize: 18, alignSelf: 'flex-start', textAlign: 'left'
    },
    button: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 150,
        flexDirection: 'row'
    },
    signIn: {
        width: '50%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    number: {
        color: '#6d6a7f',
        fontSize: 16,
        fontWeight: 'bold'
    },
    numberSecond: {
        color: '#6d6a7f',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 36
    },
    fallower: {
        bottom: '5%',
        alignItems: 'center',
        marginHorizontal: 15
    }
})
