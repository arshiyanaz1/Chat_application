import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, Animated, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Container, Card, UserInfo, UserImgWrapper, UserImg, UserInfoText, UserName, PostTime, MessageText, TextSection, } from '../assets/styles/MessageStyle';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { getChats } from "../Redux/actions/cardAction.js";

const baseUrl = 'https://jsonbin.org/me/chats';
const ChatScreen = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const chatData = useSelector(state => state.chats)


    useEffect(() => {
        dispatch(getChats());
    }, [dispatch,chatData])

    return (

        <LinearGradient
            colors={['#1C2E46', '#32445A', '#2F3E53']}
            style={styles.gradient}
        >
            <View style={styles.headerContainer}>
                <Feather name='menu' size={25} color='#fff' onPress={() => navigation.openDrawer()} />
                <Text style={styles.header} >CHATS</Text>
            </View>

            <View style={styles.ops}>

                <Container style={{ marginTop: 30 }}>
                    <FlatList
                        data={chatData}
                        keyExtractor={item => item.messageTime}
                        renderItem={({ item }) => (
                            <Card onPress={() => navigation.navigate('Message', { userName: item.userName })}>
                                <UserInfo>
                                    <UserImgWrapper>
                                        <UserImg source={require('../assets/users/user-2.jpg')} />
                                    </UserImgWrapper>
                                    <TextSection>
                                        <UserInfoText>
                                            <UserName>{item.userName}</UserName>
                                            <PostTime>{item.messageTime}</PostTime>
                                        </UserInfoText>
                                        <MessageText>{item.messageText}</MessageText>
                                    </TextSection>
                                </UserInfo>
                            </Card>
                        )}
                    />

                    <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', display: 'flex' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('AddChat')} style={{
                            alignItems: 'center', backgroundColor: '#32445A', borderRadius: 50, padding: 10, width: 50, marginBottom: 80, marginRight: 20, justifyContent: 'flex-end'
                        }}>
                            <Feather name='plus' size={25} color='#fff' />
                        </TouchableOpacity>
                    </View>

                </Container>
            </View>


        </LinearGradient>
    )
}
export default ChatScreen;

const styles = StyleSheet.create({
    loaderStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        marginTop: 300,
    },
    card: {
        marginLeft: 400,
        width: 400,
        flexDirection: 'row'
    },
    gradient: {
        height: '100%',
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        paddingHorizontal: 20,
        paddingTop: 10
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10,
        paddingVertical: 15
    },
    header: {
        fontFamily: 'Montserrat_800ExtraBold',
        color: '#FFF',
        flex: 1,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    proContainer: {
        marginRight: -20,
        alignSelf: 'center'
    },
    ops: {
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        height: '100%',
        backgroundColor: '#FFF',
        marginHorizontal: -20,
        position: 'relative'
    },
    col: {
        flexDirection: 'row',
        marginTop: 25,
        marginHorizontal: 20,
        alignItems: 'center'
    },
    day: {
        fontFamily: 'Montserrat_800ExtraBold',
        color: '#000119',
        flex: 1,
        fontSize: 20
    }
})
