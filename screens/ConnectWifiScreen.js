import React from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import WifiScreen from "./WifiScreen";
import {sendMessageWithAnswer} from '../helpers/BluetoothCommunicator';

export default class ConnectWifiScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      password: '',
    }
  }

  async connectToWifi() {
    const message = await sendMessageWithAnswer('connect', {
      ssid: this.props.navigation.getParam('ssid'),
      password: this.state.password,
    });

    this.props.navigation.popToTop();
  }

  render() {
    const ssid = this.props.navigation.getParam('ssid');

    return (
      <View style={styles.centered}>
        <Text>Connecting to "{ssid}"</Text>
        <View style={styles.inputContainer}>
          <Text>Password:</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => this.setState({password: text})}
            value={this.state.password}
          />
        </View>
        <Button onPress={this.connectToWifi.bind(this)} title={'Connect'} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  input: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'grey',
    flex: 1,
  },
});

WifiScreen.navigationOptions = {
  title: 'Connect to Wifi network',
};