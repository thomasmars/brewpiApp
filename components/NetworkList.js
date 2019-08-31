import React from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button
} from 'react-native';

export default class NetworkList extends React.Component {

  render() {
    return (
      <View>
        <FlatList
          data={this.props.networks}
          renderItem={(({item}) => {
            return (
              <TouchableOpacity
                onPress={
                  this.props.itemClick
                    ? () => {
                      this.props.itemClick(item.ssid)
                    }
                    : null
                }
              >
                <View style={styles.item}>
                  <Text>{item.ssid}</Text>
                  {
                    item.signal
                    && <Text>{item.signal}</Text>
                  }
                  {
                    this.props.activateNetwork
                    && (
                      <Button
                        onPress={async () => {
                          await this.props.activateNetwork(item.ssid);
                        }}
                        title={'Connect'}
                      />
                    )
                  }
                  {
                    this.props.deleteItem
                    && (
                      <Button
                        onPress={async () => {
                          await this.props.deleteItem(item.ssid);
                        }}
                        title={'Delete'}
                      />
                    )
                  }
                </View>
              </TouchableOpacity>
            )
          })}
          keyExtractor={(item) => item.address ? item.address : item.ssid}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 20,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
});