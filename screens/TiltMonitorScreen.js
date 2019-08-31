import React from 'react';
import {View, StyleSheet, Button, Text} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial-next';
import TiltData from "../components/TiltData";
import { sendMessageWithAnswer } from '../helpers/BluetoothCommunicator';

export default class TiltMonitorScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isListening: false,
    };
  }

  componentWillUnmount() {
    if (this.readSubscription) {
      BluetoothSerial.removeSubscription(this.readSubscription);
      delete this.readSubscription;
    }
  }

  async startListeningForTilt() {
    this.setState({
      isReading: true,
    });

    let tiltData = await sendMessageWithAnswer('tilt');
    this.setState({
      isReading: false,
      tiltData: tiltData,
    });
  }

  render() {
    return (
      <View style={styles.center}>
        {
          this.state.isReading
            ? <Text>Reading...</Text>
            : (
              <Button
                onPress={this.startListeningForTilt.bind(this)}
                title={'Check values'}
              />
            )
        }
        {
          this.state.tiltData
          && <TiltData tiltData={this.state.tiltData}/>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

TiltMonitorScreen.navigationOptions = {
  title: 'Tilt Monitor',
};