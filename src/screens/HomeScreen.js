import React from 'react'
import { View, Text ,Button} from 'react-native'

  
const HomeScreen = ({ navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Go to home---- chat"
          onPress={() => navigation.navigate('Chat')}
        />
      </View>
    );
  }

export default HomeScreen