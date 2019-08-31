import React from 'react';
import {Text, View, Button} from "react-native";
import {sendMessageWithAnswer} from '../helpers/BluetoothCommunicator';

export default class ConnectionStatus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ping: null,
      isPinging: false,
    }
  }

  async ping() {
    this.setState({
      isPinging: true,
    });
    const message = await sendMessageWithAnswer('ping');
    this.setState({
      ping: message.ping,
      isPinging: false,
    });
  }

  render() {
    if (!this.props.connectedNetwork) {
      return <Text>Not connected</Text>
    }

    return (
      <View>
        <Text>Connected to: {this.props.connectedNetwork}</Text>
        {
          this.state.isPinging
          ? <Text>Pinging...</Text>
          : <Button onPress={this.ping.bind(this)} title={'Ping'}/>
        }
        {
          this.state.ping
          && (
            <Text>
              {
                this.state.ping > 0
                  ? 'Got ping: ' + this.state.ping
                  : 'Failed'
              }
            </Text>
          )
        }
      </View>
    );
  }
}