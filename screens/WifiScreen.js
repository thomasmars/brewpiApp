import React from 'react';
import {View, Text, Button} from 'react-native';
import {sendMessageWithAnswer} from '../helpers/BluetoothCommunicator';
import NetworkList from "../components/NetworkList";
import ConnectionStatus from "../components/ConnectionStatus";

export default class WifiScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      connectedNetwork: null,
      networks: null,
    };
  }

  async getConnectedNetwork() {
    const msg = await sendMessageWithAnswer('get-connected-network');

    this.setState({
      connectedNetwork: msg.network,
    });
  }

  async componentDidMount() {
    await this.getSavedNetworks();
    await this.getConnectedNetwork();

    this.props.navigation.addListener(
      'didFocus',
      async () => {
        await this.getSavedNetworks();
        await this.getConnectedNetwork();
      }
    );
  }

  async getSavedNetworks() {
    const message = await sendMessageWithAnswer('get-saved-networks');

    this.setState({
      savedNetworks: message.networks,
    });
  }

  async getNetworks() {
    const message = await sendMessageWithAnswer('get-networks');
    this.setState({
      networks: message.networks,
    })
  };

  clickedNetwork(networkSSID) {
    this.props.navigation.navigate('WifiConnect', {
      ssid: networkSSID,
    });
  }

  async deleteSavedNetwork(networkSSID) {
    await sendMessageWithAnswer('delete-network', {
      ssid: networkSSID,
    });

    await this.getSavedNetworks();
  }

  async activateNetwork(networkSSID) {
    const message = await sendMessageWithAnswer(
      'activate-network',
      {
        ssid: networkSSID,
      }
    );
    if (!message.success) {
      this.setState({
        err: 'Failed connecting to network, check your password..',
      });
    }
    else {
      this.setState({
        err: null,
      });
    }

    await this.getConnectedNetwork();
  }

  render() {
    return (
      <View>
        <ConnectionStatus connectedNetwork={this.state.connectedNetwork} />
        {
          this.state.savedNetworks && this.state.savedNetworks.length > 0
            ? (
              <View>
                {
                  this.state.err
                  && <Text>{this.state.err}</Text>
                }
                <Text>Saved networks:</Text>
                <NetworkList
                  networks={this.state.savedNetworks}
                  activateNetwork={this.activateNetwork.bind(this)}
                  deleteItem={this.deleteSavedNetwork.bind(this)}
                />
              </View>
            )
            : <Text>You have not yet saved any networks</Text>
        }

        <Button onPress={this.getNetworks.bind(this)} title={'Scan for networks'}/>
        {
          this.state.networks
          && (
            <NetworkList
              networks={this.state.networks}
              itemClick={this.clickedNetwork.bind(this)}
            />
          )
        }
      </View>
    );
  }
}

WifiScreen.navigationOptions = {
  title: 'Wifi',
};
