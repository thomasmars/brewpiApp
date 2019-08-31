import React from 'react';
import {View, Text, StyleSheet} from 'react-native'
import BluetoothSerial from 'react-native-bluetooth-serial-next';
import BluetoothConnector from "../components/BluetoothConnector";

export default class ConnectScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInitializing: true,
      isConnected: false,
      isConnecting: false,
    };
  }

  async componentDidMount() {
    const isEnabled = await BluetoothSerial.isEnabled();

    if (isEnabled) {
      // Check if we have an active connection
      const isConnected = await BluetoothSerial.isConnected();

      if (isConnected) {
        props.navigation.navigate('Main');
        return;
      }

      this.setState({
        isInitializing: false,
        isConnected: false,
      });

      // Try to connect initially
      await this.connectToBluetooth();
    }
    else {
      // TODO: Logic for enabling bluetooth
      await BluetoothSerial.enable();
    }
  }

  async connectToBluetooth() {
    this.setState({
      isConnecting: true,
    });

    const devices = await BluetoothSerial.list();
    const beerPi = devices.filter((device) => {
      return device.name === 'beer-pi';
    })[0];

    if (!beerPi) {
      this.setState({
        isConnecting: false,
        err: 'Could not find device',
      });
      return;
    }

    try {
      const res = await BluetoothSerial.connect(beerPi.id);
      this.setState({
        isConnecting: false,
        isConnected: true,
      });

      this.props.navigation.navigate('Main', {
        bluetoothId: beerPi.id,
      });
    }
    catch (err) {
      this.setState({
        isConnecting: false,
        err: err.toString(),
      });
    }
  }


  render() {
    if (this.state.isInitializing) {
      return (
        <View style={styles.center}>
          <Text>Loading...</Text>
        </View>
      );
    }

    if (this.state.isConnecting) {
      return (
        <View style={styles.center}>
          <Text>Connecting...</Text>
        </View>
      )
    }

    return (
      <BluetoothConnector
        onConnect={this.connectToBluetooth.bind(this)}
        err={this.state.err}
      />
    )
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

ConnectScreen.navigationOptions = {
  header: null,
};