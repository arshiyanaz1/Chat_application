import React, { useState, useEffect, useCallback } from 'react'
import { View, ScrollView, Text, Button, StyleSheet } from 'react-native'
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
const baseUrl = 'https://jsonbin.org/me/test1';

const MessageScreen = ({ route }) => {
    const [messages, setMessages] = useState([]);

    const { userName } = route.params;

    useEffect(() => {
        fetchUser();

        setMessages([
            {
                _id: 1,
                text: 'React Native',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])


    }, [])

    const fetchUser = () => {
        axios({
            method: "GET",
            url: `${baseUrl}`,
            headers: {
                'Authorization': 'token 6ebfff6d-fa4c-4e33-8f17-d4c9aa0cb71f'
            }
        })
            .then(function (response) {
                // handle success
                let data = response.data;
                const newData=data.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))
                setMessages([...newData])
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

    };

    const onSend = useCallback((messageArray) => {
        const msg = messageArray[0];
        const msgArray = [...messages];
        msgArray.push({
            _id: msg._id,
            createdAt: msg.createdAt,
            text: msg.text,
            user: {
                id: 2,
                name: userName,
                avatar:'https://placeimg.com/140/140/any'
            }
        })

        setMessages(previousMessages => GiftedChat.append(previousMessages, messageArray
        ))

        axios({
            method: "POST",
            url: `${baseUrl}`,
            data: msgArray,
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'token 6ebfff6d-fa4c-4e33-8f17-d4c9aa0cb71f'
            }
        })
            .then(function (response) {
                // handle success
                console.log('success', response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    })

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#1C2E46'
                    },
                    left: {
                        backgroundColor: '#fefefe'
                    }
                }}
                textStyle={{
                    right: {
                        color: '#fff'
                    }
                }}
            />
        )
    }

    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View >
                    <MaterialCommunityIcons name='send-circle' style={{ marginBottom: 5, marginRight: 5 }} size={32} color='#1C2E46' />
                </View>
            </Send>
        )
    }

    const scrollToBottomComponent = (props) => {
        return (
            <FontAwesome name='angle-double-down' size={22} color='#333' />
        )
    }
    return (
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 2,
                }}
                renderBubble={renderBubble}
                alwaysShowSend
                renderSend={renderSend}
                scrollToBottom
                scrollToBottomComponent={scrollToBottomComponent}
            />
    )
}

export default MessageScreen
