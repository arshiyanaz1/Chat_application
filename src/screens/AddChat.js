import React, { useState,useEffect } from 'react';
import { Text, TextInput, View, StyleSheet,TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { addChat } from "../Redux/actions/cardAction.js";
const baseUrl = 'https://jsonbin.org/me/chats';


const AddChat = ({ navigation }) => {
    const [text, setText] = useState('');
    const dispatch = useDispatch()
    const chatData = useSelector(state => state.chats)

    useEffect(() => {
    }, [])


    const handleCreate=()=>{
        dispatch(addChat(chatData,text));
    }
    return (
        <View style={styles.container}>
            <View style={styles.action}>
                <FontAwesome name="user-o" color="#333333" size={20} />
                <TextInput
                    placeholder="User Name"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    editable={true}
                    defaultValue={text.userName ? text.userName : ''}
                    onChangeText={(txt) => setText({ ...text, userName: txt })}
                    style={styles.textInput}
                />
            </View>

            <View style={styles.action}>
                <FontAwesome name="file-text" color="#333333" size={20} />
                <TextInput
                    placeholder="Text Message"
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    editable={true}
                    defaultValue={text.messageText ? text.messageText : ''}
                    onChangeText={(txt) => setText({ ...text, messageText: txt })}
                    style={styles.textInput}
                />
            </View>


            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {handleCreate(),navigation.navigate('Chat')}}
                >
                    <LinearGradient
                        colors={['#1C2E46', '#32445A', '#2F3E53']}
                        style={styles.signIn}
                    >
                        <Text style={{
                            color: '#fff'
                        }}>CREATE</Text>
                    </LinearGradient>
                </TouchableOpacity>

            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin:20
    },
    button: {
        alignItems: 'center',
        marginTop:30
    },
    signIn: {
        width:'80%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#333333',
    },
})
export default AddChat
