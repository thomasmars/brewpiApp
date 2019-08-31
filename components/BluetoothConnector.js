import React from 'react';
import {
  View,
  Button, StyleSheet, Text
} from 'react-native';

export default class BluetoothConnector extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.props.onConnect} title={'Connect!'} />
        {
          this.props.err
          && <Text>{this.props.err}</Text>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});