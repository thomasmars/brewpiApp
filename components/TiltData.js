import React from 'react';
import {StyleSheet, Text, View} from "react-native";

const TiltData = (props) => {
  const getCelsiusFromFahrenheit = (fahrenheit) => {
    return ((fahrenheit - 32) / 1.8).toFixed(2);
  };

  return (
    <View style={styles.data}>
      <Text>SG: {props.tiltData.sg}</Text>
      <Text>Temperature: {getCelsiusFromFahrenheit(props.tiltData.temp)}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  data: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default TiltData;