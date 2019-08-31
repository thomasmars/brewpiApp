import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button, TextInput
} from 'react-native';
import {sendMessageWithAnswer} from '../helpers/BluetoothCommunicator';
import BluetoothSerial from 'react-native-bluetooth-serial-next';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      beerName: '',
      dispatching: false,
    }
  }

  async componentDidMount() {
    BluetoothSerial.on('connectionLost', () => {
      this.props.navigation.navigate('Connect');
    })
  }

  async reboot() {
    await sendMessageWithAnswer('reboot');
  }

  async toggleListening(forceEnable) {
    if (forceEnable) {
      await sendMessageWithAnswer('set_name', {
        name: this.state.beerName,
      });
      await sendMessageWithAnswer('star t_dispatching');
    }
    else {
      await sendMessageWithAnswer('stop_dispatching');
    }

    this.setState({
      dispatching: forceEnable,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text>You are now connected, clap!</Text>
          <Button onPress={this.reboot.bind(this)}
                  title={'Reboot'}
          />
          <View style={styles.inputContainer}>
            <Text>Beer name:</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => this.setState({beerName: text})}
              value={this.state.beerName}
            />
          </View>
          {
            this.state.dispatching
              ? (
                <Button onPress={this.toggleListening.bind(this, false)}
                        title={'Stop'}
                />
              )
              : (
                <Button onPress={this.toggleListening.bind(this, true)}
                        title={'Start'}
                />
              )
          }
        </View>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  input: {
    padding: 5,
    borderWidth: 1,
    fontSize: 20,
    borderColor: 'grey',
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 20,
  }
});
