import React, { useEffect,  useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    ImageBackground,
    TextInput,
    StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Animated from 'react-native-reanimated';
import { useSelector, useDispatch } from 'react-redux';
import { editProfile } from "../Redux/actions/cardAction.js";

const EditProfile = ({ navigation, route }) => {
    const [userData, setUserData] = useState('');
    const { profileData } = route.params;
    const dispatch = useDispatch()

    useEffect(() => {
        handleUpdate()
    }, [dispatch]);

    handleUpdate = () => {

        dispatch(editProfile(userData));

    }
    bs = React.createRef();
    fall = new Animated.Value(1);

    return (
        <View style={styles.container}>

            <Animated.View
                style={{
                    margin: 20,
                    opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
                }}>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity >
                        <View
                            style={{
                                height: 100,
                                width: 100,
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <ImageBackground
                                source={require('../assets/users/user-5.jpg')}
                                style={{ height: 100, width: 100 }}
                                imageStyle={{ borderRadius: 15 }}>
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>
                        {profileData ? profileData[0].userName : ''}
                    </Text>
                </View>

                <View style={styles.action}>
                    <FontAwesome name="user-o" color="#333333" size={20} />
                    <TextInput
                        placeholder="First Name"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        editable={true}
                        defaultValue={profileData ? profileData[0].userName : ''}
                        onChangeText={(txt) => setUserData({ ...userData, userName: txt })}
                        style={styles.textInput}
                    />
                </View>

                <View style={styles.action}>
                    <Feather name="user-check" color="#333333" size={20} />
                    <TextInput
                        placeholder="Fallowers"
                        placeholderTextColor="#666666"
                        keyboardType="number-pad"
                        autoCorrect={false}
                        defaultValue={profileData ? profileData[0].fallowers : ''}
                        onChangeText={(txt) => setUserData({ ...userData, fallowers: txt })}
                        style={styles.textInput}
                    />
                </View>
                <View style={styles.action}>
                    <Feather name="users" color="#333333" size={20} />
                    <TextInput
                        placeholder="Fallowings"
                        placeholderTextColor="#666666"
                        keyboardType="number-pad"
                        autoCorrect={false}
                        defaultValue={profileData ? profileData[0].fallowings : ''}
                        onChangeText={(txt) => setUserData({ ...userData, fallowings: txt })}
                        style={styles.textInput}
                    />
                </View>

                <View style={styles.action}>
                    <MaterialCommunityIcons
                        name="map-marker-outline"
                        color="#333333"
                        size={20}
                    />
                    <TextInput
                        placeholder="City"
                        placeholderTextColor="#666666"
                        autoCorrect={false}
                        defaultValue={profileData ? profileData[0].city : ''}
                        onChangeText={(txt) => setUserData({ ...userData, city: txt })}
                        style={styles.textInput}
                    />
                </View>
                <View style={styles.button}>
                    <TouchableHighlight
                        style={styles.signIn}
                        onPress={() => { handleUpdate(), navigation.navigate('Profile') }}
                    >
                        <LinearGradient
                            colors={['#1C2E46', '#32445A', '#2F3E53']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>UPDATE</Text>
                        </LinearGradient>
                    </TouchableHighlight>

                </View>
            </Animated.View>

        </View>
    );
};

export default EditProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        width: '100%',
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#2e64e5',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#333333',
    },
    button: {
        alignItems: 'center',
    },
    signIn: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
});
