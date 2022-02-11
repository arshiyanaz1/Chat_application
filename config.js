import { Platform } from 'react-native';
import {API_URL,API_TOKEN,ANDROID_KEY,IOS_KEY} from '@env';

export default{
    API_URL,
    API_TOKEN,
    MAP_KEY: Platform.select({
        ios:IOS_KEY,
        android:ANDROID_KEY
    })
}